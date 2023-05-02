const blogsRouter = require('express').Router()
const Blogs = require('../models/blog')
const Comment = require('../models/comment')
const middleware  = require('../utils/middleware')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blogs.find({})
    .populate('user',{ username:1, name:1, id:1 })
    .populate('comments', { content: 1, id: 1 })
  response.json(blogs)
})

blogsRouter.post('/', middleware.tokenExtractor, middleware.userExtractor, async (request, response) => {

  //request.token <====> middleware.tokenExtractor
  //request.user  <====> middleware.userExtractor (request.token,'.env file variable')
  const body=request.body
  if (body.title === undefined || body.url === undefined)
  {
    return response.status(400).send(`Missing ${body.title===undefined?'title':'url'}`)
  }

  const user = request.user
  if (user === undefined)
  {
    return response.status(400).json({ error: 'User not found' })
  }
  const PostBlog = new Blogs({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user:user._id
  })
  const savedBlog = await (await PostBlog.save())
    .populate('user',{ username:1, name:1, id:1 })

  user.blogs=user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.post('/:id/comments', async (request, response) => {
  try {
    const PostBlogComment = new Comment({
      content:request.body.content,
      blog: request.params.id
    })
    const savedBlogComment = await PostBlogComment.save()
    const blog = await Blogs.findById(request.params.id)
    if(!blog.comments) blog.comments = savedBlogComment
    else blog.comments= blog.comments.concat(savedBlogComment)
    await blog.save()
    response.status(201).json(blog)
  }
  catch (error) {
    response.status(500).json({ message: error.message })
  }
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blogs.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.delete('/:id', middleware.tokenExtractor, middleware.userExtractor, async (request, response) => {
  const user = request.user
  const BlogUser= await Blogs.findById(request.params.id)
  if (BlogUser === undefined)
  {
    return response.status(400).json({ error: 'Blog not found' })
  }
  if(user._id.toString() === BlogUser.user.toString())
  {
    await Blogs.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }
})

blogsRouter.put('/:id', middleware.tokenExtractor, middleware.userExtractor, async(request, response) => {
  const body = request.body
  const updateblog = await Blogs.findByIdAndUpdate(body.id,
    { title: body.title,
      author: body.author,
      url: body.url,
      user: body.user,
      likes: body.likes,
    },
    { new:true,context:'query' })
    .populate('user',{ username:1, name:1, id:1 })
    .populate('comments',{ content:1, id:1 })
  response.status(202).json(updateblog)
})

module.exports = blogsRouter
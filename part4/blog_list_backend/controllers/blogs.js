const blogsRouter = require('express').Router()
const Blogs = require('../models/blog')
const User = require('../models/user')
const middleware  = require('../utils/middleware')




blogsRouter.get('/', async (request, response) => {
  const blogs = await Blogs.find({}).populate('user',{username:1, name:1})
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
    return response.status(400).json({error: 'User not found'})
  }
  const PostBlog = new Blogs({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user:user._id
  })
  const savedBlog = await PostBlog.save()
  
  user.blogs=user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
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
    return response.status(400).json({error: 'Blog not found'})
  }
  if(user._id.toString() === BlogUser.user.toString())
  {
    await Blogs.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }
})

blogsRouter.put('/:id', async(request, response) => {
  const body = request.body
  await Blogs.findByIdAndUpdate(body.id,      
    { title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    },
    { new:true,context:'query' })
    response.status(202).json(body)
})

module.exports = blogsRouter
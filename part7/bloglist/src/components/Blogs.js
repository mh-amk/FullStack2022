//import { useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch , useSelector } from 'react-redux'
import { setNotification/*,initializeNotification*/ } from '../reducers/notificationReducer'
import Togglable from '../components/Togglable'
//import NewBlogForm from '../components/NewBlogForm'
import { BlogLike, DeleteBlog, UpdateBlogs, createBlogs/*,initializeBlogs*/ } from '../reducers/blogReducer'
import { useQuery, useMutation, useQueryClient } from 'react-query'
//import { useEffect } from 'react'
import Blog from './Blog'
//import BlogForm from './BlogForm'
import { useRef } from 'react'
import { useField } from '../hooks/index'
import blogService from '../services/blogs'

//import { useNavigate } from 'react-router-dom'

/*import {
  Link,
} from 'react-router-dom'*/

const Blogs = () => {
  const dispatch = useDispatch()
  const User_Information = useSelector(state => {return state.user})
  const blogs= useSelector(state => state.blogs)
  const LikeBlogUpdateMutation = useMutation(blogService.LikeBlogUpdate, {
    onSuccess: (newBlog) => {
      queryClient.invalidateQueries('blogs')
      const Mutationblogs = queryClient.getQueryData('blogs')
      queryClient.setQueryData('blogs', Mutationblogs.concat(newBlog))
    }
  })
  const DeleteBlogByIDMutation = useMutation(blogService.deleteBlogById, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
    }
  })
  const addBlogMutation = useMutation(blogService.create, {
    onSuccess: (newBlog) => {
      //queryClient.invalidateQueries('blogs')
      const Mutationblogs = queryClient.getQueryData('blogs')
      queryClient.setQueryData('blogs', Mutationblogs.concat(newBlog))
    }
  })
  const UpdateBlogMutation = useMutation(blogService.update, {
    onSuccess: (newBlog) => {
      //queryClient.invalidateQueries('blogs')
      const Mutationblogs = queryClient.getQueryData('blogs')
      queryClient.setQueryData('blogs', Mutationblogs.concat(newBlog))
    }
  })

  //Get Blogs Use Query
  const result = useQuery('blogs', blogService.getAll, { retry: 1,refetchOnWindowFocus:false, })
  const BlogsReactQuery = result.data

  const blogFormRef = useRef()
  const { reset: resetTitle, ...title } = useField('text','')
  const { reset: resetAuthor, ...author } = useField('text','')
  const { reset: resetUrl, ...url } = useField('text','')

  const addBlog = (blogObject) => {
    try{
      dispatch( createBlogs(blogObject))
      dispatch( setNotification({ content:`a new blog ${blogObject.title} by ${blogObject.author} added`,cssClass:'success' },5))
      blogFormRef.current.toggleVisibility()
    }
    catch (error) {
      console.log(error.response.data.error)
      if (error.response.status === 500) {
        dispatch( setNotification({ content:'Insert failed, duplicate id',cssClass:'error' },5))
      } else if (error.response.status === 400) {
        dispatch( setNotification({ content: error.response.data.error, cssClass:'error' } ,5))
      }
    }
  }

  const UpdateBlog = (findblogforUpdate) => {
    try{
      dispatch(UpdateBlogs(findblogforUpdate))
      dispatch( setNotification({ content:`the blog ${findblogforUpdate.title} author's ${findblogforUpdate.author} changed`,cssClass:'success' },5))
      blogFormRef.current.toggleVisibility()
    }
    catch (error) {
      if (error.response.status === 404) {
        dispatch( setNotification({ content:'the person was already deleted from server',cssClass:'error' },5))
      } else if (error.response.status === 400) {
        dispatch( setNotification({ content: error.response.data.error, cssClass:'error' } ,5))
      }
    }
    handleVisibilty()
  }
  //addBlog Use Query
  const addBlogUseQuery = (blogObject) => {
    try{
      addBlogMutation.mutate(blogObject)
      dispatch( setNotification({ content:`a new blog ${blogObject.title} by ${blogObject.author} added`,cssClass:'success' },5))
      blogFormRef.current.toggleVisibility()
    }
    catch (error) {
      console.log(error)
      if (error.response.status === 500) {
        dispatch( setNotification({ content:'Insert failed, duplicate id',cssClass:'error' },5))
      } else if (error.response.status === 400) {
        dispatch( setNotification({ content: error.response.data.error, cssClass:'error' } ,5))
      }
    }
  }
  //Update Blog Use Query
  const UpdateBlogUseQuery = (blogObject) => {
    try{
      UpdateBlogMutation.mutate(blogObject.id,blogObject)
      dispatch( setNotification({ content:`the blog ${blogObject.title} author's ${blogObject.author} changed`,cssClass:'success' },5))
      blogFormRef.current.toggleVisibility()
    }
    catch (error) {
      if (error.response.status === 404) {
        dispatch( setNotification({ content:'the person was already deleted from server',cssClass:'error' },5))
      } else if (error.response.status === 400) {
        dispatch( setNotification({ content: error.response.data.error, cssClass:'error' } ,5))
      }
    }
  }

  const IncreaseBlogLike = (findblogforIncreaseLike) => {
    try{
      dispatch(BlogLike(findblogforIncreaseLike.id))
      //dispatch(setNotification('the blog voted'),10)
    }
    catch (error){
      console.log(error.response.data.error)
      if (error.response.status === 500) {
        dispatch( setNotification({ content:'Delete failed, Blog not exist',cssClass:'error' },5))
      } else if (error.response.status === 400) {
        dispatch( setNotification({ content: error.response.data.error,cssClass:'error' },5))
      }
    }
  }
  const DeleteBlogByID = (blogId) => {
    try {
      dispatch(DeleteBlog(blogId))
      dispatch( setNotification({ content:'the blog deleted',cssClass:'success' },5))
    } catch (error) {
      console.log(error.response.data.error)
      if (error.response.status === 500) {
        dispatch( setNotification({ content:'Delete failed, Blog not exist',cssClass:'error' },5))
      } else if (error.response.status === 400) {
        dispatch( setNotification({ content: error.response.data.error,cssClass:'error' },5))
      }
    }
  }
  const createFormRef = useRef()

  /*useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeNotification())
  }, [dispatch])
  */


  //
  //React Query
  //
  const queryClient = useQueryClient()


  if (result.isError) {
    return <div>bloglist service not available due to problems in server</div>
  }

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }
  //IncreaseBlogLike Use Query
  const IncreaseBlogLikeUseQuery = (blogObject) => {
    LikeBlogUpdateMutation.mutate(blogObject.id)
    dispatch( setNotification({ content: `liked ${blogObject.title}`,cssClass:'success' },5))
  }
  //Delete Blog by id Use Query
  const DeleteBlogByIDUseQuery = (blogId) => {
    try {
      DeleteBlogByIDMutation.mutate(blogId)
      dispatch( setNotification({ content: 'the blog deleted',cssClass:'success' },5))
    } catch (error) {
      if (error.response.status === 500) {
        dispatch( setNotification({ content: 'Delete failed, Blog not exist',cssClass:'error' },5))
      } else if (error.response.status === 400) {
        dispatch( setNotification({ content: error.response.data.error,cssClass:'error' },5))
      }
    }
  }

  const handleClear= () =>
  {
    //initializeBlogs()
    resetTitle()
    resetAuthor()
    resetUrl()
  }

  const FormSubmit = (event) => {
    event.preventDefault()
    if (blogs.find((blog) => blog.title === title) === undefined) {
      addBlog({
        title: title.value,
        author: author.value,
        url: url.value,
      })
    } else {
      if (
        window.confirm(
          `${title} is already added to blogs, replace the author with a new one?`,
        )
      ) {
        const findblogforUpdate = blogs.find((blog) => blog.title === title)
        UpdateBlog({
          id: findblogforUpdate.id,
          title: findblogforUpdate.title,
          author: author.value,
          url: url.value,
        })
      }
    }
    handleClear()
  }
  const onSubmit = (event) => {
    event.preventDefault()
    try {
      if (blogs.find((blog) => blog.title === title) === undefined) {
        addBlogUseQuery({
          title: event.target.title.value,
          author: event.target.author.value,
          url: event.target.url.value,
        })
      } else {
        if (
          window.confirm(
            `${title} is already added to blogs, replace the author with a new one?`,
          )
        ) {
          const findblogforUpdate = blogs.find((blog) => blog.title === title)
          UpdateBlogUseQuery({
            id: findblogforUpdate.id,
            title: findblogforUpdate.title,
            author: event.target.author.value,
            url: event.target.url.value,
          })
          dispatch( setNotification({ content:`the blog ${event.target.title.value} updated`,cssClass:'success' },5))
        }
      }
      handleClear()
    } catch (error) {
      console.log(error)
      if (error.response.status === 500) {
        dispatch( setNotification({ content:'Delete failed, Blog not exist',cssClass:'error' },5))
      } else if (error.response.status === 400) {
        dispatch( setNotification({ content: error.response.data.error,cssClass:'error' },5))
      }
    }
  }

  const handleVisibilty = () => {
    createFormRef.current.toggleVisibility()
  }

  if (!blogs) return null
  if (!BlogsReactQuery) return null
  return (
    <>
      <Togglable buttonLabel='New Blog (Redux)' buttonId='NewBlogForm-btn' ref={blogFormRef}>
        <div className='NewBlogForm'>
          <Form onSubmit={FormSubmit}>
            <Form.Group>
              <Form.Label> title </Form.Label>
              <Form.Control type='text' {...title}/>
              <Form.Label> author </Form.Label>
              <Form.Control type='text' {...author}/>
              <Form.Label> url </Form.Label>
              <Form.Control type='text' {...url}/>
              <Button variant="primary" className={'btn btn-primary btn-sm'} type="submit">
                add blog
              </Button>
            </Form.Group>
          </Form>
        </div>
      </Togglable>
      <Togglable buttonLabel='New Blog (Use Query & Context)' buttonId='UseQueryNewBlogForm-btn' ref={blogFormRef}>
        <div className='NewBlogForm'>
          <Form onSubmit={onSubmit}>
            <Form.Group>
              <Form.Label> title </Form.Label>
              <Form.Control type='text' {...title}/>
              <Form.Label> author </Form.Label>
              <Form.Control type='text' {...author}/>
              <Form.Label> url </Form.Label>
              <Form.Control type='text' {...url}/>
              <Button variant="primary" className={'btn btn-primary btn-sm'} type="submit">
                add blog
              </Button>
            </Form.Group>
          </Form>
        </div>
      </Togglable>
      <div>
        <h2>State management: Redux</h2>
        <ul>
          {
            blogs.map((blog, i) => (
              <Blog
                key={i}
                id = {blog.id}
                rowIndex={i.toString()}
                IncreaseBlogLike={IncreaseBlogLike}
                DeleteBlogByID={DeleteBlogByID}
                blog={blog}
                user={User_Information} />
            ))}
        </ul>
      </div>
      <div>
        <h2>State management: React Query and context</h2>
        <ul>
          {BlogsReactQuery.map((blog, i) => (
            <Blog
              key={i}
              id = {blog.id}
              rowIndex={i.toString()}
              IncreaseBlogLike={IncreaseBlogLikeUseQuery}
              DeleteBlogByID={DeleteBlogByIDUseQuery}
              blog={blog}
              user={User_Information} />
          )
          )}
        </ul>
      </div>
    </>
  )
}
export default Blogs

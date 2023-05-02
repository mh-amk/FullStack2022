/*import Togglable from '../components/Togglable'
import NewBlogForm from '../components/NewBlogForm'
import { useDispatch , useSelector } from 'react-redux'
import { UpdateBlogs, createBlogs } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import blogService from '../services/blogs'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { useRef } from 'react'*/
//import { useField } from '../hooks/index'

const BlogForm = (/*handleVisibilty*/) => {
  /*const blogFormRef = useRef()
  const dispatch = useDispatch()
  const queryClient = useQueryClient()

  const addBlogMutation = useMutation(blogService.create, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
    }
  })
  const UpdateBlogMutation = useMutation(blogService.update, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
    }
  })
  const blogs = useSelector(state => { return state.blogs })
  const result = useQuery('blogs', blogService.getAll, { retry: 1,refetchOnWindowFocus:false })
  let BlogsReactQuery = result.data

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }


  const addBlog = async (blogObject) => {
    try{
      dispatch( await createBlogs(blogObject))
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

  const UpdateBlog = async (findblogforUpdate) => {
    try{
      dispatch(await UpdateBlogs(findblogforUpdate))
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
  const addBlogUseQuery = async (blogObject) => {
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
  }*/

  return (
    {/*<>
      <Togglable buttonLabel='New Blog (Redux)' buttonId='NewBlogForm-btn' ref={blogFormRef}>
        <NewBlogForm
          CreateBlog={addBlog}
          UpdateBlog={UpdateBlog}
          blogs={blogs}
        />
      </Togglable>
      <Togglable buttonLabel='New Blog (Use Query & Context)' buttonId='UseQueryNewBlogForm-btn' ref={blogFormRef}>
        <NewBlogForm
          CreateBlog={addBlogUseQuery}
          UpdateBlog={UpdateBlogUseQuery}
          blogs={BlogsReactQuery}
        />
      </Togglable>
    </>
  */}
  )
}
export default BlogForm

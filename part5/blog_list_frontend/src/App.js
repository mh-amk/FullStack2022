import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notificationMessage, SetNotificationMessage] =useState(null)
  const [cssClass, setCssClass]=useState('success')

  const blogFormRef = useRef()
  const loginFormRef = useRef()



  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  },[])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])


  const handleLogin = async (userObject) => {

    try {
      loginFormRef.current.toggleVisibility()
      const user = await loginService.login(userObject)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      console.log('user',user)
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      setCssClass('error')
      SetNotificationMessage('Wrong credentials')
      setTimeout(() => {SetNotificationMessage(null)}, 10000)
    }
  }

  function Logout() {
    window.localStorage.clear()
    setUser(null)
  }

  const addBlog = async (blogObject) => {

    await blogService
      .create(blogObject)
      .then(response => {
        setBlogs(blogs.concat(response))
        setCssClass('success')
        SetNotificationMessage(`a new blog ${response.title} by ${response.author} added`)
        setTimeout(() => { SetNotificationMessage(null)}, 10000)
        blogFormRef.current.toggleVisibility()
      })
      .catch(error =>
      {
        setCssClass('error')
        console.log(error.response.data.error)
        if(error.response.status===500)
        {
          SetNotificationMessage('Insert failed, duplicate id')
          setTimeout(() => { SetNotificationMessage(null)}, 10000)
        }
        else if (error.response.status===400)
        {
          SetNotificationMessage(error.response.data.error)
          setTimeout(() => { SetNotificationMessage(null)}, 10000)
        }
      })

  }

  const UpdateBlog = (findblogforUpdate) => {
    blogService
      .update(findblogforUpdate.id,findblogforUpdate)
      .then(response => {
        setBlogs(blogs.map(blog => blog.id !== findblogforUpdate.id ? blog : response))
        setCssClass('success')
        SetNotificationMessage(`the blog ${response.title} author's ${response.author} changed`)
        setTimeout(() => { SetNotificationMessage(null)}, 10000)
        blogFormRef.current.toggleVisibility()
      })
      .catch(error => {
        setCssClass('error')
        if(error.response.status===404)
        {
          SetNotificationMessage('the person was already deleted from server')
          setTimeout(() => { SetNotificationMessage(null)}, 10000)
          setBlogs(blogs.filter(blog => blog.id !== findblogforUpdate.id))
        }
        else if (error.response.status===400)
        {
          SetNotificationMessage(error.response.data.error)
          setTimeout(() => { SetNotificationMessage(null)}, 10000)
        }
      })
  }
  const IncreaseBlogLike = (findblogforIncreaseLike) => {
    blogService
      .update(findblogforIncreaseLike.id,findblogforIncreaseLike)
      .then(response => {
        setBlogs(blogs.map(blog => blog.id !== findblogforIncreaseLike.id ? blog : response))
      })
  }

  const DeleteBlogByID = (blogId) => {
    try{
      blogService.deleteBlogById(blogId)
      setBlogs(blogs.filter(blog => blog.id !== blogId))
      setCssClass('success')
      SetNotificationMessage('the blog deleted')
      setTimeout(() => { SetNotificationMessage(null)}, 10000)
    }
    catch (error){
      setCssClass('error')
      console.log(error.response.data.error)
      if(error.response.status===500)
      {
        SetNotificationMessage('Delete failed, Blog not exist')
        setTimeout(() => { SetNotificationMessage(null)}, 10000)
      }
      else if (error.response.status===400)
      {
        SetNotificationMessage(error.response.data.error)
        setTimeout(() => { SetNotificationMessage(null)}, 10000)
      }
    }
  }

  const loginForm =() => (
    <>
      <Togglable buttonLabel='Login' buttonId='LoginForm-btn' ref={loginFormRef}>
        <LoginForm UserLogin = {handleLogin} />
      </Togglable>
    </>
  )

  const blogSortByLikes = blogs.sort((a,b) => b.likes-a.likes)

  const blogForm = () => (
    <>
      <Togglable buttonLabel='New Blog' buttonId='NewBlogForm-btn' ref={blogFormRef}>
        <NewBlogForm CreateBlog = {addBlog} UpdateBlog = {UpdateBlog} blogs = {blogs}/>
      </Togglable>
    </>
  )
  const blogsList =() => (
    <ul>
      {blogSortByLikes.map((blog, i) =>
        <Blog key={i} rowIndex={i.toString()} IncreaseBlogLike={IncreaseBlogLike} DeleteBlogByID={DeleteBlogByID} blog={blog} user={user} />
      )}
    </ul>
  )

  return (
    <div>
      <h1>Blogs</h1>
      <Notification cssClass={cssClass} notificationMessage={notificationMessage}/>
      {
        user === null ?
          loginForm() :
          <div>
            <p>{user.name} logged-in <button onClick={() => Logout()}>Logout</button>
            </p>
            {blogForm()}
            {blogsList()}
          </div>
      }

    </div>

  )
}

export default App

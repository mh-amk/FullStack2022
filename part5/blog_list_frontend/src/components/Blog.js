import { useRef } from 'react'
import BlogsTogglable from './BlogsTogglable'
import PropTypes from 'prop-types'


const Blog = ({ IncreaseBlogLike, DeleteBlogByID, blog, user,rowIndex }) => {
  const blogRef = useRef()

  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const IncreaseLike = () => {
    if(blog) {
      const likeINC = blog.likes !== null? blog.likes + 1:1
      IncreaseBlogLike({
        id: blog.id,
        title: blog.title,
        author: blog.author,
        url: blog.url,
        user: blog.user.id,
        likes: likeINC,
      })
      blogRef.current.toggleVisibilityBlog()
    }
  }

  const RemoveBlog = () => {
    if (window.confirm(`Remove Blog ${blog.title} by ${blog.author}?`)) {
      DeleteBlogByID(blog.id)
      blogRef.current.toggleVisibilityBlog()
    }
  }

  return(
    <div className='blog' style={blogStyle}>
      <BlogsTogglable title = {blog.title} author = {blog.author} buttonId={`ViewBlogDetail-btn${rowIndex}`} buttonLabel = "view" ref={blogRef}>
        {blog.url}<br/>
        likes {blog.likes} <button id={`like-btn${rowIndex}`} onClick={IncreaseLike}>like</button><br/>
        {blog.user.name} <br/>
        {blog.user.name === user.name? <button id={`removeBlog-btn${rowIndex}`} onClick={RemoveBlog}>remove</button>:null}
      </BlogsTogglable>
    </div>
  )}

export default Blog

Blog.propTypes = {
  //IncreaseBlogLike: PropTypes.func.isRequired,
  //DeleteBlogByID: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  rowIndex:PropTypes.string.isRequired
}

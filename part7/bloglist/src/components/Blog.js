import { useRef } from 'react'
import BlogsTogglable from './BlogsTogglable'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { Button } from 'react-bootstrap'

const Blog = ({ IncreaseBlogLike, DeleteBlogByID, user, id, rowIndex }) => {
  const blogRef = useRef()
  const blogs= useSelector(state => state.blogs.find(blog => blog.id===id))
  if (!blogs) return null

  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const IncreaseLike = () => {
    if (blogs) {
      const likeINC = blogs.likes !== null ? blogs.likes + 1 : 1
      IncreaseBlogLike({
        id: blogs.id,
        title: blogs.title,
        author: blogs.author,
        url: blogs.url,
        user: blogs.user.id,
        likes: likeINC,
      })
      blogRef.current.toggleVisibilityBlog()
    }
  }

  const RemoveBlog = () => {
    if (window.confirm(`Remove Blog ${blogs.title} by ${blogs.author}?`)) {
      DeleteBlogByID(blogs.id)
      blogRef.current.toggleVisibilityBlog()
    }
  }

  return (
    <div className='blog' style={blogStyle}>
      <BlogsTogglable
        blogid={blogs.id}
        title={blogs.title}
        author={blogs.author}
        buttonId={`ViewBlogDetail-btn${rowIndex}`}
        buttonLabel='view'
        ref={blogRef}
      >
        {blogs.url}
        <br />
        likes {`${blogs.likes}   `}
        <Button id={`like-btn${rowIndex}`} className={'btn btn-primary btn-sm'} onClick={IncreaseLike}>
          like
        </Button>
        <br />
        {blogs.user.name} <br />
        {blogs.user.name === user.name ? (
          <Button id={`removeBlog-btn${rowIndex}`} className={'btn btn-secondary btn-sm'} onClick={RemoveBlog}>
            remove
          </Button>
        ) : null}
      </BlogsTogglable>
    </div>
  )
}

export default Blog

Blog.propTypes = {
  //IncreaseBlogLike: PropTypes.func.isRequired,
  //DeleteBlogByID: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired,
  //user: PropTypes.array.isRequired,
  rowIndex: PropTypes.string.isRequired,
}

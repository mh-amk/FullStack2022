import { useState, forwardRef, useImperativeHandle } from 'react'
import { Button } from 'react-bootstrap'
import {
  Link,
} from 'react-router-dom'
import PropTypes from 'prop-types'

const BlogsTogglable = forwardRef((props, refs) => {
  const [visibleBlog, setVisibleBlog] = useState(false)
  const hideWhenVisible = { display: visibleBlog ? 'none' : '' }
  const showWhenVisible = { display: visibleBlog ? '' : 'none' }

  const toggleVisibilityBlog = () => {
    setVisibleBlog(!visibleBlog)
  }
  useImperativeHandle(refs, () => {
    return {
      toggleVisibilityBlog,
    }
  })

  return (
    <div>
      <div className='viewBlog'>
        <Link to={`/blogs/${props.blogid}`}> {`${props.title}${props.author}  `}    </Link>
        {visibleBlog === false ? (
          <Button id={props.buttonId} style={hideWhenVisible} className={'btn btn-secondary btn-sm'} onClick={toggleVisibilityBlog}>
            {props.buttonLabel}
          </Button>
        ) : (
          <Button className={'btn btn-secondary btn-sm'} onClick={toggleVisibilityBlog}>hide</Button>
        )}
      </div>

      <div style={showWhenVisible} className='togglableContent'>
        {props.children}
      </div>
    </div>
  )
})

BlogsTogglable.displayName = 'BlogsTogglable'

export default BlogsTogglable

BlogsTogglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  buttonId: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

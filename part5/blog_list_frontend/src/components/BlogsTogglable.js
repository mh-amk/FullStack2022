import { useState, forwardRef, useImperativeHandle } from 'react'
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
      toggleVisibilityBlog
    }
  })

  return (
    <div>
      <div className='viewBlog'>
        {props.title} {props.author} {visibleBlog===false?
          <button id={props.buttonId} style={hideWhenVisible} onClick={toggleVisibilityBlog}>{props.buttonLabel}</button>:
          <button onClick={toggleVisibilityBlog}>hide</button>}
      </div>

      <div style={showWhenVisible} className="togglableContent">
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
  title: PropTypes.string.isRequired
}

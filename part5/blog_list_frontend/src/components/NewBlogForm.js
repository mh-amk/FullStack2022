import { useState } from 'react'
import PropTypes from 'prop-types'

const NewBlogForm = ({ CreateBlog,UpdateBlog,blogs }) =>
{
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const handleInputTitleChange = (event) => {
    setNewTitle(event.target.value)
  }
  const handleInputAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }
  const handleInputUrlChange = (event) => {
    setNewUrl(event.target.value)
  }
  const AddBlog = (event) => {
    if (blogs.find(blog => blog.title === newTitle)===undefined) {
      event.preventDefault()
      CreateBlog({
        title: newTitle,
        author: newAuthor,
        url: newUrl,
      })
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
    }
    else
    {
      if (window.confirm(`${newTitle} is already added to blogs, replace the author with a new one?`))
      {
        event.preventDefault()
        const findblogforUpdate=blogs.find(blog => blog.title===newTitle)
        UpdateBlog({
          id: findblogforUpdate.id,
          title: findblogforUpdate.title,
          author: newAuthor,
          url: newUrl,
        })
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
      }
    }
  }

  return(
    <div className='NewBlogForm'>
      <form onSubmit={AddBlog}>
        <div>title: <input id="input-title" placeholder='write title here' onChange={handleInputTitleChange} value={newTitle}/></div>
        <div>author: <input id="input-author" placeholder='write author here' onChange={handleInputAuthorChange} value={newAuthor}/></div>
        <div>url: <input id="input-url" placeholder='write url here' onChange={handleInputUrlChange} value={newUrl}/></div>
        <div><button id="add-btn" type="submit">add</button></div>
      </form>
    </div>
  )
}
export default NewBlogForm

NewBlogForm.propTypes = {
  CreateBlog: PropTypes.func.isRequired,
  UpdateBlog: PropTypes.func.isRequired,
  blogs: PropTypes.array.isRequired,
}
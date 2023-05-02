import { Form, Button } from 'react-bootstrap'
import { useField } from '../hooks/index'
import PropTypes from 'prop-types'
//import { Button, Form } from 'react-bootstrap'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initializeBlogs } from '../reducers/blogReducer'
//import { setNotification } from '../reducers/notificationReducer'


const NewBlogForm = ({ CreateBlog, UpdateBlog, blogs }) => {
  const { reset: resetTitle, ...title } = useField('text','')
  const { reset: resetAuthor, ...author } = useField('text','')
  const { reset: resetUrl, ...url } = useField('text','')
  const dispatch = useDispatch()
  //const navigate = useNavigate()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  /*const onSubmit = (event) => {
    event.preventDefault()
    try {
      if (blogs.find((blog) => blog.title === title) === undefined) {
        CreateBlog({
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
          UpdateBlog({
            id: findblogforUpdate.id,
            title: findblogforUpdate.title,
            author: event.target.author.value,
            url: event.target.url.value,
          })
          dispatch( setNotification({ content:`the blog ${event.target.title.value} updated`,cssClass:'success' },5))
        }
      }
      handleClear()
      navigate('/')
    } catch (error) {
      console.log(error)
      if (error.response.status === 500) {
        dispatch( setNotification({ content:'Delete failed, Blog not exist',cssClass:'error' },5))
      } else if (error.response.status === 400) {
        dispatch( setNotification({ content: error.response.data.error,cssClass:'error' },5))
      }
    }
  }*/
  const handleClear= () =>
  {
    //initializeBlogs()
    resetTitle()
    resetAuthor()
    resetUrl()
  }

  const FormSubmit = (event) => {
    event.preventDefault()
    console.log('title',title)
    if (blogs.find((blog) => blog.title === title) === undefined) {
      CreateBlog({
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

  return (
    <div className='NewBlogForm'>
      <Form onSubmit={FormSubmit}>
        <Form.Group>
          <Form.Label> title </Form.Label>
          <Form.Control type='text' name='title'/>
          <Form.Label> author </Form.Label>
          <Form.Control type='text' name='author'/>
          <Form.Label> url </Form.Label>
          <Form.Control type='text' name='url'/>
          <Button variant="primary" className={'btn btn-primary btn-sm'} type="submit">
            add blog
          </Button>
        </Form.Group>
      </Form>
      {/*<form onSubmit={FormSubmit}>
        <div>
          title:{' '}
          <input placeholder='write title here' name='title' {...title}/>
        </div>
        <div>
          author:{' '}
          <input placeholder='write author here' name='author' {...author}/>
        </div>
        <div>
          url:{' '}
          <input placeholder='write url here' name='url' {...url}/>
        </div>
        <div>
          <Button type='submit' variant='primary'>add</Button>
        </div>
      </form>*/}
      {/*<Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Label>title:</Form.Label>
          <Form.Control type="text" name="title" />
          <Form.Label>author:</Form.Label>
          <Form.Control type="text" name="author" />
          <Form.Label>url:</Form.Label>
          <Form.Control type="text" name="url" />
          <Button variant="primary" type="submit">
            add
          </Button>
        </Form.Group>
  </Form>*/}
    </div>
  )
}
export default NewBlogForm

NewBlogForm.propTypes = {
  CreateBlog: PropTypes.func.isRequired,
  UpdateBlog: PropTypes.func.isRequired,
  blogs: PropTypes.array.isRequired,
}

import { useField } from '../hooks'
import {useNavigate} from 'react-router-dom'
//import { Form, Button } from 'react-bootstrap'

const CreateNew = (props) => {
  const { reset: resetContent, ...content } = useField("text",'');
  const { reset: resetAuthor, ...author } = useField("text",'');
  const { reset: resetInfo, ...info } = useField("text",'');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
      e.preventDefault()
      props.addNew({
        content: content.value,
        author: author.value,
        info: info.value,
        votes: 0
      })
      props.ShowNotification(content.value)
      navigate('/')
    }
  const handleClear= (e)=>
    {
      e.preventDefault()
      resetContent()
      resetAuthor()
      resetInfo()
    }

    return (
      <div>
        <h2>create a new anecdote</h2>
        {/*<Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>content</Form.Label>
            <Form.Control name="content" {...content}/>
            <Form.Label>author</Form.Label>
            <Form.Control name="author" {...author}/>
            <Form.Label>url for more info</Form.Label>
            <Form.Control name="info" {...info}/>
            <Button variant="primary" type="submit">create</Button>
            <Button onClick={handleClear}>reset</Button>
          </Form.Group>
        </Form>
        */}


        <form onSubmit={handleSubmit}>
          <div>
            content
            <input name='content' {...content}/>
          </div>
          <div>
            author
            <input name='author' {...author} />
          </div>
          <div>
            url for more info
            <input name='info' {...info} />
          </div>
          <button>create</button>
          <button onClick={handleClear}>reset</button>
        </form>
      </div>
    )

  }
  export default CreateNew
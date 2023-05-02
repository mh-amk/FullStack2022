import { useField } from '../hooks/index'
//import { useSelector } from 'react-redux'
import { useDispatch , useSelector } from 'react-redux'
import { BlogLike,createblogComment  } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
//import blogService from '../services/blogs'
//import { /*useQuery,*/ useMutation, useQueryClient } from 'react-query'
import { Button, Form } from 'react-bootstrap'
import {
  Link, useParams,
} from 'react-router-dom'


const BlogDetails = () => {
  /*const createBlogCommentMutation = useMutation(blogService.createBlogComment, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
    }
  })*/
  const dispatch = useDispatch()
  const { id }= useParams()
  const blogs = useSelector(state => state.blogs.find(blog => blog.id===id))
  const { reset: resetContent, ...content } = useField('text','')
  if(!blogs) return null
  //const queryClient = useQueryClient()

  //createBlogComment Use Query
  /*const createBlogCommentUseQuery = (id,blogObject) => {
    console.log('createBlogCommentUseQuery.blogObject',blogObject)
    createBlogCommentMutation.mutate(id, blogObject)
    dispatch( setNotification({ content:`your comment '${blogObject}' added`,cssClass:'success' },5))
  }*/

  const addComment = async (id ,blogCommentObject) => {

    try{
      dispatch(await createblogComment(id,{ content:blogCommentObject }))
      dispatch( setNotification({ content:`your comment '${blogCommentObject}' added`,cssClass:'success' },5))
      handleClear()
    }
    catch (error) {
      if (error.response.status === 500) {
        dispatch( setNotification({ content:'Insert failed, duplicate id',cssClass:'error' },5))
      } else if (error.response.status === 400) {
        dispatch( setNotification({ content: error.response.data.error, cssClass:'error' } ,5))
      }
    }
  }

  const FormSubmit = (event) => {
    event.preventDefault()
    addComment(id, content.value)
  }
  const handleClear= () =>
  {
    resetContent()
  }

  const IncreaseBlogLike = (findblogforIncreaseLike) => {
    try{
      dispatch(BlogLike(findblogforIncreaseLike.id))
      dispatch( setNotification({ content: `blog: ${findblogforIncreaseLike.title} liked`,cssClass:'success' },5))
    }
    catch (error){
      if (error.response.status === 500) {
        dispatch( setNotification({ content: 'Delete failed, Blog not exist',cssClass:'error' },5))
      } else if (error.response.status === 400) {
        dispatch( setNotification({ content: error.response.data.error,cssClass:'error' },5))
      }
    }
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
    }
  }
  return (
    <>
      <h2>{blogs.title}</h2>
      <Link to={`${blogs.url}`}>{blogs.title}</Link>  {`${blogs.likes} likes    `}
      <Button id={`like-btn${blogs.id}`}
        className={'btn btn-secondary btn-sm'} onClick={IncreaseLike}>like</Button>
      <br/>
      added by {blogs.author}
      <h2>comments</h2>
      <div className='NewCommentForm'>
        <Form onSubmit={FormSubmit}>
          <Form.Group>
            <Form.Label> title </Form.Label>
            <Form.Control placeholder='write comment here' name='comment' {...content}/>
            <Button variant="primary" className={'btn btn-primary btn-sm'} type="submit">
                add comment
            </Button>
          </Form.Group>
        </Form>
        {blogs.comments.length>0?
          <ul className={'list-group list-group-flush'}>
            {blogs.comments.map( comment =>
              <li className={'list-group-item'} key={comment.id}>{comment.content}</li>
            )}
          </ul>
          :<div>no comments</div>
        }
      </div>
    </>
  )
}
export default BlogDetails

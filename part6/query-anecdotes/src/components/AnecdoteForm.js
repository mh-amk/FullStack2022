import { useMutation, useQueryClient } from 'react-query'
import { createAnecdote } from '../requests'
import { UseNotificationDispatch }  from '../NotificationContext'
const AnecdoteForm = () => {

  const dispatch = UseNotificationDispatch()

  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueriesData('anecdotes',anecdotes.concat(newAnecdote))
    },
    onError: () => {
      //dispatch({type:'ERROR'})
      setNotification({type:'ERROR'},5)
    }
  })
  const setNotification = (action, timevalue) => {
    dispatch(action)
    setTimeout(() => {
      dispatch({type:'CLEAR'})
    }, timevalue*1000);
  }

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({content,votes:0})
    setNotification({type:'CREATE',payload: content},5)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm

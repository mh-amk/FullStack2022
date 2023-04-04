import { useContext } from 'react'
import {useQueryClient,useMutation } from 'react-query'
import { updateAnecdote } from '../requests'
import NotificationContext from '../NotificationContext'



const Button = ({ action, label,anecdote }) => {
  const dispatch = UseNotificationDispatch()

  const queryClient = useQueryClient()
    const updateAnecdoteMutation = useMutation(updateAnecdote, {
        onSuccess: () => {
          queryClient.invalidateQueries('anecdotes')
        }
      })

const handleClick = (action) =>
{
  updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes+1})
  dispatch(action)
}
    return (
      <button onClick={() => handleClick(action)}>
        {label}
      </button>
    )
  }

  export default Button
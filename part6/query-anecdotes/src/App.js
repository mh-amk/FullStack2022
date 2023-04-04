import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import { UseNotificationDispatch }  from './NotificationContext'
//import { useContext } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {

  const dispatch = UseNotificationDispatch()
  const queryClient = useQueryClient()
  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
      }
    })

  const handleVote = (action, anecdote) => {
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes+1})
    //dispatch(action)
    setNotification(action,5)
  }

  const setNotification = (action, timevalue) => {
    dispatch(action)
    setTimeout(() => {
      dispatch({type:'CLEAR'})
    }, timevalue*1000);
  }

  const result = useQuery('anecdotes',getAnecdotes, {retry: 1,refetchOnWindowFocus:false})
  const anecdotes = result.data

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }


  return (


    <div>
      <h3>Anecdote app</h3>
      <Notification/>
      <AnecdoteForm />
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote({type:'VOTE',payload:anecdote.content} ,anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>

  )
}

export default App

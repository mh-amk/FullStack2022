import {useDispatch , useSelector } from "react-redux"
import {UpdateAnecdoteVote} from '../reducers/anecdoteReducer'
import {setNotification } from "../reducers/notificationReducer"

const AnecdoteList = () =>
{
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => {
         return state.anecdotes
                     .filter(anecdote => anecdote.content.includes(state.filter))
    })

    const vote = anecdote => {
      dispatch( UpdateAnecdoteVote(anecdote.id))
      dispatch( setNotification(anecdote.content,5))
    }

    return (
        <div>
            { anecdotes.map(anecdote =>
              <div key={anecdote.id}>
                <div> {anecdote.content} </div>
              <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )
        }
        </div>
    )




}
export default AnecdoteList
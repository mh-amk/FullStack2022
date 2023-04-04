import { useDispatch } from "react-redux"
import { createAnecdote } from '../reducers/anecdoteReducer'
//import AnecdotesService from '../services/anecdotes'
const AnecdoteForm = () =>
{
    const dispatch = useDispatch()
    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.newAnecdote.value
        event.target.newAnecdote.value = ''
        //const SavedContent= await AnecdotesService.CreateNew(content)
        dispatch(createAnecdote(content))
      }

    return (
       <div>
          <h2>create new</h2>
          <form onSubmit = {addAnecdote}>
            <div><input name="newAnecdote" /></div>
            <button type="submit">create</button>
          </form>
       </div>
    )

}
export default AnecdoteForm
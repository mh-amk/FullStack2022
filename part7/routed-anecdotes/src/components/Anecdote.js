import {
  Link,
} from 'react-router-dom'
const Anecdote =({anecdote}) =>{

    return (
      <div>
        <h1>{anecdote.content}</h1>
        <div>has {anecdote.votes} votes</div>
        <div>for more info see <Link to={anecdote.info}>{anecdote.info}</Link></div>
      </div>
    )
}
export default Anecdote
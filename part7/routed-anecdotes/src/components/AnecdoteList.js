//import { Table } from 'react-bootstrap'
import {
  Link,
} from 'react-router-dom'
const AnecdoteList = ({ anecdotes }) => (
    <div>
      <h2>Anecdotes</h2>
      {/*<Table striped>
        <tbody>
          {anecdotes.map(anecdote =>
          <tr key={anecdote.id} >
            <td>
              <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
            </td>
            <td>
              {anecdote.author}
            </td>
          </tr>)}
        </tbody>
      </Table>
      */}


      <ul>
        {anecdotes.map(anecdote =>
        <li key={anecdote.id} >
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>
        )}
      </ul>
    </div>
  )
export default AnecdoteList
import About from './components/About'
import Anecdote from './components/Anecdote'
import AnecdoteList from './components/AnecdoteList'
import Footer from './components/Footer'
import Menu from './components/Menu'
import CreateNew from './components/CreateNew'

import { useState } from 'react'
import {
  Routes,
  Route,
  useMatch,
} from 'react-router-dom'

import { Alert } from 'react-bootstrap'


const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')
  const ShowNotification =notification =>
  {
    setNotification(`a new anecdote ${notification} created!`)
    setTimeout(()=>{setNotification('')},5000)
  }
  const match = useMatch('/anecdotes/:id')
  const anecdote = match
    ? anecdotes.find(anecdote => anecdote.id === Number(match.params.id))
    : null


  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))

  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
  setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div className='container'>
        <h1>Software anecdotes</h1>
        <Menu />
        {notification}
        {(notification &&
            <Alert variant="success"> {notification} </Alert>
        )}
        <Routes>
          <Route path="/" element={<AnecdoteList anecdotes={anecdotes}/>}/>
          <Route path="/Anecdotes" element={<AnecdoteList anecdotes={anecdotes}/>}/>
          <Route path="/Anecdotes/:id" element={<Anecdote anecdote={anecdote}/>}/>
          <Route path="/Create" element={<CreateNew addNew={addNew} ShowNotification={ShowNotification}/>}/>
          <Route path="/About" element={<About/>}/>
        </Routes>
      <br/>
      <Footer />
    </div>
  )
}

export default App

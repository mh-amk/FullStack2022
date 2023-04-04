import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => Number((Math.random() * 1000000).toFixed(0))

export const getAnecdotes = () =>
  axios.get(baseUrl).then(res => res.data)

export const createAnecdote = async newAnecdote => {
  const asObject= { ...newAnecdote, id:getId(), votes: 0 }
  return axios.post(baseUrl, asObject).then(res => res.data)
}

export const updateAnecdote = async updatedAnecdote => {
  return axios.put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote).then(res => res.data)
}

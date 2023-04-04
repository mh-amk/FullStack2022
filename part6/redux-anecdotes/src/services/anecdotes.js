import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}
const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes:0
  }
}

const CreateNew = async (content) => {
    const object = asObject(content)
    const response = await axios.post(baseUrl,object)
    return response.data
}

const UpdateVote = async (id) => {
  const anecdote =  (await axios.get(`${baseUrl}/${id}`)).data
  const  anecdoteVoted={...anecdote, votes: anecdote.votes+1}
  const response = await axios.put(`${baseUrl}/${anecdoteVoted.id}`, anecdoteVoted)
  return response.data
}

export default { getAll, CreateNew, UpdateVote}


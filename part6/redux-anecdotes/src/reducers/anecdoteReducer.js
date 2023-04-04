import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    VoteAnecdote (state, action) {
      const changedAnecdote = action.payload
      return state.map(anecdote => anecdote.id !== changedAnecdote.id? anecdote: changedAnecdote)
                    .sort((a,b) => a.votes<b.votes?1:-1)
    },
    appendAnecdote (state,action) {
      state.push(action.payload)
    },
    SetAnecdotes (state, action) {
      const anecdotes = action.payload
      return anecdotes.sort((a,b) => a.votes<b.votes?1:-1)
    }
  },
})

export const { VoteAnecdote, appendAnecdote, SetAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(SetAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const anecdote = await anecdoteService.CreateNew(content)
    dispatch(appendAnecdote(anecdote))
  }
}

export const UpdateAnecdoteVote = id => {
  return async dispatch => {
    const anecdote = await anecdoteService.UpdateVote(id)
    dispatch(VoteAnecdote(anecdote))
  }
}
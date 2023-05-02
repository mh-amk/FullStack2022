import { createSlice } from '@reduxjs/toolkit'
import usersService from '../services/users'


const UsersSlice= createSlice({
  name:'Users',
  initialState:[],
  reducers:{
    usersList (state, action) {
      return action.payload
    },
  }
})

export const { usersList } = UsersSlice.actions
export default UsersSlice.reducer

export const getUserList = () => {
  return async dispatch => {
    const user = await usersService.getAll()
    dispatch(usersList(user))
  }
}
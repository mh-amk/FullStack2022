import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import loginService from '../services/login'


const userSlice= createSlice({
  name:'userInformation',
  initialState:[],
  reducers:{
    userInfo (state, action) {
      const changedUser = action.payload
      return changedUser
    },
    UserInfoSave (state,action){
      console.log('payload',action.payload)
      return action.payload
    },
  }
})

export const { UserInfoSave,userInfo } = userSlice.actions
export default userSlice.reducer

export const setUserInformation = (userContent) => {
  return async dispatch => {
    const user = await loginService.login(userContent)
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    blogService.setToken(user.token)
    dispatch(userInfo(user))
  }
}
export const userLogout =() => {
  return async dispatch => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(userInfo([]))
  }
}
export const InitalUserInformation=() => {
  return async dispatch =>
  {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch(userInfo(user))
    }}
}

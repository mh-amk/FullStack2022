import { createSlice } from '@reduxjs/toolkit'

const notificationSlice= createSlice({
  name:'notification',
  initialState:{ content:'',className:'success' },
  reducers:{
    NotificationSaveMessage (state,action){
      return action.payload
    },
    NotificationDeleteMessage (){
      return ''
    }
  }
})

export const { NotificationSaveMessage,NotificationDeleteMessage } = notificationSlice.actions
export default notificationSlice.reducer

export const initializeNotification = () => {
  return async dispatch => {
    dispatch(NotificationDeleteMessage())
  }
}
export const setNotification = (notificationContent,timevalue) => {
  return dispatch => {
    dispatch(NotificationSaveMessage(notificationContent))
    setTimeout(() => {
      dispatch(NotificationDeleteMessage())
    }, timevalue*1000)
  }
}
import { createSlice } from "@reduxjs/toolkit"

const initialState=''

const notificationSlice= createSlice({
    name:'notification',
    initialState,
    reducers:{
        NotificationSaveMessage (state,action){
            return action.payload
        },
        NotificationDeleteMessage (){
            return ''
        }
    }
})

export const {NotificationSaveMessage,NotificationDeleteMessage} = notificationSlice.actions
export default notificationSlice.reducer

export const setNotification = (notificationContent,timevalue) => {
    return dispatch => {
        dispatch(NotificationSaveMessage(`you voted '${notificationContent}'`))
        setTimeout(() => {
            dispatch(NotificationDeleteMessage())
        }, timevalue*1000);
    }
}
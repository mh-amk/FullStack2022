import { createContext, useReducer, useContext } from 'react'

//Notification Reducer
import notificationReducer , { NotificationSaveMessage } from '../reducers/notificationReducer'

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  try{
    const [notification, notificationDispatch] = useReducer(notificationReducer, '')
    return (
      <NotificationContext.Provider value={[notification, notificationDispatch] }>
        {props.children}
      </NotificationContext.Provider>
    )
  }catch(error){
    console.log('error',error)
  }
}

export default NotificationContext

export const UseNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}

export const UseNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}
export const useNotify = (notificationContent,timevalue) => {
  //const notificationAndDispatch = useContext(NotificationContext)
  //const dispatch = notificationAndDispatch[1]
  /*return (action) => {
    dispatch(action)
  }*/
  return dispatch => {
    dispatch(NotificationSaveMessage(`${notificationContent}`))
    setTimeout(() => {
      dispatch(NotificationSaveMessage(''))
    }, timevalue*1000)
  }
}


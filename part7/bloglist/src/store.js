import { configureStore } from '@reduxjs/toolkit'

import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import notificationReducer from './reducers/notificationReducer'
import usersReducer from './reducers/usersReducer'

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    user: userReducer,
    notification: notificationReducer,
    users: usersReducer
  }
})
store.subscribe(() => console.log('GetState',store.getState()))

export default store
import React from 'react'
import ReactDOM from 'react-dom/client'
//import { combineReducers } from 'redux'

import { Provider } from 'react-redux'
import App from './App'
import  store from './store.js'



/*const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  filter: anecdoteFilterReducer
})*/



ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App/>
  </Provider>
)
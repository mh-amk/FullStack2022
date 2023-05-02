import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
//Navigation
import {
  BrowserRouter as Router,
} from 'react-router-dom'

//React Redux
import { Provider } from 'react-redux'
import  store from './store.js'

//React Query
import { QueryClient, QueryClientProvider } from 'react-query'
import { NotificationContextProvider } from './Contexts/NotificationContext'
const queryClient = new QueryClient()


ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <QueryClientProvider client={queryClient}>
      <NotificationContextProvider>
        <Provider store={store}>
          <App/>
        </Provider>
      </NotificationContextProvider>
    </QueryClientProvider>
  </Router>
)

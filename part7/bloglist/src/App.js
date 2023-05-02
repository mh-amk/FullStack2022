import { Routes, Route, useMatch } from 'react-router-dom'
import { useDispatch , useSelector } from 'react-redux'
import { useEffect } from 'react'
import Notification from './components/Notification'
import Menu from './components/Menu'
import Users from './components/Users'
import User from './components/User'
import { initializeBlogs } from './reducers/blogReducer'
//import { createblogComment } from './reducers/blogReducer'
import { InitalUserInformation } from './reducers/userReducer'
import { initializeNotification } from './reducers/notificationReducer'
import { getUserList } from './reducers/usersReducer'
import BlogDetails from './components/BlogDetails'
import Blogs from './components/Blogs'
import './App.css'
import { /*Alert,*/ Container, /*Table, TableBody, TableCell, TableContainer, TableRow, Paper,
        TextField, Button,
AppBar, Toolbar, IconButton*/ } from '@mui/material'
import { /*Alert, Button, Form, Table, Navbar, Nav*/ } from 'react-bootstrap'

const App = () => {
  const dispatch = useDispatch()
  const match = useMatch('/users/:id')
  const BlogMatch = useMatch('/blogs/:id')
  const User_Information = useSelector(state => {return state.user})
  const users = useSelector(state => { return state.users })

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(InitalUserInformation())
    dispatch(getUserList())
    dispatch(initializeNotification())
  }, [dispatch])
  return (
    <Container>
      <div>
        <Menu User_Information={User_Information}/>
        <h1>Blogs</h1>
        <Notification/>
        <Routes>
          <Route path="/" element={<Blogs/>}/>
          <Route path="/users" element={<Users users={users}/>}/>
          {match?<Route path="/users/:id" element={<User userid={match.params.id}/>}/>:null}
          <Route path="/blogs" element={<Blogs/>}/>
          {BlogMatch?<Route path="/blogs/:id" element={<BlogDetails/>}/>:null}
          {/*BlogMatch?<Route path="/blogs/:id/comments" element={<BlogDetails/>}/>:null*/}
        </Routes>
      </div>
    </Container>
  )
}

export default App

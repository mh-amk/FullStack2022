//import { useEffect } from 'react'
import { useSelector } from 'react-redux'
//import blogService from '../services/blogs'
import {
  Link, useParams,
} from 'react-router-dom'


const User = () => {
  const { id }= useParams()
  const user = useSelector(state => state.users.find(user => user.id===id))

  return (
    <>
      <h2>{user.name} added blogs</h2>
      <ul className={'list-group list-group-flush'}>
        {user.blogs.map(blog =>
          <li className={'list-group-item'} key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        )}
      </ul>
    </>
  )
}
export default User

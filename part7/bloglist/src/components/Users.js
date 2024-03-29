//import { useParams } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import { TableBody,TableHead, TableCell, TableContainer, TableRow } from '@mui/material'

import {
  Link,
} from 'react-router-dom'

const Users = ({ users }) => {
  return (
    <>
      <h2>Users</h2>
      <TableContainer component={'Paper'}>
        <Table>
          <TableBody>
            <TableHead>
              <TableRow><TableCell></TableCell><TableCell>blogs created</TableCell></TableRow>
            </TableHead>
            <TableBody>
              {users.map(user =>
                <TableRow key={user.id}>
                  <TableCell>
                    <Link to={`/users/${user.id}`}>{user.name}</Link>
                  </TableCell>
                  <TableCell>
                    {user.blogs.length}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
export default Users

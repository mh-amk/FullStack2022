import { Navbar, Nav, Button } from 'react-bootstrap'
import Togglable from '../components/Togglable'
import LoginForm from '../components/LoginForm'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUserInformation, userLogout } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'
import {
  Link
} from 'react-router-dom'

const Menu = () => {
  const dispatch = useDispatch()
  const loginFormRef = useRef()
  const User_Information = useSelector(state => {return state.user})
  const padding = {
    paddingRight: 5
  }
  const loginForm = () => (

    <Togglable buttonLabel='Login (Redux)' buttonId='LoginForm-btn' ref={loginFormRef}>
      <LoginForm UserLogin={handleLogin} />
    </Togglable>

  )
  const handleLogin = async (userObject) => {
    try {
      loginFormRef.current.toggleVisibility()
      dispatch(userLogout())
      dispatch(setUserInformation(userObject))
      dispatch( setNotification({ content: `${userObject.username} logged-in`,cssClass:'success' },5))
    } catch (exception) {
      dispatch( setNotification({ content: 'Wrong credentials',cssClass:'success' },5))
    }
  }
  function Logout() {
    dispatch(userLogout())
  }
  return (
    <>
      <div>
        {<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#" as="span">
                <Link style={padding} to="/blogs">blogs</Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                <Link style={padding} to="/users">users</Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                {User_Information.length === 0 ? (
                  loginForm()
                ) : (
                  <>
                    {`${User_Information.name} logged-in `}
                    <Button color="inherit" className='btn btn-primary btn-sm' onClick={() => Logout()}>
                      Logout d
                    </Button>
                  </>
                )}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        }
      </div>

      {/*<div className='nav'>
        <Link style={padding} to="/blogs">blogs</Link>
        <Link style={padding} to="/users">users</Link>
        {User_Information.length === 0 ? (
          loginForm()
        ) : (
          <>
            {User_Information.name} logged-in {' '}
            <button onClick={() => Logout()}>Logout</button>
          </>
        )}
        </div>*/}
    </>
  )
}
export default Menu
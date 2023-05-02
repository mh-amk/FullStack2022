//import { Navbar, Nav } from 'react-bootstrap'
import {
    Link,
  } from 'react-router-dom'
const Menu = () => {
    const padding = {
      paddingRight: 5
    }
    return (
      <>
      <div>
        {/*<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#" as="span">
                <Link style={padding} to="/">home</Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                <Link style={padding} to="/Anecdotes">Anecdotes</Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                <Link style={padding} to="/Create">Create</Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                <Link style={padding} to="/About">About</Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      */}
      </div>

      <div className='nav'>
        <Link style={padding} to="/">home</Link>
        <Link style={padding} to="/Anecdotes">anecdotes</Link>
        <Link style={padding} to="/Create">create new</Link>
        <Link style={padding} to="/About">about</Link>
      </div>
      </>
    )
  }
  export default Menu
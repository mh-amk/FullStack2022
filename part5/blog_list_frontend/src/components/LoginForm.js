import { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ UserLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const handleUsernameChange = (event) =>
  {
    setUsername(event.target.value)
  }
  const handlePasswordChange = (event) =>
  {
    setPassword(event.target.value)
  }
  const handleLogin = (event) =>
  {
    event.preventDefault()
    UserLogin({
      username: username,
      password: password, })
    setUsername('')
    setPassword('')

  }


  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <div>
      username
        <input id="username" type="text" value={username} name="Username"
          onChange={handleUsernameChange} />
      </div>
      <div>
      password
        <input id="password" type="password" value={password} name="Password"
          onChange={handlePasswordChange} />
      </div>
      <button id="login-btn" type="submit">login</button>
    </form>
  )
}

export default LoginForm

LoginForm.propTypes = {
  UserLogin: PropTypes.func.isRequired
}
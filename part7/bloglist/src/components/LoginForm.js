import { useField } from '../hooks/index'
import PropTypes from 'prop-types'

const LoginForm = ({ UserLogin }) => {
  const { reset: resetUserName, ...username } = useField('text','')
  const { reset: resetPassword, ...password } = useField('password','')
  const handleClear= () =>
  {
    resetUserName()
    resetPassword()
  }
  const handleLogin = (event) => {
    event.preventDefault()
    UserLogin({
      username: username.value,
      password: password.value,
    })
    handleClear()
  }

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <div>
        username:
        <input placeholder='write username here' name='Username' {...username}/>
      </div>
      <div>
        password:
        <input placeholder='write password here' name='Password' {...password}/>
      </div>
      <button id='login-btn' type='submit'>
        login
      </button>
    </form>
  )
}

export default LoginForm

LoginForm.propTypes = {
  UserLogin: PropTypes.func.isRequired,
}

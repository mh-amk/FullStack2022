import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button type='button' className={'btn btn-primary btn-sm'} id={props.buttonId} onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible} className='togglableContent'>
        {props.children}
        <Button type='button' className={'btn btn-secondary btn-sm'} onClick={toggleVisibility}>cancel</Button>
      </div>
    </div>
  )
})
Togglable.displayName = 'Togglable'

export default Togglable

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  buttonId: PropTypes.string.isRequired,
}

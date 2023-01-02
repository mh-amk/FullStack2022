import PropTypes from 'prop-types'

const Notification = ({ notificationMessage, cssClass }) => {
  if (notificationMessage === null) {
    return null
  }

  return (
    <div className={cssClass}>
      {notificationMessage}
    </div>
  )
}
export default Notification


Notification.propTypes = {
  cssClass: PropTypes.string.isRequired,
  notificationMessage: PropTypes.string
}

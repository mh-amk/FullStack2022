import { UseNotificationValue } from '../NotificationContext'

const Notification = () => {

  const notification = UseNotificationValue()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  return (
    <div style={style}>
       <div>{notification}</div>
    </div>
  )
}

export default Notification

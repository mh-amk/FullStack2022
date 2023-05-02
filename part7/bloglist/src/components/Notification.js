import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'


const Notification = () => {
  const notification = useSelector(state => state.notification )
  if (!notification) return null

  return <div className={notification.cssClass}>
    {(notification &&
            <Alert variant="success"> {notification.content} </Alert>
    )}
  </div>
}
export default Notification

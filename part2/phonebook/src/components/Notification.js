const Notification = ({ notificationMessage,cssClass }) => {
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
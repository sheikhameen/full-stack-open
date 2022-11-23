import { useEffect, useState } from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const notification = props.notification
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (notification) {
      setShow(true)
    } else {
      setShow(false)
    }
  }, [notification])

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return show ? (
    <div style={style}>
      {notification}
    </div>
  ) : null
}

const mapStateToProps = state => {
  return {
    notification: state.notification
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)

export default ConnectedNotification
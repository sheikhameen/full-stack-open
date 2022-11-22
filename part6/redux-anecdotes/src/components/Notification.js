import { useEffect, useState } from 'react'
// import { useSelector, useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
// import { removeNotification } from '../reducers/notificationReducer'

const Notification = () => {
  // const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (notification) {
      setShow(true)
    } else {
      setShow(false)
    }
  }, [notification])
  // useEffect(() => {
  //   if (!notification) return

  //   setShow(true)
  //   console.log('NEW TIMEOUT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
  //   const timeout = setTimeout(() => {
  //     setShow(false);
  //     dispatch(removeNotification())
  //   }, 5000)

  //   return () => {
  //     console.log('CLEARING TIMEOUT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
  //     clearTimeout(timeout)
  //   }
  // }, [notification, dispatch])

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  // return (
  //   <div style={style}>
  //     {notification}
  //   </div>
  // )

  return show ? (
    <div style={style}>
      {notification}
    </div>
  ) : null
}



export default Notification
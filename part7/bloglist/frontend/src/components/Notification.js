import React from "react"
import { useSelector } from "react-redux"

// MAKE SURE THE BOXY BOX SHADOW DOESN'T HAVE ALPHA, TO GO BETTER WITH BOTH DARK/LIGHT THEMES.

import styled from "styled-components"

const NotificationCard = styled.div`
  border-radius: 5px;
  padding: 12px 24px;
  color: #fff ;

  position: fixed;
  top: 24px;
  right: 24px;
`

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  // Null check
  if (notification === null) {
    return null
  }

  // Set colors
  let color = null
  let backgroundColor = null
  if (notification.type === "success") {
    // backgroundColor = "rgba(50,100,50,0.2)"
    backgroundColor = "limegreen"
  }
  if (notification.type === "error") {
    // color = "red"
    // backgroundColor = "rgba(100,50,50,0.2)"
    backgroundColor = "palevioletred"
  }

  let styles = {
    color,
    backgroundColor,
    // border: `3px solid ${color}`,
  }

  return (
    <NotificationCard className={notification.type} style={styles}>
      {notification.text}
    </NotificationCard>
  )
}

export default Notification

import React from "react"
import { useSelector } from "react-redux"

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
    color = "green"
    backgroundColor = "rgba(50,100,50,0.2)"
  }
  if (notification.type === "error") {
    color = "red"
    backgroundColor = "rgba(100,50,50,0.2)"
  }

  let styles = {
    color,
    backgroundColor,
    border: `3px solid ${color}`,
    borderRadius: "5px",
    padding: "10px",
    fontSize: "20px",
    marginBottom: "10px",
  }

  return (
    <div className={notification.type} style={styles}>
      {notification.text}
    </div>
  )
}

export default Notification

import React from 'react'
const Notification = ({ message }) => {
  // Null check
  if (message === null) {
    return null
  }

  // Set colors
  let color = null
  let backgroundColor = null
  if (message.type === 'success') {
    color = 'green'
    backgroundColor = 'rgba(50,100,50,0.2)'
  }
  if (message.type === 'error') {
    color = 'red'
    backgroundColor = 'rgba(100,50,50,0.2)'
  }

  let styles = {
    color,
    backgroundColor,
    border: `3px solid ${color}`,
    borderRadius: '5px',
    padding: '10px',
    fontSize: '20px',
    marginBottom: '10px'
  }

  return (
    <div className={message.type} style={styles}>
      {message.text}
    </div>
  )
}

export default Notification
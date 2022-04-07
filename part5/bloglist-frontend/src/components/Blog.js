import { useState } from 'react'
const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false)
  const showWhenDetailed = { display: showDetails ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleShowDetails = () => {
    setShowDetails(!showDetails)
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleShowDetails}>{showDetails? 'hide' : 'view'}</button>
      </div>
      <div style={showWhenDetailed}>
        {blog.url}<br />
        likes {blog.likes} <button>like</button><br />
        {blog.user.name}<br />
      </div>
    </div>
  )
}

export default Blog
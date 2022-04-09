import { useState } from 'react'

const Blog = ({ blog, likeBlog, deleteBlog, currentUser }) => {
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
        <button onClick={toggleShowDetails}>{showDetails ? 'hide' : 'view'}</button>
      </div>
      <div style={showWhenDetailed}>
        {blog.url}<br />
        likes {blog.likes} <button onClick={() => likeBlog(blog)}>like</button><br />
        {blog.user.name}<br />
        {
          (currentUser.username === blog.user.username)
            ? <button onClick={() => deleteBlog(blog)}>remove</button>
            : null
        }
      </div>
    </div>
  )
}

export default Blog
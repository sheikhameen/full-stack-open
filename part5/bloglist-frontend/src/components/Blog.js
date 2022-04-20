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
    <div className='blog' style={blogStyle}>
      <div>
        <span className='title'>{blog.title}</span> <span className='author'>{blog.author}</span>
        <button onClick={toggleShowDetails}>{showDetails ? 'hide' : 'view'}</button>
      </div>
      <div className='details' style={showWhenDetailed}>
        {blog.url}
        <br />
        likes <span className='likeCount'>{blog.likes}</span> <button id='like-button' onClick={() => likeBlog(blog)}>like</button>
        <br />
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
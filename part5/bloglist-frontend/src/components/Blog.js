import { useState } from 'react'

import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs }) => {
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

  const likeBlog = async () => {
    const likedBlog = await blogService.update(blog.id, { ...blog, likes: ++blog.likes, user: blog.user.id })
    setBlogs(blogs.map(blog => blog.id === likedBlog.id
      ? likedBlog
      : blog
    ))
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleShowDetails}>{showDetails ? 'hide' : 'view'}</button>
      </div>
      <div style={showWhenDetailed}>
        {blog.url}<br />
        likes {blog.likes} <button onClick={likeBlog}>like</button><br />
        {blog.user.name}<br />
      </div>
    </div>
  )
}

export default Blog
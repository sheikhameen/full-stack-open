import { useState } from "react"
import { useDispatch } from "react-redux"
import { likeBlog, deleteBlog } from "../reducers/blogReducer"

const Blog = ({ blog, currentUser }) => {
  const dispatch = useDispatch()

  const [showDetails, setShowDetails] = useState(false)
  const styleShowWhenDetailed = { display: showDetails ? "" : "none" }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleLike = () => {
    dispatch(likeBlog(blog.id))
  }

  const handleDelete = () => {
    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) return
    dispatch(deleteBlog(blog.id))
  }

  const toggleShowDetails = () => {
    setShowDetails(!showDetails)
  }

  return (
    <div className="blog" style={blogStyle}>
      <div>
        <span className="title">{blog.title}</span>{" "}
        <span className="author">{blog.author}</span>
        <button onClick={toggleShowDetails}>
          {showDetails ? "hide" : "view"}
        </button>
      </div>
      <div className="details" style={styleShowWhenDetailed}>
        {blog.url}
        <br />
        likes <span className="likeCount">{blog.likes}</span>{" "}
        <button id="like-button" onClick={handleLike}>
          like
        </button>
        <br />
        {blog.user.name}
        <br />
        {currentUser.username === blog.user.username ? (
          <button onClick={handleDelete}>remove</button>
        ) : null}
      </div>
    </div>
  )
}

export default Blog

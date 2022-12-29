import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { likeBlog, commentBlog } from "../reducers/blogReducer"
import { useDispatch } from "react-redux"
import { useState } from "react"
// import blogService from "../services/blog"

const BlogView = () => {
  const dispatch = useDispatch()
  const [comment, setComment] = useState("")

  const id = useParams().id
  const blog = useSelector((state) => state.blogs.find((b) => b.id === id))

  if (!blog) return null

  const handleLike = () => {
    dispatch(likeBlog(blog.id))
  }

  const handleComment = async (event) => {
    event.preventDefault()
    dispatch(commentBlog(blog.id, comment))
    setComment("")
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        {blog.likes} likes{" "}
        <button id="like-button" onClick={handleLike}>
          like
        </button>
      </div>
      <div>added by {blog.user.username}</div>

      <h3>Comments</h3>
      <form onSubmit={handleComment}>
        <input
          name="comment"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <button>Add comment</button>
      </form>
      <ul>
        {blog.comments.map((c) => (
          <li key={c.id}>{c.content}</li>
        ))}
      </ul>
    </div>
  )
}

export default BlogView

import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { likeBlog } from "../reducers/blogReducer"
import { useDispatch } from "react-redux"

const BlogView = () => {
  const dispatch = useDispatch()
  const id = useParams().id
  const blog = useSelector((state) => state.blogs.find((b) => b.id === id))

  if (!blog) return null

  const handleLike = () => {
    dispatch(likeBlog(blog.id))
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
    </div>
  )
}

export default BlogView

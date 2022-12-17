import { useSelector } from "react-redux"

import Togglable from "./Togglable"
import BlogForm from "./BlogForm"
import Blog from "./Blog"

const BlogList = ({ createBlog, blogFormRef }) => {
  const blogs = [...useSelector((state) => state.blogs)].sort(
    (a, b) => b.likes - a.likes
  )

  return (
    <div>
      <div>
        <h2>Create new</h2>
        <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
          <BlogForm createBlog={createBlog} />
        </Togglable>
      </div>
      <br />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default BlogList

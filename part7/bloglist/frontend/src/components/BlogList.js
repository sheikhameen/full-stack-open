import { useSelector } from "react-redux"

import Togglable from "./Togglable"
import BlogForm from "./BlogForm"
import Blog from "./Blog"
import styled from "styled-components"

const Page = styled.div`
  padding: 18px 32px;
`

const BlogList = ({ createBlog, blogFormRef }) => {
  const blogs = [...useSelector((state) => state.blogs)].sort(
    (a, b) => b.likes - a.likes
  )

  return (
    <Page>
      {/* <div> */}
      {/* <h2>Create new</h2> */}
      <Togglable
        header="Create new blog"
        buttonLabel="Create new blog"
        ref={blogFormRef}
      >
        <BlogForm createBlog={createBlog} />
      </Togglable>
      {/* </div> */}
      {/* <br /> */}
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </Page>
  )
}

export default BlogList

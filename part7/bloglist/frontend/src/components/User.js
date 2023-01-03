import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import Blog from "./Blog"
import styled from "styled-components"

const Page = styled.div`
  padding: 18px 32px;

  h2 {
    font-size: 20px;
    padding-top: 18px;
    color: #999;
  }
`

const Name = styled.h1`
  font-size: 72px;
  color: #111;
`

const BlogList = styled.ul`
  list-style-type: none;

  li {
    padding: 2px 0;
    border-bottom: 1px solid #ddd;
  }
`

const User = () => {
  const id = useParams().id
  const user = useSelector((state) => state.users.find((u) => u.id === id))

  if (!user) return null

  return (
    <Page>
      <Name>{user.name}</Name>
      <hr />
      <h2>Added blogs</h2>
      <BlogList>
        {user.blogs.map((blog) => (
          // <li key={blog.id}>{blog.title}</li>
          <Blog key={blog.id} blog={blog} />
        ))}
      </BlogList>
    </Page>
  )
}

export default User

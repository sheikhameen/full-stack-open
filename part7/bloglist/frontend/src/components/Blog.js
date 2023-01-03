import { Link } from "react-router-dom"
import styled from "styled-components"

const BlogLink = styled(Link)`
  padding: 8px 0;
  display: block;
  color: #111;
  font-size: 24px;

  :hover {
    background-color: #eee;
  }
`

const Blog = ({ blog }) => {
  return (
    <BlogLink to={`/blogs/${blog.id}`}>
      <span className="title">{blog.title}</span>{" "}
      <span className="author">by {blog.author}</span>
    </BlogLink>
  )
}

export default Blog

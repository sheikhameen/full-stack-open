import { Link } from "react-router-dom"

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div className="blog" style={blogStyle}>
      <Link to={`/blogs/${blog.id}`}>
        <span className="title">{blog.title}</span>{" "}
        <span className="author">{blog.author}</span>
      </Link>
    </div>
  )
}

export default Blog

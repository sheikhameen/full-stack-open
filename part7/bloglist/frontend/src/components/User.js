import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"

const User = () => {
  const id = useParams().id
  const user = useSelector((state) => state.users.find((u) => u.id === id))

  if (!user) return null

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User

import { useState, useEffect, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"

import Blog from "./components/Blog"
import Notification from "./components/Notification"
import Togglable from "./components/Togglable"
import BlogForm from "./components/BlogForm"

import { initializeBlogs, createBlog } from "./reducers/blogReducer"
import {
  logUserFromLocalStorage,
  loginUser,
  logoutUser,
} from "./reducers/userReducer"

const App = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)
  const blogs = [...useSelector((state) => state.blogs)].sort(
    (a, b) => b.likes - a.likes
  )

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(logUserFromLocalStorage())
    dispatch(initializeBlogs())
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(loginUser(username, password))
    setUsername("")
    setPassword("")
  }

  const handleLogout = () => {
    dispatch(logoutUser())
    setUsername("")
    setPassword("")
  }

  const handleCreateBlog = (blog) => {
    dispatch(createBlog(blog))
    blogFormRef.current.toggleVisibility() // close form after create
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <form onSubmit={handleLogin}>
          <div>
            Username:
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            Password:
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <input type="submit" value="Login" />
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification />
      <div>
        {user.name} logged in
        <button onClick={handleLogout}>Logout</button>
      </div>
      <br />
      <div>
        <h2>Create new</h2>
        <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
          <BlogForm createBlog={handleCreateBlog} />
        </Togglable>
      </div>
      <br />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} currentUser={user} />
      ))}
    </div>
  )
}

export default App

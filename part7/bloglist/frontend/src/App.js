import { useEffect, useRef } from "react"
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
import LoginForm from "./components/LoginForm"

const App = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)
  const blogs = [...useSelector((state) => state.blogs)].sort(
    (a, b) => b.likes - a.likes
  )

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(logUserFromLocalStorage())
    dispatch(initializeBlogs())
  }, [])

  const handleLogin = (username, password) => {
    dispatch(loginUser(username, password))
  }

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  const handleCreateBlog = (blog) => {
    dispatch(createBlog(blog))
    blogFormRef.current.toggleVisibility() // close form after create
  }

  // Login form if no user
  if (user === null) {
    return (
      <>
        <Notification />
        <LoginForm onLogin={handleLogin} />
      </>
    )
  }

  // Blogs if user exists
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

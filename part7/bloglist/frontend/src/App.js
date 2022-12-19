import { useEffect, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Routes, Route, Link } from "react-router-dom"

import BlogList from "./components/BlogList"
import Notification from "./components/Notification"

import { initializeBlogs, createBlog } from "./reducers/blogReducer"
import {
  logUserFromLocalStorage,
  loginUser,
  logoutUser,
} from "./reducers/userReducer"
import LoginForm from "./components/LoginForm"
import { initializeUsers } from "./reducers/usersReducer"
import Users from "./components/Users"
import User from "./components/User"
import BlogView from "./components/BlogView"

const App = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(logUserFromLocalStorage())
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
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

  if (user === null) {
    return (
      <>
        <Notification />
        <LoginForm onLogin={handleLogin} />
      </>
    )
  }

  return (
    <div>
      <div>
        <Link to="/">Blogs</Link>
        <Link to="/users">Users</Link>
        {user.name} logged in <button onClick={handleLogout}>Logout</button>
      </div>
      <h2>Blog App</h2>
      <Notification />

      <Routes>
        <Route
          path="/"
          element={
            <BlogList createBlog={handleCreateBlog} blogFormRef={blogFormRef} />
          }
        />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/blogs/:id" element={<BlogView />} />
      </Routes>
    </div>
  )
}

export default App

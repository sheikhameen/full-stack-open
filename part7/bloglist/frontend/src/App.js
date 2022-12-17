import { useEffect, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Routes, Route, Navigate } from "react-router-dom"

import Blogs from "./components/Blogs"
import Notification from "./components/Notification"

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
  // if (user === null) {
  //   return (
  //     <>
  //       <Notification />
  //       <LoginForm onLogin={handleLogin} />
  //     </>
  //   )
  // }

  // Blogs if user exists
  return (
    <div>
      <h2>Blogs</h2>
      <Notification />
      {user && (
        <div>
          {user.name} logged in
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}

      <Routes>
        <Route
          path="/login"
          element={
            !user ? (
              <LoginForm onLogin={handleLogin} />
            ) : (
              <Navigate replace to="/" />
            )
          }
        />
        <Route
          path="/"
          element={
            user ? (
              <Blogs createBlog={handleCreateBlog} blogFormRef={blogFormRef} />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
        {/* <Route path="/users" element={ } /> */}
        {/* <Route path="/users/:id" element={ } /> */}
        {/* <Route path="/blogs" element={ } /> */}
        {/* <Route path="/blogs/:id" element={ } /> */}
      </Routes>
    </div>
  )
}

export default App

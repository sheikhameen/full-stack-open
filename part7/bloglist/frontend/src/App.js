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

import styled from "styled-components"

const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
`

const NavBar = styled.div`
  padding: 18px 32px;
  display: flex;
  justify-content: space-between;
  box-shadow: 0 4px 5px rgba(0, 0, 0, 0.05);
  background-color: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  position: sticky;
  top: 0;

  color: #111;
  font-size: 12px;

  h1 {
    color: #111;
  }

  a {
    color: #555;
    font-weight: 400;
    margin-right: 18px;
    text-decoration: none;
    font-size: 16px;
    :hover {
      color: #111;
    }
  }

  button {
    padding: 4px 12px;
    border-radius: 8px;
    border: none;
    background-color: palevioletred;
    color: #fff;
    font-weight: 500;
    font-family: "Poppins", sans-serif;
    box-shadow: 0 4px 0 rgb(176, 48, 91);
    margin-left: 18px;
    cursor: pointer;

    :hover {
      transform: translateY(2px);
      box-shadow: 0 2px 0 rgb(176, 48, 91);
    }
    :active {
      transform: translateY(4px);
      box-shadow: 0 0px 0 rgb(176, 48, 91);
    }
    transition: all 50ms ease-out;
  }
`

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
    <Container>
      <Notification />

      <NavBar>
        <h1>Blog App.</h1>
        <div>
          <Link to="/">Blogs</Link>
          <Link to="/users">Users</Link>
        </div>
        <div>
          {user.name} logged in <button onClick={handleLogout}>Logout</button>
        </div>
      </NavBar>

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
    </Container>
  )
}

export default App

import { useState, useEffect, useRef } from "react"

import blogService from "./services/blogs"
import loginService from "./services/login"

import Blog from "./components/Blog"
import Notification from "./components/Notification"
import Togglable from "./components/Togglable"
import BlogForm from "./components/BlogForm"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [notificationMessage, setNotificationMessage] = useState(null)

  const blogFormRef = useRef()

  const notificationTimeout = 3000
  const showSuccessNotification = (message) => {
    setNotificationMessage({ type: "success", text: message })
    setTimeout(() => {
      setNotificationMessage(null)
    }, notificationTimeout)
  }

  const showErrorNotification = (message) => {
    setNotificationMessage({ type: "error", text: message })
    setTimeout(() => {
      setNotificationMessage(null)
    }, notificationTimeout)
  }

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBloglistUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem("loggedBloglistUser", JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername("")
      setPassword("")
    } catch (exception) {
      showErrorNotification("Wrong username or password")
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBloglistUser")
    setUser(null)
    setUsername("")
    setPassword("")
  }

  const createBlog = async (blogObject) => {
    try {
      const blog = await blogService.create(blogObject)
      blogFormRef.current.toggleVisibility()
      setBlogs(blogs.concat(blog))
      showSuccessNotification(
        `A new blog, ${blog.title} by ${blog.author}, added.`
      )
    } catch (exception) {
      showErrorNotification("Title or url missing")
    }
  }

  const likeBlog = async (blog) => {
    const likedBlog = await blogService.update(blog.id, {
      ...blog,
      likes: ++blog.likes,
      user: blog.user.id,
    })
    setBlogs(blogs.map((blog) => (blog.id === likedBlog.id ? likedBlog : blog)))
  }

  const deleteBlog = async (blog) => {
    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) return

    try {
      const response = await blogService.deleteBlog(blog.id)
      if (response.status === 204) {
        // make a copy of blogs (to avoid referenced objects), filter out deleted blog:
        setBlogs(blogs.map((b) => ({ ...b })).filter((b) => b.id !== blog.id))
      }
    } catch (exception) {
      showErrorNotification("You are not allowed")
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={notificationMessage} />
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
      <Notification message={notificationMessage} />
      <div>
        {user.name} logged in
        <button onClick={handleLogout}>Logout</button>
      </div>
      <br />
      <div>
        <h2>Create new</h2>
        <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
          <BlogForm createBlog={createBlog} />
        </Togglable>
      </div>
      <br />
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            likeBlog={likeBlog}
            deleteBlog={deleteBlog}
            currentUser={user}
          />
        ))}
    </div>
  )
}

export default App

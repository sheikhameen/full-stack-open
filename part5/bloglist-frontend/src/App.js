import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)

  const notificationTimeout = 3000
  const showSuccessNotification = (message) => {
    setNotificationMessage({type:'success', text: message})
    setTimeout(() => {
      setNotificationMessage(null)
    }, notificationTimeout)
  }

  const showErrorNotification = (message) => {
    setNotificationMessage({type:'error', text: message})
    setTimeout(() => {
      setNotificationMessage(null)
    }, notificationTimeout)
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
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
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      showErrorNotification('Wrong username or password')
    }

  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
    setUsername('')
    setPassword('')
  }

  const createBlog = async (event) => {
    event.preventDefault()

    try {
      const blog = await blogService.create({title, author, url})
      setBlogs(blogs.concat(blog))
      setTitle('')
      setAuthor('')
      setUrl('')
      showSuccessNotification(`A new blog, ${blog.title} by ${blog.author}, added.`)
    } catch (exception) {
      showErrorNotification('Title or url missing')
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={notificationMessage} />
        <form onSubmit={handleLogin}>
          <div>Username:
            <input
              type="text"
              name='username'
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>Password:
            <input
              type="password"
              name='password'
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
        <form onSubmit={createBlog}>
          <div>
            title:
            <input
              type="text"
              name="title"
              value={title}
              onChange={({target}) => setTitle(target.value)}
            />
          </div>
          <div>
            author:
            <input
              type="text"
              name="author"
              value={author}
              onChange={({target}) => setAuthor(target.value)}
            />
          </div>
          <div>
            url:
            <input
              type="text"
              name="url"
              value={url}
              onChange={({target}) => setUrl(target.value)}
            />
          </div>
          <input type="submit" value="Create" />
        </form>
      </div>
      <br />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

}

export default App
let token = null

const STORAGE_KEY = "loggedBlogAppUser"

const setCurrentUser = (user) => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
  token = user.token
}

const getCurrentUser = () => {
  const loggedUserJSON = window.localStorage.getItem(STORAGE_KEY)
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    token = user.token
    return user
  }

  return null
}

const clearCurrentUser = () => {
  localStorage.clear()
  token = null
}

const getToken = () => token

export default {
  setCurrentUser,
  getCurrentUser,
  clearCurrentUser,
  getToken,
}

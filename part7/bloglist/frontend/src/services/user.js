import axios from "axios"

const baseUrl = "/api/users"
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

const getAllUsers = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getOneUser = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const getToken = () => token

export default {
  setCurrentUser,
  getCurrentUser,
  clearCurrentUser,
  getToken,
  getAllUsers,
  getOneUser,
}

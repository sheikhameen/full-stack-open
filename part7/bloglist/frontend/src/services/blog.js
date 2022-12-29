import axios from "axios"
import userService from "./user"

const baseUrl = "/api/blogs"

const config = () => {
  return {
    headers: { Authorization: `bearer ${userService.getToken()}` },
  }
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject, config())
  return response.data
}

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  return response.data
}

const addComment = async (id, newComment) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, {
    content: newComment,
  })
  return response.data
}

const deleteBlog = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, config())
  return response
}

const exports = {
  getAll,
  create,
  update,
  addComment,
  deleteBlog,
}
export default exports

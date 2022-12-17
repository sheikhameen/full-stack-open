import { createSlice } from "@reduxjs/toolkit"
// import blogService from "../services/blog"
import userService from "../services/user"
import loginService from "../services/login"
import { showErrorNotification } from "./notificationReducer"

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser: (state, action) => {
      return action.payload
    },
    removeUser: () => {
      return null
    },
  },
})

const { setUser, removeUser } = userSlice.actions

export const logUserFromLocalStorage = () => {
  return (dispatch) => {
    // const loggedUserJSON = window.localStorage.getItem("loggedBloglistUser")
    // if (loggedUserJSON) {
    //   const user = JSON.parse(loggedUserJSON)
    //   blogService.setToken(user.token)
    //   dispatch(setUser(user))
    // }
    const user = userService.getCurrentUser()
    dispatch(setUser(user))
  }
}

export const loginUser = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({ username, password })
      userService.setCurrentUser(user)
      // window.localStorage.setItem("loggedBloglistUser", JSON.stringify(user))
      // blogService.setToken(user.token)
      dispatch(setUser(user))
    } catch (e) {
      dispatch(showErrorNotification("Wrong username or password"))
    }
  }
}

export const logoutUser = () => {
  return (dispatch) => {
    window.localStorage.removeItem("loggedBloglistUser")
    dispatch(removeUser(null))
  }
}

export default userSlice.reducer

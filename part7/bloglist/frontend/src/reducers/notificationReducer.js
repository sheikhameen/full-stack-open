import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    setNotification: (state, action) => {
      return action.payload
    },
    removeNotification: () => {
      return null
    },
  },
})

const { setNotification, removeNotification } = notificationSlice.actions

const notificationTimeout = 3000

export const showSuccessNotification = (message) => {
  return (dispatch) => {
    dispatch(setNotification({ type: "success", text: message }))
    setTimeout(() => {
      dispatch(removeNotification())
    }, notificationTimeout)
  }
}

export const showErrorNotification = (message) => {
  return (dispatch) => {
    dispatch(setNotification({ type: "error", text: message }))
    setTimeout(() => {
      dispatch(removeNotification())
    }, notificationTimeout)
  }
}

export default notificationSlice.reducer

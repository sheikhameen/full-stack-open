import { createSlice } from "@reduxjs/toolkit";

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    newNotification(state, action) {
      return action.payload
    },
    clearNotification(state, action) {
      return initialState
    }
  }
})

const { newNotification, clearNotification } = notificationSlice.actions

export const setNotification = (message, timeout) => {
  return dispatch => {
    dispatch(newNotification(message))
    setTimeout(() => {
      // if no notification, simply return. no need to clear
      // or if there's already a timeout, before clearingNotification, clear old timeout
      dispatch(clearNotification())
    }, timeout * 1000);
  }
}

export default notificationSlice.reducer
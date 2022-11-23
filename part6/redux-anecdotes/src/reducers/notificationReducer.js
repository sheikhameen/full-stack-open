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

let timeoutId = null
export const setNotification = (message, timeoutSec) => {
  return dispatch => {
    dispatch(newNotification(message))

    if (timeoutId) { // if a timeout already exists, clear it
      clearTimeout(timeoutId)
    }

    // reset timeoutId
    timeoutId = setTimeout(() => {
      dispatch(clearNotification())
      timeoutId = null // only after timeout expires
    }, timeoutSec * 1000);
  }
}

export default notificationSlice.reducer
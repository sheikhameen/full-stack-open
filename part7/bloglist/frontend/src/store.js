import { configureStore } from "@reduxjs/toolkit"
import blogs from "./reducers/blogReducer"
import user from "./reducers/userReducer"
import notification from "./reducers/notificationReducer"

const store = configureStore({ reducer: { blogs, user, notification } })

export default store

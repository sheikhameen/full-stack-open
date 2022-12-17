import { configureStore } from "@reduxjs/toolkit"
import blogs from "./reducers/blogReducer"
import user from "./reducers/userReducer"
import users from "./reducers/usersReducer"
import notification from "./reducers/notificationReducer"

const store = configureStore({ reducer: { blogs, user, notification, users } })

export default store

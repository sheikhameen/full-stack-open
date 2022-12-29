import { createSlice } from "@reduxjs/toolkit"
import blogService from "../services/blog"
import {
  showSuccessNotification,
  showErrorNotification,
} from "./notificationReducer"

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs: (state, action) => {
      return action.payload
    },
    addBlog: (state, action) => {
      state.push(action.payload)
    },
    updateBlog: (state, action) => {
      const updatedBlog = action.payload
      return state.map((blog) =>
        blog.id === updatedBlog.id ? updatedBlog : blog
      )
    },
    removeBlog: (state, action) => {
      const id = action.payload
      const newBlogs = state.filter((b) => b.id !== id)
      return newBlogs
    },
  },
})

const { setBlogs, updateBlog, removeBlog, addBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(blog)
      dispatch(addBlog(newBlog))
      dispatch(
        showSuccessNotification(
          `A new blog, ${blog.title} by ${blog.author}, added.`
        )
      )
    } catch (e) {
      dispatch(showErrorNotification("Title or url missing"))
    }
  }
}

export const likeBlog = (id) => {
  return async (dispatch, getState) => {
    const blogToLike = getState().blogs.find((b) => b.id === id)
    const likedBlog = await blogService.update(blogToLike.id, {
      ...blogToLike,
      likes: blogToLike.likes + 1,
      user: blogToLike.user.id,
    })
    dispatch(updateBlog(likedBlog))
  }
}

export const commentBlog = (id, comment) => {
  return async (dispatch, getState) => {
    const blogToComment = getState().blogs.find((b) => b.id === id)
    const commentedBlog = await blogService.addComment(
      blogToComment.id,
      comment
    )
    dispatch(updateBlog(commentedBlog))
  }
}

export const deleteBlog = (id) => {
  return async (dispatch, getState) => {
    const blogToDelete = getState().blogs.find((b) => b.id === id)
    try {
      await blogService.deleteBlog(id)
      dispatch(removeBlog(id))
      dispatch(
        showSuccessNotification(`Successfully deleted "${blogToDelete.title}"`)
      )
    } catch (e) {
      dispatch(showErrorNotification("You are not allowed"))
    }
  }
}

export default blogSlice.reducer

import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer from './reducers/anecdoteReducer'

const store = configureStore({
  reducer: {
    anecdote: anecdoteReducer
  }
})

export default store
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
    dispatch(setNotification(`You added '${content}'`))
  }

  return (
    <form onSubmit={addAnecdote}>
      <h3>Create new</h3>
      <div><input name='anecdote' /></div>
      <button>create</button>
    </form>
  )
}

export default AnecdoteForm
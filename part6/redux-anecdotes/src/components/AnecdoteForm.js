import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(newAnecdote.content))
    dispatch(setNotification(`You added '${newAnecdote.content}'`))
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
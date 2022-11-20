import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdote)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(voteAnecdote(id))

    const content = anecdotes.find(a => a.id === id).content
    dispatch(setNotification(`You voted '${content}'`))
  }

  const anecdotesToShow = [...anecdotes].filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
  
  return (
    <div>
      {anecdotesToShow
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>)}
    </div>
  )
}

export default AnecdoteList
import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'INIT':
      return action.data.anecdotes
    case 'VOTE':
      const id = action.data.id
      const anecToVote = state.find(a => a.id === id)
      const newAnec = {
        ...anecToVote,
        votes: anecToVote.votes + 1
      }
      return state.map(ogAnec =>
        ogAnec.id !== id ? ogAnec : newAnec
      )

    case 'ADD':
      return [...state, action.data.content]

    default:
      return state
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({ type: 'INIT', data: { anecdotes: anecdotes } })
  }
}

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: {
      id
    }
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'ADD',
      data: { content: newAnecdote }
    })
  }
}

export default reducer
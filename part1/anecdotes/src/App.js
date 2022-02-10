import React, { useState } from 'react'

const Button = ({text, onClick}) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Header = ({text}) => <h1>{text}</h1>

const Anecdote = ({text}) => <div>{text}</div>

const Votes = ({text}) => <p>has {text} votes</p>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const randomInteger = (max) => Math.floor(Math.random() * max)
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const changeAnecdote = () => setSelected(randomInteger(anecdotes.length))

  const addVote = () => {
    const newVotes = [...votes]
    newVotes[selected]++
    setVotes(newVotes)
  }

  const mostVotedAnecdote = votes.indexOf(Math.max(...votes))

  return (
    <div>
      <Header text='Anecdote of the day' />
      <Anecdote text={anecdotes[selected]}/>
      <Votes text={votes[selected]} />

      <Button onClick={addVote} text='Vote' />
      <Button onClick={changeAnecdote} text='Next anecdote' />

      <Header text='Anecdote with most votes' />
      <Anecdote text={anecdotes[mostVotedAnecdote]}/>
      <Votes text={votes[mostVotedAnecdote]} />
    </div>
  )
}

export default App
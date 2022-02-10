import React, { useState } from 'react'

const Statistics = ({good, neutral, bad}) => {

  if (good === 0 && neutral === 0 && bad === 0) return <div>No feedback given</div>

  const all = good + neutral + bad
  const average = (good - bad) / all
  const positive = (good / all) * 100

  return (
    <div>
      <table>
        <tbody>
          <tr><StatisticLine text="Good" value={good} /></tr>
          <tr><StatisticLine text="Neutral" value={neutral} /></tr>
          <tr><StatisticLine text="Bad" value={bad} /></tr>
          <tr><StatisticLine text="All" value={all} /></tr>
          <tr><StatisticLine text="Average" value={average} /></tr>
          <tr><StatisticLine text="Positive" value={positive + '%'} /></tr>
        </tbody>
      </table>
    </div>
  )

}

const StatisticLine = ({text, value}) => (
  <>
    <td>{text}</td><td>{value}</td>
  </>
)

const Button = ({text, onClick}) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Header = ({text}) => <h1>{text}</h1>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGood = () =>  setGood(good + 1) 
  const addNeutral = () => setNeutral(neutral + 1)
  const addBad = () => setBad(bad + 1)
  
  return (
    <div>
      <Header text="Give Feedback" />
      <Button onClick={addGood} text="Good" />
      <Button onClick={addNeutral} text="Neutral" />
      <Button onClick={addBad} text="Bad" />
      <Header text="Statistics" />
      <Statistics good={good} neutral={neutral} bad={bad}  />
    </div>
  )
}

export default App
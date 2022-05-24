import { useState } from 'react'
import Statistics from './components/Statistics';

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [arr, setArr] = useState([])



  function handleGoodClick() {
    setGood(good + 1);
    arr.push(1)
    setArr(arr)
  }

  function handleNeutralClick() {
    setNeutral(neutral + 1);
    arr.push(0)
    setArr(arr)
  }

  function handleBadClick() {
    setBad(bad + 1);
    arr.push(-1)
    setArr(arr)
  }


  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={handleGoodClick}>good</button>
      <button onClick={handleNeutralClick}>neutral</button>
      <button onClick={handleBadClick}>bad</button>
      <h1>statistics</h1>
      {good || neutral || bad !== 0 ? <Statistics good={good} neutral={neutral} bad={bad} arr={arr} /> : 'No feedback given'}
    </div>
  )
}

export default App



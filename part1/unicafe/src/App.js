import { useState } from 'react'


const Button=({handleclick,text})=> (
  <button onClick={handleclick}>{text}</button>
)
const StatisticLine =({voteName,value})=>
{
return(
<tr>
  <td>{voteName}</td>
  <td>{value}</td>
</tr>)
}

const Statistics = ({good,neutral,bad})=>{
  if (good===0 && bad===0 && neutral===0)
  {
    return(
      <div>No feedback given</div>
    )
  }
  return(
    <div>
      <h1>statistics</h1>
      <table>
        <thead>
          <tr>
            <th>Feedback</th>
            <th>Votes</th>
          </tr>
        </thead>
        <tbody>
        <StatisticLine voteName='good' value={good}/>
        <StatisticLine voteName='neutral' value={neutral}/>
        <StatisticLine voteName='bad' value={bad}/>
        <StatisticLine voteName='all' value={bad+good+neutral}/>
        <StatisticLine voteName='good' value={good}/>
        <StatisticLine voteName='average' value={(good-bad)/(bad+good+neutral)}/>
        <StatisticLine voteName='possitive(%)' value={(good/(bad+good+neutral))*100}/>       
        </tbody>
      </table>         
    </div>
  )
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const handleGoodClick=()=>  setGood(good+1)
  const handleNeutralClick=()=>  setNeutral(neutral+1)
  const handleBadClick=()=>  setBad(bad+1)
  return (
    <div>
      <h1>give feedback</h1>
      <br/>
      <Button handleclick={handleGoodClick} text='good' />
      <Button handleclick={handleNeutralClick} text='neutral' />
      <Button handleclick={handleBadClick} text='bad' />
      <br/>      
      <Statistics good={good} bad={bad} neutral={neutral}/>

    </div>
  )
}

export default App
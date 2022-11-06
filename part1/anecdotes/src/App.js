import {useState} from 'react'

const Button=({handleclick,text}) =>(<button onClick={handleclick}>{text}</button>)
const Anecdotes=({selected,voted})=>(<p>{voted[0][selected]} <br/>has {voted[1][selected]} votes</p>)
const MaximunVote=({maxindex,voted})=>(<p>{voted[0][maxindex]} <br/>has {voted[1][maxindex]} votes</p>)
const App = () => {
    const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ] 
    const [selected, setSelected] = useState(0)
    const [maxindex,setMaxindex]=useState(0)
    const [clicked, setClicked] = useState(false)
    const [voted,setVoted]=useState([anecdotes,new Array(7+1).join('0').split('').map(parseFloat)])
    const handleClickShowAnecdotes =()=>{      
      if (!clicked) {
        setSelected(Math.floor(Math.random() * (7 - 1) + 1));
        setMaxindex(voted[1].indexOf(voted[1].reduce((a, b) => Math.max(a, b), -Infinity)))
      }
    }
    const handleClickVoteAnecdotes=()=>{
      if(!clicked)
      {
      let handlvote=voted
      handlvote[1][selected]=handlvote[1][selected]+1      
      setVoted(voted)
      setMaxindex(voted[1].indexOf(voted[1].reduce((a, b) => Math.max(a, b), -Infinity)))
      console.log('maxindex '+maxindex)
      console.log('selected '+selected)
      }
    }  
  return (
    <div>
     <Anecdotes selected={selected} voted={voted}/><br/>          
     <Button handleclick={()=>handleClickVoteAnecdotes(()=>setClicked(true))} text='vote'/>
     <Button handleclick={()=>handleClickShowAnecdotes(()=>setClicked(true))} text='next anecdote'/><br/>             
     <MaximunVote maxindex={maxindex} voted={voted}/>
    </div>
  )
}

export default App;

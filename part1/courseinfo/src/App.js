import React from "react"
const Header=(props)=>
{
  return ( 
    
      <h1>{props.course.name}</h1>
   )
}
const Content=(props) =>
{ 
  const PartsArr= props.course.parts;
   return(
    PartsArr.map((part,index) => 
    <p key= {index}>the course  {part.name} exercises is {part.exercises} </p>)                
  )
}
const Total=(props)=>{
  
  let counter=0
  props.course.parts.forEach(part => {counter+=part.exercises; })
  return(
    <p>Number of exercises is {counter}</p>
  )
}
const App = () => {
  const course = {name:'Half Stack application development',
                  parts: [                    
                    {    name: 'Fundamentals of React',    exercises: 10  },
                    {    name: 'Using props to pass data',    exercises: 7  },
                    {    name: 'State of a component',    exercises: 14  }
]
  }
  return (
     <>
     <Header course={course} />
     <Content course={course} />     
     <Total course={course} />
     </>
  )
}

export default App
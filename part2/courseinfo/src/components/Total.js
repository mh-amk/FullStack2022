const Total=({course})=>{
    const initialValue = 0
    const sumWithInitial = course.parts.reduce(
    (previousValue, currentValue) => previousValue + currentValue['exercises'], initialValue);
    return(
      <h4>Total of {sumWithInitial} exercises</h4>
    )
  }
  export default Total
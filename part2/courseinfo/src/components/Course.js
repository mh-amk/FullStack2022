import Header from "./Header"
import Content from "./Content"
import Total from "./Total"
const Course =({initialCourses})=>{
return(
  <>
  {initialCourses.map(initialCourse=>(
    <div key={initialCourse.id}>
      <Header course={initialCourse} />
      <Content course={initialCourse} />
      <Total course={initialCourse} />  
    </div>    
    ))
  }
  </>
)
}
export default Course


const Persons=({persons,DeletePerson}) =>
{
  const personDelete=(person)=>
  {
    if (window.confirm(`Do you really want to Delete ${person.name}`)) {
      DeletePerson(person)
    }
  }
   return(     
    <div>
      {
        persons.map(person=><p key={person.id}>{person.name} {person.number} <button onClick={()=>personDelete(person)}>delete</button></p>)
      }      
      </div>
   )  
}
export default Persons;
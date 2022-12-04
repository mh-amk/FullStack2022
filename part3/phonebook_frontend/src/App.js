import {useState,useEffect} from 'react'
import PersonForm from './components/PersonForm'
import Persons from "./components/Persons"
import Filter from "./components/Filter"
import Notification from "./components/Notification"
import PersonsServices from "./Services/Persons"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, SetNewNumber] = useState('')
  const [newFilter, SetnewFilter] = useState(persons)
  const [isFiltered, SetIsFiltered] = useState(false)
  const [notificationMessage, SetNotificationMessage] =useState(null)
  const [cssClass, setCssClass]=useState('success')
  useEffect(()=>{PersonsServices
      .getAll()
      .then(initialPersons => {
         setPersons(initialPersons)
        })
      },[])

const AddPerson = event => {
    event.preventDefault()
    if (persons.find(person => person.name === newName)===undefined) {
      const PersonObject = {
        name: newName,
        number: newNumber
      }    
      PersonsServices
      .create(PersonObject)
      .then(response=> {
        setPersons(persons.concat(response))
        SetnewFilter(persons)
        SetIsFiltered(false);
        setCssClass('success')
        setNewName('')
        SetNewNumber('')      
        SetNotificationMessage(`${response.name} was Added`)
        setTimeout(() => { SetNotificationMessage(null)}, 5000);  
      })
      .catch(error=>
        {
          setCssClass('error')
          console.log(error.response.data.error)
          if(error.response.status===500)
          {
            SetNotificationMessage(`Insert failed, duplicate id`)
            setTimeout(() => { SetNotificationMessage(null)}, 5000);
          }
          else if (error.response.status===400)
          {
            SetNotificationMessage(error.response.data.error)
            setTimeout(() => { SetNotificationMessage(null)}, 5000);
          }
        })
      }
      else
      {
        if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {          
          const findpersonforUpdate=persons.find(person=>person.name===newName)
          UpdatePerson(findpersonforUpdate)
        }
        
      }
}
const UpdatePerson = findpersonforUpdate => {
      const PersonObject = {
        name: newName,
        number: newNumber,
        id: findpersonforUpdate.id
      }
      PersonsServices
      .update(PersonObject.id,PersonObject)
      .then(response=>{
        setCssClass('success')
        setPersons(persons.map(person => person.id !== findpersonforUpdate.id ? person : response))
        SetnewFilter(persons)
        SetIsFiltered(false)
        setNewName('')
        SetNewNumber('')   
        SetNotificationMessage(`${response.name}'s number has changed`)
        setTimeout(() => { SetNotificationMessage(null)}, 5000);       
      })
      .catch(error => {
        setCssClass('error')
        if(error.response.status===404)
        {
          SetNotificationMessage(`the person was already deleted from server`)
          setTimeout(() => { SetNotificationMessage(null)}, 5000);
          setPersons(persons.filter(person => person.id !== findpersonforUpdate.id))
          SetnewFilter(persons)
        }
        else if (error.response.status===400)
          {
            SetNotificationMessage(error.response.data.error)
            setTimeout(() => { SetNotificationMessage(null)}, 5000);
          }

      })
}      
const DeletePerson=(person)=>
{
    const personID=person.id    
    PersonsServices
    .deleted(person.id)
    .then(response=>{
      setPersons(persons.filter(n => n.id !== personID))
      SetnewFilter(persons)
      SetIsFiltered(false)
      setCssClass('success')
      setNewName('')
      SetNewNumber('')
      SetNotificationMessage(`The person was deleted`)
      setTimeout(() => { SetNotificationMessage(null)}, 5000);  
    })
    .catch(error => {
      if(error.response.status===404)
      {
        setCssClass('error')
        SetNotificationMessage(`${person.name} was already deleted from server`)
        setTimeout(() => { SetNotificationMessage(null)}, 5000);
      }
    })
}
const handleInputFilterChange =(event)=>
{
  const filtered = persons.filter(entry =>
     Object.values(entry).some(val => typeof val === "string" && val.includes(event.target.value)));
  SetnewFilter(filtered)
  SetIsFiltered(true)
}

const handleInputNameChange =(event)=>
{
  setNewName(event.target.value)
}
const handleInputNumberChange =(event)=>
{
  SetNewNumber(event.target.value)
}
return (
    <div>
      <h1>Notification</h1>
      <Notification cssClass={cssClass} notificationMessage={notificationMessage}/>
      <h2>Phonebook</h2>
      <Filter handleInputFilterChange={handleInputFilterChange}/>
      <h2>add a new</h2>
      <PersonForm 
          handleInputNameChange={handleInputNameChange}
          handleInputNumberChange={handleInputNumberChange}
          AddPerson={AddPerson}
          newName={newName}
          newNumber={newNumber}/>
      <h2>Numbers</h2>
      <Persons persons={(isFiltered===true?newFilter:persons)} DeletePerson={DeletePerson}/>         
    </div>
    )}

export default App

import {useState,useEffect} from 'react'
import axios from 'axios'
import Filter from "./components/Filter"
import Countries from './components/Countries'

const App = () => {
  const [countries, setCountries] = useState()
  const [newFilter, SetnewFilter] = useState(countries)
  const [isFiltered, SetIsFiltered] = useState(false)
  const [loadingState, setLoadingState] = useState('not_loaded'); 
  const [showDetails, SetShowDetais]=useState(false)
  const hook = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
        SetIsFiltered(false)
        setLoadingState('loaded')
      })
  }  
  useEffect(hook, [])
const handleInputFilterChange =(event)=>
{
  let filtered = countries.filter
  (entry => Object.values(entry.name).some(val => typeof val === "string" && val.includes(event.target.value)));
  SetnewFilter(filtered)
  SetIsFiltered(true)
  SetShowDetais(false)
}
return(
    <div>
      <h2>Countries</h2>      
      <Filter handleInputFilterChange={handleInputFilterChange}/>      
      {loadingState === 'loaded'?
      <Countries showDetails={showDetails} countries={isFiltered===false?countries:newFilter}/>:<div>Loading...</div>}
    </div>   
    )
}
export default App

import React from "react";
import { useState } from "react";
import CountriesDetails from "./CountriesDetails";

const Countries=({countries,showDetail}) =>
{
  const [showDetails, SetShowDetails]=useState(showDetail)
  const [buttonShow, SetButtonShow]=useState(true)
  
  const handleClick=(truefalse)=>
  {
    SetShowDetails(truefalse)
    SetButtonShow(!truefalse)
  }
return(     
    <div>
      {countries.map(country=>(
      <div key={country.id}>             
        {country.name.common} <button onClick=
        {()=> handleClick(buttonShow===true?true:false)}>{buttonShow===true?'show':'Hide'}</button>
        {showDetails===true?<CountriesDetails country={country}/>:null}
        <br/>
      </div>))
      }
    </div>
  )
}
export default Countries;
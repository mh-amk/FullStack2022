import { useState,useEffect} from "react";
import CountryLanguages from "./CountryLanguages";
import axios from "axios";

const CountriesDetails=({country}) =>
{
  const [weatherShow, SetWeatherShow]=useState([])
  const [weatherWind, SetWeatherWind]=useState()
  const [weatherShowBool, SetWeatherShowBool]=useState(false)
  const [wApiKey,SetwApiKey]=useState()
  const [wCapital,SetwCapital]=useState(country.capital)
  const [WeatherResponse,SetWeatherResponse]=useState()
  const [WeatherApiUrl,SetWeatherApiUrl]=useState()
  const hook = () => {
    SetwApiKey(process.env.REACT_APP_Weather_API_KEY)
    SetwCapital(country.capital)    
    const params = {
      access_key: wApiKey,
      query: wCapital
    }
    SetWeatherApiUrl(`http://api.weatherstack.com/current?access_key=${params.access_key}&query=${params.query}`)
    axios
      .get(WeatherApiUrl)
      .then(response => {
        SetWeatherResponse(response)
        if (WeatherResponse.success!==undefined){
        SetWeatherShowBool(true)
        SetWeatherShow(WeatherResponse.data.current.weather_icons[0])
        SetWeatherWind(WeatherResponse.data.current.wind_speed)        
        if (weatherWind!==null||weatherWind!==undefined) SetWeatherShowBool(true)        
        }
      })
    .catch(error => {
        console.log(error);
      })
  }  
  useEffect(hook, [WeatherApiUrl])
  
  return(
      <div>
           Capital {country.capital}<br/>
           <h4>Languages</h4>
           <CountryLanguages country={country}/>        
           Area {country.area}<br/>
           <img width={60} height={50} alt={country.name.common} src={country.coatOfArms.png}/><br/>
           <h4>Weather in {country.capital}</h4>
           {weatherShowBool===true?<img alt={weatherShow} src={weatherShow}/>:'N/A'}
           <br/>
           wind speed {weatherShowBool===true?weatherWind:'N/A'}
      </div>
  )}
export default CountriesDetails;
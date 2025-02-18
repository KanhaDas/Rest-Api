import React, { useEffect, useState } from 'react'
import  axios from "axios";
import "./App.css"
const App = () => {
  const[countries,setCountries]=useState([])
  const[singleCountry,setSingleCountry]=useState("")
  const[citiess,setCities]=useState(null)
  const[singleCity,setSingleCity]=useState("")
  const[submit,setSubmit]=useState(false)
  const fetchCountries=async()=>{
    try{
     const country=await axios.get('https://countriesnow.space/api/v0.1/countries')
     setCountries(country.data.data)
    }
    catch(error){
      console.log(error)
    }
  }
  const fetchCities=(country)=>{
    setSubmit(false)
    setSingleCity(null)
  setSingleCountry(country)
  const findCities=countries.find((c)=>c.country===country)
  setCities(findCities.cities)
  }

  const submitHandler=()=>{
     if(singleCity && singleCountry){
        setSubmit(true)
     }
  }

  useEffect(()=>{
    fetchCountries();
  },[])
  return (
   <div className="App">
    <div className='App-header'>
      <h1>Select your Hometown</h1>

      <div>
       {countries && <select onChange={(e)=>fetchCities(e.target.value)} value={singleCountry}>
          <option disabled  hidden>
            Select Country
          </option>
          {
            countries.map((country)=>(
              <option key={`${country.country}-${Date.now()}`} value={country.country} >{country.country}</option>
            ))
          }
         
        </select>}


       {citiess &&  <select onChange={(e)=>setSingleCity(e.target.value)}value={singleCity}>
          <option disabled selected hidden>
            Select City
          </option>
          
            {citiess.map((city)=>(
              <option value={city}  key={`${city}-${Date.now()}`}>{city}</option>
            ))}
          
      
        </select>}
        <button onClick={submitHandler}>Go</button>
      </div>
      {submit && <h3>Your country is {singleCountry} and your city is {singleCity} </h3>}
    </div>
   </div>
  )
}

export default App

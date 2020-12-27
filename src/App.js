import React, { useEffect, useState } from "react"
import './App.css';
import { FormControl, MenuItem, Select } from '@material-ui/core';
import { InfoBox } from "./components/info-boxe";

const App= () => {
  const [countries, setCountries] = useState([])
  const [country, setCountry] =  useState("worldwide")

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then(response => response.json())
      .then(data => {
        const countries = data.map(country => ({
          name: country.country,
          value: country.countryInfo.iso2
        }))
        setCountries(countries)
      })
    }
    getCountriesData()
  },[])

  const onCountryChange = async (event) => {
    const countryCode = event.target.value
    setCountry(countryCode)
  }

  return (
    <div className="App">
      <div className="app__header">
        <h1>Covid 19 Tracker</h1>
        <FormControl className="app__dropdown">
          <Select variant="outlined" onChange={onCountryChange} value={country}>
            <MenuItem value="worldwide">Worldwide</MenuItem>
            {countries.map(country => <MenuItem value={country.value}>{country.name}</MenuItem>)}
          </Select>
        </FormControl>
      </div>
      <div className="app__stats">
        <InfoBox title="Coronavirus Cases" cases={123} total={2000}/>
        <InfoBox title="Recoverd" cases={12332} total={5000}/>
        <InfoBox title="Deaths" cases={1223123123123} total={21000}/>
      </div>
    </div>
  );
}

export default App;

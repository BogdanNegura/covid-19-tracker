import React, { useEffect, useState } from "react"
import './App.css';
import { FormControl, MenuItem, Select } from '@material-ui/core';

const App= () => {
  const [countries, setCountries] = useState([])

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

  return (
    <div className="App">
      <div className="app__header">
        <h1>Covid 19 Tracker</h1>
        <FormControl className="app__dropdown">
          <Select variant="outlined" value="abc">
            {countries.map(country => <MenuItem value={country.value}>{country.name}</MenuItem>)}
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

export default App;

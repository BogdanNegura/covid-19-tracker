import React, { useEffect, useState } from "react"
import './App.css';
import { Card, CardContent, FormControl, MenuItem, Select } from '@material-ui/core';
import { InfoBox } from "./components/info-boxe";
import { Map } from "./components/map/map.component";

const App= () => {
  const [countries, setCountries] = useState([])
  const [country, setCountry] =  useState("worldwide")
  const [countryInfo, setCountryInfo] =  useState({})

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then(response => response.json())
      .then(data => {
        setCountryInfo(data)
      })
  }, [])

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

    const url = countryCode === "worldwide" 
      ? "https://disease.sh/v3/covid-19/all" 
      : `https://disease.sh/v3/covid-19/countries/${countryCode}`

      await fetch(url)
        .then(response => response.json())
        .then(data => {
          setCountry(countryCode)
          // All of the data from the country response
          setCountryInfo(data)
        })
  }
  console.log("111111111111111111111111", countryInfo);
  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>Covid 19 Tracker</h1>
          <FormControl className="app__dropdown">
            <Select 
              variant="outlined" 
              onChange={onCountryChange} 
              value={country}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map(country => <MenuItem value={country.value}>{country.name}</MenuItem>)}
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
          <InfoBox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases}/>
          <InfoBox title="Recoverd" cases={countryInfo.todayRecovered} total={countryInfo.recovered}/>
          <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths}/>
        </div>
        <Map/>
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          {/* table */}
          <h3>Wordwide new cases</h3>
          {/* Graph */}
        </CardContent>
        <Card/>
      </Card>
    </div>
  );
}

export default App;

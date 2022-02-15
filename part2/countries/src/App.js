import { useState, useEffect } from 'react'
import axios from 'axios'

import Countries from './components/Countries'


function App() {
  const [countries, setCountries] = useState([])
  const [filterQuery, setFilterQuery] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterOnChange = (event) => setFilterQuery(event.target.value)


  const countriesToShow = (filterQuery === '')
    ? []
    : countries.filter(country => {
      const countryName = country.name.common.toLowerCase()
      return (countryName.includes(filterQuery.toLowerCase())) ? true : false;
    })

  return (
    <div>
      <div>Find countries: <input value={filterQuery} onChange={handleFilterOnChange} /></div>
      {
        (filterQuery === '')
        ? <div>Type something...</div>
        : <Countries countries={countriesToShow} setFilterQuery={setFilterQuery} />
      }
    </div>
  );
}

export default App;

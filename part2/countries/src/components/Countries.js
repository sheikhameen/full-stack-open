// import React from 'react '
import Country from './Country'

const Countries = ({ countries, setFilterQuery }) => {

  if (countries.length > 10) return <div>Too many matches, specify another filter</div>

  if ((countries.length <= 10) && (countries.length > 1)) return (
    countries.map(country =>
      <div key={country.name.common}>
        {country.name.common} <button onClick={() => setFilterQuery(country.name.common)}>show</button>
      </div>
    ))

  if (countries.length === 1) return <div><Country country={countries[0]} /></div>


  return <div>None</div>

}

export default Countries
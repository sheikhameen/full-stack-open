import { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

const Weather = ({ city }) => {
  const [weatherInfo, setWeatherInfo] = useState(null)

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`)
      .then(response => {
        setWeatherInfo(response.data)
      })
  }, [city])

  if (weatherInfo === null) return <div>Loading...</div>

  return (
    <div>
      <h2>Weather in {city}</h2>
      <p>Temperature: {(weatherInfo.main.temp - 273.15).toFixed(2)} °C</p>
      <img
        src={`https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`}
        alt={`Icon for ${weatherInfo.weather[0].description}`}
      />
      <p>Wind: {weatherInfo.wind.speed} m/s</p>
    </div>
  )
}

export default Weather
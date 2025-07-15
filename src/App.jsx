import React, { useEffect, useState } from 'react'
import styles from './styles/App.module.css'
import WeatherCard from './components/WeatherCard'
import CanvasWeather from './components/CanvasWeather'

const App = () => {
  const [coords, setCoords] = useState(null)
  const [weatherData, setWeatherData] = useState(null)
  const [networkStatus, setNetworkStatus] = useState('')

  // 📍 Geolocation API
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setCoords({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          })
        },
        error => alert(`Location access is required!` + ` Error: ${error.message}`)
      )
    } else {
      alert('Geolocation not supported')
    }
  }, [])

  // 🌦 Fetch weather
  useEffect(() => {
    if (coords) {
      const fetchWeather = async () => {
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current_weather=true`)
        const data = await res.json()
        setWeatherData(data.current_weather)
        console.log("Weather Code:", data.current_weather.weathercode)
      }
      fetchWeather()
    }
  }, [coords])

  // 📶 Network Info API
  useEffect(() => {
    if ('connection' in navigator) {
      setNetworkStatus(navigator.connection.effectiveType)
    } else {
      setNetworkStatus('unknown')
    }
  }, [])

  return (
    <div className={styles.appWrapper}>
      <h1 className={styles.heading}>🌤️ Smart Weather App</h1>
      <p className={styles.networkInfo}>
        📶 Network Type: <strong>{networkStatus}</strong>
      </p>
      {networkStatus === '2g' && <p className={styles.networkAlert}>⚠️ You are on a slow network!</p>}
      {weatherData ? (
        <>
          <WeatherCard data={weatherData} />
          <CanvasWeather weather={weatherData.weathercode} />
        </>
      ) : (
        <p className={styles.loading}>Fetching weather data...</p>
      )}
    </div>
  )
}

export default App

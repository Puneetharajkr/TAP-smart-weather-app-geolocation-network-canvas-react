import React from 'react'
import styles from './styles/WeatherCard.module.css'

const WeatherCard = ({ data }) => {
  return (
    <div className={styles.card}>
      <h2>📍 Current Weather</h2>
      <p><strong>Temperature:</strong> {data.temperature}°C</p>
      <p><strong>Wind Speed:</strong> {data.windspeed} km/h</p>
      <p><strong>Weather Code:</strong> {data.weathercode}</p>
    </div>
  )
}

export default WeatherCard

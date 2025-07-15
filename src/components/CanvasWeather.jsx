import React, { useEffect, useRef } from 'react'
import styles from './styles/CanvasWeather.module.css'

const CanvasWeather = ({ weather }) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // 🌅 1. Draw gradient sky background
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
    gradient.addColorStop(0, '#c471f5') // violet
    gradient.addColorStop(1, '#fa71cd') // pinkish purple
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    if (typeof weather !== 'number') return

    // Optional shadow
    ctx.shadowColor = 'rgba(0,0,0,0.2)'
    ctx.shadowBlur = 6

    // ☀️ 2. Sunny (Weather code 0) → emoji sun
    if (weather === 0) {
      ctx.font = '48px serif'
      ctx.fillStyle = 'orange'
      ctx.fillText('☀️', 55, 85)
    }

    // ☁️ 3. Cloudy (1–3) → emoji cloud
    else if (weather >= 1 && weather <= 3) {
      ctx.font = '48px serif'
      ctx.fillStyle = '#555'
      ctx.fillText('☁️', 55, 85)
    }

    // 🌧️ 4. Rainy (others) → cloud + animated raindrops
    else {
      ctx.font = '48px serif'
      ctx.fillStyle = '#555'
      ctx.fillText('🌧️', 55, 85)

      // Animate rain drops falling every 500ms
      let dropY = 100
      const animate = () => {
        ctx.clearRect(0, 100, canvas.width, canvas.height - 100)
        for (let i = 0; i < 3; i++) {
          const x = 60 + i * 20
          ctx.beginPath()
          ctx.moveTo(x, dropY)
          ctx.lineTo(x, dropY + 10)
          ctx.strokeStyle = '#0077ff'
          ctx.lineWidth = 2
          ctx.stroke()
        }

        dropY += 3
        if (dropY > 130) dropY = 100
        requestAnimationFrame(animate)
      }

      animate()
    }
  }, [weather])

  return (
    <canvas
      ref={canvasRef}
      className={styles.canvas}
      width={150}
      height={150}
    />
  )
}

export default CanvasWeather

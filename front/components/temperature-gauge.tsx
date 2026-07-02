"use client"

import { useEffect, useRef } from "react"
import { EQUESTRE_PRIMARY } from "@/lib/colors"

interface TemperatureGaugeProps {
  temperature: number
  time: string
}

export function TemperatureGauge({ temperature, time }: TemperatureGaugeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const size = 100
    canvas.width = size
    canvas.height = size

    const centerX = size / 2
    const centerY = size / 2
    const radius = size / 2 - 10

    // Clear canvas
    ctx.clearRect(0, 0, size, size)

    // Draw background circle
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
    ctx.strokeStyle = "#E9E4D4"
    ctx.lineWidth = 8
    ctx.stroke()

    // Calculate temperature arc (normal range: 37-38.5°C)
    const minTemp = 36
    const maxTemp = 40
    const normalizedTemp = Math.max(0, Math.min(1, (temperature - minTemp) / (maxTemp - minTemp)))
    const startAngle = -Math.PI / 2
    const endAngle = startAngle + normalizedTemp * 2 * Math.PI

    // Determine color based on temperature
    let color = EQUESTRE_PRIMARY // Normal - green
    if (temperature > 38.5) {
      color = "#E74C3C" // Alert - red
    } else if (temperature < 37) {
      color = EQUESTRE_PRIMARY // Low - blue
    }

    // Draw temperature arc
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, startAngle, endAngle)
    ctx.strokeStyle = color
    ctx.lineWidth = 8
    ctx.lineCap = "round"
    ctx.stroke()

    ctx.fillStyle = EQUESTRE_PRIMARY
    ctx.font = "bold 20px sans-serif"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(`${temperature}°C`, centerX, centerY)
  }, [temperature])

  return (
    <div className="flex flex-col items-center justify-center py-2">
      <canvas ref={canvasRef} className="max-w-full" />
    </div>
  )
}

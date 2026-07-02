"use client"

import { useEffect, useRef } from "react"
import { EQUESTRE_PRIMARY } from "@/lib/colors"

interface HeartRateChartProps {
  values: number[]
  labels: string[]
}

export function HeartRateChart({ values, labels }: HeartRateChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const width = canvas.offsetWidth
    const height = 120
    canvas.width = width
    canvas.height = height

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Chart dimensions
    const padding = 30
    const chartWidth = width - 2 * padding
    const chartHeight = height - 2 * padding

    // Find min and max values for scaling
    const maxValue = Math.max(...values) + 5
    const minValue = Math.min(...values) - 5

    // Draw grid lines (reduced to 2 lines for compact view)
    ctx.strokeStyle = "#E9E4D4"
    ctx.lineWidth = 1
    for (let i = 0; i <= 2; i++) {
      const y = padding + (chartHeight / 2) * i
      ctx.beginPath()
      ctx.moveTo(padding, y)
      ctx.lineTo(width - padding, y)
      ctx.stroke()

      // Draw y-axis labels
      const value = Math.round(maxValue - (maxValue - minValue) * (i / 2))
      ctx.fillStyle = "#9CA3AF"
      ctx.font = "10px sans-serif"
      ctx.textAlign = "right"
      ctx.fillText(`${value}`, padding - 5, y + 3)
    }

    // Calculate points
    const points = values.map((value, index) => {
      const x = padding + (chartWidth / (values.length - 1)) * index
      const normalizedValue = (value - minValue) / (maxValue - minValue)
      const y = padding + chartHeight - normalizedValue * chartHeight
      return { x, y, value }
    })

    // Draw area under line
    ctx.beginPath()
    ctx.moveTo(points[0].x, height - padding)
    points.forEach((point) => {
      ctx.lineTo(point.x, point.y)
    })
    ctx.lineTo(points[points.length - 1].x, height - padding)
    ctx.closePath()
    ctx.fillStyle = "rgba(78, 110, 88, 0.1)"
    ctx.fill()

    // Draw line
    ctx.beginPath()
    ctx.moveTo(points[0].x, points[0].y)
    points.forEach((point, index) => {
      if (index > 0) {
        ctx.lineTo(point.x, point.y)
      }
    })
    ctx.strokeStyle = EQUESTRE_PRIMARY
    ctx.lineWidth = 2
    ctx.lineCap = "round"
    ctx.lineJoin = "round"
    ctx.stroke()

    // Draw points (smaller for compact view)
    points.forEach((point) => {
      ctx.beginPath()
      ctx.arc(point.x, point.y, 3, 0, 2 * Math.PI)
      ctx.fillStyle = EQUESTRE_PRIMARY
      ctx.fill()
      ctx.strokeStyle = "#ffffff"
      ctx.lineWidth = 1.5
      ctx.stroke()
    })

    // Draw x-axis labels
    labels.forEach((label, index) => {
      const x = padding + (chartWidth / (labels.length - 1)) * index
      ctx.fillStyle = "#9CA3AF"
      ctx.font = "9px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(label, x, height - padding + 15)
    })

    // Draw current value (smaller font for compact view)
    const lastPoint = points[points.length - 1]
    ctx.fillStyle = EQUESTRE_PRIMARY
    ctx.font = "bold 11px sans-serif"
    ctx.textAlign = "center"
    ctx.fillText(`${lastPoint.value}`, lastPoint.x, lastPoint.y - 10)
  }, [values, labels])

  return (
    <div className="w-full h-full">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}

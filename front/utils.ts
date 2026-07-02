"use client"

interface SpeedIndicatorProps {
  speed: number
}

export function SpeedIndicator({ speed }: SpeedIndicatorProps) {
  const getSpeedStatus = () => {
    if (speed === 0) return { label: "Arrêt", color: "text-equestre-muted bg-equestre-muted/10" }
    if (speed < 5) return { label: "Marche", color: "text-equestre-blue bg-equestre-blue/10" }
    if (speed < 15) return { label: "Trot", color: "text-equestre-green bg-equestre-green/10" }
    return { label: "Galop", color: "text-equestre-alert bg-equestre-alert/10" }
  }

  const status = getSpeedStatus()

  return (
    <div className="flex flex-col items-center justify-center py-2">
      <div className="text-3xl font-bold text-equestre-primary mb-1">{speed}</div>
      <div className="text-xs text-equestre-muted mb-2">km/h</div>
      <div className={`px-3 py-1 rounded-full text-xs font-medium ${status.color}`}>{status.label}</div>
    </div>
  )
}

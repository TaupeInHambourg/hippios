"use client"

import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

interface BackButtonProps {
  defaultPath?: string
  className?: string
  variant?: "icon" | "button"
  size?: "default" | "sm" | "lg" | "icon"
  label?: string
}

export function BackButton({
  defaultPath = "/",
  className = "",
  variant = "icon",
  size = "sm",
  label = "Retour"
}: BackButtonProps) {
  const router = useRouter()

  const handleBack = () => {
    // Vérifier si on peut revenir en arrière dans l'historique
    if (window.history.length > 1) {
      router.back()
    } else {
      // Sinon, aller vers le chemin par défaut
      router.push(defaultPath)
    }
  }

  if (variant === "icon") {
    return (
      <button onClick={handleBack} className={className} aria-label={label}>
        <ArrowLeft className="h-6 w-6 text-white" />
      </button>
    )
  }

  return (
    <Button onClick={handleBack} variant="outline" size={size} className={`gap-1.5 ${className}`}>
      <ArrowLeft className="h-3.5 w-3.5" />
      {label}
    </Button>
  )
}


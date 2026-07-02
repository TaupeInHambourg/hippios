"use client"

import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-equestre-background">
      <Navbar />

      <main className="container mx-auto px-4 py-6">
        <Card className="max-w-md mx-auto mt-12">
          <div className="p-8 text-center">
            <AlertCircle className="h-16 w-16 text-equestre-alert mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-equestre-primary mb-2">
              Alerte introuvable
            </h1>
            <p className="text-equestre-muted mb-6">
              L'alerte que vous recherchez n'existe pas ou a été supprimée.
            </p>
            <Link href="/alertes">
              <Button className="w-full">Retour aux alertes</Button>
            </Link>
          </div>
        </Card>
      </main>
    </div>
  )
}


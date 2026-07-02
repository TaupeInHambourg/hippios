"use client"

import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"

const chevaux = [
  {
    id: 1,
    nom: "Eclipse Royale",
    race: "Pur-sang Arabe",
    age: "5 ans",
    etatSante: "Bon état",
    statut: "bon",
    image: "/Cheval1.jpg",
    temperature: { valeur: 37.8, unite: "°C", heure: "10h30" },
    rythmeCardiaque: {
      valeurs: [32, 35, 38, 42, 39, 36, 34],
      horaires: ["6h", "7h", "8h", "9h", "10h", "11h", "12h"],
    },
  },
  {
    id: 2,
    nom: "Thunder Storm",
    race: "Frison",
    age: "7 ans",
    etatSante: "Moyen",
    statut: "moyen",
    image: "/Cheval2.jpg",
    temperature: { valeur: 37.2, unite: "°C", heure: "10h15" },
    rythmeCardiaque: {
      valeurs: [30, 33, 36, 40, 38, 35, 32],
      horaires: ["6h", "7h", "8h", "9h", "10h", "11h", "12h"],
    },
  },
  {
    id: 3,
    nom: "Belle de Jour",
    race: "Quarter Horse",
    age: "4 ans",
    etatSante: "Alerte - surveillance",
    statut: "alerte",
    image: "/Cheval3.jpg",
    temperature: { valeur: 39.1, unite: "°C", heure: "10h45" },
    rythmeCardiaque: {
      valeurs: [45, 50, 55, 60, 58, 52, 48],
      horaires: ["6h", "7h", "8h", "9h", "10h", "11h", "12h"],
    },
  },
  {
    id: 4,
    nom: "Midnight Shadow",
    race: "Lipizzan",
    age: "6 ans",
    etatSante: "Bon état",
    statut: "bon",
    image: "/Cheval4.jpg",
    temperature: { valeur: 37.5, unite: "°C", heure: "10h00" },
    rythmeCardiaque: {
      valeurs: [31, 34, 37, 41, 38, 35, 33],
      horaires: ["6h", "7h", "8h", "9h", "10h", "11h", "12h"],
    },
  },
]

export default function ChevauxPage() {
  // Trier les chevaux par statut : alerte -> moyen -> bon
  const chevauxTries = [...chevaux].sort((a, b) => {
    const priorite = { alerte: 0, moyen: 1, bon: 2 }
    return priorite[a.statut as keyof typeof priorite] - priorite[b.statut as keyof typeof priorite]
  })

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case "bon":
        return "bg-equestre-green"
      case "moyen":
        return "bg-equestre-orange"
      case "alerte":
        return "bg-equestre-alert"
      default:
        return "bg-equestre-muted"
    }
  }

  return (
    <div className="min-h-screen bg-equestre-background">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {chevauxTries.map((cheval) => (
            <Link key={cheval.id} href={`/cheval/${cheval.id}`}>
              <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-equestre-border bg-white p-0">
                {/* Horse Image */}
                <div className="relative h-48 w-full overflow-hidden bg-equestre-soft rounded-t-lg">
                  <Image
                    src={cheval.image}
                    alt={cheval.nom}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                  {/* Status Badge on Image */}
                  <div className="absolute top-3 right-3">
                    <div
                      className={`px-3 py-1.5 rounded-full text-xs font-medium text-white ${getStatusColor(
                        cheval.statut,
                      )}`}
                    >
                      {cheval.etatSante}
                    </div>
                  </div>
                </div>

                <div className="p-6">{/* Horse Info */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-equestre-primary">
                      {cheval.nom}
                    </h3>
                    <div className="space-y-1 text-sm text-equestre-muted">
                      <p className="flex items-center gap-2">
                        <span className="font-medium text-equestre-primary">Race:</span>
                        <span>{cheval.race}</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <span className="font-medium text-equestre-primary">Âge:</span>
                        <span>{cheval.age}</span>
                      </p>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="mt-4 pt-4 border-t border-equestre-border flex items-center justify-between">
                    <div className="text-center">
                      <div className="text-xs text-equestre-muted mb-1">Température</div>
                      <div className="text-lg font-bold text-equestre-primary">{cheval.temperature.valeur}°C</div>
                    </div>
                    <div className="h-8 w-px bg-equestre-border" />
                    <div className="text-center">
                      <div className="text-xs text-equestre-muted mb-1">Rythme cardiaque</div>
                      <div className="text-lg font-bold text-equestre-primary">
                        {cheval.rythmeCardiaque.valeurs[cheval.rythmeCardiaque.valeurs.length - 1]} bpm
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}


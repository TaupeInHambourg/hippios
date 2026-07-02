"use client"

import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { Activity, Heart, AlertTriangle, TrendingUp, Calendar, Pill, Syringe, Stethoscope, AlertCircle, ChevronRight } from "lucide-react"
import { alertes, type AlertePriorite } from "@/lib/alertes-data"

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


export default function HomePage() {
  // Statistiques globales
  const totalChevaux = chevaux.length
  const chevauxEnBonEtat = chevaux.filter(c => c.statut === "bon").length
  const chevauxEnAlerte = chevaux.filter(c => c.statut === "alerte").length
  const chevauxEnMoyenEtat = chevaux.filter(c => c.statut === "moyen").length

  // Filtrer les alertes des 3 prochains jours
  const alertesUrgentes = alertes
    .filter(a => a.joursRestants >= 0 && a.joursRestants <= 3)
    .sort((a, b) => a.joursRestants - b.joursRestants)

  const getIconeAlerte = (type: string) => {
    switch (type) {
      case "rdv":
        return <Calendar className="h-4 w-4" />
      case "medicament":
        return <Pill className="h-4 w-4" />
      case "vaccin":
        return <Syringe className="h-4 w-4" />
      case "sante":
        return <Stethoscope className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  const getCouleurPriorite = (priorite: AlertePriorite) => {
    return "border-l-equestre-primary"
  }

  const getCouleurIcone = (priorite: AlertePriorite) => {
    return "text-equestre-primary"
  }

  const getMessageEcheance = (joursRestants: number) => {
    if (joursRestants === 0) return "Aujourd'hui"
    if (joursRestants === 1) return "Demain"
    return `Dans ${joursRestants} jour(s)`
  }

  return (
    <div className="min-h-screen bg-equestre-background">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 pb-24">
        {/* Logo */}
        <div className="mb-6">
          <Image
            src="/Logo Stryde.png"
            alt="Logo Stryde"
            width={150}
            height={50}
            className="object-contain"
          />
        </div>

      <h2 className="text-lg font-bold text-equestre-primary flex items-center gap-2">
          Vue d'ensemble
      </h2>
        {/* Statistiques globales */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Link href="/chevaux">
            <Card className="p-4 border-equestre-border bg-white hover:shadow-lg transition-all duration-300 cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-equestre-primary/10 rounded-lg">
                  <Activity className="h-5 w-5 text-equestre-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-equestre-primary">{totalChevaux}</p>
                  <p className="text-xs text-equestre-muted">Chevaux</p>
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/chevaux">
            <Card className="p-4 border-equestre-border bg-white hover:shadow-lg transition-all duration-300 cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-equestre-green/10 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-equestre-green" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-equestre-green">{chevauxEnBonEtat}</p>
                  <p className="text-xs text-equestre-muted">Bon état</p>
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/chevaux">
            <Card className="p-4 border-equestre-border bg-white hover:shadow-lg transition-all duration-300 cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-equestre-alert/10 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-equestre-alert" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-equestre-alert">{chevauxEnAlerte}</p>
                  <p className="text-xs text-equestre-muted">En alerte</p>
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/chevaux">
            <Card className="p-4 border-equestre-border bg-white hover:shadow-lg transition-all duration-300 cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-equestre-orange/10 rounded-lg">
                  <Heart className="h-5 w-5 text-equestre-orange" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-equestre-orange">{chevauxEnMoyenEtat}</p>
                  <p className="text-xs text-equestre-muted">Moyen</p>
                </div>
              </div>
            </Card>
          </Link>
        </div>

        {/* Rappels urgents */}
        {alertesUrgentes.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold text-equestre-primary flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Rappels
              </h2>
              <Link
                href="/alertes"
                className="text-xs text-equestre-primary hover:underline flex items-center gap-1"
              >
                Voir tout
                <ChevronRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="flex gap-3 flex-wrap">
              {alertesUrgentes.slice(0, 2).map((alerte) => (
                <Link key={alerte.id} href={`/alertes/${alerte.id}`} className="flex-1 min-w-[150px]">
                  <Card className={`border-l-4 ${getCouleurPriorite(alerte.priorite)} hover:shadow-md transition-all duration-300 cursor-pointer`}>
                    <div className="p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`${getCouleurIcone(alerte.priorite)}`}>
                          {getIconeAlerte(alerte.type)}
                        </div>
                        <h3 className="font-semibold text-equestre-primary text-xs truncate flex-1">
                          {alerte.titre}
                        </h3>
                      </div>
                      {alerte.chevalNom && (
                        <div className="text-xs text-equestre-muted mb-1">
                          {alerte.chevalNom}
                        </div>
                      )}
                      <div className={`text-xs font-bold ${getCouleurIcone(alerte.priorite)}`}>
                        {getMessageEcheance(alerte.joursRestants)}
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

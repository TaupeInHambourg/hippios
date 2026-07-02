"use client"

import { use } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, Thermometer, Gauge, Download } from "lucide-react"
import { TemperatureGauge } from "@/components/temperature-gauge"
import { HeartRateChart } from "@/components/heart-rate-chart"
import { SpeedIndicator } from "@/components/speed-indicator"
import { Navbar } from "@/components/navbar"
import { BackButton } from "@/components/back-button"

const chevauxData = [
  {
    id: 1,
    nom: "Eclipse Royale",
    race: "Pur-sang Arabe",
    age: "5 ans",
    etatSante: "Bon état",
    statut: "bon",
    image: "/Cheval1.jpg",
    temperature: { valeur: 37.8, unite: "°C", heure: "10h30" },
    speed: 12,
    rythmeCardiaque: {
      valeurs: [32, 35, 38, 42, 39, 36, 34],
      horaires: ["6h", "7h", "8h", "9h", "10h", "11h", "12h"],
    },
    historique: {
      hier: {
        temperature: [37.5, 37.8, 38.0, 37.9, 37.7],
        rythmeCardiaque: [34, 36, 39, 38, 35],
        speed: [0, 10, 15, 8, 0],
        horaires: ["8h", "10h", "12h", "14h", "16h"],
      },
      semaine: {
        temperature: [37.6, 37.8, 37.5, 37.9, 38.1, 37.7, 37.8],
        rythmeCardiaque: [33, 35, 34, 38, 40, 36, 34],
        speed: [5, 12, 8, 15, 18, 10, 12],
        jours: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
      },
      mois: {
        temperature: [37.5, 37.7, 37.8, 37.6],
        rythmeCardiaque: [34, 36, 38, 35],
        speed: [10, 12, 15, 11],
        semaines: ["S1", "S2", "S3", "S4"],
      },
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
    speed: 0,
    rythmeCardiaque: {
      valeurs: [30, 33, 36, 40, 38, 35, 32],
      horaires: ["6h", "7h", "8h", "9h", "10h", "11h", "12h"],
    },
    historique: {
      hier: {
        temperature: [37.0, 37.2, 37.3, 37.1, 37.0],
        rythmeCardiaque: [30, 32, 35, 33, 31],
        speed: [0, 8, 12, 6, 0],
        horaires: ["8h", "10h", "12h", "14h", "16h"],
      },
      semaine: {
        temperature: [37.1, 37.2, 37.0, 37.3, 37.4, 37.1, 37.2],
        rythmeCardiaque: [31, 33, 32, 35, 37, 33, 32],
        speed: [4, 10, 7, 13, 16, 9, 0],
        jours: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
      },
      mois: {
        temperature: [37.0, 37.2, 37.3, 37.1],
        rythmeCardiaque: [32, 34, 36, 33],
        speed: [9, 11, 14, 10],
        semaines: ["S1", "S2", "S3", "S4"],
      },
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
    speed: 18,
    rythmeCardiaque: {
      valeurs: [45, 50, 55, 60, 58, 52, 48],
      horaires: ["6h", "7h", "8h", "9h", "10h", "11h", "12h"],
    },
    historique: {
      hier: {
        temperature: [38.8, 39.0, 39.2, 39.1, 38.9],
        rythmeCardiaque: [48, 52, 58, 55, 50],
        speed: [0, 15, 20, 12, 0],
        horaires: ["8h", "10h", "12h", "14h", "16h"],
      },
      semaine: {
        temperature: [38.7, 38.9, 38.8, 39.0, 39.2, 39.0, 39.1],
        rythmeCardiaque: [46, 50, 48, 55, 60, 52, 48],
        speed: [8, 18, 12, 22, 25, 15, 18],
        jours: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
      },
      mois: {
        temperature: [38.6, 38.8, 39.0, 39.1],
        rythmeCardiaque: [45, 50, 55, 52],
        speed: [14, 17, 20, 18],
        semaines: ["S1", "S2", "S3", "S4"],
      },
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
    speed: 3,
    rythmeCardiaque: {
      valeurs: [31, 34, 37, 41, 38, 35, 33],
      horaires: ["6h", "7h", "8h", "9h", "10h", "11h", "12h"],
    },
    historique: {
      hier: {
        temperature: [37.3, 37.5, 37.7, 37.6, 37.4],
        rythmeCardiaque: [32, 34, 38, 36, 33],
        speed: [0, 11, 16, 9, 0],
        horaires: ["8h", "10h", "12h", "14h", "16h"],
      },
      semaine: {
        temperature: [37.4, 37.5, 37.3, 37.6, 37.8, 37.5, 37.5],
        rythmeCardiaque: [32, 34, 33, 37, 39, 35, 33],
        speed: [6, 13, 9, 17, 19, 11, 3],
        jours: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
      },
      mois: {
        temperature: [37.3, 37.5, 37.6, 37.5],
        rythmeCardiaque: [33, 35, 37, 34],
        speed: [11, 13, 16, 12],
        semaines: ["S1", "S2", "S3", "S4"],
      },
    },
  },
]

export default function ChevalDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = use(params)
  const cheval = chevauxData.find((c) => c.id === Number.parseInt(resolvedParams.id))

  if (!cheval) {
    return <div>Cheval non trouvé</div>
  }

  const downloadHistoricalPDF = () => {
    const pdfContent = `
RAPPORT DE SANTÉ - ${cheval.nom}
Race: ${cheval.race}
Âge: ${cheval.age}
État de santé: ${cheval.etatSante}

==============================

DONNÉES D'HIER
==============================
Horaires: ${cheval.historique.hier.horaires.join(", ")}
Température (°C): ${cheval.historique.hier.temperature.join(", ")}
Rythme cardiaque (bpm): ${cheval.historique.hier.rythmeCardiaque.join(", ")}
Vitesse (km/h): ${cheval.historique.hier.speed.join(", ")}

==============================

DONNÉES DE LA SEMAINE
==============================
Jours: ${cheval.historique.semaine.jours.join(", ")}
Température (°C): ${cheval.historique.semaine.temperature.join(", ")}
Rythme cardiaque (bpm): ${cheval.historique.semaine.rythmeCardiaque.join(", ")}
Vitesse (km/h): ${cheval.historique.semaine.speed.join(", ")}

==============================

DONNÉES DU MOIS
==============================
Semaines: ${cheval.historique.mois.semaines.join(", ")}
Température (°C): ${cheval.historique.mois.temperature.join(", ")}
Rythme cardiaque (bpm): ${cheval.historique.mois.rythmeCardiaque.join(", ")}
Vitesse (km/h): ${cheval.historique.mois.speed.join(", ")}

Rapport généré le ${new Date().toLocaleDateString("fr-FR")}
    `.trim()

    const blob = new Blob([pdfContent], { type: "text/plain" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `rapport-${cheval.nom.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-equestre-background">
      <Navbar />

      <header className="sticky z-40 bg-equestre-primary/95 backdrop-blur-sm border-b border-equestre-primary-dark">
        {/* Image de fond */}
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={cheval.image}
            alt={cheval.nom}
            fill
            className="object-cover"
            priority
          />
          {/* Overlay sombre pour améliorer la lisibilité */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

          {/* Contenu du header */}
          <div className="absolute inset-0">
            <div className="container mx-auto px-4 py-4 h-full flex flex-col justify-between">
              {/* Bouton retour */}
              <div className="flex items-start">
                <BackButton defaultPath="/" />
              </div>

              {/* Informations du cheval */}
              <div className="pb-2">
                <h1 className="text-2xl font-bold text-white mb-1">{cheval.nom}</h1>
                <p className="text-sm text-white/90">
                  {cheval.race} • {cheval.age}
                </p>
                <div className="mt-2">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium text-white ${
                    cheval.statut === "bon" ? "bg-equestre-green" :
                    cheval.statut === "moyen" ? "bg-equestre-orange" :
                    "bg-equestre-alert"
                  }`}>
                    {cheval.etatSante}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-4 space-y-4">
        <Card className="bg-white border-equestre-border">
          <Tabs defaultValue="info" className="w-full">
            <TabsList className="w-full justify-start rounded-none border-b border-equestre-border bg-transparent p-0 overflow-x-auto flex-nowrap scrollbar-hide">
              <TabsTrigger
                value="info"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-equestre-primary data-[state=active]:bg-transparent data-[state=active]:text-equestre-primary whitespace-nowrap"
              >
                Info
              </TabsTrigger>
              <TabsTrigger
                value="parents"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-equestre-primary data-[state=active]:bg-transparent data-[state=active]:text-equestre-primary whitespace-nowrap"
              >
                Parents
              </TabsTrigger>
              <TabsTrigger
                value="historique"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-equestre-primary data-[state=active]:bg-transparent data-[state=active]:text-equestre-primary whitespace-nowrap"
              >
                Historique
              </TabsTrigger>
              <TabsTrigger
                value="agenda"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-equestre-primary data-[state=active]:bg-transparent data-[state=active]:text-equestre-primary whitespace-nowrap"
              >
                Agenda
              </TabsTrigger>
              <TabsTrigger
                value="documents"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-equestre-primary data-[state=active]:bg-transparent data-[state=active]:text-equestre-primary whitespace-nowrap"
              >
                Documents
              </TabsTrigger>
              <TabsTrigger
                value="capteur"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-equestre-primary data-[state=active]:bg-transparent data-[state=active]:text-equestre-primary whitespace-nowrap"
              >
                Capteur
              </TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="p-4">
              <div className="flex flex-col gap-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="group relative overflow-hidden rounded-xl border border-equestre-border/50 bg-gradient-to-br from-white to-equestre-soft/20 p-3 hover:shadow-md hover:border-equestre-primary/50 transition-all duration-300">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-equestre-primary/10 group-hover:bg-equestre-primary/20 transition-colors">
                          <Thermometer className="h-3.5 w-3.5 text-equestre-primary" />
                        </div>
                        <h3 className="text-xs font-semibold text-equestre-primary">Température</h3>
                      </div>
                      <span className="text-[10px] text-equestre-muted bg-equestre-soft/50 px-2 py-0.5 rounded-full">{cheval.temperature.heure}</span>
                    </div>
                    <TemperatureGauge temperature={cheval.temperature.valeur} time={cheval.temperature.heure} />
                  </div>

                  <div className="group relative overflow-hidden rounded-xl border border-equestre-border/50 bg-gradient-to-br from-white to-equestre-soft/20 p-3 hover:shadow-md hover:border-equestre-primary/50 transition-all duration-300">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-equestre-primary/10 group-hover:bg-equestre-primary/20 transition-colors">
                          <Gauge className="h-3.5 w-3.5 text-equestre-primary" />
                        </div>
                        <h3 className="text-xs font-semibold text-equestre-primary">Vitesse</h3>
                      </div>
                      <span className="text-[10px] text-equestre-muted bg-equestre-soft/50 px-2 py-0.5 rounded-full">km/h</span>
                    </div>
                    <SpeedIndicator speed={cheval.speed} />
                  </div>
                </div>

                <div className="group relative overflow-hidden rounded-xl border border-equestre-border/50 bg-gradient-to-br from-white to-equestre-soft/20 p-3 hover:shadow-md hover:border-equestre-primary/50 transition-all duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-equestre-primary/10 group-hover:bg-equestre-primary/20 transition-colors">
                        <Activity className="h-3.5 w-3.5 text-equestre-primary" />
                      </div>
                      <h3 className="text-xs font-semibold text-equestre-primary">Rythme cardiaque</h3>
                    </div>
                    <span className="text-[10px] text-equestre-muted bg-equestre-soft/50 px-2 py-0.5 rounded-full">Temps réel</span>
                  </div>
                  <div className="h-28">
                    <HeartRateChart
                      values={cheval.rythmeCardiaque.valeurs.slice(-5)}
                      labels={cheval.rythmeCardiaque.horaires.slice(-5)}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="parents" className="p-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-equestre-primary">Informations parentales</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-equestre-soft">
                    <p className="text-sm text-equestre-muted mb-1">Père</p>
                    <p className="font-medium text-equestre-primary">Noble Spirit</p>
                  </div>
                  <div className="p-4 rounded-lg bg-equestre-soft">
                    <p className="text-sm text-equestre-muted mb-1">Mère</p>
                    <p className="font-medium text-equestre-primary">Bella Luna</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="historique" className="p-6">
              <div className="space-y-4 text-center">
                <h4 className="font-semibold text-equestre-primary">Données historiques</h4>
                <p className="text-sm text-equestre-muted">
                  Téléchargez le rapport complet des données de santé incluant les graphiques d'hier, de la semaine
                  dernière et du mois dernier.
                </p>
                <Button
                  onClick={downloadHistoricalPDF}
                  className="bg-equestre-primary text-white hover:bg-equestre-primary-dark"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Télécharger le rapport PDF
                </Button>
                <div className="mt-6 p-4 rounded-lg bg-equestre-soft text-left">
                  <p className="text-xs font-semibold text-equestre-primary mb-2">Le rapport inclut :</p>
                  <ul className="text-xs text-equestre-muted space-y-1 list-disc list-inside">
                    <li>Données de température complètes</li>
                    <li>Historique du rythme cardiaque</li>
                    <li>Graphiques de vitesse</li>
                    <li>Données d'hier, de la semaine et du mois</li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="agenda" className="p-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-equestre-primary mb-4">Rendez-vous à venir</h4>
                {[
                  { date: "15 Déc 2024", time: "09h00", event: "Entraînement - Saut d'obstacles" },
                  { date: "18 Déc 2024", time: "14h30", event: "Visite du maréchal-ferrant" },
                  { date: "22 Déc 2024", time: "10h00", event: "Contrôle vétérinaire trimestriel" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 rounded-lg border border-equestre-border hover:border-equestre-primary transition-colors"
                  >
                    <div className="text-center">
                      <div className="text-2xl font-bold text-equestre-primary">{item.date.split(" ")[0]}</div>
                      <div className="text-xs text-equestre-muted uppercase">{item.date.split(" ")[1]}</div>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-equestre-primary">{item.event}</p>
                      <p className="text-sm text-equestre-muted mt-1">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="documents" className="p-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-equestre-primary mb-4">Documents disponibles</h4>
                {[
                  { name: "Certificat de vaccination 2024", type: "PDF", size: "245 KB" },
                  { name: "Carnet de santé", type: "PDF", size: "1.2 MB" },
                  { name: "Pedigree complet", type: "PDF", size: "180 KB" },
                  { name: "Assurance équine", type: "PDF", size: "320 KB" },
                ].map((doc, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg border border-equestre-border hover:border-equestre-primary transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded bg-equestre-soft">
                        <svg
                          className="h-5 w-5 text-equestre-primary"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-equestre-primary">{doc.name}</p>
                        <p className="text-xs text-equestre-muted">
                          {doc.type} • {doc.size}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="capteur" className="p-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-equestre-primary mb-4">Capteur associé</h4>
                <div className="p-6 rounded-lg border-2 border-equestre-green bg-equestre-green/5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-3 w-3 rounded-full bg-equestre-green animate-pulse" />
                      <span className="font-medium text-equestre-primary">Capteur actif</span>
                    </div>
                    <span className="text-xs text-equestre-muted">ID: EQ-{cheval.id}2024</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <p className="text-xs text-equestre-muted mb-1">Batterie</p>
                      <p className="text-lg font-bold text-equestre-primary">87%</p>
                    </div>
                    <div>
                      <p className="text-xs text-equestre-muted mb-1">Signal</p>
                      <p className="text-lg font-bold text-equestre-primary">Excellent</p>
                    </div>
                    <div>
                      <p className="text-xs text-equestre-muted mb-1">Dernière synchro</p>
                      <p className="text-lg font-bold text-equestre-primary">Il y a 2 min</p>
                    </div>
                    <div>
                      <p className="text-xs text-equestre-muted mb-1">Version firmware</p>
                      <p className="text-lg font-bold text-equestre-primary">v2.3.1</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </main>
    </div>
  )
}

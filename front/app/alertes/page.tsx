"use client"

import { Navbar } from "@/components/navbar"
import { Card } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Calendar, Pill, Syringe, Stethoscope, AlertCircle, CheckCircle } from "lucide-react"
import Link from "next/link"
import { alertes, type AlertePriorite } from "@/lib/alertes-data"

export default function AlertesPage() {
  const getIcone = (type: string) => {
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
    if (joursRestants < 0) return `En retard de ${Math.abs(joursRestants)} jour(s)`
    return `Dans ${joursRestants} jour(s)`
  }

  const alertesTriees = [...alertes].sort((a, b) => {
    // Trier par jours restants (les plus urgents en premier)
    return a.joursRestants - b.joursRestants
  })

  const alertesAVenir = alertesTriees.filter(a => a.joursRestants >= 0)
  const alertesPassees = alertesTriees.filter(a => a.joursRestants < 0)

  return (
    <div className="min-h-screen bg-equestre-background">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-3 pb-24">
        <Tabs defaultValue="a-venir" className="w-full">
          <TabsList className="w-full grid grid-cols-2 mb-4">
            <TabsTrigger value="a-venir" className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              À venir ({alertesAVenir.length})
            </TabsTrigger>
            <TabsTrigger value="passees" className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Passées ({alertesPassees.length})
            </TabsTrigger>
          </TabsList>

          {/* Onglet À venir */}
          <TabsContent value="a-venir">
            {alertesAVenir.length > 0 ? (
              <div>
                {alertesAVenir.map((alerte) => (
                  <Link key={alerte.id} href={`/alertes/${alerte.id}`} className="block mb-2">
                    <Card
                      className={`border-l-4 ${getCouleurPriorite(alerte.priorite)} hover:shadow-md transition-all duration-300 cursor-pointer`}
                    >
                      <div className="p-2">
                        <div className="flex items-start gap-2">
                          {/* Icône */}
                          <div
                            className={`flex-shrink-0 ${getCouleurIcone(alerte.priorite)}`}
                          >
                            {getIcone(alerte.type)}
                          </div>

                          {/* Contenu */}
                          <div className="flex-grow">
                            <div className="flex items-start justify-between gap-2 mb-0.5">
                              <h3 className="text-sm font-bold text-equestre-primary">
                                {alerte.titre}
                              </h3>
                              <span
                                className="text-xs font-semibold px-2 py-0.5 rounded-full whitespace-nowrap bg-equestre-primary text-white"
                              >
                                {getMessageEcheance(alerte.joursRestants)}
                              </span>
                            </div>

                            <p className="text-xs text-equestre-muted mb-1">
                              {alerte.description}
                            </p>

                            <div className="flex items-center gap-4 text-xs text-equestre-muted">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                <span>{alerte.echeance}</span>
                              </div>
                              {alerte.chevalNom && (
                                <>
                                  <span className="text-equestre-border">•</span>
                                  <span className="font-medium text-equestre-primary">
                                    {alerte.chevalNom}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <CheckCircle className="h-16 w-16 text-equestre-primary mx-auto mb-2" />
                <h3 className="text-xl font-bold text-equestre-primary mb-2">
                  Aucune alerte à venir
                </h3>
                <p className="text-equestre-muted">
                  Tous vos chevaux sont à jour !
                </p>
              </div>
            )}
          </TabsContent>

          {/* Onglet Passées */}
          <TabsContent value="passees">
            {alertesPassees.length > 0 ? (
              <div>
                {alertesPassees.map((alerte) => (
                  <Link key={alerte.id} href={`/alertes/${alerte.id}`} className="block mb-2">
                    <Card
                      className={`border-l-4 ${getCouleurPriorite(alerte.priorite)} hover:shadow-md transition-all duration-300 opacity-60 cursor-pointer`}
                    >
                      <div className="p-2">
                        <div className="flex items-start gap-2">
                          {/* Icône */}
                          <div
                            className={`flex-shrink-0 ${getCouleurIcone(alerte.priorite)}`}
                          >
                            {getIcone(alerte.type)}
                          </div>

                          {/* Contenu */}
                          <div className="flex-grow">
                            <h3 className="text-sm font-bold text-equestre-primary mb-0.5">
                              {alerte.titre}
                            </h3>

                            <p className="text-xs text-equestre-muted mb-1">
                              {alerte.description}
                            </p>

                            <div className="flex items-center gap-4 text-xs text-equestre-muted">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                <span>{alerte.echeance}</span>
                              </div>
                              {alerte.chevalNom && (
                                <>
                                  <span className="text-equestre-border">•</span>
                                  <span className="font-medium text-equestre-primary">
                                    {alerte.chevalNom}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <CheckCircle className="h-16 w-16 text-equestre-primary mx-auto mb-2" />
                <h3 className="text-xl font-bold text-equestre-primary mb-2">
                  Aucune alerte passée
                </h3>
                <p className="text-equestre-muted">
                  Tout est en ordre !
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}


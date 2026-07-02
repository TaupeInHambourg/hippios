import { Navbar } from "@/components/navbar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BackButton } from "@/components/back-button"
import { alertes } from "@/lib/alertes-data"
import {
  Calendar,
  Pill,
  Syringe,
  Stethoscope,
  AlertCircle,
  Phone,
  MapPin,
  Euro,
  ExternalLink,
  AlertTriangle,
} from "lucide-react"
import Link from "next/link"

export default async function AlerteDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const alerteId = parseInt(id)
  const alerte = alertes.find((a) => a.id === alerteId)

  if (!alerte) {
    return (
      <div className="min-h-screen bg-equestre-background">
        <Navbar />
        <main className="container mx-auto px-4 py-3">
          <Card className="max-w-md mx-auto mt-12">
            <div className="p-8 text-center">
              <AlertCircle className="h-16 w-16 text-equestre-alert mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-equestre-primary mb-2">
                Alerte introuvable
              </h1>
              <p className="text-equestre-muted mb-6">
                L'alerte que vous recherchez n'existe pas ou a été supprimée.
              </p>
              <BackButton defaultPath="/alertes" variant="button" className="w-full" />
            </div>
          </Card>
        </main>
      </div>
    )
  }

  const getIcone = (type: string) => {
    switch (type) {
      case "rdv":
        return Calendar
      case "medicament":
        return Pill
      case "vaccin":
        return Syringe
      case "sante":
        return Stethoscope
      default:
        return AlertCircle
    }
  }

  const getCouleurPriorite = (priorite: string) => {
    return "bg-equestre-primary"
  }

  const getMessageEcheance = (joursRestants: number) => {
    if (joursRestants === 0) return "Aujourd'hui"
    if (joursRestants === 1) return "Demain"
    if (joursRestants < 0) return `En retard de ${Math.abs(joursRestants)} jour(s)`
    return `Dans ${joursRestants} jour(s)`
  }

  const Icone = getIcone(alerte.type)

  return (
    <div className="min-h-screen bg-equestre-background">
      <Navbar />

      <main className="container mx-auto px-4 py-3 pb-24">
        {/* Bouton retour */}
        <BackButton defaultPath="/alertes" variant="icon" className="mb-3" />

        {/* En-tête de l'alerte */}
        <Card className="mb-4 overflow-hidden">
          <div className={`h-1 ${getCouleurPriorite(alerte.priorite)}`} />
          <div className="p-4">
            <div className="flex items-start gap-3">
              <div
                className={`${getCouleurPriorite(alerte.priorite)} text-white p-3 rounded-lg`}
              >
                <Icone className="h-6 w-6" />
              </div>
              <div className="flex-grow min-w-0">
                <h1 className="text-2xl font-bold text-equestre-primary mb-2">
                  {alerte.titre}
                </h1>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span
                    className={`${getCouleurPriorite(alerte.priorite)} text-white text-sm font-semibold px-3 py-1.5 rounded-full`}
                  >
                    {getMessageEcheance(alerte.joursRestants)}
                  </span>
                  <span className="text-base text-equestre-muted">
                    {alerte.echeance}
                  </span>
                  {alerte.chevalNom && (
                    <>
                      <span className="text-equestre-muted">•</span>
                      <Link
                        href={`/cheval/${alerte.chevalId}`}
                        className="text-base text-equestre-muted hover:underline"
                      >
                        {alerte.chevalNom}
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Détails selon le type d'alerte */}
        {alerte.type === "rdv" && alerte.professionnel && (
          <Card>
            <div className="p-4">
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  <h2 className="text-lg font-bold text-equestre-primary mb-1">
                    {alerte.professionnel.nom}
                  </h2>
                  <p className="text-sm text-equestre-muted">{alerte.professionnel.specialite}</p>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <a
                  href={`tel:${alerte.professionnel.telephone}`}
                  className="flex items-center gap-3 p-3 bg-equestre-primary/5 rounded-lg hover:bg-equestre-primary/10 transition-colors"
                >
                  <Phone className="h-5 w-5 text-equestre-primary" />
                  <span className="font-medium text-equestre-primary">{alerte.professionnel.telephone}</span>
                </a>

                {alerte.professionnel.adresse && (
                  <div className="flex items-start gap-3 text-sm text-equestre-muted">
                    <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
                    <span>{alerte.professionnel.adresse}</span>
                  </div>
                )}
              </div>
            </div>
          </Card>
        )}

        {alerte.type === "medicament" && alerte.medicament && (
          <Card className="overflow-hidden">
            <div className="p-4">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <h2 className="text-lg font-bold text-equestre-primary mb-1">
                    {alerte.medicament.nom}
                  </h2>
                  <p className="text-sm text-equestre-muted">{alerte.medicament.dosage}</p>
                </div>
              </div>
            </div>

            <div className="bg-equestre-primary/10 border-t border-equestre-primary/20 p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-xs text-equestre-muted mb-0.5">{alerte.medicament.site}</p>
                  <p className="text-2xl font-bold text-equestre-primary">
                    {alerte.medicament.prix}
                  </p>
                </div>
              </div>
              <a
                href={alerte.medicament.urlAchat}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button className="w-full bg-equestre-primary hover:bg-equestre-primary/90">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Acheter maintenant
                </Button>
              </a>
            </div>
          </Card>
        )}

        {alerte.type === "vaccin" && alerte.vaccin && (
          <Card>
            <div className="p-2">
              <h2 className="text-lg font-bold text-equestre-primary mb-1">
                {alerte.vaccin.nom}
              </h2>
              <p className="text-sm text-equestre-muted mb-2">
                Protection valable {alerte.vaccin.dureeValidite}
              </p>

              <div className="border-t pt-2">
                <h3 className="text-base font-bold text-equestre-primary mb-2">
                  {alerte.vaccin.veterinaire.nom}
                </h3>

                <div className="space-y-2 mb-2">
                  <a
                    href={`tel:${alerte.vaccin.veterinaire.telephone}`}
                    className="flex items-center gap-3 p-3 bg-equestre-primary/5 rounded-lg hover:bg-equestre-primary/10 transition-colors"
                  >
                    <Phone className="h-5 w-5 text-equestre-primary" />
                    <span className="font-medium text-equestre-primary">{alerte.vaccin.veterinaire.telephone}</span>
                  </a>

                  {alerte.vaccin.veterinaire.adresse && (
                    <div className="flex items-start gap-3 text-sm text-equestre-muted">
                      <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
                      <span>{alerte.vaccin.veterinaire.adresse}</span>
                    </div>
                  )}

                  {alerte.vaccin.veterinaire.tarif && (
                    <div className="flex items-start gap-3 text-sm text-equestre-muted">
                      <Euro className="h-4 w-4 flex-shrink-0 mt-0.5" />
                      <span>{alerte.vaccin.veterinaire.tarif}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        )}

        {alerte.type === "sante" && alerte.sante && (
          <div className="space-y-3">
            <Card className="border-2 border-equestre-primary bg-equestre-primary/5">
              <div className="p-4">
                <div className="flex items-start gap-3 mb-3">
                  <AlertTriangle className="h-6 w-6 text-equestre-primary flex-shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-equestre-primary mb-1">URGENCE</p>
                    <p className="text-base text-equestre-primary font-medium">{alerte.sante.urgence}</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card>
              <div className="p-2">
                <h3 className="text-base font-bold text-foreground mb-2">
                  {alerte.sante.veterinaire.nom}
                </h3>

                <div className="space-y-2 mb-2">
                  <a
                    href={`tel:${alerte.sante.veterinaire.telephone}`}
                    className="flex items-center gap-3 p-3 bg-equestre-primary/5 rounded-lg hover:bg-equestre-primary/10 transition-colors"
                  >
                    <Phone className="h-5 w-5 text-equestre-primary" />
                    <span className="font-bold text-foreground">{alerte.sante.veterinaire.telephone}</span>
                  </a>

                  {alerte.sante.veterinaire.adresse && (
                    <div className="flex items-start gap-3 text-sm">
                      <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5 text-equestre-muted" />
                      <span className="text-foreground">{alerte.sante.veterinaire.adresse}</span>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>
        )}

        {alerte.type === "autre" && alerte.autreDetails && (
          <Card>
            <div className="p-1.5">
              <div className="space-y-2">
                {alerte.autreDetails.fournisseur && (
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-1">Fournisseur</p>
                    <p className="text-base text-equestre-muted">{alerte.autreDetails.fournisseur}</p>
                  </div>
                )}

                {alerte.autreDetails.lieu && (
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-1">Lieu</p>
                    <p className="text-base text-equestre-muted">{alerte.autreDetails.lieu}</p>
                  </div>
                )}
              </div>
            </div>
          </Card>
        )}
      </main>
    </div>
  )
}


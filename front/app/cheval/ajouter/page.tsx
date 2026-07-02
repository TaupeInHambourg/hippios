import { Navbar } from "@/components/navbar"
import { Card } from "@/components/ui/card"

export default function AjouterChevalPage() {
  return (
    <div className="min-h-screen bg-equestre-background">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 pb-24">
        <div className="max-w-3xl mx-auto">
          <Card className="p-12 text-center bg-white border-equestre-border">
            {/* Icon */}
            <div className="mb-6 flex justify-center">
              <div className="w-24 h-24 rounded-full bg-equestre-soft flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-equestre-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-equestre-primary mb-4">
              Ajouter un cheval
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-equestre-muted mb-8">
              Cette fonctionnalité est en cours de développement
            </p>

            {/* Work in Progress Message */}
            <div className="bg-equestre-soft rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold text-equestre-primary mb-3">
                Work in Progress
              </h2>
              <p className="text-equestre-muted">
                Nous travaillons actuellement sur cette fonctionnalité pour vous permettre d'ajouter
                facilement de nouveaux chevaux à votre écurie avec toutes leurs informations de santé
                et de suivi.
              </p>
            </div>

            {/* Features Coming Soon */}
            <div className="text-left space-y-3">
              <h3 className="text-sm font-semibold text-equestre-primary uppercase tracking-wide mb-4">
                Fonctionnalités à venir :
              </h3>
              <div className="space-y-2">
                {[
                  "Informations détaillées du cheval (nom, race, âge)",
                  "Upload de photos",
                  "Configuration des capteurs de santé",
                  "Historique médical",
                  "Paramètres d'alertes personnalisés",
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="mt-1 w-5 h-5 rounded-full bg-equestre-green/20 flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-equestre-green" />
                    </div>
                    <span className="text-equestre-muted">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}


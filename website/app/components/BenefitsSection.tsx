import { Check, TrendingDown, Clock, Heart } from "lucide-react";

const benefits = [
  {
    icon: TrendingDown,
    title: "Détection précoce",
    description: "Identifiez les anomalies avant qu'elles ne s'aggravent.",
    stat: "24/7",
    statLabel: "Surveillance",
  },
  {
    icon: Clock,
    title: "Historique accessible",
    description: "Consultez l'évolution sur des semaines, mois ou années.",
    stat: "100%",
    statLabel: "Données conservées",
  },
  {
    icon: Heart,
    title: "Bien-être optimisé",
    description: "Des rapports réguliers pour maintenir votre cheval en santé.",
    stat: "Quotidien",
    statLabel: "Rapports",
  },
];

const BenefitsSection = () => {
  return (
    <section id="benefits" className="py-20 lg:py-28 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div>
            <span className="text-primary font-medium text-sm uppercase tracking-wider mb-3 block">
              Pourquoi Hippios
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Un suivi de santé basé sur la science
            </h2>
            <p className="text-muted-foreground mb-8">
              Notre algorithme analyse les données de votre capteur pour évaluer l'état de santé de votre cheval.
            </p>

            {/* Checklist */}
            <ul className="space-y-3">
              {[
                "Fréquence cardiaque, température et calories",
                "Algorithme basé sur des études vétérinaires",
                "Alertes instantanées en cas d'anomalie",
                "Rapports personnalisés",
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-foreground text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Content - Stats Cards */}
          <div className="space-y-4">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="bg-card rounded-lg p-5 flex items-start gap-5 border border-border hover:border-primary/20 hover:shadow-[0_8px_30px_-10px_hsl(var(--secondary)/0.3)] hover:bg-card/80 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="font-display text-2xl font-bold text-primary">
                      {benefit.stat}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {benefit.statLabel}
                    </span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-0.5">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;

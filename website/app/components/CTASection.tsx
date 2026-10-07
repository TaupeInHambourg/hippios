import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-card rounded-xl p-8 sm:p-12 lg:p-16 text-center border border-border">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Prêt à surveiller la santé de votre cheval ?
            </h2>
            <p className="text-muted-foreground mb-8">
              Rejoignez Stryde et bénéficiez d'un suivi connecté pour le bien-être
              de votre compagnon. Essai gratuit de 30 jours.
            </p>

            <Button variant="default" size="lg">
              Démarrer l'essai gratuit
              <ArrowRight className="w-4 h-4" />
            </Button>

            <p className="text-xs text-muted-foreground mt-4">
              Aucune carte de crédit requise
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

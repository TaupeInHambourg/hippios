import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
// import heroImage from "@/assets/hero-horse.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          // src={heroImage}
          alt="Cheval majestueux dans un pâturage verdoyant"
          className="w-full h-full object-cover"
        />
        {/* Clean overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm mb-6 animate-fade-up">
            <span className="text-sm font-medium text-white/90">Suivi équestre connecté</span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 animate-fade-up animation-delay-200">
            Surveillez la santé de votre cheval en temps réel
          </h1>

          {/* Subheadline */}
          <p className="text-lg text-white/80 max-w-xl mb-8 animate-fade-up animation-delay-400">
            Capteur connecté pour suivre la fréquence cardiaque, la température
            et l'activité. Alertes instantanées et rapports de santé détaillés.
          </p>

          {/* CTA Button */}
          <div className="animate-fade-up animation-delay-600">
            <Button variant="default" size="lg" className="bg-secondary text-primary hover:bg-primary hover:text-secondary transition-colors">
              Découvrir Hippios
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

export default HeroSection;

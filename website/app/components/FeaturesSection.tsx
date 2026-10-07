'use client';

import { Activity, Wifi, History, FileText, Bell, Shield } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { type CarouselApi } from "@/components/ui/carousel";
import { useEffect, useState } from "react";

const features = [
  {
    icon: Wifi,
    title: "Capteur connecté",
    description: "Récupérez en temps réel la fréquence cardiaque, la température et les calories dépensées.",
  },
  {
    icon: Activity,
    title: "Analyse de santé",
    description: "Algorithme basé sur des études scientifiques pour évaluer l'état de santé de votre cheval.",
  },
  {
    icon: History,
    title: "Historique complet",
    description: "Toutes les données sauvegardées et consultables dans un historique dédié.",
  },
  {
    icon: FileText,
    title: "Rapports de santé",
    description: "Rapports quotidiens ou hebdomadaires détaillant l'état de santé de chaque cheval.",
  },
  {
    icon: Bell,
    title: "Alertes en temps réel",
    description: "Notification immédiate si un problème de santé est détecté.",
  },
  {
    icon: Shield,
    title: "Sécurité des données",
    description: "Données chiffrées et stockées de manière sécurisée.",
  },
];

const FeaturesSection = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section id="features" className="py-20 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-primary font-medium text-sm uppercase tracking-wider mb-3 block">
            Fonctionnalités
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Un suivi complet grâce au capteur connecté
          </h2>
          <p className="text-muted-foreground">
            Technologie connectée et analyse scientifique pour une vision complète de la santé de votre cheval.
          </p>
        </div>

        {/* Features Grid - Hidden on mobile */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-card rounded-lg p-6 border border-border hover:border-primary/20 hover:shadow-[0_8px_30px_-10px_hsl(var(--secondary)/0.3)] hover:bg-card/80 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Features Carousel - Visible only on mobile */}
        <div className="md:hidden">
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {features.map((feature) => (
                <CarouselItem key={feature.title} className="pl-4 basis-full">
                  <div className="bg-card rounded-lg p-5 border border-border h-[200px] flex flex-col">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 flex-shrink-0">
                      <feature.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-display text-base font-semibold text-foreground mb-2 flex-shrink-0">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-snug flex-grow">
                      {feature.description}
                    </p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Bullet Points */}
          <div className="flex justify-center gap-2 mt-4">
            {features.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === current
                    ? "w-6 bg-primary"
                    : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Aller à la fonctionnalité ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

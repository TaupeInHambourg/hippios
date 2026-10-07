'use client';

import { Droplet, Battery, Check } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { type CarouselApi } from "@/components/ui/carousel";
import { useEffect, useState } from "react";

const sensorImages = [
  {
    src: null,
    alt: "Ceinture Stryde",
  },
  {
    src: null,
    alt: "Capteur avec ceinture Stryde",
  },
  {
    src: null,
    alt: "Capteur Stryde",
  },
];

const SensorSection = () => {
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
    <section id="capteur" className="py-20 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content - Text */}
          <div className="order-1 lg:order-1">
            <span className="text-primary font-medium text-sm uppercase tracking-wider mb-3 block">
              Technologie
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Le capteur Stryde
            </h2>
            <p className="text-muted-foreground mb-6">
              Technologie de pointe pour surveiller la santé de vos chevaux en temps réel.
            </p>

            {/* Images Carousel Mobile - Visible only on mobile, placed after subtitle */}
            <div className="lg:hidden mb-8">
              <Carousel
                setApi={setApi}
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-4">
                  {sensorImages.map((image, index) => (
                    <CarouselItem key={index} className="pl-4 basis-full">
                      <div className="bg-card rounded-lg p-4 border border-border h-[300px] flex items-center justify-center">
                        {image.src ? (
                          <img
                            src={image.src}
                            alt={image.alt}
                            className="max-h-full max-w-full object-contain"
                          />
                        ) : (
                          <span className="text-center text-sm text-muted-foreground">
                            {image.alt}
                          </span>
                        )}
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>

              {/* Bullet Points */}
              <div className="flex justify-center gap-2 mt-4">
                {sensorImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => api?.scrollTo(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === current
                        ? "w-6 bg-primary"
                        : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    }`}
                    aria-label={`Aller à l'image ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Product Features List */}
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-primary" />
                </div>
                <span className="text-foreground text-sm">Capteur compact et léger, mesure précise des données vitales</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-primary" />
                </div>
                <span className="text-foreground text-sm">Système intégré à la ceinture pour un confort maximal</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-primary" />
                </div>
                <span className="text-foreground text-sm">Ceinture ergonomique adaptée à tous les chevaux</span>
              </li>
            </ul>

            {/* Technical Specs */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-card rounded-lg p-4 flex items-center gap-3 border border-border hover:border-primary/20 hover:shadow-[0_8px_30px_-10px_hsl(var(--secondary)/0.3)] transition-all duration-300">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Droplet className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <span className="font-display text-xl font-bold text-foreground block">IP67</span>
                  <span className="text-xs text-muted-foreground">Étanche</span>
                </div>
              </div>

              <div className="bg-card rounded-lg p-4 flex items-center gap-3 border border-border hover:border-primary/20 hover:shadow-[0_8px_30px_-10px_hsl(var(--secondary)/0.3)] transition-all duration-300">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Battery className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <span className="font-display text-xl font-bold text-foreground block">2 sem.</span>
                  <span className="text-xs text-muted-foreground">Autonomie</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Images Desktop Only */}
          <div className="order-2 lg:order-2 relative h-[400px] lg:h-[500px] hidden lg:block">
            {/* Ceinture seule */}
            <div className="absolute left-0 top-0 w-40 lg:w-48 z-10 rotate-[-5deg] rounded-lg border border-border bg-card p-6 text-center text-sm text-muted-foreground">
              Ceinture Stryde
            </div>

            {/* Image principale */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 lg:w-80 z-20 rounded-lg border border-border bg-card p-12 text-center text-sm text-muted-foreground">
              Capteur avec ceinture Stryde
            </div>

            {/* Capteur seul */}
            <div className="absolute right-0 bottom-0 w-32 lg:w-40 z-30 rounded-lg border border-border bg-card p-6 text-center text-sm text-muted-foreground">
              Capteur Stryde
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SensorSection;

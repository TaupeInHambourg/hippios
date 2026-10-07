'use client';

import { useState, useEffect } from "react";

const steps = [
    {
        number: "01",
        title: "Téléchargez l'application",
        description: "Disponible sur iOS et Android.",
    },
    {
        number: "02",
        title: "Créez le profil",
        description: "Renseignez les informations de votre cheval.",
    },
    {
        number: "03",
        title: "Connectez le capteur",
        description: "Synchronisez pour recevoir les données en temps réel.",
    },
    {
        number: "04",
        title: "Recevez vos rapports",
        description: "Consultez l'historique et les alertes.",
    },
];

const HowItWorksSection = () => {
    const [selectedStep, setSelectedStep] = useState(0);

    // Auto-loop through steps every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setSelectedStep((prev) => (prev + 1) % steps.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const handleStepClick = (index: number) => {
        setSelectedStep(index);
    };

    return (
        <section id="how-it-works" className="py-20 lg:py-28 bg-primary">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-primary-foreground/70 font-medium text-sm uppercase tracking-wider mb-3 block">
            Comment ça marche
          </span>
                    <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary-foreground mb-4">
                        Commencez en quelques minutes
                    </h2>
                    <p className="text-primary-foreground/70">
                        Une mise en route simple pour profiter immédiatement du suivi connecté.
                    </p>
                </div>

                {/* Steps Desktop - Grid Layout */}
                <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <div key={step.number} className="relative text-left">
                            {/* Connector Line */}
                            {index < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-8 left-16 right-0 h-px bg-primary-foreground/20" />
                            )}

                            {/* Number */}
                            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 mb-4">
                <span className="font-display text-xl font-bold text-primary-foreground">
                  {step.number}
                </span>
                            </div>

                            <h3 className="font-display text-lg font-semibold text-primary-foreground mb-2">
                                {step.title}
                            </h3>
                            <p className="text-primary-foreground/70 text-sm">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Steps Mobile - Vertical Timeline */}
                <div className="md:hidden flex gap-6">
                    {/* Left Side - Timeline with Numbers */}
                    <div className="flex flex-col items-center relative">
                        {/* Vertical Line - Behind the buttons */}
                        <div className="absolute left-1/2 top-8 bottom-8 w-px bg-primary-foreground/20 -translate-x-1/2 z-0" />

                        {/* Numbers */}
                        <div className="flex flex-col gap-8 relative">
                            {steps.map((step, index) => (
                                <button
                                    key={step.number}
                                    onClick={() => handleStepClick(index)}
                                    className={`flex items-center justify-center w-16 h-16 flex-shrink-0 rounded-full border-2 transition-all duration-300 relative z-10 ${
                                        selectedStep === index
                                            ? "bg-primary-foreground border-primary-foreground scale-110"
                                            : "bg-primary border-primary-foreground/20 hover:border-primary-foreground/40"
                                    }`}
                                    aria-label={`Étape ${step.number}`}
                                >
                  <span
                      className={`font-display text-xl font-bold transition-colors duration-300 ${
                          selectedStep === index
                              ? "text-primary"
                              : "text-primary-foreground"
                      }`}
                  >
                    {step.number}
                  </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right Side - Selected Step Content */}
                    <div className="flex-1 flex items-center">
                        <div className="bg-primary-foreground/5 rounded-lg p-6 border border-primary-foreground/10 h-[200px] w-full flex flex-col justify-center">
                            <h3 className="font-display text-xl font-semibold text-primary-foreground mb-3">
                                {steps[selectedStep].title}
                            </h3>
                            <p className="text-primary-foreground/70 text-sm leading-relaxed">
                                {steps[selectedStep].description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorksSection;
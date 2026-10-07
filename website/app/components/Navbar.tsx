'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="font-display text-xl font-semibold text-primary">Stryde</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a 
              href="#features" 
              className="text-muted-foreground hover:text-foreground transition-colors text-sm"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Fonctionnalités
            </a>
            <a 
              href="#benefits" 
              className="text-muted-foreground hover:text-foreground transition-colors text-sm"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('benefits')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Avantages
            </a>
            <a 
              href="#how-it-works" 
              className="text-muted-foreground hover:text-foreground transition-colors text-sm"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Comment ça marche
            </a>
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center">
            <Button variant="default" size="sm">Essayer gratuitement</Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border bg-background">
            <div className="flex flex-col gap-3">
              <a 
                href="#features" 
                className="text-muted-foreground hover:text-foreground transition-colors text-sm py-2"
                onClick={(e) => {
                  e.preventDefault();
                  setIsOpen(false);
                  document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Fonctionnalités
              </a>
              <a 
                href="#benefits" 
                className="text-muted-foreground hover:text-foreground transition-colors text-sm py-2"
                onClick={(e) => {
                  e.preventDefault();
                  setIsOpen(false);
                  document.getElementById('benefits')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Avantages
              </a>
              <a 
                href="#how-it-works" 
                className="text-muted-foreground hover:text-foreground transition-colors text-sm py-2"
                onClick={(e) => {
                  e.preventDefault();
                  setIsOpen(false);
                  document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Comment ça marche
              </a>
              <div className="pt-3">
                <Button variant="default" size="sm" className="w-full">Essayer gratuitement</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
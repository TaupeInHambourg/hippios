import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <span className="font-display text-xl font-semibold block mb-3">Stryde</span>
            <p className="text-background/70 text-sm mb-4">
              Suivi équestre connecté pour le bien-être de votre cheval.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-background/70 text-sm">
                <Mail className="w-4 h-4" />
                <span>contact@stryde.fr</span>
              </div>
              <div className="flex items-center gap-2 text-background/70 text-sm">
                <Phone className="w-4 h-4" />
                <span>01 23 45 67 89</span>
              </div>
              <div className="flex items-center gap-2 text-background/70 text-sm">
                <MapPin className="w-4 h-4" />
                <span>Paris, France</span>
              </div>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-display font-semibold mb-3">Produit</h4>
            <ul className="space-y-2">
              {["Fonctionnalités", "Tarifs", "Télécharger"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-background/70 hover:text-background text-sm transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-semibold mb-3">Entreprise</h4>
            <ul className="space-y-2">
              {["À propos", "Contact", "Presse"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-background/70 hover:text-background text-sm transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 border-t border-background/20 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-background/60 text-xs">
            © 2025 Stryde. Tous droits réservés.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-background/60 hover:text-background text-xs transition-colors">
              Mentions légales
            </a>
            <a href="#" className="text-background/60 hover:text-background text-xs transition-colors">
              Confidentialité
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

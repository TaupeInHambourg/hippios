export type AlertePriorite = "haute" | "moyenne" | "basse"

export interface Professionnel {
  nom: string
  specialite: string
  telephone: string
  email: string
  adresse: string
  tarif?: string
  disponibilite?: string
}

export interface Medicament {
  nom: string
  type: string
  dosage: string
  fabricant: string
  site: string
  prix: string
  description: string
  urlAchat: string
}

export interface Vaccin {
  nom: string
  type: string
  protection: string[]
  fabricant: string
  dureeValidite: string
  effetsSecondaires: string[]
  veterinaire: Professionnel
}

export interface SurveillanceSante {
  symptomes: string[]
  mesures: string
  recommandations: string[]
  urgence: string
  veterinaire: Professionnel
}

export interface Alerte {
  id: number
  type: "rdv" | "medicament" | "vaccin" | "sante" | "autre"
  titre: string
  description: string
  echeance: string
  joursRestants: number
  priorite: AlertePriorite
  chevalNom?: string
  chevalId?: number
  // Détails spécifiques selon le type
  professionnel?: Professionnel
  medicament?: Medicament
  vaccin?: Vaccin
  sante?: SurveillanceSante
  autreDetails?: {
    fournisseur?: string
    quantite?: string
    lieu?: string
    notes?: string
  }
}

export const alertes: Alerte[] = [
  {
    id: 1,
    type: "rdv",
    titre: "Rendez-vous dentiste",
    description: "Contrôle dentaire annuel pour Eclipse Royale",
    echeance: "13 décembre 2025",
    joursRestants: 2,
    priorite: "haute",
    chevalNom: "Eclipse Royale",
    chevalId: 1,
    professionnel: {
      nom: "Dr. Marie Dubois",
      specialite: "Dentiste équin",
      telephone: "+33 6 12 34 56 78",
      email: "marie.dubois@equi-dental.fr",
      adresse: "15 Route de la Ferme, 78000 Versailles",
      tarif: "150€ - 250€ selon intervention",
      disponibilite: "Du lundi au vendredi, 8h-18h",
    },
  },
  {
    id: 2,
    type: "medicament",
    titre: "Vermifuge à renouveler",
    description: "Le traitement vermifuge de Thunder Storm se termine bientôt",
    echeance: "10 décembre 2025",
    joursRestants: -1,
    priorite: "moyenne",
    chevalNom: "Thunder Storm",
    chevalId: 2,
    medicament: {
      nom: "Eqvalan Duo",
      type: "Vermifuge (Ivermectine + Praziquantel)",
      dosage: "1 seringue pour 700kg",
      fabricant: "Boehringer Ingelheim",
      site: "Hippo-Shop.fr",
      prix: "28,90€",
      description:
        "Traitement et contrôle des infestations par les nématodes gastro-intestinaux et les cestodes (ténias) chez les chevaux.",
      urlAchat: "https://www.hippo-shop.fr/vermifuge-cheval",
    },
  },
  {
    id: 3,
    type: "vaccin",
    titre: "Vaccination grippe équine",
    description: "Rappel de vaccination pour Belle de Jour",
    echeance: "5 décembre 2025",
    joursRestants: -6,
    priorite: "haute",
    chevalNom: "Belle de Jour",
    chevalId: 3,
    vaccin: {
      nom: "ProteqFlu",
      type: "Vaccin contre la grippe équine",
      protection: [
        "Virus Influenza A/equi-2 (souche Florida 2003)",
        "Virus Influenza A/equi-2 (souche Richmond 2007)",
        "Protection contre les souches européennes et américaines",
      ],
      fabricant: "Boehringer Ingelheim",
      dureeValidite: "12 mois (rappel annuel requis)",
      effetsSecondaires: [
        "Léger gonflement au point d'injection (rare)",
        "Faible fièvre passagère (< 24h)",
        "Fatigue temporaire",
      ],
      veterinaire: {
        nom: "Dr. Pierre Laurent",
        specialite: "Vétérinaire équin",
        telephone: "+33 6 98 76 54 32",
        email: "p.laurent@vetequin.fr",
        adresse: "23 Avenue des Écuries, 78100 Saint-Germain",
        tarif: "65€ (consultation + vaccin)",
        disponibilite: "7j/7, urgences 24h/24",
      },
    },
  },
  {
    id: 4,
    type: "sante",
    titre: "Surveillance température",
    description: "Température élevée détectée - suivi recommandé",
    echeance: "11 décembre 2025",
    joursRestants: 0,
    priorite: "haute",
    chevalNom: "Belle de Jour",
    chevalId: 3,
    sante: {
      symptomes: [
        "Température à 38.8°C (normale: 37.5-38.5°C)",
        "Légère baisse d'appétit",
        "Comportement un peu apathique",
      ],
      mesures: "Température relevée ce matin à 7h30 avec thermomètre rectal",
      recommandations: [
        "Contrôler la température 2 fois par jour",
        "Assurer une bonne hydratation",
        "Repos au box, éviter l'exercice intense",
        "Contacter le vétérinaire si T° > 39°C ou persistance > 48h",
        "Surveiller l'appétit et le comportement",
      ],
      urgence: "Si température > 39.5°C ou autres symptômes appeler immédiatement",
      veterinaire: {
        nom: "Dr. Pierre Laurent",
        specialite: "Vétérinaire équin",
        telephone: "+33 6 98 76 54 32",
        email: "p.laurent@vetequin.fr",
        adresse: "23 Avenue des Écuries, 78100 Saint-Germain",
        tarif: "Consultation: 80€ | Déplacement: +35€",
        disponibilite: "7j/7, urgences 24h/24",
      },
    },
  },
  {
    id: 5,
    type: "rdv",
    titre: "Visite maréchal-ferrant",
    description: "Ferrage trimestriel pour Midnight Shadow",
    echeance: "1 décembre 2025",
    joursRestants: -10,
    priorite: "moyenne",
    chevalNom: "Midnight Shadow",
    chevalId: 4,
    professionnel: {
      nom: "Jean-Marc Lefèvre",
      specialite: "Maréchal-ferrant",
      telephone: "+33 6 45 67 89 01",
      email: "jm.lefevre@marechal78.fr",
      adresse: "Itinérant - Zone Yvelines",
      tarif: "Ferrage complet: 120€ | Parage simple: 45€",
      disponibilite: "Du mardi au samedi sur rendez-vous",
    },
  },
]


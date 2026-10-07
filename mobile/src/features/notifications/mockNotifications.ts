import type { AppNotification, MessagePart } from "./types";

const plain = (text: string): MessagePart => ({ text, emphasized: false });
const emphasized = (text: string): MessagePart => ({ text, emphasized: true });

// Static data until the notifications API exists.
export const MOCK_NOTIFICATIONS: readonly AppNotification[] = [
  {
    id: "1",
    horseName: "Epona",
    kind: "reminder",
    title: "Rappel de vermifuge",
    alertLevel: null,
    message: [plain("Mercredi 3 janvier 2026")],
  },
  {
    id: "2",
    horseName: "Epona",
    kind: "alert",
    title: "Respiration d’Epona",
    alertLevel: "critical",
    message: [plain("Alerte rouge, surveiller la respiration d’Epona")],
  },
  {
    id: "3",
    horseName: "Epona",
    kind: "watch",
    title: "Temps de récupération d’Epona",
    alertLevel: "warning",
    message: [plain("Alerte orange, garder un oeil sur le temps de récupération d’Epona")],
  },
  {
    id: "4",
    horseName: "Epona",
    kind: "document",
    title: "Nouveau document Epona",
    alertLevel: null,
    message: [
      plain("Dr Alphonse Robert a ajouté "),
      emphasized("“Relevés sanguins 01/2026 Epona”"),
      plain(" dans les documents d’Epona"),
    ],
  },
  {
    id: "5",
    horseName: "Petit Tonnerre",
    kind: "appointment",
    title: "Nouveau rendez-vous Petit Tonnerre",
    alertLevel: null,
    message: [
      plain("Écurie Duval a ajouté "),
      emphasized("“Entraînement loisir”"),
      plain(" dans l’agenda de Petit Tonnerre le vendredi 11 janvier 2026"),
    ],
  },
];

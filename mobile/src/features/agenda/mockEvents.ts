import type { AgendaEvent } from "./types";

import { addDays, startOfDay } from "@/lib/dates";

const EPONA = { horseName: "Epona", horseColor: "#00CCFF" };
const PETIT_TONNERRE = { horseName: "Petit Tonnerre", horseColor: "#FF00E6" };

const today = startOfDay(new Date());

// Static data relative to today until the agenda API exists, so the screen
// always shows both upcoming and past appointments.
export const MOCK_EVENTS: readonly AgendaEvent[] = [
  { id: "1", title: "Rappel de vermifuge", date: addDays(today, 1), ...EPONA },
  { id: "2", title: "Entraînement loisir", date: addDays(today, 2), ...EPONA },
  { id: "3", title: "Rdv maréchal-ferrant", date: addDays(today, 2), ...EPONA },
  { id: "4", title: "Entraînement loisir", date: addDays(today, 2), ...PETIT_TONNERRE },
  { id: "5", title: "Visite vétérinaire", date: addDays(today, 9), ...PETIT_TONNERRE },
  { id: "6", title: "Entraînement loisir", date: addDays(today, -5), ...EPONA },
  { id: "7", title: "Entraînement loisir", date: addDays(today, -8), ...EPONA },
  { id: "8", title: "Vaccin grippe", date: addDays(today, -20), ...PETIT_TONNERRE },
];

import type { AgendaEvent } from "./types";

import { addDays, startOfDay } from "@/lib/dates";

const EPONA = { horseName: "Epona", horseColor: "#00CCFF", owner: null };
const PETIT_TONNERRE = { horseName: "Petit Tonnerre", horseColor: "#FF00E6", owner: null };

const VET = "Dr Alphonse Robert au 8 rue de la Prairie";
const COACH = "Coach Thomas aux écuries de la Paix";
const FARRIER = "Marc Leroy, maréchal-ferrant, aux écuries de la Paix";

const today = startOfDay(new Date());

/** Day relative to today, at the given time. */
function at(dayOffset: number, hours: number, minutes = 0): Date {
  const day = addDays(today, dayOffset);
  return new Date(day.getFullYear(), day.getMonth(), day.getDate(), hours, minutes);
}

// Static data relative to today until the agenda API exists, so the screen
// always shows both upcoming and past appointments.
export const MOCK_EVENTS: readonly AgendaEvent[] = [
  { id: "1", title: "Rappel vermifuge", date: at(1, 10), details: VET, ...EPONA },
  { id: "2", title: "Entraînement loisir", date: at(2, 16), details: COACH, ...EPONA },
  { id: "3", title: "Rdv maréchal-ferrant", date: at(2, 9, 30), details: FARRIER, ...EPONA },
  { id: "4", title: "Entraînement loisir", date: at(2, 14), details: COACH, ...PETIT_TONNERRE },
  { id: "5", title: "Visite vétérinaire", date: at(9, 11), details: VET, ...PETIT_TONNERRE },
  { id: "6", title: "Entraînement loisir", date: at(-5, 16), details: COACH, ...EPONA },
  { id: "7", title: "Entraînement loisir", date: at(-8, 16), details: COACH, ...EPONA },
  { id: "8", title: "Vaccin grippe", date: at(-20, 10, 30), details: VET, ...PETIT_TONNERRE },
];

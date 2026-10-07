import type { HorseOverview } from "./types";

import { addDays, startOfDay } from "@/lib/dates";

const today = startOfDay(new Date());

// Sensor data until the horses API exists. Colors match the agenda mock events.
export const MOCK_HORSE_OVERVIEWS: readonly HorseOverview[] = [
  {
    id: "petit-tonnerre",
    name: "Petit Tonnerre",
    color: "#FF00E6",
    health: {
      metrics: [
        { label: "Respiration", level: "ok" },
        { label: "Récupération", level: "ok" },
        { label: "Digestion", level: "ok" },
      ],
      newDocumentsFrom: null,
      newDocumentsCount: 0,
      nextReminder: null,
      battery: { percent: 80, remainingHours: 20 },
    },
  },
  {
    id: "epona",
    name: "Epona",
    color: "#00CCFF",
    health: {
      metrics: [
        { label: "Récupération", level: "warning" },
        { label: "Respiration", level: "critical" },
        { label: "Digestion", level: "warning" },
        { label: "Sommeil", level: "warning" },
        { label: "Hydratation", level: "warning" },
        { label: "Température", level: "warning" },
      ],
      newDocumentsFrom: "Dr Robert",
      newDocumentsCount: 1,
      nextReminder: { date: addDays(today, 3), label: "10H : Rappel vermifuge" },
      battery: { percent: 25, remainingHours: 1 },
    },
  },
];

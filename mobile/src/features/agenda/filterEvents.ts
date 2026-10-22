import type { AgendaEvent, EventPeriod } from "./types";

import { isSameDay, startOfDay } from "@/lib/dates";
import { normalizeText } from "@/lib/normalizeText";

/** Events of the selected horse whose title matches the search. */
export function searchEvents(
  events: readonly AgendaEvent[],
  horseName: string | null,
  query: string,
): AgendaEvent[] {
  const normalizedQuery = normalizeText(query);
  return events.filter(
    (event) =>
      (horseName === null || event.horseName === horseName) &&
      (normalizedQuery === "" || normalizeText(event.title).includes(normalizedQuery)),
  );
}

/** Upcoming events soonest first, past events most recent first. */
export function selectListedEvents(
  events: readonly AgendaEvent[],
  period: EventPeriod,
  now: Date,
): AgendaEvent[] {
  const today = startOfDay(now);
  return period === "upcoming"
    ? events.filter((event) => event.date >= today).sort((a, b) => +a.date - +b.date)
    : events.filter((event) => event.date < today).sort((a, b) => +b.date - +a.date);
}

/** Events of one day, in chronological order. */
export function getDayEvents(events: readonly AgendaEvent[], day: Date): AgendaEvent[] {
  return events.filter((event) => isSameDay(event.date, day)).sort((a, b) => +a.date - +b.date);
}

/** The next `limit` events from today, soonest first. */
export function getUpcomingEvents(
  events: readonly AgendaEvent[],
  now: Date,
  limit: number,
): AgendaEvent[] {
  return selectListedEvents(events, "upcoming", now).slice(0, limit);
}

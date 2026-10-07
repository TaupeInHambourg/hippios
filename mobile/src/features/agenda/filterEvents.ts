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

/**
 * A selected day shows that day's events; otherwise upcoming events are listed
 * soonest first and past events most recent first.
 */
export function selectListedEvents(
  events: readonly AgendaEvent[],
  period: EventPeriod,
  selectedDay: Date | null,
  now: Date,
): AgendaEvent[] {
  if (selectedDay) {
    return events.filter((event) => isSameDay(event.date, selectedDay));
  }
  const today = startOfDay(now);
  return period === "upcoming"
    ? events.filter((event) => event.date >= today).sort((a, b) => +a.date - +b.date)
    : events.filter((event) => event.date < today).sort((a, b) => +b.date - +a.date);
}

/** The next `limit` events from today, soonest first. */
export function getUpcomingEvents(
  events: readonly AgendaEvent[],
  now: Date,
  limit: number,
): AgendaEvent[] {
  return selectListedEvents(events, "upcoming", null, now).slice(0, limit);
}

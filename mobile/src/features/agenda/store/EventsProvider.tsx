import { useState, type ReactNode } from "react";

import { MOCK_EVENTS } from "../mockEvents";
import type { AgendaEvent } from "../types";
import { EventsContext } from "./EventsContext";

interface EventsProviderProps {
  children: ReactNode;
}

/** In-memory agenda until the agenda API exists: added events are lost on restart. */
export function EventsProvider({ children }: EventsProviderProps) {
  const [events, setEvents] = useState<readonly AgendaEvent[]>(MOCK_EVENTS);

  const addEvent = (event: Omit<AgendaEvent, "id">) => {
    setEvents((current) => [...current, { ...event, id: `${Date.now()}` }]);
  };

  return <EventsContext value={{ events, addEvent }}>{children}</EventsContext>;
}

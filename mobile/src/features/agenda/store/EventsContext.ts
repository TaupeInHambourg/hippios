import { createContext } from "react";

import type { AgendaEvent } from "../types";

export interface EventsContextValue {
  events: readonly AgendaEvent[];
  addEvent: (event: Omit<AgendaEvent, "id">) => void;
}

export const EventsContext = createContext<EventsContextValue | null>(null);

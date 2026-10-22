import { useContext } from "react";

import { EventsContext, type EventsContextValue } from "./EventsContext";

export function useAgendaEvents(): EventsContextValue {
  const context = useContext(EventsContext);
  if (!context) {
    throw new Error("useAgendaEvents must be used inside an EventsProvider");
  }
  return context;
}

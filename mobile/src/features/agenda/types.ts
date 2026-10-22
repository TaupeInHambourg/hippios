export interface AgendaEvent {
  id: string;
  title: string;
  /** Day and start time of the event. */
  date: Date;
  horseName: string;
  horseColor: string;
  /** Person in charge of the horse for this event; unknown for imported events. */
  owner: string | null;
  /** Who and where, e.g. "Dr Alphonse Robert au 8 rue de la Prairie". */
  details: string | null;
}

export type EventPeriod = "upcoming" | "past";

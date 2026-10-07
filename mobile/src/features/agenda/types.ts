export interface AgendaEvent {
  id: string;
  title: string;
  date: Date;
  horseName: string;
  horseColor: string;
}

export type EventPeriod = "upcoming" | "past";

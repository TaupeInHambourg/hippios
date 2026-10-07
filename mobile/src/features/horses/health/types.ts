export type HealthLevel = "critical" | "warning" | "ok";

export interface HealthMetric {
  label: string;
  level: HealthLevel;
}

export interface HorseReminder {
  date: Date;
  /** e.g. "10H : Rappel vermifuge" */
  label: string;
}

export interface SensorBattery {
  percent: number;
  remainingHours: number;
}

export interface HorseHealth {
  metrics: readonly HealthMetric[];
  /** Professional who added unread documents, e.g. "Dr Robert". */
  newDocumentsFrom: string | null;
  newDocumentsCount: number;
  nextReminder: HorseReminder | null;
  battery: SensorBattery | null;
}

/** A horse with its latest sensor data: `health` is null until the first data arrives. */
export interface HorseOverview {
  id: string;
  name: string;
  color: string;
  health: HorseHealth | null;
}

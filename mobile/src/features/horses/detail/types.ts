import type { HealthLevel } from "../health/types";

export type Activity = "all" | "trot" | "gallop" | "rest";

export type MetricId = "heartRate" | "speed" | "distance" | "temperature" | "sweat";

/** Range of the metric chart, in days. */
export type ChartRange = 1 | 7 | 14 | 30;

export interface MetricReading {
  id: MetricId;
  /** Daily average for the selected activity, in the metric unit. */
  value: number;
  level: HealthLevel;
}

export type HorseSex = "male" | "female" | "gelding";

export interface HorseProfile {
  breed: string;
  sex: HorseSex | null;
  ageYears: number | null;
  heightMeters: number | null;
  weightKg: number | null;
}

export interface HorseDetail {
  id: string;
  name: string;
  color: string;
  profile: HorseProfile;
  /** Null until the sensor sends its first data. */
  lastUpdate: Date | null;
  readings: Record<Activity, readonly MetricReading[]> | null;
}

export interface ChartPoint {
  label: string;
  date: Date;
  value: number;
  norm: number;
  horseAverage: number;
  /** Day flagged by the sensor analysis. */
  isAnomaly: boolean;
}

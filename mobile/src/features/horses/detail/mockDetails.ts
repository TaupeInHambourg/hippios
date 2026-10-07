import type { Activity, HorseProfile, MetricId, MetricReading } from "./types";

import type { HealthLevel } from "../health/types";

interface MockHorseDetail {
  profile: HorseProfile;
  /** Readings for "Tout": other activities are derived from them. */
  baseReadings: Record<MetricId, { value: number; level: HealthLevel }>;
}

// Sensor data until the horses API exists, keyed by the overview ids.
export const MOCK_HORSE_DETAILS: Record<string, MockHorseDetail> = {
  epona: {
    profile: { breed: "Frison noir", sex: "male", ageYears: 2, heightMeters: 1.7, weightKg: 90 },
    baseReadings: {
      heartRate: { value: 87, level: "warning" },
      speed: { value: 20, level: "warning" },
      distance: { value: 15, level: "ok" },
      temperature: { value: 38, level: "ok" },
      sweat: { value: 0.2, level: "ok" },
    },
  },
  "petit-tonnerre": {
    profile: { breed: "Mérens", sex: "gelding", ageYears: 6, heightMeters: 1.48, weightKg: 420 },
    baseReadings: {
      heartRate: { value: 72, level: "ok" },
      speed: { value: 18, level: "ok" },
      distance: { value: 12, level: "ok" },
      temperature: { value: 37.8, level: "ok" },
      sweat: { value: 0.15, level: "ok" },
    },
  },
};

/** How each activity scales the daily averages of "Tout". */
const ACTIVITY_FACTORS: Record<Activity, Record<MetricId, number>> = {
  all: { heartRate: 1, speed: 1, distance: 1, temperature: 1, sweat: 1 },
  trot: { heartRate: 1.15, speed: 0.8, distance: 0.5, temperature: 1.005, sweat: 1.3 },
  gallop: { heartRate: 1.45, speed: 1.6, distance: 0.3, temperature: 1.01, sweat: 2 },
  rest: { heartRate: 0.45, speed: 0.1, distance: 0.05, temperature: 0.99, sweat: 0.2 },
};

export function deriveReadings(
  baseReadings: MockHorseDetail["baseReadings"],
): Record<Activity, MetricReading[]> {
  const derive = (activity: Activity): MetricReading[] =>
    (Object.keys(baseReadings) as MetricId[]).map((id) => ({
      id,
      value: baseReadings[id].value * ACTIVITY_FACTORS[activity][id],
      // Resting values are never alarming in this mock.
      level: activity === "rest" ? "ok" : baseReadings[id].level,
    }));
  return {
    all: derive("all"),
    trot: derive("trot"),
    gallop: derive("gallop"),
    rest: derive("rest"),
  };
}

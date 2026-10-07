import type { Activity, ChartRange, MetricId } from "./types";

import type { FilterChipOption } from "@/components/FilterChips";

export interface MetricDefinition {
  label: string;
  /** MaterialCommunityIcons name. */
  icon: "heart-plus" | "timer" | "map-marker-distance" | "thermometer" | "water";
  unit: string;
  /** Suffix of the summary value, e.g. "moy." or "parcourus". */
  suffix: string;
  decimals: number;
}

export const METRIC_DEFINITIONS: Record<MetricId, MetricDefinition> = {
  heartRate: {
    label: "Fréquence cardiaque",
    icon: "heart-plus",
    unit: "bpm",
    suffix: "moy.",
    decimals: 0,
  },
  speed: { label: "Vitesse", icon: "timer", unit: "km/h", suffix: "moy.", decimals: 0 },
  distance: {
    label: "Distance",
    icon: "map-marker-distance",
    unit: "km",
    suffix: "parcourus",
    decimals: 0,
  },
  temperature: {
    label: "Température",
    icon: "thermometer",
    unit: "°C",
    suffix: "moy.",
    decimals: 1,
  },
  sweat: { label: "Transpiration", icon: "water", unit: "mL/km", suffix: "en moy.", decimals: 1 },
};

export const METRIC_IDS = Object.keys(METRIC_DEFINITIONS) as MetricId[];

export function isMetricId(value: unknown): value is MetricId {
  return typeof value === "string" && value in METRIC_DEFINITIONS;
}

export const ACTIVITY_OPTIONS: readonly FilterChipOption<Activity>[] = [
  { label: "Tout", value: "all" },
  { label: "Trot", value: "trot" },
  { label: "Galop", value: "gallop" },
  { label: "Repos", value: "rest" },
];

export function isActivity(value: unknown): value is Activity {
  return ACTIVITY_OPTIONS.some((option) => option.value === value);
}

export const RANGE_OPTIONS: readonly ChartRange[] = [1, 7, 14, 30];

/** "20 km/h", "0,2 mL/km" (French decimal comma). */
export function formatMetricValue(metricId: MetricId, value: number): string {
  const { unit, decimals } = METRIC_DEFINITIONS[metricId];
  return `${value.toFixed(decimals).replace(".", ",")} ${unit}`;
}

import type { HealthLevel, HorseOverview } from "./types";

import type { StatusLevel } from "@/components/StatusDot";

/** Lower is more urgent: horses in bad shape must be seen first. */
const URGENCY: Record<StatusLevel, number> = { critical: 0, warning: 1, ok: 2, pending: 3 };

interface Leveled {
  level: HealthLevel;
}

export function getWorstLevel(metrics: readonly Leveled[]): HealthLevel {
  if (metrics.some((metric) => metric.level === "critical")) return "critical";
  if (metrics.some((metric) => metric.level === "warning")) return "warning";
  return "ok";
}

export function getHorseStatus(horse: HorseOverview): StatusLevel {
  return horse.health ? getWorstLevel(horse.health.metrics) : "pending";
}

/** Metrics needing attention, most urgent first. */
export function getAlertMetrics<T extends Leveled>(metrics: readonly T[]): T[] {
  return metrics
    .filter((metric) => metric.level !== "ok")
    .sort((a, b) => URGENCY[a.level] - URGENCY[b.level]);
}

/** Most urgent horses first; equally urgent horses keep alphabetical order. */
export function sortByUrgency(horses: readonly HorseOverview[]): HorseOverview[] {
  return [...horses].sort(
    (a, b) =>
      URGENCY[getHorseStatus(a)] - URGENCY[getHorseStatus(b)] || a.name.localeCompare(b.name),
  );
}

export function countByStatus(horses: readonly HorseOverview[]): Map<StatusLevel, number> {
  const counts = new Map<StatusLevel, number>();
  for (const horse of horses) {
    const status = getHorseStatus(horse);
    counts.set(status, (counts.get(status) ?? 0) + 1);
  }
  return counts;
}

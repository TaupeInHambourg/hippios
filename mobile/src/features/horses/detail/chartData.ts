import type { HealthLevel } from "../health/types";
import type { ChartPoint, ChartRange } from "./types";

import { MONTH_NAMES, addDays, formatLongDate } from "@/lib/dates";

const HOURS_IN_DAY = 24;
const ROLLING_WINDOW = 3;
const ANOMALY_RATIO = 0.7;
const WARNING_DEVIATION = 0.15;

/** Deterministic pseudo-random number in [0, 1) so mock charts stay stable. */
function seededRandom(seed: string): number {
  let hash = 2166136261;
  for (let index = 0; index < seed.length; index += 1) {
    hash = Math.imul(hash ^ seed.charCodeAt(index), 16777619);
  }
  return (hash >>> 0) / 4294967296;
}

function padTwoDigits(value: number): string {
  return value.toString().padStart(2, "0");
}

interface SeriesInput {
  seed: string;
  /** Daily average of the metric, used as the scale of the mock values. */
  baseValue: number;
  endDate: Date;
  range: ChartRange;
}

/** Mock sensor series until the API exists: one point per day, or per hour for 1 day. */
export function buildChartPoints({ seed, baseValue, endDate, range }: SeriesInput): ChartPoint[] {
  const isHourly = range === 1;
  const count = isHourly ? HOURS_IN_DAY : range;

  const raw = Array.from({ length: count }, (_, index) => {
    const date = isHourly
      ? new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), index)
      : addDays(endDate, index - count + 1);
    const key = `${seed}-${date.toISOString()}`;
    return {
      date,
      label: isHourly ? `${index}h` : padTwoDigits(date.getDate()),
      value: baseValue * (0.6 + 0.8 * seededRandom(`${key}-value`)),
      norm: baseValue * (1 + 0.3 * (seededRandom(`${key}-norm`) - 0.5)),
    };
  });

  return raw.map((point, index) => {
    const window = raw.slice(Math.max(0, index - ROLLING_WINDOW + 1), index + 1);
    const horseAverage = window.reduce((sum, item) => sum + item.value, 0) / window.length;
    return { ...point, horseAverage, isAnomaly: point.value < point.norm * ANOMALY_RATIO };
  });
}

export function average(values: readonly number[]): number {
  return values.length === 0 ? 0 : values.reduce((sum, value) => sum + value, 0) / values.length;
}

/** The horse is flagged when its average strays too far from the norm. */
export function compareToNorm(horseAverage: number, norm: number): HealthLevel {
  return Math.abs(horseAverage - norm) / norm > WARNING_DEVIATION ? "warning" : "ok";
}

/** "6 avril 2026", "du 1 au 14 janvier 2026" or "du 25 décembre 2025 au 7 janvier 2026". */
export function formatPeriod(endDate: Date, range: ChartRange): string {
  if (range === 1) {
    return formatLongDate(endDate);
  }
  const startDate = addDays(endDate, -(range - 1));
  if (startDate.getFullYear() !== endDate.getFullYear()) {
    return `du ${formatLongDate(startDate)} au ${formatLongDate(endDate)}`;
  }
  const startMonth = (MONTH_NAMES[startDate.getMonth()] ?? "").toLowerCase();
  const start =
    startDate.getMonth() === endDate.getMonth()
      ? `${startDate.getDate()}`
      : `${startDate.getDate()} ${startMonth}`;
  return `du ${start} au ${formatLongDate(endDate)}`;
}

/** "14 derniers jours", "Dernières 24 heures" */
export function formatRangeLabel(range: ChartRange): string {
  return range === 1 ? "Dernières 24 heures" : `${range} derniers jours`;
}

export interface ChartScale {
  max: number;
  ticks: number[];
}

/** Axis from zero to a round maximum (1, 2, 2.5 or 5 × 10^n per step). */
export function getNiceScale(maxValue: number, tickCount = 4): ChartScale {
  const rawStep = Math.max(maxValue, Number.EPSILON) / tickCount;
  const magnitude = 10 ** Math.floor(Math.log10(rawStep));
  const step =
    [1, 2, 2.5, 5, 10].map((factor) => factor * magnitude).find((value) => value >= rawStep) ??
    rawStep;
  const max = step * Math.ceil(maxValue / step);
  const ticks = Array.from({ length: Math.round(max / step) + 1 }, (_, index) => index * step);
  return { max, ticks };
}

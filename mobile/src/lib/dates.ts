export const MONTH_NAMES = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
] as const;

/** Indexed like `Date.getDay()` (0 = Sunday). */
const WEEKDAY_NAMES = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];

/** Week starts on Monday (French convention). */
export const WEEKDAY_SHORT_LABELS = ["L", "Ma", "Me", "J", "V", "S", "D"] as const;

const DAYS_IN_WEEK = 7;

export function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function addDays(date: Date, days: number): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
}

export function addMonths(date: Date, months: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + months, 1);
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/** Stable key for grouping by day, e.g. "2026-0-3". */
export function toDayKey(date: Date): string {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

function padTwoDigits(value: number): string {
  return value.toString().padStart(2, "0");
}

/** "03/01/2026" */
export function formatShortDate(date: Date): string {
  return `${padTwoDigits(date.getDate())}/${padTwoDigits(date.getMonth() + 1)}/${date.getFullYear()}`;
}

/** "3 janvier 2026" */
export function formatLongDate(date: Date): string {
  const month = MONTH_NAMES[date.getMonth()] ?? "";
  return `${date.getDate()} ${month.toLowerCase()} ${date.getFullYear()}`;
}

/** "lundi 2 janvier 2026" */
export function formatDateWithWeekday(date: Date): string {
  return `${WEEKDAY_NAMES[date.getDay()] ?? ""} ${formatLongDate(date)}`;
}

/** Full weeks (Monday to Sunday) covering the month of `month`. */
export function getCalendarWeeks(month: Date): Date[][] {
  const firstDay = startOfMonth(month);
  const mondayOffset = (firstDay.getDay() + DAYS_IN_WEEK - 1) % DAYS_IN_WEEK;
  const lastDay = new Date(month.getFullYear(), month.getMonth() + 1, 0);

  const weeks: Date[][] = [];
  let weekStart = addDays(firstDay, -mondayOffset);
  while (weekStart <= lastDay) {
    const start = weekStart;
    weeks.push(Array.from({ length: DAYS_IN_WEEK }, (_, index) => addDays(start, index)));
    weekStart = addDays(weekStart, DAYS_IN_WEEK);
  }
  return weeks;
}

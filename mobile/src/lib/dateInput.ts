/**
 * Typed date and time inputs (no native picker): digits are formatted as the
 * user types, then parsed and validated.
 */

function digitsOnly(text: string, maxLength: number): string {
  return text.replace(/\D/g, "").slice(0, maxLength);
}

/** "31012000" gives "31/01/2000". */
export function formatDateInput(text: string): string {
  const digits = digitsOnly(text, 8);
  return [digits.slice(0, 2), digits.slice(2, 4), digits.slice(4, 8)]
    .filter((part) => part.length > 0)
    .join("/");
}

/** "1430" gives "14:30". */
export function formatTimeInput(text: string): string {
  const digits = digitsOnly(text, 4);
  return digits.length > 2 ? `${digits.slice(0, 2)}:${digits.slice(2)}` : digits;
}

/** "31/01/2000" gives that day, or null for an impossible date such as "31/02/2000". */
export function parseDateInput(text: string): Date | null {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(text);
  if (!match) {
    return null;
  }
  const [day, month, year] = [Number(match[1]), Number(match[2]), Number(match[3])];
  const date = new Date(year, month - 1, day);
  const isRealDay =
    date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
  return isRealDay ? date : null;
}

export interface TimeOfDay {
  hours: number;
  minutes: number;
}

/** "14:30" gives { hours: 14, minutes: 30 }, or null when out of range. */
export function parseTimeInput(text: string): TimeOfDay | null {
  const match = /^(\d{2}):(\d{2})$/.exec(text);
  if (!match) {
    return null;
  }
  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  return hours < 24 && minutes < 60 ? { hours, minutes } : null;
}

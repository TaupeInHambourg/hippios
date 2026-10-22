import type { AgendaEvent } from "./types";

import type { SelectOption } from "@/components/SelectOptionsModal";
import type { FormErrors } from "@/hooks/useFormState";
import { parseDateInput, parseTimeInput } from "@/lib/dateInput";

export const OTHER_EVENT_TYPE = "other";

export const EVENT_TYPE_OPTIONS: readonly SelectOption[] = [
  { label: "Rendez-vous vétérinaire", value: "Rendez-vous vétérinaire" },
  { label: "Entraînement", value: "Entraînement" },
  { label: "Rappel de vermifuge", value: "Rappel de vermifuge" },
  { label: "Autre", value: OTHER_EVENT_TYPE },
];

export interface NewEventValues {
  horseName: string | null;
  owner: string;
  eventType: string | null;
  /** Free label when the event type is "Autre". */
  customType: string;
  description: string;
  date: string;
  time: string;
  location: string;
}

const REQUIRED_MESSAGE = "Ce champ est obligatoire";

export function validateNewEvent(values: NewEventValues): FormErrors<NewEventValues> {
  const isOther = values.eventType === OTHER_EVENT_TYPE;
  return {
    horseName: values.horseName ? undefined : REQUIRED_MESSAGE,
    owner: values.owner.trim() ? undefined : REQUIRED_MESSAGE,
    eventType: values.eventType ? undefined : REQUIRED_MESSAGE,
    customType: isOther && !values.customType.trim() ? REQUIRED_MESSAGE : undefined,
    date: parseDateInput(values.date) ? undefined : "Date au format JJ/MM/AAAA",
    time: parseTimeInput(values.time) ? undefined : "Heure au format HH:MM",
  };
}

/** "Description, Lieu", either part being optional. */
function buildDetails(values: NewEventValues): string | null {
  const parts = [values.description.trim(), values.location.trim()].filter(Boolean);
  return parts.length > 0 ? parts.join(", ") : null;
}

/** Event built from valid form values, or null when they are not valid. */
export function toAgendaEvent(
  values: NewEventValues,
  horseColor: string,
): Omit<AgendaEvent, "id"> | null {
  const day = parseDateInput(values.date);
  const time = parseTimeInput(values.time);
  const title = values.eventType === OTHER_EVENT_TYPE ? values.customType.trim() : values.eventType;
  if (!day || !time || !title || !values.horseName) {
    return null;
  }
  return {
    title,
    date: new Date(day.getFullYear(), day.getMonth(), day.getDate(), time.hours, time.minutes),
    horseName: values.horseName,
    horseColor,
    owner: values.owner.trim(),
    details: buildDetails(values),
  };
}

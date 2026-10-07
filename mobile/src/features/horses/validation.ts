import type { HorseValues } from "./types";

import type { FormErrors } from "@/hooks/useFormState";

const REQUIRED_MESSAGE = "Ce champ est obligatoire";
const NUMBER_PATTERN = /^\d+([.,]\d+)?$/;

function isBlank(value: string | null): boolean {
  return value === null || value.trim().length === 0;
}

function validateRequiredNumber(value: string, message: string): string | undefined {
  if (isBlank(value)) {
    return REQUIRED_MESSAGE;
  }
  return NUMBER_PATTERN.test(value.trim()) ? undefined : message;
}

export function validateHorse(values: HorseValues): FormErrors<HorseValues> {
  return {
    name: isBlank(values.name) ? REQUIRED_MESSAGE : undefined,
    age: validateRequiredNumber(values.age, "Âge en années (ex. 5)"),
    sex: isBlank(values.sex) ? REQUIRED_MESSAGE : undefined,
    breed: isBlank(values.breed) ? REQUIRED_MESSAGE : undefined,
    weight: validateRequiredNumber(values.weight, "Poids en kg (ex. 500)"),
    height: validateRequiredNumber(values.height, "Taille en mètres (ex. 1,70)"),
  };
}

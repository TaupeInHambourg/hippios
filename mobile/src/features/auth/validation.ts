import type { LoginValues, RegisterValues } from "./types";

import type { FormErrors } from "@/hooks/useFormState";

const REQUIRED_MESSAGE = "Ce champ est obligatoire";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^\+?[\d\s.-]{10,}$/;

function isBlank(value: string | null): boolean {
  return value === null || value.trim().length === 0;
}

export function validateLogin(values: LoginValues): FormErrors<LoginValues> {
  return {
    identifier: isBlank(values.identifier) ? REQUIRED_MESSAGE : undefined,
    password: isBlank(values.password) ? REQUIRED_MESSAGE : undefined,
  };
}

function validateOptionalFormat(value: string, pattern: RegExp, message: string) {
  return !isBlank(value) && !pattern.test(value.trim()) ? message : undefined;
}

export function validateRegister(values: RegisterValues): FormErrors<RegisterValues> {
  return {
    firstName: isBlank(values.firstName) ? REQUIRED_MESSAGE : undefined,
    lastName: isBlank(values.lastName) ? REQUIRED_MESSAGE : undefined,
    city: isBlank(values.city) ? REQUIRED_MESSAGE : undefined,
    notifications: isBlank(values.notifications) ? REQUIRED_MESSAGE : undefined,
    phone: validateOptionalFormat(values.phone, PHONE_PATTERN, "Numéro de téléphone invalide"),
    email: validateOptionalFormat(values.email, EMAIL_PATTERN, "Adresse e-mail invalide"),
  };
}

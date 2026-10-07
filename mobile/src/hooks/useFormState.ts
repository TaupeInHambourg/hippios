import { useState } from "react";
import { AccessibilityInfo, Platform } from "react-native";

export type FormErrors<T> = { [K in keyof T]?: string | undefined };

const INVALID_FORM_ANNOUNCEMENT = "Le formulaire contient des erreurs";

interface UseFormStateResult<T> {
  values: T;
  errors: FormErrors<T>;
  setValue: <K extends keyof T>(key: K, value: T[K]) => void;
  handleSubmit: (onValid: (values: T) => void) => () => void;
}

/**
 * Minimal form state until react-hook-form + Zod are installed (see CLAUDE.md §7).
 * Editing a field clears its error; submitting validates every field.
 */
export function useFormState<T extends object>(
  initialValues: T,
  validate: (values: T) => FormErrors<T>,
): UseFormStateResult<T> {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<FormErrors<T>>({});

  const setValue = <K extends keyof T>(key: K, value: T[K]) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const handleSubmit = (onValid: (values: T) => void) => () => {
    const nextErrors = validate(values);
    setErrors(nextErrors);

    const hasErrors = Object.values(nextErrors).some(Boolean);
    if (hasErrors) {
      // Android announces errors through `accessibilityLiveRegion` on each field.
      if (Platform.OS === "ios") {
        AccessibilityInfo.announceForAccessibility(INVALID_FORM_ANNOUNCEMENT);
      }
      return;
    }

    onValid(values);
  };

  return { values, errors, setValue, handleSubmit };
}

import { StyleSheet, TextInput, View, type TextInputProps } from "react-native";

import { FieldError } from "./FieldError";
import { FieldLabel, getFieldAccessibilityLabel } from "./FieldLabel";

import { COLORS, FONT_SIZE, RADIUS, SPACING, TOUCH_TARGET } from "@/lib/theme";

interface TextFieldProps extends Omit<
  TextInputProps,
  "style" | "placeholderTextColor" | "accessibilityLabel"
> {
  label: string;
  required?: boolean;
  error?: string | undefined;
}

export function TextField({ label, required = false, error, ...inputProps }: TextFieldProps) {
  const isEmpty = !inputProps.value;

  return (
    <View>
      <FieldLabel label={label} required={required} />
      <TextInput
        {...inputProps}
        accessibilityLabel={getFieldAccessibilityLabel(label, required)}
        placeholderTextColor={COLORS.muted}
        style={[styles.input, isEmpty && styles.placeholder, error ? styles.inputError : null]}
      />
      <FieldError message={error} />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    minHeight: TOUCH_TARGET - SPACING.xs,
    paddingHorizontal: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    fontSize: FONT_SIZE.sm,
    color: COLORS.foreground,
  },
  placeholder: {
    fontStyle: "italic",
  },
  inputError: {
    borderColor: COLORS.danger,
  },
});

import { StyleSheet, Text } from "react-native";

import { COLORS, FONT_SIZE, SPACING } from "@/lib/theme";

interface FieldLabelProps {
  label: string;
  required?: boolean;
}

export function FieldLabel({ label, required = false }: FieldLabelProps) {
  return (
    <Text accessible={false} style={styles.label}>
      {required ? `${label}*` : label}
    </Text>
  );
}

/** Label read by screen readers: spells out "required" instead of "asterisk". */
export function getFieldAccessibilityLabel(label: string, required: boolean): string {
  return required ? `${label}, obligatoire` : label;
}

const styles = StyleSheet.create({
  label: {
    marginBottom: SPACING.sm,
    fontSize: FONT_SIZE.md,
    color: COLORS.foreground,
  },
});

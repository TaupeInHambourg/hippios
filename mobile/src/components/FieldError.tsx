import { StyleSheet, Text } from "react-native";

import { COLORS, FONT_SIZE, SPACING } from "@/lib/theme";

interface FieldErrorProps {
  message: string | undefined;
}

export function FieldError({ message }: FieldErrorProps) {
  if (!message) {
    return null;
  }

  return (
    <Text accessibilityLiveRegion="polite" style={styles.error}>
      {message}
    </Text>
  );
}

const styles = StyleSheet.create({
  error: {
    marginTop: SPACING.xs,
    fontSize: FONT_SIZE.sm,
    color: COLORS.danger,
  },
});

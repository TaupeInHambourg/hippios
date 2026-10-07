import { Pressable, StyleSheet, Text } from "react-native";

import { COLORS, FONT_SIZE, FONT_WEIGHT, SPACING, TOUCH_TARGET } from "@/lib/theme";

interface OptionRowProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

export function OptionRow({ label, selected, onPress }: OptionRowProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={({ pressed }) => [styles.option, pressed && styles.optionPressed]}
    >
      <Text style={[styles.label, selected && styles.labelSelected]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  option: {
    minHeight: TOUCH_TARGET,
    justifyContent: "center",
    paddingHorizontal: SPACING.lg,
  },
  optionPressed: {
    backgroundColor: COLORS.surface,
  },
  label: {
    fontSize: FONT_SIZE.md,
    color: COLORS.foreground,
  },
  labelSelected: {
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.primary,
  },
});

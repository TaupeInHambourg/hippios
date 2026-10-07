import type { ReactNode } from "react";
import { Pressable, StyleSheet, Text } from "react-native";

import { COLORS, FONT_SIZE, FONT_WEIGHT, RADIUS, SPACING, TOUCH_TARGET } from "@/lib/theme";

type ButtonVariant = "primary" | "outline";

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  icon?: ReactNode;
  disabled?: boolean;
}

export function Button({
  label,
  onPress,
  variant = "primary",
  icon,
  disabled = false,
}: ButtonProps) {
  const isPrimary = variant === "primary";

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      hitSlop={HIT_SLOP}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        isPrimary ? styles.primary : styles.outline,
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}
    >
      {icon}
      <Text style={[styles.label, isPrimary ? styles.primaryLabel : styles.outlineLabel]}>
        {label}
      </Text>
    </Pressable>
  );
}

// Compact 44pt button; the hit slop keeps the 48dp Android touch target.
const BUTTON_HEIGHT = 44;
const HIT_SLOP = (TOUCH_TARGET - BUTTON_HEIGHT) / 2;

const styles = StyleSheet.create({
  base: {
    minHeight: BUTTON_HEIGHT,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.md,
  },
  primary: {
    backgroundColor: COLORS.primary,
  },
  outline: {
    borderWidth: 1.5,
    borderColor: COLORS.primary,
  },
  pressed: {
    opacity: 0.8,
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.bold,
    textAlign: "center",
  },
  primaryLabel: {
    color: COLORS.primaryForeground,
  },
  outlineLabel: {
    color: COLORS.primary,
  },
});

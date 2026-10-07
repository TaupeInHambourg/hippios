import { Pressable, StyleSheet, View } from "react-native";

import { FieldError } from "./FieldError";
import { FieldLabel } from "./FieldLabel";

import { COLORS, RADIUS, SPACING, type ColorOption } from "@/lib/theme";

interface ColorPickerProps {
  label: string;
  options: readonly ColorOption[];
  value: string | null;
  onChange: (value: string) => void;
  required?: boolean;
  error?: string | undefined;
}

const SWATCH_SIZE = 30;
const RING_SIZE = 36;
const SWATCH_HIT_SLOP = 6;

export function ColorPicker({
  label,
  options,
  value,
  onChange,
  required = false,
  error,
}: ColorPickerProps) {
  return (
    <View>
      <FieldLabel label={label} required={required} />
      <View accessibilityRole="radiogroup" accessibilityLabel={label} style={styles.swatches}>
        {options.map((option) => {
          const isSelected = option.value === value;

          return (
            <Pressable
              key={option.value}
              accessibilityRole="radio"
              accessibilityLabel={option.label}
              accessibilityState={{ checked: isSelected }}
              hitSlop={SWATCH_HIT_SLOP}
              onPress={() => onChange(option.value)}
              style={[styles.ring, isSelected && styles.ringSelected]}
            >
              <View style={[styles.swatch, { backgroundColor: option.value }]} />
            </Pressable>
          );
        })}
      </View>
      <FieldError message={error} />
    </View>
  );
}

const styles = StyleSheet.create({
  swatches: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: SPACING.md,
    marginHorizontal: -(RING_SIZE - SWATCH_SIZE) / 2,
  },
  // The ring makes the selection visible without relying on color.
  ring: {
    width: RING_SIZE,
    height: RING_SIZE,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: COLORS.background,
    borderRadius: RADIUS.full,
  },
  ringSelected: {
    borderColor: COLORS.foreground,
  },
  swatch: {
    width: SWATCH_SIZE - 2,
    height: SWATCH_SIZE - 2,
    borderRadius: RADIUS.full,
  },
});

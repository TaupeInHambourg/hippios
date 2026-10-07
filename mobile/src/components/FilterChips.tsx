import { Pressable, ScrollView, StyleSheet, Text } from "react-native";

import { COLORS, FONT_SIZE, FONT_WEIGHT, RADIUS, SPACING } from "@/lib/theme";

export interface FilterChipOption<T extends string> {
  label: string;
  value: T;
}

interface FilterChipsProps<T extends string> {
  options: readonly FilterChipOption<T>[];
  value: T;
  onChange: (value: T) => void;
}

/** Single-choice pill filters, scrolling horizontally. */
export function FilterChips<T extends string>({ options, value, onChange }: FilterChipsProps<T>) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      accessibilityRole="radiogroup"
      contentContainerStyle={styles.content}
    >
      {options.map((option) => {
        const isSelected = option.value === value;
        return (
          <Pressable
            key={option.value}
            accessibilityRole="radio"
            accessibilityState={{ checked: isSelected }}
            hitSlop={SPACING.xs}
            onPress={() => onChange(option.value)}
            style={[styles.chip, isSelected && styles.chipSelected]}
          >
            <Text style={[styles.label, isSelected && styles.labelSelected]}>{option.label}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: SPACING.sm,
  },
  chip: {
    minHeight: 40,
    justifyContent: "center",
    paddingHorizontal: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: RADIUS.full,
  },
  chipSelected: {
    backgroundColor: COLORS.primary,
  },
  label: {
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.primary,
  },
  labelSelected: {
    color: COLORS.primaryForeground,
  },
});

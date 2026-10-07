import { Pressable, StyleSheet, Text, View } from "react-native";

import { RANGE_OPTIONS } from "../detail/metrics";
import type { ChartRange } from "../detail/types";

import { COLORS, FONT_SIZE, FONT_WEIGHT, RADIUS, TOUCH_TARGET } from "@/lib/theme";

interface RangeSelectorProps {
  value: ChartRange;
  onChange: (range: ChartRange) => void;
}

export function RangeSelector({ value, onChange }: RangeSelectorProps) {
  return (
    <View
      accessibilityRole="radiogroup"
      accessibilityLabel="Durée affichée"
      style={styles.container}
    >
      {RANGE_OPTIONS.map((range) => {
        const isSelected = range === value;
        return (
          <Pressable
            key={range}
            accessibilityRole="radio"
            accessibilityLabel={range === 1 ? "1 jour" : `${range} jours`}
            accessibilityState={{ checked: isSelected }}
            onPress={() => onChange(range)}
            style={[styles.option, isSelected && styles.optionSelected]}
          >
            <Text style={[styles.label, isSelected && styles.labelSelected]}>{range}j</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  option: {
    minWidth: TOUCH_TARGET,
    height: TOUCH_TARGET,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: RADIUS.full,
  },
  optionSelected: {
    backgroundColor: COLORS.surface,
  },
  label: {
    fontSize: FONT_SIZE.md,
    color: COLORS.muted,
  },
  labelSelected: {
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.primary,
  },
});

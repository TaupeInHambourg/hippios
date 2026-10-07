import { StyleSheet, Text, View } from "react-native";

import { COLORS, FONT_SIZE, RADIUS, SPACING } from "@/lib/theme";

// Hex alpha suffix giving a light tint of the horse color as background.
const TINT_ALPHA = "40";

interface HorseChipProps {
  name: string;
  color: string;
}

export function HorseChip({ name, color }: HorseChipProps) {
  return (
    <View style={[styles.chip, { borderColor: color, backgroundColor: `${color}${TINT_ALPHA}` }]}>
      <Text style={styles.label} numberOfLines={1}>
        {name}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    maxWidth: 140,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderWidth: 1,
    borderRadius: RADIUS.md,
  },
  label: {
    fontSize: FONT_SIZE.md,
    color: COLORS.foreground,
  },
});

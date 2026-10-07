import { StyleSheet, Text, View } from "react-native";

import type { ChartPoint } from "../detail/types";

import { COLORS, FONT_SIZE, FONT_WEIGHT, RADIUS, SPACING } from "@/lib/theme";

export const TOOLTIP_WIDTH = 150;

interface ChartTooltipProps {
  point: ChartPoint;
  left: number;
  formatValue: (value: number) => string;
}

/** Values of the tapped day: text stays in ink colors, the swatches carry the series. */
export function ChartTooltip({ point, left, formatValue }: ChartTooltipProps) {
  return (
    <View pointerEvents="none" style={[styles.tooltip, { left }]}>
      <Text style={styles.title}>{point.label}</Text>
      <Text style={styles.value}>{formatValue(point.value)}</Text>
      <View style={styles.row}>
        <View style={[styles.swatch, styles.normSwatch]} />
        <Text style={styles.detail}>Norme {formatValue(point.norm)}</Text>
      </View>
      <View style={styles.row}>
        <View style={[styles.swatch, styles.horseSwatch]} />
        <Text style={styles.detail}>Moyenne {formatValue(point.horseAverage)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tooltip: {
    position: "absolute",
    top: 0,
    width: TOOLTIP_WIDTH,
    gap: SPACING.xs,
    padding: SPACING.sm,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.card,
    elevation: 4,
    shadowColor: COLORS.shadow,
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  title: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.muted,
  },
  value: {
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.foreground,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xs,
  },
  swatch: {
    width: SPACING.md,
    height: 2,
  },
  normSwatch: {
    backgroundColor: COLORS.chartNorm,
  },
  horseSwatch: {
    backgroundColor: COLORS.chartHorse,
  },
  detail: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.foreground,
  },
});

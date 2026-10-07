import { StyleSheet, Text, View } from "react-native";

import type { ChartPoint } from "../detail/types";

import { COLORS, FONT_SIZE, FONT_WEIGHT, SPACING } from "@/lib/theme";

const COLUMNS = ["Jour", "Mesure", "Norme", "Moyenne"] as const;

interface ChartDataTableProps {
  /** At most 30 points: the chart range is bounded. */
  points: readonly ChartPoint[];
  formatValue: (value: number) => string;
}

/** Text alternative to the chart, readable without colors or a screen reader. */
export function ChartDataTable({ points, formatValue }: ChartDataTableProps) {
  return (
    <View accessibilityLabel="Données du graphique">
      <View style={styles.row}>
        {COLUMNS.map((column) => (
          <Text key={column} style={[styles.cell, styles.header]}>
            {column}
          </Text>
        ))}
      </View>
      {points.map((point) => (
        <View key={point.date.toISOString()} style={styles.row}>
          <Text style={styles.cell}>{point.label}</Text>
          <Text style={styles.cell}>{formatValue(point.value)}</Text>
          <Text style={styles.cell}>{formatValue(point.norm)}</Text>
          <Text style={styles.cell}>{formatValue(point.horseAverage)}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    paddingVertical: SPACING.xs,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.chartGrid,
  },
  cell: {
    flex: 1,
    fontSize: FONT_SIZE.sm,
    color: COLORS.foreground,
  },
  header: {
    fontWeight: FONT_WEIGHT.bold,
  },
});

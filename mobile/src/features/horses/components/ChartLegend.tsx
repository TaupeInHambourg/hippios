import { StyleSheet, Text, View } from "react-native";

import type { HealthLevel } from "../health/types";

import { StatusDot } from "@/components/StatusDot";
import { COLORS, FONT_SIZE, FONT_WEIGHT, SPACING } from "@/lib/theme";

interface ChartLegendProps {
  periodLabel: string;
  normValue: string;
  horseValue: string;
  horseLevel: HealthLevel;
}

/** Legend with the period averages: identity never relies on color alone. */
export function ChartLegend({ periodLabel, normValue, horseValue, horseLevel }: ChartLegendProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.period}>{periodLabel}</Text>
      <View style={styles.row}>
        <View style={[styles.bar, styles.normBar]} />
        <Text style={styles.name}>Norme</Text>
        <Text style={styles.value}>{normValue}</Text>
      </View>
      <View style={styles.row}>
        <View style={[styles.bar, styles.horseBar]} />
        <Text style={styles.name}>Moyenne du cheval</Text>
        <Text style={styles.value}>{horseValue}</Text>
        <StatusDot level={horseLevel} />
      </View>
      <View style={styles.row}>
        <View style={[styles.bar, styles.dailyBar]} />
        <Text style={styles.detail}>Barres : valeur mesurée</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: SPACING.sm,
  },
  period: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.muted,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
  },
  bar: {
    width: 3,
    height: SPACING.lg,
  },
  normBar: {
    backgroundColor: COLORS.chartNorm,
  },
  horseBar: {
    backgroundColor: COLORS.chartHorse,
  },
  dailyBar: {
    width: SPACING.sm,
    backgroundColor: COLORS.chartBar,
  },
  name: {
    flex: 1,
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.foreground,
  },
  value: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.foreground,
  },
  detail: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.muted,
  },
});

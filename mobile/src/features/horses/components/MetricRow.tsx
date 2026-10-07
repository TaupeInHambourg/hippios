import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text } from "react-native";

import { METRIC_DEFINITIONS, formatMetricValue } from "../detail/metrics";
import type { MetricReading } from "../detail/types";

import { StatusDot, getStatusLabel } from "@/components/StatusDot";
import { COLORS, FONT_SIZE, SPACING, TOUCH_TARGET } from "@/lib/theme";

interface MetricRowProps {
  reading: MetricReading;
  onPress: () => void;
}

export function MetricRow({ reading, onPress }: MetricRowProps) {
  const definition = METRIC_DEFINITIONS[reading.id];
  const value = `${formatMetricValue(reading.id, reading.value)} ${definition.suffix}`;
  const isAlert = reading.level !== "ok";

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${definition.label} : ${value}${isAlert ? `, ${getStatusLabel(reading.level)}` : ""}`}
      accessibilityHint="Affiche l’historique de cette mesure"
      onPress={onPress}
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}
    >
      <MaterialCommunityIcons name={definition.icon} size={22} color={COLORS.foreground} />
      <Text style={styles.label}>{definition.label}</Text>
      <Text style={styles.value}>{value}</Text>
      {isAlert ? <StatusDot level={reading.level} announced={false} /> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    minHeight: TOUCH_TARGET,
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
  },
  pressed: {
    backgroundColor: COLORS.surface,
  },
  label: {
    flex: 1,
    fontSize: FONT_SIZE.md,
    color: COLORS.foreground,
  },
  value: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.foreground,
  },
});

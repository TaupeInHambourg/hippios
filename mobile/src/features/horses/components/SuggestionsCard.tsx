import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { METRIC_DEFINITIONS } from "../detail/metrics";
import type { MetricReading } from "../detail/types";

import { StatusDot } from "@/components/StatusDot";
import { COLORS, FONT_SIZE, FONT_WEIGHT, RADIUS, SPACING, TOUCH_TARGET } from "@/lib/theme";

interface SuggestionsCardProps {
  /** Readings needing attention, most urgent first. */
  alerts: readonly MetricReading[];
}

/** Collapsible summary of the metrics to watch. */
export function SuggestionsCard({ alerts }: SuggestionsCardProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <View style={styles.card}>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ expanded: isExpanded }}
        onPress={() => setIsExpanded((current) => !current)}
        style={styles.header}
      >
        <Text accessibilityRole="header" style={styles.title}>
          Suggestions
        </Text>
        <Ionicons
          name={isExpanded ? "chevron-up" : "chevron-down"}
          size={24}
          color={COLORS.foreground}
        />
      </Pressable>
      {isExpanded
        ? alerts.map((reading) => (
            <View key={reading.id} style={styles.row}>
              <Text style={styles.label}>{METRIC_DEFINITIONS[reading.id].label}</Text>
              <StatusDot level={reading.level} />
            </View>
          ))
        : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
  },
  header: {
    minHeight: TOUCH_TARGET,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: FONT_SIZE.lg,
    color: COLORS.foreground,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
  },
  label: {
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.foreground,
  },
});

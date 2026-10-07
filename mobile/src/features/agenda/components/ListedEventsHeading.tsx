import { Pressable, StyleSheet, Text, View } from "react-native";

import type { EventPeriod } from "../types";

import { SegmentedTabs, type SegmentedTab } from "@/components/SegmentedTabs";
import { formatShortDate } from "@/lib/dates";
import { COLORS, FONT_SIZE, FONT_WEIGHT, SPACING, TOUCH_TARGET } from "@/lib/theme";

const PERIOD_TABS: readonly SegmentedTab<EventPeriod>[] = [
  { label: "Prochains RDV", value: "upcoming" },
  { label: "RDV passés", value: "past" },
];

interface ListedEventsHeadingProps {
  period: EventPeriod;
  onPeriodChange: (period: EventPeriod) => void;
  selectedDay: Date | null;
  onClearSelectedDay: () => void;
}

export function ListedEventsHeading({
  period,
  onPeriodChange,
  selectedDay,
  onClearSelectedDay,
}: ListedEventsHeadingProps) {
  if (selectedDay) {
    return (
      <View style={styles.dayRow}>
        <Text accessibilityRole="header" style={styles.title}>
          Le {formatShortDate(selectedDay)}
        </Text>
        <Pressable accessibilityRole="button" onPress={onClearSelectedDay} style={styles.link}>
          <Text style={styles.linkLabel}>Tout afficher</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SegmentedTabs tabs={PERIOD_TABS} value={period} onChange={onPeriodChange} />
      {period === "past" ? (
        <Text accessibilityRole="header" style={styles.title}>
          Rendez-vous passés
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: SPACING.lg,
  },
  dayRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: FONT_SIZE.lg,
    color: COLORS.foreground,
  },
  link: {
    minHeight: TOUCH_TARGET,
    justifyContent: "center",
  },
  linkLabel: {
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.primary,
    textDecorationLine: "underline",
  },
});

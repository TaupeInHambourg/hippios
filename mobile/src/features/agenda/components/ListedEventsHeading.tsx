import { StyleSheet, Text, View } from "react-native";

import type { EventPeriod } from "../types";

import { SegmentedTabs, type SegmentedTab } from "@/components/SegmentedTabs";
import { COLORS, FONT_SIZE, SPACING } from "@/lib/theme";

const PERIOD_TABS: readonly SegmentedTab<EventPeriod>[] = [
  { label: "Prochains RDV", value: "upcoming" },
  { label: "RDV passés", value: "past" },
];

interface ListedEventsHeadingProps {
  period: EventPeriod;
  onPeriodChange: (period: EventPeriod) => void;
}

export function ListedEventsHeading({ period, onPeriodChange }: ListedEventsHeadingProps) {
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
  title: {
    fontSize: FONT_SIZE.lg,
    color: COLORS.foreground,
  },
});

import { Pressable, StyleSheet, Text, View } from "react-native";

import { COLORS, FONT_SIZE, FONT_WEIGHT, RADIUS, SPACING, TOUCH_TARGET } from "@/lib/theme";

export interface SegmentedTab<T extends string> {
  label: string;
  value: T;
  /** Shows an alert dot next to the label (e.g. a health warning). */
  hasAlert?: boolean;
}

interface SegmentedTabsProps<T extends string> {
  tabs: readonly SegmentedTab<T>[];
  value: T;
  onChange: (value: T) => void;
}

export function SegmentedTabs<T extends string>({ tabs, value, onChange }: SegmentedTabsProps<T>) {
  return (
    <View accessibilityRole="tablist" style={styles.container}>
      {tabs.map((tab) => {
        const isActive = tab.value === value;

        return (
          <Pressable
            key={tab.value}
            accessibilityRole="tab"
            accessibilityLabel={tab.hasAlert ? `${tab.label}, alerte en cours` : tab.label}
            accessibilityState={{ selected: isActive }}
            onPress={() => onChange(tab.value)}
            style={styles.tab}
          >
            <View style={styles.labelRow}>
              <Text style={[styles.label, isActive && styles.labelActive]}>{tab.label}</Text>
              {tab.hasAlert ? <View style={styles.alertDot} /> : null}
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: SPACING.xl,
  },
  tab: {
    minHeight: TOUCH_TARGET,
    justifyContent: "center",
  },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
  },
  alertDot: {
    width: SPACING.lg,
    height: SPACING.lg,
    borderWidth: 3,
    borderColor: COLORS.warningSoft,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.warning,
  },
  label: {
    paddingBottom: SPACING.xs,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.background,
    fontSize: FONT_SIZE.lg,
    color: COLORS.foreground,
  },
  labelActive: {
    fontWeight: FONT_WEIGHT.medium,
    borderBottomColor: COLORS.foreground,
  },
});

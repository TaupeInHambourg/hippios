import { Pressable, StyleSheet, Text, View } from "react-native";

import { formatLongDate } from "@/lib/dates";
import { COLORS, FONT_SIZE, FONT_WEIGHT, RADIUS, SPACING } from "@/lib/theme";

const MAX_DOTS = 3;
const CELL_SIZE = 40;
const DOT_SIZE = 5;

interface CalendarDayProps {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  /** One color per horse having an event that day. */
  dotColors: readonly string[];
  onPress: () => void;
}

function getAccessibilityLabel(date: Date, isToday: boolean, hasEvents: boolean): string {
  const todayLabel = isToday ? ", aujourd’hui" : "";
  const eventsLabel = hasEvents ? ", événements prévus" : "";
  return `${formatLongDate(date)}${todayLabel}${eventsLabel}`;
}

export function CalendarDay({
  date,
  isCurrentMonth,
  isToday,
  isSelected,
  dotColors,
  onPress,
}: CalendarDayProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={getAccessibilityLabel(date, isToday, dotColors.length > 0)}
      accessibilityState={{ selected: isSelected }}
      hitSlop={SPACING.xs}
      onPress={onPress}
      style={styles.cell}
    >
      <View style={[styles.number, isSelected && styles.numberSelected]}>
        <Text
          style={[
            styles.label,
            !isCurrentMonth && styles.labelOutside,
            isToday && styles.labelToday,
            isSelected && styles.labelSelected,
          ]}
        >
          {date.getDate().toString().padStart(2, "0")}
        </Text>
      </View>
      <View style={styles.dots}>
        {dotColors.slice(0, MAX_DOTS).map((color) => (
          <View key={color} style={[styles.dot, { backgroundColor: color }]} />
        ))}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cell: {
    flex: 1,
    height: CELL_SIZE,
    alignItems: "center",
    justifyContent: "center",
  },
  number: {
    minWidth: CELL_SIZE - SPACING.md,
    alignItems: "center",
    borderRadius: RADIUS.full,
  },
  numberSelected: {
    backgroundColor: COLORS.primary,
  },
  label: {
    fontSize: FONT_SIZE.sm,
    lineHeight: SPACING.xl,
    color: COLORS.foreground,
  },
  labelOutside: {
    color: COLORS.muted,
  },
  labelToday: {
    fontWeight: FONT_WEIGHT.bold,
  },
  labelSelected: {
    color: COLORS.primaryForeground,
  },
  dots: {
    height: DOT_SIZE,
    flexDirection: "row",
    gap: SPACING.xs,
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: RADIUS.full,
  },
});

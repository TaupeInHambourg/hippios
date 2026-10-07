import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

import type { AgendaEvent } from "../types";
import { CalendarDay } from "./CalendarDay";

import {
  MONTH_NAMES,
  WEEKDAY_SHORT_LABELS,
  addMonths,
  getCalendarWeeks,
  isSameDay,
  toDayKey,
} from "@/lib/dates";
import { COLORS, FONT_SIZE, FONT_WEIGHT, SPACING, TOUCH_TARGET } from "@/lib/theme";

interface MonthCalendarProps {
  /** Any date of the displayed month. */
  month: Date;
  today: Date;
  selectedDay: Date | null;
  events: readonly AgendaEvent[];
  onMonthChange: (month: Date) => void;
  onDayPress: (day: Date) => void;
}

function groupHorseColorsByDay(events: readonly AgendaEvent[]): Map<string, string[]> {
  const colorsByDay = new Map<string, string[]>();
  for (const event of events) {
    const key = toDayKey(event.date);
    const colors = colorsByDay.get(key) ?? [];
    if (!colors.includes(event.horseColor)) {
      colorsByDay.set(key, [...colors, event.horseColor]);
    }
  }
  return colorsByDay;
}

export function MonthCalendar({
  month,
  today,
  selectedDay,
  events,
  onMonthChange,
  onDayPress,
}: MonthCalendarProps) {
  const colorsByDay = groupHorseColorsByDay(events);
  const monthName = MONTH_NAMES[month.getMonth()] ?? "";
  const title =
    month.getFullYear() === today.getFullYear() ? monthName : `${monthName} ${month.getFullYear()}`;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Mois précédent"
          onPress={() => onMonthChange(addMonths(month, -1))}
          style={styles.navButton}
        >
          <Ionicons name="chevron-back" size={22} color={COLORS.foreground} />
        </Pressable>
        <Text accessibilityRole="header" style={styles.title}>
          {title}
        </Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Mois suivant"
          onPress={() => onMonthChange(addMonths(month, 1))}
          style={styles.navButton}
        >
          <Ionicons name="chevron-forward" size={22} color={COLORS.foreground} />
        </Pressable>
      </View>
      <View style={styles.week} accessibilityElementsHidden importantForAccessibility="no">
        {WEEKDAY_SHORT_LABELS.map((label) => (
          <Text key={label} style={styles.weekday}>
            {label}
          </Text>
        ))}
      </View>
      {getCalendarWeeks(month).map((week) => (
        <View key={toDayKey(week[0] ?? month)} style={styles.week}>
          {week.map((day) => (
            <CalendarDay
              key={toDayKey(day)}
              date={day}
              isCurrentMonth={day.getMonth() === month.getMonth()}
              isToday={isSameDay(day, today)}
              isSelected={selectedDay !== null && isSameDay(day, selectedDay)}
              dotColors={colorsByDay.get(toDayKey(day)) ?? []}
              onPress={() => onDayPress(day)}
            />
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: SPACING.sm,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.foreground,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  navButton: {
    width: TOUCH_TARGET,
    height: TOUCH_TARGET,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: FONT_SIZE.xl,
    color: COLORS.foreground,
  },
  week: {
    flexDirection: "row",
  },
  weekday: {
    flex: 1,
    textAlign: "center",
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.medium,
    color: COLORS.foreground,
  },
});

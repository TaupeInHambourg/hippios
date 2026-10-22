import { Ionicons } from "@expo/vector-icons";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

import type { AgendaEvent } from "../types";

import { HorseChip } from "@/components/HorseChip";
import { formatDateWithWeekday } from "@/lib/dates";
import { COLORS, FONT_SIZE, FONT_WEIGHT, RADIUS, SPACING, TOUCH_TARGET } from "@/lib/theme";

/** "Jeudi 4 janvier 2026" */
function formatDayTitle(day: Date): string {
  const label = formatDateWithWeekday(day);
  return `${label.charAt(0).toUpperCase()}${label.slice(1)}`;
}

/** "10H00" */
function formatTime(date: Date): string {
  const pad = (value: number) => value.toString().padStart(2, "0");
  return `${pad(date.getHours())}H${pad(date.getMinutes())}`;
}

interface DayEventsPopoverProps {
  /** Day to detail; the popover is hidden when null. */
  day: Date | null;
  /** That day's events, in chronological order. */
  events: readonly AgendaEvent[];
  /** Shows which horse each event concerns (useless on a single horse's agenda). */
  showHorse: boolean;
  onClose: () => void;
}

export function DayEventsPopover({ day, events, showHorse, onClose }: DayEventsPopoverProps) {
  return (
    <Modal transparent animationType="fade" visible={day !== null} onRequestClose={onClose}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Fermer"
        onPress={onClose}
        style={styles.backdrop}
      >
        {/* Inner presses must not close the popover. */}
        <Pressable accessible={false} style={styles.card}>
          <View style={styles.header}>
            <Text accessibilityRole="header" style={styles.title}>
              {day ? formatDayTitle(day) : ""}
            </Text>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Fermer"
              onPress={onClose}
              style={styles.close}
            >
              <Ionicons name="close" size={22} color={COLORS.foreground} />
            </Pressable>
          </View>
          {events.length === 0 ? (
            <Text style={styles.empty}>Aucun événement ce jour-là.</Text>
          ) : (
            events.map((event) => (
              <View key={event.id} style={styles.event}>
                <View style={styles.titleRow}>
                  <Text style={styles.eventTitle}>
                    <Text style={styles.time}>{formatTime(event.date)} : </Text>
                    {event.title}
                  </Text>
                  {showHorse ? <HorseChip name={event.horseName} color={event.horseColor} /> : null}
                </View>
                {event.details ? <Text style={styles.details}>{event.details}.</Text> : null}
              </View>
            ))
          )}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: "center",
    padding: SPACING.lg,
    backgroundColor: COLORS.overlay,
  },
  card: {
    gap: SPACING.lg,
    padding: SPACING.xl,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.background,
    elevation: 6,
    shadowColor: COLORS.shadow,
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    flex: 1,
    fontSize: FONT_SIZE.md,
    color: COLORS.foreground,
  },
  close: {
    width: TOUCH_TARGET,
    height: TOUCH_TARGET,
    alignItems: "flex-end",
    justifyContent: "center",
    marginVertical: -SPACING.md,
  },
  event: {
    gap: SPACING.sm,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
  },
  eventTitle: {
    flex: 1,
    fontSize: FONT_SIZE.md,
    color: COLORS.foreground,
  },
  time: {
    fontWeight: FONT_WEIGHT.bold,
  },
  details: {
    fontSize: FONT_SIZE.sm,
    fontStyle: "italic",
    color: COLORS.foreground,
  },
  empty: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.muted,
  },
});

import { Pressable, StyleSheet, Text } from "react-native";

import type { AgendaEvent } from "../types";

import { HorseChip } from "@/components/HorseChip";
import { formatLongDate, formatShortDate } from "@/lib/dates";
import { COLORS, FONT_SIZE, FONT_WEIGHT, SPACING, TOUCH_TARGET } from "@/lib/theme";

interface EventRowProps {
  event: AgendaEvent;
  /** Hidden on a single horse's agenda, where the horse is already known. */
  showHorse?: boolean;
  /** Opens the event details; the row is static without it. */
  onPress?: () => void;
}

export function EventRow({ event, showHorse = true, onPress }: EventRowProps) {
  const label = `${formatLongDate(event.date)} : ${event.title}${showHorse ? `, ${event.horseName}` : ""}`;

  return (
    <Pressable
      accessible
      accessibilityRole={onPress ? "button" : "text"}
      accessibilityLabel={label}
      accessibilityHint={onPress ? "Affiche le détail du jour" : undefined}
      disabled={!onPress}
      onPress={onPress}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
    >
      <Text style={styles.text}>
        <Text style={styles.date}>{formatShortDate(event.date)} : </Text>
        {event.title}
      </Text>
      {showHorse ? <HorseChip name={event.horseName} color={event.horseColor} /> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: TOUCH_TARGET - SPACING.sm,
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
  },
  pressed: {
    backgroundColor: COLORS.surface,
  },
  text: {
    flex: 1,
    fontSize: FONT_SIZE.md,
    color: COLORS.foreground,
  },
  date: {
    fontWeight: FONT_WEIGHT.bold,
  },
});

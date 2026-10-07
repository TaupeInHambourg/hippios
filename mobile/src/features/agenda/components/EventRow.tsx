import { StyleSheet, Text, View } from "react-native";

import type { AgendaEvent } from "../types";
import { HorseChip } from "./HorseChip";

import { formatLongDate, formatShortDate } from "@/lib/dates";
import { COLORS, FONT_SIZE, FONT_WEIGHT, SPACING } from "@/lib/theme";

interface EventRowProps {
  event: AgendaEvent;
}

export function EventRow({ event }: EventRowProps) {
  return (
    <View
      accessible
      accessibilityLabel={`${formatLongDate(event.date)} : ${event.title}, ${event.horseName}`}
      style={styles.container}
    >
      <Text style={styles.text}>
        <Text style={styles.date}>{formatShortDate(event.date)} : </Text>
        {event.title}
      </Text>
      <HorseChip name={event.horseName} color={event.horseColor} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
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

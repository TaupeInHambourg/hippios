import { StyleSheet, Text, View } from "react-native";

import type { HorseHealth } from "../health/types";

import { Divider } from "@/components/Divider";
import { formatLongDate } from "@/lib/dates";
import { COLORS, FONT_SIZE, FONT_WEIGHT, SPACING } from "@/lib/theme";

interface Highlight {
  key: string;
  label: string | null;
  text: string;
}

function getHighlights(health: HorseHealth, showBattery: boolean): Highlight[] {
  const highlights: Highlight[] = [];
  if (health.newDocumentsFrom && health.newDocumentsCount > 0) {
    const noun = health.newDocumentsCount > 1 ? "nouveaux documents" : "nouveau document";
    highlights.push({
      key: "documents",
      label: null,
      text: `${health.newDocumentsCount} ${noun} de ${health.newDocumentsFrom}`,
    });
  }
  if (health.nextReminder) {
    highlights.push({
      key: "reminder",
      label: formatLongDate(health.nextReminder.date),
      text: health.nextReminder.label,
    });
  }
  if (showBattery && health.battery) {
    const { percent, remainingHours } = health.battery;
    highlights.push({
      key: "battery",
      label: "Batterie",
      text: `${percent}%, encore ${remainingHours}h d’autonomie`,
    });
  }
  return highlights;
}

interface HorseHighlightsProps {
  health: HorseHealth;
  showBattery: boolean;
}

/** New documents, next reminder and sensor battery, under a divider. */
export function HorseHighlights({ health, showBattery }: HorseHighlightsProps) {
  const highlights = getHighlights(health, showBattery);
  if (highlights.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Divider />
      {highlights.map((highlight) => (
        <Text key={highlight.key} style={styles.text}>
          {highlight.label ? <Text style={styles.label}>{highlight.label} : </Text> : null}
          {highlight.text}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: SPACING.sm,
  },
  text: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.foreground,
  },
  label: {
    fontWeight: FONT_WEIGHT.bold,
  },
});

import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";

import type { HorseOverview } from "../health/types";
import { HealthSummary } from "./HealthSummary";
import { HorseAvatar } from "./HorseAvatar";
import { HorseHighlights } from "./HorseHighlights";

import { HorseChip } from "@/components/HorseChip";
import { COLORS, RADIUS, SPACING } from "@/lib/theme";

interface HorseStatusCardProps {
  horse: HorseOverview;
  showBattery?: boolean;
  /** Makes the whole card pressable, with a chevron. */
  onPress?: () => void;
}

export function HorseStatusCard({ horse, showBattery = false, onPress }: HorseStatusCardProps) {
  const content = (
    <>
      <View style={styles.header}>
        <HorseAvatar color={horse.color} size={44} />
        <View style={styles.name}>
          <HorseChip name={horse.name} color={horse.color} />
        </View>
        {onPress ? <Ionicons name="chevron-forward" size={22} color={COLORS.foreground} /> : null}
      </View>
      <HealthSummary health={horse.health} />
      {horse.health ? <HorseHighlights health={horse.health} showBattery={showBattery} /> : null}
    </>
  );

  if (!onPress) {
    return <View style={styles.card}>{content}</View>;
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityHint="Affiche la fiche du cheval"
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: SPACING.md,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
  },
  pressed: {
    backgroundColor: COLORS.surface,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
  },
  name: {
    flex: 1,
    alignItems: "flex-start",
  },
});

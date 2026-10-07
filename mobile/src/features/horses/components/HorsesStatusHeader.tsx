import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { countByStatus } from "../health/healthStatus";
import type { HorseOverview } from "../health/types";

import { StatusDot, getStatusLabel, type StatusLevel } from "@/components/StatusDot";
import { COLORS, FONT_SIZE, SPACING, TOUCH_TARGET } from "@/lib/theme";

const STATUS_ORDER: readonly StatusLevel[] = ["critical", "warning", "ok", "pending"];

interface HorsesStatusHeaderProps {
  horses: readonly HorseOverview[];
  onPress: () => void;
}

/** "Mes chevaux" with one counter per status, e.g. "● 1/2". */
export function HorsesStatusHeader({ horses, onPress }: HorsesStatusHeaderProps) {
  const counts = countByStatus(horses);
  const total = horses.length;
  const counters = STATUS_ORDER.flatMap((level) => {
    const count = counts.get(level);
    return count ? [{ level, count }] : [];
  });
  const summary = counters
    .map(({ level, count }) => `${getStatusLabel(level)} : ${count} sur ${total}`)
    .join(", ");

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Mes chevaux. ${summary}`}
      onPress={onPress}
      style={styles.container}
    >
      <Text style={styles.title}>Mes chevaux</Text>
      <View style={styles.counters}>
        {counters.map(({ level, count }) => (
          <View key={level} style={styles.counter}>
            <StatusDot level={level} announced={false} />
            <Text style={styles.count}>
              {count}/{total}
            </Text>
          </View>
        ))}
      </View>
      <Ionicons name="chevron-forward" size={26} color={COLORS.foreground} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: TOUCH_TARGET,
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.lg,
  },
  title: {
    fontSize: FONT_SIZE.lg,
    color: COLORS.foreground,
  },
  counters: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.md,
  },
  counter: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xs,
  },
  count: {
    fontSize: FONT_SIZE.md,
    color: COLORS.foreground,
  },
});

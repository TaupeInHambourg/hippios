import { StyleSheet, View } from "react-native";

import type { AlertLevel } from "../types";

import { COLORS, RADIUS } from "@/lib/theme";

interface AlertLevelDotProps {
  level: AlertLevel;
}

// Color is backed by the text ("Alerte rouge", "Alerte orange") and the a11y label.
export function AlertLevelDot({ level }: AlertLevelDotProps) {
  const isCritical = level === "critical";

  return (
    <View
      accessible
      accessibilityLabel={isCritical ? "Alerte critique" : "Alerte modérée"}
      style={[styles.halo, isCritical ? styles.criticalHalo : styles.warningHalo]}
    >
      <View style={[styles.dot, isCritical ? styles.critical : styles.warning]} />
    </View>
  );
}

const DOT_SIZE = 12;

const styles = StyleSheet.create({
  halo: {
    width: DOT_SIZE * 1.5,
    height: DOT_SIZE * 1.5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: RADIUS.full,
    opacity: 0.9,
  },
  criticalHalo: {
    borderWidth: 3,
    borderColor: COLORS.danger,
  },
  warningHalo: {
    borderWidth: 3,
    borderColor: COLORS.warning,
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: RADIUS.full,
  },
  critical: {
    backgroundColor: COLORS.danger,
  },
  warning: {
    backgroundColor: COLORS.warning,
  },
});

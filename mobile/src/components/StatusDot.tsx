import { StyleSheet, View } from "react-native";

import { COLORS, RADIUS } from "@/lib/theme";

export type StatusLevel = "critical" | "warning" | "ok" | "pending";

const STATUS_LABELS: Record<StatusLevel, string> = {
  critical: "Alerte critique",
  warning: "À surveiller",
  ok: "Tout va bien",
  pending: "En attente de données",
};

const DOT_SIZE = 12;
const HALO_WIDTH = 3;

interface StatusDotProps {
  level: StatusLevel;
  /** Set to false when the status is already read aloud elsewhere. */
  announced?: boolean;
}

// The color always comes with a text label for screen readers (never color alone).
export function StatusDot({ level, announced = true }: StatusDotProps) {
  return (
    <View
      accessible={announced}
      accessibilityLabel={announced ? STATUS_LABELS[level] : undefined}
      importantForAccessibility={announced ? "yes" : "no-hide-descendants"}
      style={[styles.dot, LEVEL_STYLES[level]]}
    />
  );
}

export function getStatusLabel(level: StatusLevel): string {
  return STATUS_LABELS[level];
}

const styles = StyleSheet.create({
  dot: {
    width: DOT_SIZE + HALO_WIDTH * 2,
    height: DOT_SIZE + HALO_WIDTH * 2,
    borderWidth: HALO_WIDTH,
    borderRadius: RADIUS.full,
  },
  critical: {
    borderColor: COLORS.dangerSoft,
    backgroundColor: COLORS.danger,
  },
  warning: {
    borderColor: COLORS.warningSoft,
    backgroundColor: COLORS.warning,
  },
  ok: {
    borderColor: COLORS.successSoft,
    backgroundColor: COLORS.success,
  },
  pending: {
    borderColor: COLORS.surface,
    backgroundColor: COLORS.muted,
  },
});

const LEVEL_STYLES: Record<StatusLevel, (typeof styles)[StatusLevel]> = {
  critical: styles.critical,
  warning: styles.warning,
  ok: styles.ok,
  pending: styles.pending,
};

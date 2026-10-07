import { StyleSheet, Text, View } from "react-native";

import { getAlertMetrics, getWorstLevel } from "../health/healthStatus";
import type { HorseHealth } from "../health/types";

import { StatusDot, type StatusLevel } from "@/components/StatusDot";
import { COLORS, FONT_SIZE, FONT_WEIGHT, SPACING } from "@/lib/theme";

const MAX_LISTED_METRICS = 3;

interface StatusRowProps {
  label: string;
  level: StatusLevel;
  emphasized?: boolean;
}

function StatusRow({ label, level, emphasized = false }: StatusRowProps) {
  return (
    <View style={styles.row}>
      <Text style={[styles.label, emphasized && styles.labelEmphasized]}>{label}</Text>
      <StatusDot level={level} />
    </View>
  );
}

interface HealthSummaryProps {
  health: HorseHealth | null;
}

/** Metrics needing attention (most urgent first), or a single "all good" line. */
export function HealthSummary({ health }: HealthSummaryProps) {
  if (!health) {
    return <StatusRow label="En attente des premières données du capteur" level="pending" />;
  }

  const alerts = getAlertMetrics(health.metrics);
  if (alerts.length === 0) {
    return <StatusRow label="Tout va bien !" level="ok" />;
  }

  const listed = alerts.slice(0, MAX_LISTED_METRICS);
  const others = alerts.slice(MAX_LISTED_METRICS);

  return (
    <View style={styles.container}>
      {listed.map((metric) => (
        <StatusRow
          key={metric.label}
          label={metric.label}
          level={metric.level}
          emphasized={metric.level === "critical"}
        />
      ))}
      {others.length > 0 ? (
        <StatusRow label={`+ ${others.length} autres…`} level={getWorstLevel(others)} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: SPACING.sm,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: SPACING.md,
  },
  label: {
    flex: 1,
    fontSize: FONT_SIZE.sm,
    color: COLORS.foreground,
  },
  labelEmphasized: {
    fontWeight: FONT_WEIGHT.bold,
  },
});

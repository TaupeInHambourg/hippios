import { useState } from "react";
import { Alert, Share, StyleSheet, Text, View } from "react-native";

import { getAlertMetrics } from "../health/healthStatus";
import { ACTIVITY_OPTIONS, METRIC_DEFINITIONS, formatMetricValue } from "../detail/metrics";
import type { Activity, HorseDetail, MetricId, MetricReading } from "../detail/types";
import { MetricRow } from "./MetricRow";
import { SuggestionsCard } from "./SuggestionsCard";

import { Button } from "@/components/Button";
import { FieldError } from "@/components/FieldError";
import { FilterChips } from "@/components/FilterChips";
import { formatDateWithWeekday } from "@/lib/dates";
import { COLORS, FONT_SIZE, SPACING } from "@/lib/theme";

const SHARE_ERROR = "Le partage a échoué. Réessayez.";

/** "Dimanche 6 avril 2026, 10h10" */
function formatUpdate(date: Date): string {
  const day = formatDateWithWeekday(date);
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${day.charAt(0).toUpperCase()}${day.slice(1)}, ${date.getHours()}h${minutes}`;
}

function buildShareMessage(horse: HorseDetail, readings: readonly MetricReading[]): string {
  const lines = readings.map(
    (reading) =>
      `${METRIC_DEFINITIONS[reading.id].label} : ${formatMetricValue(reading.id, reading.value)}`,
  );
  return [`Santé de ${horse.name}`, ...lines].join("\n");
}

interface HealthTabProps {
  horse: HorseDetail;
  onOpenMetric: (metricId: MetricId, activity: Activity) => void;
}

export function HealthTab({ horse, onOpenMetric }: HealthTabProps) {
  const [activity, setActivity] = useState<Activity>("all");
  const [hasReported, setHasReported] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  if (!horse.readings || !horse.lastUpdate) {
    return <Text style={styles.text}>En attente des premières données du capteur.</Text>;
  }

  const readings = horse.readings[activity];
  const alerts = getAlertMetrics(readings);

  const share = async () => {
    setError(undefined);
    try {
      await Share.share({ message: buildShareMessage(horse, readings) });
    } catch {
      setError(SHARE_ERROR);
    }
  };

  // Kept on the device until the reporting API exists.
  const reportFalseAlert = () => {
    Alert.alert("Signaler une fausse alerte", "Les alertes actuelles vous semblent erronées ?", [
      { text: "Annuler", style: "cancel" },
      { text: "Signaler", onPress: () => setHasReported(true) },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Résumé - {formatUpdate(horse.lastUpdate)}</Text>
      <FilterChips options={ACTIVITY_OPTIONS} value={activity} onChange={setActivity} />
      {alerts.length > 0 ? <SuggestionsCard alerts={alerts} /> : null}
      <View>
        {readings.map((reading) => (
          <MetricRow
            key={reading.id}
            reading={reading}
            onPress={() => onOpenMetric(reading.id, activity)}
          />
        ))}
      </View>
      <Button label="Partager" variant="outline" onPress={share} />
      <FieldError message={error} />
      <Text style={styles.text}>
        Vous avez remarqué une fausse alerte ? Signalez-la pour contribuer à améliorer notre
        service.
      </Text>
      {hasReported ? (
        <Text accessibilityLiveRegion="polite" style={styles.notice}>
          Merci, votre signalement a été pris en compte.
        </Text>
      ) : (
        <Button label="Signaler une fausse alerte" variant="danger" onPress={reportFalseAlert} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: SPACING.lg,
  },
  text: {
    fontSize: FONT_SIZE.sm,
    lineHeight: SPACING.xl,
    color: COLORS.foreground,
  },
  notice: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.primary,
  },
});

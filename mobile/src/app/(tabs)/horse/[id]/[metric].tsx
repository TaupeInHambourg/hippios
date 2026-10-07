import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { Screen } from "@/components/Screen";
import { ScreenHeader } from "@/components/ScreenHeader";
import { getStatusLabel } from "@/components/StatusDot";
import {
  METRIC_DEFINITIONS,
  MetricDetailView,
  isActivity,
  isMetricId,
  useHorseDetail,
  type Activity,
  type MetricId,
} from "@/features/horses";
import { COLORS, FONT_SIZE } from "@/lib/theme";

interface StatusIconProps {
  level: "critical" | "warning" | "ok";
}

/** ✓ when the metric is fine, a colored alert icon otherwise (with a text label). */
function StatusIcon({ level }: StatusIconProps) {
  const isOk = level === "ok";
  return (
    <View accessible accessibilityLabel={getStatusLabel(level)}>
      <Ionicons
        name={isOk ? "checkmark-circle-outline" : "alert-circle"}
        size={28}
        color={isOk ? COLORS.foreground : level === "critical" ? COLORS.danger : COLORS.warning}
      />
    </View>
  );
}

export default function MetricScreen() {
  const params = useLocalSearchParams<{ id: string; metric: string; activity?: string }>();
  const horse = useHorseDetail(params.id);
  // Route params come from the URL: validate them before use.
  const metricId: MetricId | null = isMetricId(params.metric) ? params.metric : null;
  const activity: Activity = isActivity(params.activity) ? params.activity : "all";

  if (!horse || !metricId) {
    return (
      <Screen>
        <ScreenHeader title="Mesure" />
        <Text style={styles.text}>Cette mesure est introuvable.</Text>
      </Screen>
    );
  }

  const reading = horse.readings?.[activity].find((item) => item.id === metricId);

  return (
    <Screen scrollable>
      <ScreenHeader
        title={METRIC_DEFINITIONS[metricId].label}
        titleAccessory={reading ? <StatusIcon level={reading.level} /> : null}
      />
      <MetricDetailView horse={horse} metricId={metricId} initialActivity={activity} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: FONT_SIZE.md,
    color: COLORS.muted,
  },
});

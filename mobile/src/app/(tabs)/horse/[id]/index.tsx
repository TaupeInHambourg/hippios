import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { ComingSoon } from "@/components/ComingSoon";
import { HeaderActions } from "@/components/HeaderActions";
import { Screen } from "@/components/Screen";
import { ScreenHeader } from "@/components/ScreenHeader";
import { SegmentedTabs, type SegmentedTab } from "@/components/SegmentedTabs";
import {
  HealthTab,
  HorseProfileHeader,
  useHorseDetail,
  type Activity,
  type HorseDetail,
  type MetricId,
} from "@/features/horses";
import { COLORS, FONT_SIZE, SPACING } from "@/lib/theme";

type HorseSection = "health" | "sensor" | "documents" | "contacts";

function hasHealthAlert(horse: HorseDetail): boolean {
  return horse.readings?.all.some((reading) => reading.level !== "ok") ?? false;
}

function getSections(horse: HorseDetail): SegmentedTab<HorseSection>[] {
  return [
    { label: "Santé", value: "health", hasAlert: hasHealthAlert(horse) },
    { label: "Capteur", value: "sensor" },
    { label: "Documents", value: "documents" },
    { label: "Contacts", value: "contacts" },
  ];
}

export default function HorseDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const horse = useHorseDetail(id);
  const [section, setSection] = useState<HorseSection>("health");

  if (!horse) {
    return (
      <Screen>
        <ScreenHeader title="Cheval" actions={<HeaderActions />} />
        <Text style={styles.text}>Ce cheval est introuvable.</Text>
      </Screen>
    );
  }

  const sections = getSections(horse);
  const openMetric = (metric: MetricId, activity: Activity) =>
    router.push({ pathname: "/horse/[id]/[metric]", params: { id: horse.id, metric, activity } });

  return (
    <Screen scrollable>
      <ScreenHeader
        title={sections.find((item) => item.value === section)?.label ?? "Santé"}
        actions={<HeaderActions />}
      />
      <View style={styles.content}>
        <HorseProfileHeader horse={horse} />
        <SegmentedTabs scrollable tabs={sections} value={section} onChange={setSection} />
        {section === "health" ? (
          <HealthTab horse={horse} onOpenMetric={openMetric} />
        ) : (
          <ComingSoon />
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: SPACING.lg,
  },
  text: {
    fontSize: FONT_SIZE.md,
    color: COLORS.muted,
  },
});

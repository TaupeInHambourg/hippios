import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { ComingSoon } from "@/components/ComingSoon";
import { HeaderActions } from "@/components/HeaderActions";
import { HorseChip } from "@/components/HorseChip";
import { Screen } from "@/components/Screen";
import { ScreenHeader } from "@/components/ScreenHeader";
import { SegmentedTabs, type SegmentedTab } from "@/components/SegmentedTabs";
import { AgendaView, useAgendaEvents, type EventPeriod } from "@/features/agenda";
import {
  HealthTab,
  HorseProfileHeader,
  useHorseDetail,
  type Activity,
  type HorseDetail,
  type MetricId,
} from "@/features/horses";
import { COLORS, FONT_SIZE, SPACING } from "@/lib/theme";

type HorseSection = "health" | "sensor" | "documents" | "contacts" | "agenda";

function hasHealthAlert(horse: HorseDetail): boolean {
  return horse.readings?.all.some((reading) => reading.level !== "ok") ?? false;
}

function getSections(horse: HorseDetail): SegmentedTab<HorseSection>[] {
  return [
    { label: "Santé", value: "health", hasAlert: hasHealthAlert(horse) },
    { label: "Capteur", value: "sensor" },
    { label: "Documents", value: "documents" },
    { label: "Contacts", value: "contacts" },
    { label: "Agenda", value: "agenda" },
  ];
}

export default function HorseDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const horse = useHorseDetail(id);
  const { events } = useAgendaEvents();
  const [section, setSection] = useState<HorseSection>("health");
  const [period, setPeriod] = useState<EventPeriod>("upcoming");

  if (!horse) {
    return (
      <Screen>
        <ScreenHeader title="Cheval" actions={<HeaderActions />} />
        <Text style={styles.text}>Ce cheval est introuvable.</Text>
      </Screen>
    );
  }

  const sections = getSections(horse);
  const title = sections.find((item) => item.value === section)?.label ?? "Santé";
  const tabs = <SegmentedTabs scrollable tabs={sections} value={section} onChange={setSection} />;
  const openMetric = (metric: MetricId, activity: Activity) =>
    router.push({ pathname: "/horse/[id]/[metric]", params: { id: horse.id, metric, activity } });

  // The agenda is a scrolling list: it renders the header itself.
  if (section === "agenda") {
    return (
      <Screen>
        <AgendaView
          singleHorse
          events={events.filter((event) => event.horseName === horse.name)}
          period={period}
          onPeriodChange={setPeriod}
          onAddEvent={() => router.push({ pathname: "/add-event", params: { horse: horse.name } })}
          header={
            <View style={styles.content}>
              <ScreenHeader title={title} actions={<HeaderActions />} />
              <View style={styles.chip}>
                <HorseChip name={horse.name} color={horse.color} />
              </View>
              {tabs}
            </View>
          }
        />
      </Screen>
    );
  }

  return (
    <Screen scrollable>
      <ScreenHeader title={title} actions={<HeaderActions />} />
      <View style={styles.content}>
        <HorseProfileHeader horse={horse} />
        {tabs}
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
  chip: {
    alignItems: "flex-start",
  },
  text: {
    fontSize: FONT_SIZE.md,
    color: COLORS.muted,
  },
});

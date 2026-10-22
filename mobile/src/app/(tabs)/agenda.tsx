import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

import { ComingSoon } from "@/components/ComingSoon";
import { HeaderActions } from "@/components/HeaderActions";
import { Screen } from "@/components/Screen";
import { ScreenHeader } from "@/components/ScreenHeader";
import { SegmentedTabs, type SegmentedTab } from "@/components/SegmentedTabs";
import { useSession } from "@/features/auth";
import { AgendaView, useAgendaEvents, type EventPeriod } from "@/features/agenda";
import {
  DocumentsView,
  MOCK_DOCUMENTS,
  MOCK_FOLDERS,
  useDocumentsNavigation,
  useDocumentsStore,
} from "@/features/documents";
import { SPACING } from "@/lib/theme";

type HistorySection = "health" | "documents" | "agenda";

const SECTIONS: readonly SegmentedTab<HistorySection>[] = [
  // The alert dot is static until health alerts come from the API.
  { label: "Santé", value: "health", hasAlert: true },
  { label: "Documents", value: "documents" },
  { label: "Agenda", value: "agenda" },
];

function getTitle(section: HistorySection, period: EventPeriod): string {
  if (section === "documents") return "Documents";
  return section === "agenda" && period === "upcoming" ? "Agenda" : "Historique";
}

export default function AgendaScreen() {
  const router = useRouter();
  const { events } = useAgendaEvents();
  const [section, setSection] = useState<HistorySection>("agenda");
  const [period, setPeriod] = useState<EventPeriod>("upcoming");
  const isDocumentsSection = section === "documents";
  const documentsNavigation = useDocumentsNavigation(isDocumentsSection);
  const documentsStore = useDocumentsStore(MOCK_DOCUMENTS);
  const { user } = useSession();
  const userName = user ? `${user.firstName} ${user.lastName}` : "Vous";

  const header = (
    <View>
      <ScreenHeader
        title={getTitle(section, period)}
        // Inside documents, the back arrow goes up one level (document > folder > home).
        onBack={
          isDocumentsSection && documentsNavigation.canGoBack
            ? documentsNavigation.goBack
            : undefined
        }
        actions={<HeaderActions />}
      />
      <SegmentedTabs tabs={SECTIONS} value={section} onChange={setSection} />
    </View>
  );

  if (isDocumentsSection) {
    return (
      <Screen>
        <DocumentsView
          documents={documentsStore.documents}
          folders={MOCK_FOLDERS}
          navigation={documentsNavigation}
          header={header}
          onCreateDocument={(values) => documentsStore.addDocument(values, userName)?.id ?? null}
        />
      </Screen>
    );
  }

  if (section === "health") {
    return (
      <Screen scrollable>
        {header}
        <View style={styles.placeholder}>
          <ComingSoon />
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <AgendaView
        events={events}
        header={header}
        period={period}
        onPeriodChange={setPeriod}
        onAddEvent={() => router.push("/add-event")}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  placeholder: {
    marginTop: SPACING.xl,
  },
});

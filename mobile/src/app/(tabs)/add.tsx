import { useRouter } from "expo-router";

import { HeaderActions } from "@/components/HeaderActions";
import { Screen } from "@/components/Screen";
import { ScreenHeader } from "@/components/ScreenHeader";
import { EMPTY_HORSE, HorseForm, SyncIntro, useHorses } from "@/features/horses";

export default function AddHorseScreen() {
  const router = useRouter();
  const { draft, isAwaitingSync, startSync, cancelSync } = useHorses();

  if (isAwaitingSync) {
    return (
      <Screen>
        <ScreenHeader title="Synchronisation" onBack={cancelSync} actions={<HeaderActions />} />
        <SyncIntro onScan={() => router.push("/scan-sensor")} />
      </Screen>
    );
  }

  return (
    <Screen scrollable>
      <ScreenHeader title="Ajouter un cheval" actions={<HeaderActions />} />
      <HorseForm initialValues={draft ?? EMPTY_HORSE} onSubmit={startSync} />
    </Screen>
  );
}

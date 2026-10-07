import { ComingSoon } from "@/components/ComingSoon";
import { HeaderActions } from "@/components/HeaderActions";
import { Screen } from "@/components/Screen";
import { ScreenHeader } from "@/components/ScreenHeader";

export default function AgendaScreen() {
  return (
    <Screen scrollable>
      <ScreenHeader title="Agenda" showBack={false} actions={<HeaderActions />} />
      <ComingSoon />
    </Screen>
  );
}

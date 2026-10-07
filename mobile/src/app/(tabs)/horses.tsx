import { HeaderActions } from "@/components/HeaderActions";
import { Screen } from "@/components/Screen";
import { ScreenHeader } from "@/components/ScreenHeader";
import { HorseList, useHorses } from "@/features/horses";

export default function HorsesScreen() {
  const { horses } = useHorses();

  return (
    <Screen>
      <ScreenHeader title="Mes chevaux" showBack={false} actions={<HeaderActions />} />
      <HorseList horses={horses} />
    </Screen>
  );
}

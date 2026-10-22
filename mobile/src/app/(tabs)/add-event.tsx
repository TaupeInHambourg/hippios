import { useLocalSearchParams, useRouter } from "expo-router";

import { HeaderActions } from "@/components/HeaderActions";
import { Screen } from "@/components/Screen";
import { ScreenHeader } from "@/components/ScreenHeader";
import {
  AddEventForm,
  toAgendaEvent,
  useAgendaEvents,
  type NewEventValues,
} from "@/features/agenda";
import { useSession } from "@/features/auth";
import { useHorseOverviews } from "@/features/horses";
import { COLORS } from "@/lib/theme";

export default function AddEventScreen() {
  const router = useRouter();
  // Optional: set when opened from a horse's agenda. Only used as a prefill.
  const { horse } = useLocalSearchParams<{ horse?: string }>();
  const { user } = useSession();
  const { events, addEvent } = useAgendaEvents();
  const horses = useHorseOverviews();

  const horseNames = [
    ...new Set([...horses.map((item) => item.name), ...events.map((event) => event.horseName)]),
  ];
  const defaultHorseName = horse && horseNames.includes(horse) ? horse : null;

  const handleSubmit = (values: NewEventValues) => {
    const color = horses.find((item) => item.name === values.horseName)?.color ?? COLORS.primary;
    const event = toAgendaEvent(values, color);
    if (event) {
      addEvent(event);
      router.back();
    }
  };

  return (
    <Screen scrollable>
      <ScreenHeader title="Créer un rappel" actions={<HeaderActions />} />
      <AddEventForm
        horseNames={horseNames}
        defaultHorseName={defaultHorseName}
        defaultOwner={user ? `${user.firstName} ${user.lastName}` : ""}
        onSubmit={handleSubmit}
      />
    </Screen>
  );
}

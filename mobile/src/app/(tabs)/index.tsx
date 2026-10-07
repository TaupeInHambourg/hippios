import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";

import { Button } from "@/components/Button";
import { Divider } from "@/components/Divider";
import { HeaderActions } from "@/components/HeaderActions";
import { Screen } from "@/components/Screen";
import { ScreenHeader } from "@/components/ScreenHeader";
import { MOCK_EVENTS, NextAppointments } from "@/features/agenda";
import { useSession } from "@/features/auth";
import {
  HorseAvatarStrip,
  HorsesStatusHeader,
  HorseStatusCard,
  useHorseOverviews,
} from "@/features/horses";
import { SPACING } from "@/lib/theme";

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useSession();
  // Sorted most urgent first: the first horse is the one needing attention.
  const horses = useHorseOverviews();
  const mostUrgentHorse = horses[0];
  const openHorses = () => router.push("/horses");

  return (
    <Screen scrollable>
      <ScreenHeader
        title={user ? `Bonjour ${user.firstName} !` : "Bonjour !"}
        showBack={false}
        actions={<HeaderActions />}
      />
      <View style={styles.content}>
        {mostUrgentHorse ? (
          <>
            <View style={styles.horses}>
              <HorsesStatusHeader horses={horses} onPress={openHorses} />
              <HorseAvatarStrip horses={horses} onHorsePress={openHorses} />
            </View>
            <HorseStatusCard horse={mostUrgentHorse} showBattery onPress={openHorses} />
          </>
        ) : (
          <Button label="Ajouter un cheval" onPress={() => router.push("/add")} />
        )}
        <Divider />
        <NextAppointments events={MOCK_EVENTS} limit={1} onSeeAll={() => router.push("/agenda")} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  // Tight spacing keeps the whole summary visible at a glance.
  content: {
    gap: SPACING.lg,
  },
  horses: {
    gap: SPACING.xs,
  },
});

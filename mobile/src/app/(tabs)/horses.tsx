import { useRouter } from "expo-router";
import { FlatList, StyleSheet, View } from "react-native";

import { Button } from "@/components/Button";
import { Divider } from "@/components/Divider";
import { HeaderActions } from "@/components/HeaderActions";
import { Screen } from "@/components/Screen";
import { ScreenHeader } from "@/components/ScreenHeader";
import { MOCK_EVENTS, NextAppointments } from "@/features/agenda";
import { HorseStatusCard, useHorseOverviews } from "@/features/horses";
import { SPACING } from "@/lib/theme";

export default function HorsesScreen() {
  const router = useRouter();
  // Sorted most urgent first, so horses in bad shape are seen first.
  const horses = useHorseOverviews();

  return (
    <Screen>
      <FlatList
        data={horses}
        keyExtractor={(horse) => horse.id}
        renderItem={({ item }) => (
          <HorseStatusCard
            horse={item}
            onPress={() => router.push({ pathname: "/horse/[id]", params: { id: item.id } })}
          />
        )}
        contentContainerStyle={styles.content}
        ListHeaderComponent={<ScreenHeader title="Mes chevaux" actions={<HeaderActions />} />}
        ListFooterComponent={
          <View style={styles.footer}>
            <Divider />
            <NextAppointments
              events={MOCK_EVENTS}
              limit={1}
              onSeeAll={() => router.push("/agenda")}
            />
            <Button label="Ajouter un cheval" onPress={() => router.push("/add")} />
          </View>
        }
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: SPACING.lg,
    paddingBottom: SPACING.xxl,
  },
  footer: {
    gap: SPACING.xxl,
  },
});

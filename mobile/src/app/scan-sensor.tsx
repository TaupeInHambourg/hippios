import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { Button } from "@/components/Button";
import { HeaderActions } from "@/components/HeaderActions";
import { Screen } from "@/components/Screen";
import { ScreenHeader } from "@/components/ScreenHeader";
import { SensorScanner, useHorses } from "@/features/horses";
import { COLORS, FONT_SIZE, SPACING } from "@/lib/theme";

export default function ScanSensorScreen() {
  const router = useRouter();
  const { completeSync } = useHorses();

  const handleSensorScanned = (sensorId: string) => {
    if (completeSync(sensorId)) {
      router.replace("/sync-success");
    } else {
      // No horse waiting for a sensor (e.g. opened from a deep link).
      router.back();
    }
  };

  return (
    <Screen scrollable>
      <ScreenHeader title="Synchronisation" actions={<HeaderActions />} />
      <View style={styles.content}>
        <Text style={styles.instructions}>
          Utiliser votre appareil photo pour scanner le code QR situé à l’arrière du capteur
        </Text>
        <SensorScanner onSensorScanned={handleSensorScanned} />
        <Text style={styles.hint}>
          Une fois le QR code reconnu, la synchronisation se fera automatiquement.
        </Text>
        <Button label="Retour" onPress={router.back} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: SPACING.xxl,
  },
  instructions: {
    fontSize: FONT_SIZE.lg,
    lineHeight: SPACING.xxl,
    color: COLORS.foreground,
  },
  hint: {
    fontSize: FONT_SIZE.sm,
    lineHeight: SPACING.xl,
    color: COLORS.foreground,
  },
});

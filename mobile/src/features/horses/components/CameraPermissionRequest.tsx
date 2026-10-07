import { useState } from "react";
import { Linking, StyleSheet, Text, View } from "react-native";

import { Button } from "@/components/Button";
import { FieldError } from "@/components/FieldError";
import { COLORS, FONT_SIZE, SPACING } from "@/lib/theme";

interface CameraPermissionRequestProps {
  /** False once the user has permanently denied access: only the settings can grant it. */
  canAskAgain: boolean;
  onRequest: () => Promise<unknown>;
}

export function CameraPermissionRequest({ canAskAgain, onRequest }: CameraPermissionRequestProps) {
  const [error, setError] = useState<string | undefined>(undefined);

  const handlePress = async () => {
    try {
      await (canAskAgain ? onRequest() : Linking.openSettings());
    } catch {
      setError("Impossible d’accéder aux autorisations. Réessayez depuis les réglages.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {canAskAgain
          ? "Hippios a besoin de l’appareil photo pour scanner le QR code du capteur."
          : "L’accès à l’appareil photo est refusé. Autorisez-le dans les réglages pour scanner le capteur."}
      </Text>
      <Button
        label={canAskAgain ? "Autoriser l’appareil photo" : "Ouvrir les réglages"}
        onPress={handlePress}
      />
      <FieldError message={error} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: SPACING.xl,
  },
  text: {
    fontSize: FONT_SIZE.md,
    lineHeight: SPACING.xl,
    color: COLORS.foreground,
  },
});

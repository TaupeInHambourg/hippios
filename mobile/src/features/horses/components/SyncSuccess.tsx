import { StyleSheet, Text, View } from "react-native";

import { Button } from "@/components/Button";
import { COLORS, FONT_SIZE, FONT_WEIGHT, SPACING } from "@/lib/theme";

interface SyncSuccessProps {
  onCompleteProfile: () => void;
}

export function SyncSuccess({ onCompleteProfile }: SyncSuccessProps) {
  return (
    <View style={styles.container}>
      <Text accessibilityRole="header" style={styles.title}>
        Synchronisation réussie !
      </Text>
      <View style={styles.texts}>
        <Text style={styles.text}>
          Veillez à remplir les informations complémentaires dans le profil
        </Text>
        <Text style={styles.hint}>(Documents, Contacts, Agenda)</Text>
      </View>
      <Button label="Compléter le profil" onPress={onCompleteProfile} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    gap: SPACING.xxl,
  },
  title: {
    fontSize: FONT_SIZE.display * 0.65,
    fontWeight: FONT_WEIGHT.bold,
    textAlign: "center",
    color: COLORS.foreground,
  },
  texts: {
    gap: SPACING.sm,
  },
  text: {
    fontSize: FONT_SIZE.lg,
    lineHeight: SPACING.xxl,
    color: COLORS.foreground,
  },
  hint: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.foreground,
  },
});

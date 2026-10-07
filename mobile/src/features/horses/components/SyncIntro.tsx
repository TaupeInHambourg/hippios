import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { Button } from "@/components/Button";
import { COLORS, FONT_SIZE, SPACING } from "@/lib/theme";

interface SyncIntroProps {
  onScan: () => void;
}

export function SyncIntro({ onScan }: SyncIntroProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Scanner le QR Code du capteur sur sa boîte</Text>
      <Ionicons
        name="qr-code"
        size={96}
        color={COLORS.foreground}
        accessibilityElementsHidden
        importantForAccessibility="no"
      />
      <View style={styles.action}>
        <Button label="Scanner" onPress={onScan} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.xxl,
    paddingBottom: SPACING.xxxl * 2,
  },
  text: {
    fontSize: FONT_SIZE.lg,
    lineHeight: SPACING.xxl,
    textAlign: "center",
    color: COLORS.foreground,
  },
  action: {
    alignSelf: "stretch",
  },
});

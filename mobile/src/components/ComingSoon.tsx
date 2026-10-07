import { StyleSheet, Text, View } from "react-native";

import { COLORS, FONT_SIZE, SPACING } from "@/lib/theme";

export function ComingSoon() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bientôt disponible</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: SPACING.xxxl,
  },
  text: {
    fontSize: FONT_SIZE.md,
    color: COLORS.muted,
  },
});

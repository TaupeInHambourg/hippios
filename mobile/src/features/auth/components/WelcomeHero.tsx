import { StyleSheet, Text, View } from "react-native";

import { COLORS, FONT_SIZE, FONT_WEIGHT, SPACING } from "@/lib/theme";

export function WelcomeHero() {
  return (
    <View style={styles.container}>
      <Text accessibilityRole="header" style={styles.title}>
        Hippios
      </Text>
      <Text style={styles.tagline}>L’Apple Watch des chevaux</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.lg,
  },
  title: {
    fontSize: FONT_SIZE.display,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.foreground,
  },
  tagline: {
    fontSize: FONT_SIZE.xl,
    textAlign: "center",
    color: COLORS.foreground,
  },
});

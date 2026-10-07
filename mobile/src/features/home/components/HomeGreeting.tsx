import { StyleSheet, Text, View } from "react-native";

import { COLORS, FONT_SIZE, FONT_WEIGHT, SPACING } from "@/lib/theme";

interface HomeGreetingProps {
  firstName: string;
}

export function HomeGreeting({ firstName }: HomeGreetingProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bonjour {firstName} !</Text>
      <Text style={styles.subtitle}>Retrouvez ici le suivi de vos chevaux.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: SPACING.sm,
  },
  title: {
    fontSize: FONT_SIZE.xl,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.foreground,
  },
  subtitle: {
    fontSize: FONT_SIZE.md,
    color: COLORS.muted,
  },
});

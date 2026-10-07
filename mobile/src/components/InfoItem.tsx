import { StyleSheet, Text, View } from "react-native";

import { COLORS, FONT_SIZE, SPACING } from "@/lib/theme";

interface InfoItemProps {
  label: string;
  value: string;
}

const EMPTY_VALUE = "Non renseigné";

export function InfoItem({ label, value }: InfoItemProps) {
  const displayedValue = value.trim() || EMPTY_VALUE;

  return (
    <View accessible accessibilityLabel={`${label} : ${displayedValue}`} style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{displayedValue}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: SPACING.md,
  },
  label: {
    fontSize: FONT_SIZE.md,
    color: COLORS.foreground,
  },
  value: {
    fontSize: FONT_SIZE.md,
    color: COLORS.muted,
  },
});

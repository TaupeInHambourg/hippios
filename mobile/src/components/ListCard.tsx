import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { COLORS, FONT_SIZE, RADIUS, SPACING } from "@/lib/theme";

interface ListCardProps {
  title: string;
  subtitle: string;
  onPress: () => void;
}

/** Bordered card that opens a detail screen. */
export function ListCard({ title, subtitle, onPress }: ListCardProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${title}, ${subtitle}`}
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={styles.texts}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <Ionicons name="chevron-forward" size={26} color={COLORS.foreground} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
  },
  pressed: {
    backgroundColor: COLORS.surface,
  },
  texts: {
    flex: 1,
    gap: SPACING.sm,
  },
  title: {
    fontSize: FONT_SIZE.xl,
    color: COLORS.foreground,
  },
  subtitle: {
    fontSize: FONT_SIZE.sm,
    lineHeight: SPACING.xl,
    color: COLORS.foreground,
  },
});

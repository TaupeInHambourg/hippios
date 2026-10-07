import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { COLORS, FONT_SIZE, TOUCH_TARGET } from "@/lib/theme";

interface PeriodNavigatorProps {
  label: string;
  onPrevious: () => void;
  onNext: () => void;
  canGoNext: boolean;
}

export function PeriodNavigator({ label, onPrevious, onNext, canGoNext }: PeriodNavigatorProps) {
  return (
    <View style={styles.container}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Période précédente"
        onPress={onPrevious}
        style={styles.button}
      >
        <Ionicons name="chevron-back" size={20} color={COLORS.foreground} />
      </Pressable>
      <Text accessibilityRole="header" style={styles.label}>
        {label}
      </Text>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Période suivante"
        accessibilityState={{ disabled: !canGoNext }}
        disabled={!canGoNext}
        onPress={onNext}
        style={[styles.button, !canGoNext && styles.disabled]}
      >
        <Ionicons name="chevron-forward" size={20} color={COLORS.foreground} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    width: TOUCH_TARGET,
    height: TOUCH_TARGET,
    alignItems: "center",
    justifyContent: "center",
  },
  disabled: {
    opacity: 0.3,
  },
  label: {
    flex: 1,
    textAlign: "center",
    fontSize: FONT_SIZE.md,
    color: COLORS.foreground,
  },
});

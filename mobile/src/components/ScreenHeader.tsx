import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import type { ReactNode } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { COLORS, FONT_SIZE, FONT_WEIGHT, SPACING, TOUCH_TARGET } from "@/lib/theme";

interface ScreenHeaderProps {
  title: string;
  showBack?: boolean;
  /** Overrides the default navigation back, e.g. to go back one step inside a screen. */
  onBack?: () => void;
  actions?: ReactNode;
}

export function ScreenHeader({ title, showBack = true, onBack, actions }: ScreenHeaderProps) {
  const router = useRouter();
  const canGoBack = onBack !== undefined || router.canGoBack();

  return (
    <View style={styles.container}>
      {showBack && canGoBack ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Retour"
          onPress={onBack ?? router.back}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={28} color={COLORS.foreground} />
        </Pressable>
      ) : null}
      <Text accessibilityRole="header" style={styles.title}>
        {title}
      </Text>
      {actions}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xs,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.xl,
  },
  backButton: {
    width: TOUCH_TARGET,
    height: TOUCH_TARGET,
    justifyContent: "center",
    marginLeft: -SPACING.xs,
  },
  title: {
    flex: 1,
    fontSize: FONT_SIZE.xl,
    fontWeight: FONT_WEIGHT.regular,
    color: COLORS.foreground,
  },
});

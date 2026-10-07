import type { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

import { COLORS, RADIUS } from "@/lib/theme";

interface AvatarProps {
  size: number;
  /** Placeholder icon until real pictures are available. */
  children: ReactNode;
  bordered?: boolean;
  /** Ring color, e.g. the color associated with a horse. Defaults to primary. */
  ringColor?: string;
}

// Decorative: the name is always displayed next to the avatar.
export function Avatar({ size, children, bordered = false, ringColor }: AvatarProps) {
  return (
    <View
      accessible={false}
      importantForAccessibility="no-hide-descendants"
      style={[
        styles.avatar,
        bordered && styles.bordered,
        ringColor ? { borderColor: ringColor } : null,
        { width: size, height: size },
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.surface,
  },
  bordered: {
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
});

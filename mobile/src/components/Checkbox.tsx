import { Pressable, StyleSheet, Text, View } from "react-native";

import { COLORS, FONT_SIZE, RADIUS, SPACING, TOUCH_TARGET } from "@/lib/theme";

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function Checkbox({ label, checked, onChange }: CheckboxProps) {
  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
      onPress={() => onChange(!checked)}
      style={styles.container}
    >
      <View style={[styles.box, checked && styles.boxChecked]}>
        {checked ? <View style={styles.indicator} /> : null}
      </View>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const BOX_SIZE = 30;

const styles = StyleSheet.create({
  container: {
    minHeight: TOUCH_TARGET,
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xxl,
  },
  box: {
    width: BOX_SIZE,
    height: BOX_SIZE,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS.foreground,
    borderRadius: RADIUS.full,
  },
  boxChecked: {
    borderColor: COLORS.primary,
  },
  indicator: {
    width: BOX_SIZE / 2,
    height: BOX_SIZE / 2,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.primary,
  },
  label: {
    flexShrink: 1,
    fontSize: FONT_SIZE.lg,
    color: COLORS.foreground,
  },
});

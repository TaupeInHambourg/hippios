import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TextInput, View } from "react-native";

import { COLORS, FONT_SIZE, RADIUS, SPACING, TOUCH_TARGET } from "@/lib/theme";

interface SearchFieldProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  accessibilityLabel: string;
}

export function SearchField({
  value,
  onChangeText,
  placeholder,
  accessibilityLabel,
}: SearchFieldProps) {
  return (
    <View style={styles.container}>
      <Ionicons
        name="search"
        size={22}
        color={COLORS.foreground}
        accessibilityElementsHidden
        importantForAccessibility="no"
      />
      <TextInput
        accessibilityLabel={accessibilityLabel}
        placeholder={placeholder}
        placeholderTextColor={COLORS.muted}
        value={value}
        onChangeText={onChangeText}
        autoCorrect={false}
        returnKeyType="search"
        style={[styles.input, !value && styles.placeholder]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: TOUCH_TARGET - SPACING.xs,
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
  },
  input: {
    flex: 1,
    minHeight: TOUCH_TARGET - SPACING.xs,
    fontSize: FONT_SIZE.sm,
    color: COLORS.foreground,
  },
  placeholder: {
    fontStyle: "italic",
  },
});

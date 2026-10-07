import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

import { OptionRow } from "./OptionRow";

import { COLORS, FONT_SIZE, RADIUS, SPACING } from "@/lib/theme";

export interface SelectOption {
  label: string;
  value: string;
}

interface SelectOptionsModalProps {
  title: string;
  visible: boolean;
  options: readonly SelectOption[];
  selectedValue: string | null;
  onSelect: (value: string) => void;
  onClose: () => void;
}

export function SelectOptionsModal({
  title,
  visible,
  options,
  selectedValue,
  onSelect,
  onClose,
}: SelectOptionsModalProps) {
  return (
    <Modal transparent animationType="fade" visible={visible} onRequestClose={onClose}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Fermer"
        onPress={onClose}
        style={styles.overlay}
      >
        <View style={styles.sheet}>
          <Text accessibilityRole="header" style={styles.title}>
            {title}
          </Text>
          {options.map((option) => (
            <OptionRow
              key={option.value}
              label={option.label}
              selected={option.value === selectedValue}
              onPress={() => onSelect(option.value)}
            />
          ))}
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    padding: SPACING.xl,
    backgroundColor: COLORS.overlay,
  },
  sheet: {
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.background,
  },
  title: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    fontSize: FONT_SIZE.lg,
    color: COLORS.foreground,
  },
});

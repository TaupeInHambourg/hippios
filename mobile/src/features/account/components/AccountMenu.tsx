import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { COLORS, FONT_SIZE, RADIUS, SPACING, TOUCH_TARGET } from "@/lib/theme";

interface AccountMenuProps {
  onDeleteAccount: () => void;
}

export function AccountMenu({ onDeleteAccount }: AccountMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = () => {
    setIsOpen(false);
    onDeleteAccount();
  };

  return (
    <View>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Plus d’options"
        accessibilityState={{ expanded: isOpen }}
        onPress={() => setIsOpen((current) => !current)}
        style={styles.trigger}
      >
        <Ionicons name="ellipsis-horizontal" size={24} color={COLORS.foreground} />
      </Pressable>
      {isOpen ? (
        <View style={styles.menu}>
          <Pressable accessibilityRole="button" onPress={handleDelete} style={styles.item}>
            <Text style={styles.dangerLabel}>Supprimer compte</Text>
          </Pressable>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  trigger: {
    width: TOUCH_TARGET,
    height: TOUCH_TARGET,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  menu: {
    position: "absolute",
    top: SPACING.lg,
    right: SPACING.md,
    zIndex: 1,
    elevation: 4,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.background,
    shadowColor: COLORS.shadow,
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  item: {
    minHeight: TOUCH_TARGET,
    justifyContent: "center",
    paddingHorizontal: SPACING.lg,
  },
  dangerLabel: {
    fontSize: FONT_SIZE.md,
    color: COLORS.danger,
  },
});

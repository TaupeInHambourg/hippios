import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";

import { COLORS, TOUCH_TARGET } from "@/lib/theme";

const ICON_SIZE = 28;
// Aligns the last icon with the screen padding despite its larger touch target.
const EDGE_OFFSET = (TOUCH_TARGET - ICON_SIZE) / 2;

export function HeaderActions() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Notifications"
        onPress={() => router.push("/notifications")}
        style={styles.action}
      >
        <Ionicons name="notifications" size={ICON_SIZE} color={COLORS.foreground} />
      </Pressable>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Mon compte"
        onPress={() => router.push("/account")}
        style={styles.action}
      >
        <Ionicons name="person-circle-outline" size={ICON_SIZE} color={COLORS.foreground} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginRight: -EDGE_OFFSET,
  },
  action: {
    width: TOUCH_TARGET,
    height: TOUCH_TARGET,
    alignItems: "center",
    justifyContent: "center",
  },
});

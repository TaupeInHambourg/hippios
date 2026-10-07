import { StyleSheet, View } from "react-native";

import { COLORS } from "@/lib/theme";

export function Divider() {
  return <View accessible={false} importantForAccessibility="no" style={styles.divider} />;
}

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: COLORS.foreground,
  },
});

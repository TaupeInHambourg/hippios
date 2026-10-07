import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { AccountMenu } from "./AccountMenu";

import { Avatar } from "@/components/Avatar";
import { COLORS, FONT_SIZE, SPACING } from "@/lib/theme";

interface AccountSummaryProps {
  fullName: string;
  onDeleteAccount: () => void;
}

export function AccountSummary({ fullName, onDeleteAccount }: AccountSummaryProps) {
  return (
    <View style={styles.container}>
      <Avatar size={100}>
        <Ionicons name="person" size={50} color={COLORS.muted} />
      </Avatar>
      <Text style={styles.name} numberOfLines={2}>
        {fullName}
      </Text>
      <AccountMenu onDeleteAccount={onDeleteAccount} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.lg,
  },
  name: {
    flex: 1,
    fontSize: FONT_SIZE.lg,
    color: COLORS.foreground,
  },
});

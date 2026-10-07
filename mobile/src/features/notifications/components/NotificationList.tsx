import { FlatList, StyleSheet, Text } from "react-native";

import type { AppNotification } from "../types";
import { NotificationItem } from "./NotificationItem";

import { COLORS, FONT_SIZE, SPACING } from "@/lib/theme";

interface NotificationListProps {
  notifications: readonly AppNotification[];
}

export function NotificationList({ notifications }: NotificationListProps) {
  return (
    <FlatList
      data={notifications}
      keyExtractor={(notification) => notification.id}
      renderItem={({ item }) => <NotificationItem notification={item} />}
      contentContainerStyle={styles.content}
      ListEmptyComponent={<Text style={styles.empty}>Aucune notification</Text>}
    />
  );
}

const styles = StyleSheet.create({
  content: {
    gap: SPACING.xxl,
    paddingBottom: SPACING.xxl,
  },
  empty: {
    textAlign: "center",
    fontSize: FONT_SIZE.md,
    color: COLORS.muted,
  },
});

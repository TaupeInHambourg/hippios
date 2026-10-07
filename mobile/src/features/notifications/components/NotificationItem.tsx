import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import type { ComponentProps } from "react";
import { StyleSheet, Text, View } from "react-native";

import type { AppNotification, NotificationKind } from "../types";
import { AlertLevelDot } from "./AlertLevelDot";

import { Avatar } from "@/components/Avatar";
import { COLORS, FONT_SIZE, SPACING } from "@/lib/theme";

const AVATAR_SIZE = 48;

type IoniconName = ComponentProps<typeof Ionicons>["name"];

const KIND_ICONS: Record<NotificationKind, IoniconName> = {
  reminder: "calendar",
  alert: "warning",
  watch: "eye",
  document: "document-text",
  appointment: "alert-circle",
};

interface NotificationItemProps {
  notification: AppNotification;
}

export function NotificationItem({ notification }: NotificationItemProps) {
  const { kind, title, alertLevel, message } = notification;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Avatar size={AVATAR_SIZE} bordered>
          <MaterialCommunityIcons name="horse-variant" size={28} color={COLORS.primary} />
        </Avatar>
        <Ionicons
          name={KIND_ICONS[kind]}
          size={20}
          color={COLORS.foreground}
          accessibilityElementsHidden
          importantForAccessibility="no"
        />
        <Text style={styles.title}>{title}</Text>
        {alertLevel ? <AlertLevelDot level={alertLevel} /> : null}
      </View>
      <Text style={styles.message}>
        {message.map((part, index) => (
          // Message parts are static and never reordered.
          <Text key={index} style={part.emphasized ? styles.emphasized : null}>
            {part.text}
          </Text>
        ))}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: SPACING.sm,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
  },
  title: {
    flex: 1,
    fontSize: FONT_SIZE.lg,
    color: COLORS.foreground,
  },
  message: {
    paddingLeft: AVATAR_SIZE + SPACING.md,
    fontSize: FONT_SIZE.sm,
    lineHeight: SPACING.xl,
    color: COLORS.foreground,
  },
  emphasized: {
    fontStyle: "italic",
  },
});

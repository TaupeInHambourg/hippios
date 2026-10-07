import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FlatList, StyleSheet, Text, View } from "react-native";

import type { Horse } from "../types";

import { Avatar } from "@/components/Avatar";
import { COLORS, FONT_SIZE, RADIUS, SPACING } from "@/lib/theme";

interface HorseListProps {
  horses: readonly Horse[];
}

export function HorseList({ horses }: HorseListProps) {
  return (
    <FlatList
      data={horses}
      keyExtractor={(horse) => horse.id}
      contentContainerStyle={styles.content}
      ListEmptyComponent={<Text style={styles.empty}>Aucun cheval pour le moment</Text>}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Avatar size={48} bordered>
            <MaterialCommunityIcons name="horse-variant" size={28} color={COLORS.primary} />
          </Avatar>
          <View style={styles.texts}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.details}>{item.breed}</Text>
          </View>
          {item.color ? (
            <View accessible={false} style={[styles.colorDot, { backgroundColor: item.color }]} />
          ) : null}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  content: {
    gap: SPACING.xl,
    paddingBottom: SPACING.xxl,
  },
  empty: {
    textAlign: "center",
    fontSize: FONT_SIZE.md,
    color: COLORS.muted,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
  },
  texts: {
    flex: 1,
    gap: SPACING.xs,
  },
  name: {
    fontSize: FONT_SIZE.lg,
    color: COLORS.foreground,
  },
  details: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.muted,
  },
  colorDot: {
    width: SPACING.lg,
    height: SPACING.lg,
    borderRadius: RADIUS.full,
  },
});

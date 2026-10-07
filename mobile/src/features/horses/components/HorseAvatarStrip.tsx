import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

import { getHorseStatus } from "../health/healthStatus";
import type { HorseOverview } from "../health/types";
import { HorseAvatar } from "./HorseAvatar";

import { StatusDot, getStatusLabel } from "@/components/StatusDot";
import { COLORS, FONT_SIZE, SPACING } from "@/lib/theme";

const AVATAR_SIZE = 64;

interface HorseAvatarStripProps {
  horses: readonly HorseOverview[];
  onHorsePress: (horse: HorseOverview) => void;
}

/** Horizontal list of horses, already sorted most urgent first. */
export function HorseAvatarStrip({ horses, onHorsePress }: HorseAvatarStripProps) {
  return (
    <FlatList
      horizontal
      data={horses}
      keyExtractor={(horse) => horse.id}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.content}
      renderItem={({ item }) => {
        const status = getHorseStatus(item);
        return (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`${item.name}, ${getStatusLabel(status)}`}
            onPress={() => onHorsePress(item)}
            style={styles.item}
          >
            <View>
              <HorseAvatar color={item.color} size={AVATAR_SIZE} />
              <View style={styles.status}>
                <StatusDot level={status} announced={false} />
              </View>
            </View>
            <Text style={styles.name} numberOfLines={2}>
              {item.name}
            </Text>
          </Pressable>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  content: {
    gap: SPACING.lg,
  },
  item: {
    width: AVATAR_SIZE + SPACING.sm,
    alignItems: "center",
    gap: SPACING.xs,
  },
  status: {
    position: "absolute",
    right: 0,
    bottom: 0,
  },
  name: {
    textAlign: "center",
    fontSize: FONT_SIZE.sm,
    color: COLORS.foreground,
  },
});

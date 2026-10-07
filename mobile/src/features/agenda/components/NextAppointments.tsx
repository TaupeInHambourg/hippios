import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { getUpcomingEvents } from "../filterEvents";
import type { AgendaEvent } from "../types";
import { EventRow } from "./EventRow";

import { COLORS, FONT_SIZE, SPACING, TOUCH_TARGET } from "@/lib/theme";

interface NextAppointmentsProps {
  events: readonly AgendaEvent[];
  /** Number of appointments shown: keeps the list short. */
  limit: number;
  onSeeAll: () => void;
}

export function NextAppointments({ events, limit, onSeeAll }: NextAppointmentsProps) {
  const upcoming = getUpcomingEvents(events, new Date(), limit);

  return (
    <View style={styles.container}>
      <Pressable
        accessibilityRole="button"
        accessibilityHint="Ouvre l’agenda"
        onPress={onSeeAll}
        style={styles.header}
      >
        <Text accessibilityRole="header" style={styles.title}>
          Prochains rendez-vous
        </Text>
        <Ionicons name="chevron-forward" size={26} color={COLORS.foreground} />
      </Pressable>
      {upcoming.length > 0 ? (
        upcoming.map((event) => <EventRow key={event.id} event={event} />)
      ) : (
        <Text style={styles.empty}>Aucun rendez-vous à venir</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: SPACING.lg,
  },
  header: {
    minHeight: TOUCH_TARGET,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: FONT_SIZE.xl,
    color: COLORS.foreground,
  },
  empty: {
    fontSize: FONT_SIZE.md,
    color: COLORS.muted,
  },
});

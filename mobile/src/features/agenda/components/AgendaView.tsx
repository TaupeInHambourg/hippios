import { useState, type ReactNode } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import { searchEvents, selectListedEvents } from "../filterEvents";
import type { AgendaEvent, EventPeriod } from "../types";
import { AgendaFilters } from "./AgendaFilters";
import { EventRow } from "./EventRow";
import { ListedEventsHeading } from "./ListedEventsHeading";
import { MonthCalendar } from "./MonthCalendar";

import { Button } from "@/components/Button";
import { isSameDay, startOfMonth } from "@/lib/dates";
import { COLORS, FONT_SIZE, SPACING } from "@/lib/theme";

interface AgendaViewProps {
  events: readonly AgendaEvent[];
  /** Rendered above the filters, scrolling with the list. */
  header: ReactNode;
  period: EventPeriod;
  onPeriodChange: (period: EventPeriod) => void;
  onAddEvent: () => void;
}

export function AgendaView({
  events,
  header,
  period,
  onPeriodChange,
  onAddEvent,
}: AgendaViewProps) {
  const today = new Date();
  const [horseName, setHorseName] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [visibleMonth, setVisibleMonth] = useState(() => startOfMonth(today));
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);

  const horseNames = [...new Set(events.map((event) => event.horseName))];
  const searchedEvents = searchEvents(events, horseName, query);
  const listedEvents = selectListedEvents(searchedEvents, period, selectedDay, today);

  // Tapping the selected day again goes back to the full list.
  const toggleDay = (day: Date) => {
    setSelectedDay((current) => (current && isSameDay(current, day) ? null : day));
  };

  return (
    <FlatList
      data={listedEvents}
      keyExtractor={(event) => event.id}
      renderItem={({ item }) => <EventRow event={item} />}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.content}
      ListHeaderComponent={
        <View style={styles.header}>
          {header}
          <AgendaFilters
            horseNames={horseNames}
            horseName={horseName}
            onHorseNameChange={setHorseName}
            query={query}
            onQueryChange={setQuery}
          />
          <MonthCalendar
            month={visibleMonth}
            today={today}
            selectedDay={selectedDay}
            events={searchedEvents}
            onMonthChange={setVisibleMonth}
            onDayPress={toggleDay}
          />
          <ListedEventsHeading
            period={period}
            onPeriodChange={onPeriodChange}
            selectedDay={selectedDay}
            onClearSelectedDay={() => setSelectedDay(null)}
          />
        </View>
      }
      ListEmptyComponent={<Text style={styles.empty}>Aucun rendez-vous</Text>}
      ListFooterComponent={
        <View style={styles.footer}>
          {period === "upcoming" && !selectedDay ? (
            <Text style={styles.info}>
              Veuillez téléphoner au professionnel concerné pour la prise de rendez-vous.
            </Text>
          ) : null}
          <Button label="Ajouter un événement" onPress={onAddEvent} />
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  content: {
    gap: SPACING.lg,
    paddingBottom: SPACING.xxl,
  },
  header: {
    gap: SPACING.xl,
  },
  empty: {
    fontSize: FONT_SIZE.md,
    color: COLORS.muted,
  },
  footer: {
    gap: SPACING.xl,
  },
  info: {
    fontSize: FONT_SIZE.md,
    lineHeight: SPACING.xl,
    color: COLORS.foreground,
  },
});

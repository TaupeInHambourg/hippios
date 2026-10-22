import { useState, type ReactNode } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import { getDayEvents, searchEvents, selectListedEvents } from "../filterEvents";
import type { AgendaEvent, EventPeriod } from "../types";
import { AgendaFilters } from "./AgendaFilters";
import { DayEventsPopover } from "./DayEventsPopover";
import { EventRow } from "./EventRow";
import { ListedEventsHeading } from "./ListedEventsHeading";
import { MonthCalendar } from "./MonthCalendar";

import { Button } from "@/components/Button";
import { SearchField } from "@/components/SearchField";
import { startOfMonth } from "@/lib/dates";
import { COLORS, FONT_SIZE, SPACING } from "@/lib/theme";

interface AgendaViewProps {
  events: readonly AgendaEvent[];
  /** Rendered above the filters, scrolling with the list. */
  header: ReactNode;
  period: EventPeriod;
  onPeriodChange: (period: EventPeriod) => void;
  onAddEvent: () => void;
  /** Agenda of one horse: no horse filter, no horse chips. */
  singleHorse?: boolean;
}

export function AgendaView({
  events,
  header,
  period,
  onPeriodChange,
  onAddEvent,
  singleHorse = false,
}: AgendaViewProps) {
  const today = new Date();
  const [horseName, setHorseName] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [visibleMonth, setVisibleMonth] = useState(() => startOfMonth(today));
  const [detailDay, setDetailDay] = useState<Date | null>(null);

  const horseNames = [...new Set(events.map((event) => event.horseName))];
  const searchedEvents = searchEvents(events, horseName, query);
  const listedEvents = selectListedEvents(searchedEvents, period, today);

  return (
    <>
      <FlatList
        data={listedEvents}
        keyExtractor={(event) => event.id}
        renderItem={({ item }) => (
          <EventRow event={item} showHorse={!singleHorse} onPress={() => setDetailDay(item.date)} />
        )}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View style={styles.header}>
            {header}
            {singleHorse ? (
              <SearchField
                accessibilityLabel="Rechercher un événement"
                placeholder="Recherche"
                value={query}
                onChangeText={setQuery}
              />
            ) : (
              <AgendaFilters
                horseNames={horseNames}
                horseName={horseName}
                onHorseNameChange={setHorseName}
                query={query}
                onQueryChange={setQuery}
              />
            )}
            <MonthCalendar
              month={visibleMonth}
              today={today}
              selectedDay={detailDay}
              events={searchedEvents}
              onMonthChange={setVisibleMonth}
              onDayPress={setDetailDay}
            />
            <ListedEventsHeading period={period} onPeriodChange={onPeriodChange} />
          </View>
        }
        ListEmptyComponent={<Text style={styles.empty}>Aucun rendez-vous</Text>}
        ListFooterComponent={
          <View style={styles.footer}>
            {period === "upcoming" ? (
              <Text style={styles.info}>
                Veuillez téléphoner au professionnel concerné pour la prise de rendez-vous.
              </Text>
            ) : null}
            <Button label="Ajouter un événement" onPress={onAddEvent} />
          </View>
        }
      />
      <DayEventsPopover
        day={detailDay}
        events={detailDay ? getDayEvents(searchedEvents, detailDay) : []}
        showHorse={!singleHorse}
        onClose={() => setDetailDay(null)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: SPACING.md,
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
    marginTop: SPACING.md,
  },
  info: {
    fontSize: FONT_SIZE.md,
    lineHeight: SPACING.xl,
    color: COLORS.foreground,
  },
});

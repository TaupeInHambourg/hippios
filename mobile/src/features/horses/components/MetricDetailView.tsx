import { useState } from "react";
import { Pressable, Share, StyleSheet, Text, View } from "react-native";

import { average, buildChartPoints, formatPeriod, formatRangeLabel } from "../detail/chartData";
import { ACTIVITY_OPTIONS, METRIC_DEFINITIONS, formatMetricValue } from "../detail/metrics";
import type { Activity, ChartRange, HorseDetail, MetricId } from "../detail/types";
import { ChartDataTable } from "./ChartDataTable";
import { ChartLegend } from "./ChartLegend";
import { MetricChart } from "./MetricChart";
import { PeriodNavigator } from "./PeriodNavigator";
import { RangeSelector } from "./RangeSelector";

import { Button } from "@/components/Button";
import { FieldError } from "@/components/FieldError";
import { FilterChips } from "@/components/FilterChips";
import { HorseChip } from "@/components/HorseChip";
import { addDays, startOfDay } from "@/lib/dates";
import { COLORS, FONT_SIZE, RADIUS, SPACING, TOUCH_TARGET } from "@/lib/theme";

interface MetricDetailViewProps {
  horse: HorseDetail;
  metricId: MetricId;
  initialActivity: Activity;
}

export function MetricDetailView({ horse, metricId, initialActivity }: MetricDetailViewProps) {
  const today = startOfDay(new Date());
  const [activity, setActivity] = useState(initialActivity);
  const [range, setRange] = useState<ChartRange>(14);
  const [endDate, setEndDate] = useState(today);
  const [showsTable, setShowsTable] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const reading = horse.readings?.[activity].find((item) => item.id === metricId);
  if (!reading) {
    return <Text style={styles.text}>En attente des premières données du capteur.</Text>;
  }

  const formatValue = (value: number) => formatMetricValue(metricId, value);
  const points = buildChartPoints({
    seed: `${horse.id}-${metricId}-${activity}`,
    baseValue: reading.value,
    endDate,
    range,
  });
  const per = range === 1 ? "par heure" : "par jour";
  const periodLabel = formatPeriod(endDate, range);

  const share = async () => {
    setError(undefined);
    try {
      await Share.share({
        message: `${METRIC_DEFINITIONS[metricId].label} de ${horse.name}, ${periodLabel} : ${formatValue(average(points.map((point) => point.value)))} en moyenne`,
      });
    } catch {
      setError("Le partage a échoué. Réessayez.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.chip}>
        <HorseChip name={horse.name} color={horse.color} />
      </View>
      <FilterChips options={ACTIVITY_OPTIONS} value={activity} onChange={setActivity} />
      <View style={styles.card}>
        <PeriodNavigator
          label={periodLabel}
          onPrevious={() => setEndDate(addDays(endDate, -range))}
          onNext={() =>
            setEndDate(addDays(endDate, range) > today ? today : addDays(endDate, range))
          }
          canGoNext={endDate < today}
        />
        <MetricChart points={points} formatValue={formatValue} />
        <RangeSelector value={range} onChange={setRange} />
        <ChartLegend
          periodLabel={formatRangeLabel(range)}
          normValue={`${formatValue(average(points.map((point) => point.norm)))} ${per}`}
          horseValue={`${formatValue(average(points.map((point) => point.horseAverage)))} ${per}`}
          horseLevel={reading.level}
        />
        <Pressable
          accessibilityRole="button"
          accessibilityState={{ expanded: showsTable }}
          onPress={() => setShowsTable((current) => !current)}
          style={styles.tableToggle}
        >
          <Text style={styles.link}>{showsTable ? "Masquer les données" : "Voir les données"}</Text>
        </Pressable>
        {showsTable ? <ChartDataTable points={points} formatValue={formatValue} /> : null}
      </View>
      <Button label="Partager" onPress={share} />
      <FieldError message={error} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: SPACING.lg,
  },
  chip: {
    alignItems: "flex-start",
  },
  card: {
    gap: SPACING.md,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.card,
  },
  tableToggle: {
    minHeight: TOUCH_TARGET,
    justifyContent: "center",
  },
  link: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.primary,
    textDecorationLine: "underline",
  },
  text: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.foreground,
  },
});

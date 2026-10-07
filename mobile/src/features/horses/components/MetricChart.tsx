import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Svg, { G, Line, Path, Polyline } from "react-native-svg";

import { getNiceScale } from "../detail/chartData";
import type { ChartPoint } from "../detail/types";
import { ChartTooltip, TOOLTIP_WIDTH } from "./ChartTooltip";

import { StatusDot } from "@/components/StatusDot";
import { COLORS, FONT_SIZE, SPACING } from "@/lib/theme";

const PLOT_HEIGHT = 180;
const AXIS_WIDTH = 48;
const BAR_RATIO = 0.6;
const BAR_RADIUS = 4;
const MAX_X_LABELS = 14;

/** Bar with rounded data end, anchored square on the zero baseline. */
function barPath(x: number, top: number, width: number, base: number): string {
  const r = Math.min(BAR_RADIUS, width / 2, base - top);
  return `M${x},${base}V${top + r}Q${x},${top} ${x + r},${top}H${x + width - r}Q${x + width},${top} ${x + width},${top + r}V${base}Z`;
}

interface MetricChartProps {
  points: readonly ChartPoint[];
  formatValue: (value: number) => string;
}

export function MetricChart({ points, formatValue }: MetricChartProps) {
  const [width, setWidth] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const plotWidth = Math.max(0, width - AXIS_WIDTH);
  const step = points.length > 0 ? plotWidth / points.length : 0;
  const scale = getNiceScale(
    Math.max(...points.flatMap((point) => [point.value, point.norm, point.horseAverage])),
  );
  const y = (value: number) => PLOT_HEIGHT - (value / scale.max) * PLOT_HEIGHT;
  const centerX = (index: number) => step * index + step / 2;
  const toPolyline = (pick: (point: ChartPoint) => number) =>
    points.map((point, index) => `${centerX(index)},${y(pick(point))}`).join(" ");
  const labelEvery = Math.ceil(points.length / MAX_X_LABELS);
  const selected = selectedIndex !== null ? points[selectedIndex] : undefined;

  return (
    <View onLayout={(event) => setWidth(event.nativeEvent.layout.width)}>
      <View style={styles.plot}>
        <Svg width={width} height={PLOT_HEIGHT}>
          {scale.ticks.map((tick) => (
            <Line
              key={tick}
              x1={0}
              x2={plotWidth}
              y1={y(tick)}
              y2={y(tick)}
              stroke={COLORS.chartGrid}
            />
          ))}
          {points.map((point, index) => (
            <Path
              key={point.date.toISOString()}
              d={barPath(
                centerX(index) - (step * BAR_RATIO) / 2,
                y(point.value),
                step * BAR_RATIO,
                PLOT_HEIGHT,
              )}
              fill={COLORS.chartBar}
              opacity={selectedIndex === null || selectedIndex === index ? 1 : 0.45}
            />
          ))}
          {/* A card-colored halo keeps the 2px lines readable over the bars. */}
          {[COLORS.chartNorm, COLORS.chartHorse].map((color) => {
            const coordinates = toPolyline(
              color === COLORS.chartNorm ? (point) => point.norm : (point) => point.horseAverage,
            );
            return (
              <G key={color}>
                <Polyline points={coordinates} fill="none" stroke={COLORS.card} strokeWidth={5} />
                <Polyline points={coordinates} fill="none" stroke={color} strokeWidth={2} />
              </G>
            );
          })}
        </Svg>
        {scale.ticks.map((tick) => (
          <Text key={tick} style={[styles.yLabel, { top: y(tick) - SPACING.sm }]}>
            {formatValue(tick)}
          </Text>
        ))}
        <View style={styles.hitTargets}>
          {points.map((point, index) => (
            <Pressable
              key={point.date.toISOString()}
              accessibilityRole="button"
              accessibilityLabel={`${point.label} : ${formatValue(point.value)}`}
              onPress={() => setSelectedIndex((current) => (current === index ? null : index))}
              style={[styles.hitTarget, { width: step }]}
            />
          ))}
        </View>
        {selected && selectedIndex !== null ? (
          <ChartTooltip
            point={selected}
            formatValue={formatValue}
            left={Math.min(
              Math.max(centerX(selectedIndex) - TOOLTIP_WIDTH / 2, 0),
              plotWidth - TOOLTIP_WIDTH,
            )}
          />
        ) : null}
      </View>
      <View style={styles.xAxis}>
        {points.map((point, index) => (
          <View key={point.date.toISOString()} style={[styles.xItem, { width: step }]}>
            <Text style={styles.xLabel}>{index % labelEvery === 0 ? point.label : ""}</Text>
            {point.isAnomaly ? <StatusDot level="warning" announced={false} /> : null}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  plot: {
    height: PLOT_HEIGHT,
  },
  yLabel: {
    position: "absolute",
    right: 0,
    width: AXIS_WIDTH - SPACING.xs,
    textAlign: "right",
    fontSize: FONT_SIZE.sm,
    color: COLORS.muted,
  },
  hitTargets: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    flexDirection: "row",
  },
  hitTarget: {
    height: PLOT_HEIGHT,
  },
  xAxis: {
    flexDirection: "row",
    marginTop: SPACING.xs,
  },
  xItem: {
    alignItems: "center",
    gap: SPACING.xs,
  },
  xLabel: {
    fontSize: FONT_SIZE.sm - 2,
    fontStyle: "italic",
    color: COLORS.muted,
  },
});

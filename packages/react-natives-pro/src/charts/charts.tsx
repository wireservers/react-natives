import React from 'react';
import { Text, View } from 'react-native';
import Svg, { Circle, G, Line, Path, Rect, Text as SvgText } from 'react-native-svg';
import { WithLicenseWatermark } from '../licensing/watermark';
import {
  DEFAULT_PADDING,
  DEFAULT_PALETTE,
  areaPath,
  bandX,
  donutArcs,
  linePath,
  plotArea,
  scaleX,
  scaleY,
  seriesColor,
  yExtent,
  yTicks,
  type ChartLayout,
  type ChartPadding,
  type ChartSeries,
  type DonutSlice,
} from './chart-utils';

/**
 * Chart family — line, area, bar, donut, sparkline.
 *
 * Requires `react-native-svg`, which is an *optional* peer of the base library. Importing any
 * chart pulls it in; nothing else in the Pro package depends on it.
 *
 * All geometry comes from `chart-utils`, which is separately unit-tested. These components only
 * turn numbers into SVG elements.
 */

export interface CartesianChartProps {
  series: ChartSeries[];
  width?: number;
  height?: number;
  padding?: Partial<ChartPadding>;
  /** Start the value axis at zero. Defaults true — a truncated axis exaggerates differences. */
  includeZero?: boolean;
  /** Labels for the category axis. Falls back to each point's `x`. */
  labels?: string[];
  showGrid?: boolean;
  showYAxis?: boolean;
  tickCount?: number;
  className?: string;
}

function useLayout(props: CartesianChartProps): ChartLayout {
  const { width = 320, height = 200, padding } = props;
  return {
    width,
    height,
    padding: { ...DEFAULT_PADDING, ...padding },
  };
}

function Grid({
  layout,
  ticks,
  extent,
  showYAxis,
}: {
  layout: ChartLayout;
  ticks: number[];
  extent: { min: number; max: number };
  showYAxis: boolean;
}) {
  const area = plotArea(layout);
  return (
    <G>
      {ticks.map((tick) => {
        const y = scaleY(tick, extent, layout);
        return (
          <G key={tick}>
            <Line x1={area.x} y1={y} x2={area.x + area.width} y2={y} stroke="#e2e8f0" strokeWidth={1} />
            {showYAxis ? (
              <SvgText x={area.x - 6} y={y + 3} fontSize={9} fill="#94a3b8" textAnchor="end">
                {String(tick)}
              </SvgText>
            ) : null}
          </G>
        );
      })}
    </G>
  );
}

function CategoryLabels({ layout, labels }: { layout: ChartLayout; labels: string[] }) {
  const area = plotArea(layout);
  if (labels.length === 0) return null;
  return (
    <G>
      {labels.map((label, i) => (
        <SvgText
          key={`${label}-${i}`}
          x={scaleX(i, labels.length, layout)}
          y={area.y + area.height + 14}
          fontSize={9}
          fill="#94a3b8"
          textAnchor="middle"
        >
          {label}
        </SvgText>
      ))}
    </G>
  );
}

export function LineChart(props: CartesianChartProps) {
  const layout = useLayout(props);
  const { series, includeZero = true, showGrid = true, showYAxis = true, tickCount = 4, labels } = props;
  const extent = yExtent(series, includeZero);
  const ticks = yTicks(extent, tickCount);
  const categoryLabels = labels ?? series[0]?.data.map((p) => String(p.x)) ?? [];

  return (
    <WithLicenseWatermark>
      <View className={props.className}>
        <Svg width={layout.width} height={layout.height}>
          {showGrid ? <Grid layout={layout} ticks={ticks} extent={extent} showYAxis={showYAxis} /> : null}
          {series.map((s, i) => (
            <Path
              key={s.id}
              d={linePath(s, extent, layout)}
              stroke={seriesColor(s, i)}
              strokeWidth={2}
              fill="none"
            />
          ))}
          {series.map((s, i) =>
            s.data.map((p, j) => (
              <Circle
                key={`${s.id}-${j}`}
                cx={scaleX(j, s.data.length, layout)}
                cy={scaleY(p.y, extent, layout)}
                r={2.5}
                fill={seriesColor(s, i)}
              />
            )),
          )}
          <CategoryLabels layout={layout} labels={categoryLabels} />
        </Svg>
      </View>
    </WithLicenseWatermark>
  );
}
LineChart.displayName = 'LineChart';

export function AreaChart(props: CartesianChartProps) {
  const layout = useLayout(props);
  const { series, includeZero = true, showGrid = true, showYAxis = true, tickCount = 4, labels } = props;
  const extent = yExtent(series, includeZero);
  const ticks = yTicks(extent, tickCount);
  const categoryLabels = labels ?? series[0]?.data.map((p) => String(p.x)) ?? [];

  return (
    <WithLicenseWatermark>
      <View className={props.className}>
        <Svg width={layout.width} height={layout.height}>
          {showGrid ? <Grid layout={layout} ticks={ticks} extent={extent} showYAxis={showYAxis} /> : null}
          {series.map((s, i) => (
            <G key={s.id}>
              <Path d={areaPath(s, extent, layout)} fill={seriesColor(s, i)} fillOpacity={0.18} />
              <Path d={linePath(s, extent, layout)} stroke={seriesColor(s, i)} strokeWidth={2} fill="none" />
            </G>
          ))}
          <CategoryLabels layout={layout} labels={categoryLabels} />
        </Svg>
      </View>
    </WithLicenseWatermark>
  );
}
AreaChart.displayName = 'AreaChart';

export interface BarChartProps extends CartesianChartProps {
  /** Stack series instead of grouping them side by side. */
  stacked?: boolean;
}

export function BarChart(props: BarChartProps) {
  const layout = useLayout(props);
  const { series, includeZero = true, showGrid = true, showYAxis = true, tickCount = 4, labels, stacked } = props;
  const extent = yExtent(series, includeZero);
  const ticks = yTicks(extent, tickCount);
  const count = series[0]?.data.length ?? 0;
  const categoryLabels = labels ?? series[0]?.data.map((p) => String(p.x)) ?? [];
  const zeroY = scaleY(0, extent, layout);

  return (
    <WithLicenseWatermark>
      <View className={props.className}>
        <Svg width={layout.width} height={layout.height}>
          {showGrid ? <Grid layout={layout} ticks={ticks} extent={extent} showYAxis={showYAxis} /> : null}
          {Array.from({ length: count }).map((_, i) => {
            const band = bandX(i, count, layout);
            let stackTop = zeroY;
            return (
              <G key={i}>
                {series.map((s, si) => {
                  const value = s.data[i]?.y ?? 0;
                  const y = scaleY(value, extent, layout);
                  if (stacked) {
                    const height = Math.abs(zeroY - y);
                    const top = stackTop - height;
                    stackTop = top;
                    return (
                      <Rect key={s.id} x={band.x} y={top} width={band.width} height={height} fill={seriesColor(s, si)} rx={2} />
                    );
                  }
                  const slot = band.width / series.length;
                  return (
                    <Rect
                      key={s.id}
                      x={band.x + si * slot}
                      y={Math.min(y, zeroY)}
                      width={slot * 0.9}
                      height={Math.abs(zeroY - y)}
                      fill={seriesColor(s, si)}
                      rx={2}
                    />
                  );
                })}
              </G>
            );
          })}
          <CategoryLabels layout={layout} labels={categoryLabels} />
        </Svg>
      </View>
    </WithLicenseWatermark>
  );
}
BarChart.displayName = 'BarChart';

export interface DonutChartProps {
  slices: DonutSlice[];
  size?: number;
  /** 0 = pie, 0.6 = donut. Fraction of the outer radius. */
  innerRatio?: number;
  /** Text shown in the hole. */
  centerLabel?: string;
  className?: string;
}

export function DonutChart({ slices, size = 180, innerRatio = 0.6, centerLabel, className }: DonutChartProps) {
  const radius = size / 2;
  const arcs = donutArcs(slices, radius, radius, radius - 2, (radius - 2) * innerRatio);

  return (
    <WithLicenseWatermark>
      <View className={className}>
        <Svg width={size} height={size}>
          {arcs.map((arc, i) => (
            <Path key={arc.id} d={arc.path} fill={arc.color ?? DEFAULT_PALETTE[i % DEFAULT_PALETTE.length]} />
          ))}
          {centerLabel ? (
            <SvgText x={radius} y={radius + 5} fontSize={16} fontWeight="700" fill="#0f172a" textAnchor="middle">
              {centerLabel}
            </SvgText>
          ) : null}
        </Svg>
      </View>
    </WithLicenseWatermark>
  );
}
DonutChart.displayName = 'DonutChart';

export interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
  /** Fill beneath the line. */
  filled?: boolean;
  className?: string;
}

/** Compact trend line for inline use — no axes, grid, or labels. */
export function Sparkline({ data, width = 96, height = 24, color = DEFAULT_PALETTE[0], filled, className }: SparklineProps) {
  const layout: ChartLayout = { width, height, padding: { top: 2, right: 2, bottom: 2, left: 2 } };
  const series: ChartSeries = { id: 'spark', data: data.map((y, x) => ({ x, y })) };
  const extent = yExtent([series], false);

  return (
    <View className={className}>
      <Svg width={width} height={height}>
        {filled ? <Path d={areaPath(series, extent, layout)} fill={color} fillOpacity={0.2} /> : null}
        <Path d={linePath(series, extent, layout)} stroke={color} strokeWidth={1.5} fill="none" />
      </Svg>
    </View>
  );
}
Sparkline.displayName = 'Sparkline';

export interface StatTileProps {
  label: string;
  value: string;
  /** Percentage change; positive renders green, negative red. */
  delta?: number;
  sparkline?: number[];
  className?: string;
}

/** KPI tile with an optional trend line — the usual dashboard building block. */
export function StatTile({ label, value, delta, sparkline, className }: StatTileProps) {
  const positive = (delta ?? 0) >= 0;
  return (
    <WithLicenseWatermark>
      <View className={`rounded-lg border border-outline-200 bg-background-0 p-3 ${className ?? ''}`}>
        <Text className="text-[11px] text-typography-500">{label}</Text>
        <Text className="text-xl font-bold text-typography-900">{value}</Text>
        <View className="flex-row items-center justify-between">
          {delta != null ? (
            <Text className={`text-[11px] ${positive ? 'text-success-600' : 'text-error-600'}`}>
              {positive ? '▲' : '▼'} {Math.abs(delta).toFixed(1)}%
            </Text>
          ) : (
            <View />
          )}
          {sparkline ? (
            <Sparkline data={sparkline} color={positive ? '#10b981' : '#ef4444'} filled />
          ) : null}
        </View>
      </View>
    </WithLicenseWatermark>
  );
}
StatTile.displayName = 'StatTile';

/**
 * Pure geometry for the chart family.
 *
 * All scale/path maths lives here so it can be tested without a renderer — the SVG components
 * are then thin wrappers that turn these numbers into elements.
 */

export interface ChartPoint {
  x: number | string;
  y: number;
}

export interface ChartSeries {
  id: string;
  label?: string;
  data: ChartPoint[];
  color?: string;
}

export interface ChartPadding {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export const DEFAULT_PADDING: ChartPadding = { top: 12, right: 12, bottom: 24, left: 36 };

export interface ChartLayout {
  width: number;
  height: number;
  padding: ChartPadding;
}

/** Drawable area inside the padding. */
export function plotArea(layout: ChartLayout) {
  const { width, height, padding } = layout;
  return {
    x: padding.left,
    y: padding.top,
    width: Math.max(0, width - padding.left - padding.right),
    height: Math.max(0, height - padding.top - padding.bottom),
  };
}

export interface Extent {
  min: number;
  max: number;
}

/**
 * Y extent across every series.
 *
 * Defaults to including zero so bar charts aren't visually misleading — a bar chart whose axis
 * starts at 90 exaggerates small differences dramatically.
 */
export function yExtent(series: ChartSeries[], includeZero = true): Extent {
  const values: number[] = [];
  for (const s of series) for (const p of s.data) if (Number.isFinite(p.y)) values.push(p.y);
  if (values.length === 0) return { min: 0, max: 1 };

  let min = Math.min(...values);
  let max = Math.max(...values);
  if (includeZero) {
    min = Math.min(min, 0);
    max = Math.max(max, 0);
  }
  // A flat series would divide by zero when scaling; give it a nominal band instead.
  if (min === max) {
    if (min === 0) return { min: 0, max: 1 };
    return { min: Math.min(0, min), max: Math.max(0, max) || min * 1.1 };
  }
  return { min, max };
}

/** Map a value in `extent` to a y pixel (inverted: larger values sit higher). */
export function scaleY(value: number, extent: Extent, layout: ChartLayout): number {
  const area = plotArea(layout);
  const span = extent.max - extent.min;
  if (span === 0) return area.y + area.height;
  const t = (value - extent.min) / span;
  return area.y + area.height - t * area.height;
}

/** Map a point index to an x pixel, spread evenly across the plot. */
export function scaleX(index: number, count: number, layout: ChartLayout): number {
  const area = plotArea(layout);
  if (count <= 1) return area.x + area.width / 2;
  return area.x + (index / (count - 1)) * area.width;
}

/** Band x/width for categorical charts (bars). */
export function bandX(index: number, count: number, layout: ChartLayout, innerPadding = 0.2) {
  const area = plotArea(layout);
  if (count <= 0) return { x: area.x, width: 0 };
  const band = area.width / count;
  const width = band * (1 - innerPadding);
  return { x: area.x + index * band + (band - width) / 2, width };
}

function fmt(n: number): string {
  // Trim float noise so paths stay short and snapshot-stable.
  return Number.isInteger(n) ? String(n) : n.toFixed(2).replace(/\.?0+$/, '');
}

/** SVG path for a polyline through the series. Returns '' for empty data. */
export function linePath(series: ChartSeries, extent: Extent, layout: ChartLayout): string {
  const points = series.data;
  if (points.length === 0) return '';
  const commands = points.map((p, i) => {
    const x = scaleX(i, points.length, layout);
    const y = scaleY(p.y, extent, layout);
    return `${i === 0 ? 'M' : 'L'}${fmt(x)},${fmt(y)}`;
  });
  return commands.join(' ');
}

/**
 * SVG path for a filled area: the line, then closed down to the baseline.
 * Baseline is zero when it's inside the extent, otherwise the bottom of the plot.
 */
export function areaPath(series: ChartSeries, extent: Extent, layout: ChartLayout): string {
  const points = series.data;
  if (points.length === 0) return '';
  const area = plotArea(layout);
  const baseline =
    extent.min <= 0 && extent.max >= 0 ? scaleY(0, extent, layout) : area.y + area.height;

  const first = scaleX(0, points.length, layout);
  const last = scaleX(points.length - 1, points.length, layout);
  return `${linePath(series, extent, layout)} L${fmt(last)},${fmt(baseline)} L${fmt(first)},${fmt(baseline)} Z`;
}

/** Evenly spaced axis ticks, rounded to readable steps. */
export function yTicks(extent: Extent, count = 4): number[] {
  if (count < 2) return [extent.min, extent.max];
  const span = extent.max - extent.min;
  if (span === 0) return [extent.min];
  const rawStep = span / (count - 1);
  const magnitude = 10 ** Math.floor(Math.log10(rawStep));
  const normalized = rawStep / magnitude;
  // 2.5 belongs in the ladder: without it, a 0–100 axis asking for 5 ticks rounds its step of
  // 25 up to 50 and returns only three labels.
  const niceStep =
    (normalized <= 1
      ? 1
      : normalized <= 2
        ? 2
        : normalized <= 2.5
          ? 2.5
          : normalized <= 5
            ? 5
            : 10) * magnitude;

  const start = Math.ceil(extent.min / niceStep) * niceStep;
  const ticks: number[] = [];
  for (let v = start; v <= extent.max + niceStep / 1000; v += niceStep) {
    // Guard against float drift producing -0 or 1e-15.
    ticks.push(Math.abs(v) < niceStep / 1e6 ? 0 : Number(v.toFixed(10)));
  }
  return ticks;
}

export interface DonutSlice {
  id: string;
  label?: string;
  value: number;
  color?: string;
}

export interface DonutArc extends DonutSlice {
  path: string;
  startAngle: number;
  endAngle: number;
  percent: number;
}

/**
 * Arc paths for a donut/pie.
 *
 * Angles start at 12 o'clock and run clockwise, which is what readers expect. A slice at exactly
 * 100% is drawn as two half arcs because a single SVG arc cannot express a full circle.
 */
export function donutArcs(
  slices: DonutSlice[],
  cx: number,
  cy: number,
  radius: number,
  innerRadius = 0,
): DonutArc[] {
  const total = slices.reduce((sum, s) => sum + Math.max(0, s.value), 0);
  if (total <= 0) return [];

  const point = (angle: number, r: number) => {
    const rad = ((angle - 90) * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  };

  let cursor = 0;
  return slices
    .filter((s) => s.value > 0)
    .map((slice) => {
      const percent = slice.value / total;
      const startAngle = cursor * 360;
      cursor += percent;
      const endAngle = cursor * 360;
      const sweep = endAngle - startAngle;
      const largeArc = sweep > 180 ? 1 : 0;

      let path: string;
      if (sweep >= 359.999) {
        // Full circle: two 180° arcs.
        const top = point(0, radius);
        const bottom = point(180, radius);
        const innerTop = point(0, innerRadius);
        const innerBottom = point(180, innerRadius);
        path =
          `M${fmt(top.x)},${fmt(top.y)} A${fmt(radius)},${fmt(radius)} 0 1 1 ${fmt(bottom.x)},${fmt(bottom.y)}` +
          ` A${fmt(radius)},${fmt(radius)} 0 1 1 ${fmt(top.x)},${fmt(top.y)}` +
          (innerRadius > 0
            ? ` M${fmt(innerTop.x)},${fmt(innerTop.y)} A${fmt(innerRadius)},${fmt(innerRadius)} 0 1 0 ${fmt(innerBottom.x)},${fmt(innerBottom.y)}` +
              ` A${fmt(innerRadius)},${fmt(innerRadius)} 0 1 0 ${fmt(innerTop.x)},${fmt(innerTop.y)}`
            : '') +
          ' Z';
      } else {
        const outerStart = point(startAngle, radius);
        const outerEnd = point(endAngle, radius);
        if (innerRadius > 0) {
          const innerEnd = point(endAngle, innerRadius);
          const innerStart = point(startAngle, innerRadius);
          path =
            `M${fmt(outerStart.x)},${fmt(outerStart.y)}` +
            ` A${fmt(radius)},${fmt(radius)} 0 ${largeArc} 1 ${fmt(outerEnd.x)},${fmt(outerEnd.y)}` +
            ` L${fmt(innerEnd.x)},${fmt(innerEnd.y)}` +
            ` A${fmt(innerRadius)},${fmt(innerRadius)} 0 ${largeArc} 0 ${fmt(innerStart.x)},${fmt(innerStart.y)} Z`;
        } else {
          path =
            `M${fmt(cx)},${fmt(cy)} L${fmt(outerStart.x)},${fmt(outerStart.y)}` +
            ` A${fmt(radius)},${fmt(radius)} 0 ${largeArc} 1 ${fmt(outerEnd.x)},${fmt(outerEnd.y)} Z`;
        }
      }

      return { ...slice, path, startAngle, endAngle, percent };
    });
}

/** Index of the point nearest an x pixel — used for tooltips/crosshairs. */
export function nearestIndex(x: number, count: number, layout: ChartLayout): number {
  if (count <= 0) return -1;
  const area = plotArea(layout);
  if (count === 1) return 0;
  const t = (x - area.x) / area.width;
  return Math.max(0, Math.min(count - 1, Math.round(t * (count - 1))));
}

/** Colour-blind-safe categorical palette, used when a series sets no colour. */
export const DEFAULT_PALETTE = [
  '#2563eb',
  '#f59e0b',
  '#10b981',
  '#ef4444',
  '#8b5cf6',
  '#06b6d4',
  '#ec4899',
  '#84cc16',
];

export function seriesColor(series: ChartSeries, index: number): string {
  return series.color ?? DEFAULT_PALETTE[index % DEFAULT_PALETTE.length];
}

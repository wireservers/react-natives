/**
 * Pure geometry and time maths for the Scheduler.
 *
 * Kept separate from the component so drag behaviour — the part that is genuinely hard to get
 * right — can be tested without a renderer or a pointer.
 */

export interface SchedulerEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  color?: string;
}

export interface SchedulerGeometry {
  /** First hour shown, 0-23. */
  startHour: number;
  /** Last hour shown (exclusive), 1-24. */
  endHour: number;
  /** Pixel height of one hour. */
  hourHeight: number;
  /** Drag results snap to this many minutes. */
  snapMinutes: number;
}

export const DEFAULT_GEOMETRY: SchedulerGeometry = {
  startHour: 8,
  endHour: 20,
  hourHeight: 48,
  snapMinutes: 15,
};

/** Minutes from midnight. */
export function minutesOfDay(date: Date): number {
  return date.getHours() * 60 + date.getMinutes();
}

export function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/** Build a Date on `day` at `minutes` past midnight. Handles overflow past 24h by rolling over. */
export function dateAtMinutes(day: Date, minutes: number): Date {
  const base = startOfDay(day);
  return new Date(base.getTime() + minutes * 60_000);
}

/** Vertical offset in px for a given minute-of-day. */
export function minutesToY(minutes: number, geometry: SchedulerGeometry): number {
  const { startHour, hourHeight } = geometry;
  return ((minutes - startHour * 60) / 60) * hourHeight;
}

/** Inverse of `minutesToY`, without snapping. */
export function yToMinutes(y: number, geometry: SchedulerGeometry): number {
  const { startHour, hourHeight } = geometry;
  return (y / hourHeight) * 60 + startHour * 60;
}

/** Round to the nearest snap increment. */
export function snapToGrid(minutes: number, snapMinutes: number): number {
  if (snapMinutes <= 0) return Math.round(minutes);
  return Math.round(minutes / snapMinutes) * snapMinutes;
}

/** Clamp a minute-of-day into the visible window. */
export function clampToWindow(minutes: number, geometry: SchedulerGeometry): number {
  const min = geometry.startHour * 60;
  const max = geometry.endHour * 60;
  return Math.max(min, Math.min(max, minutes));
}

export function eventDurationMinutes(event: SchedulerEvent): number {
  return Math.round((event.end.getTime() - event.start.getTime()) / 60_000);
}

/**
 * Move an event by a delta, snapping the start and preserving duration.
 *
 * The whole event is kept inside the visible window rather than allowing the start to clamp
 * while the end runs off the end — dragging must never silently shorten an event.
 */
export function moveEvent(
  event: SchedulerEvent,
  deltaMinutes: number,
  geometry: SchedulerGeometry,
  targetDay?: Date,
): SchedulerEvent {
  const duration = eventDurationMinutes(event);
  const day = targetDay ? startOfDay(targetDay) : startOfDay(event.start);

  const rawStart = minutesOfDay(event.start) + deltaMinutes;
  const snapped = snapToGrid(rawStart, geometry.snapMinutes);

  const minStart = geometry.startHour * 60;
  const maxStart = geometry.endHour * 60 - duration;
  const start = Math.max(minStart, Math.min(maxStart, snapped));

  return {
    ...event,
    start: dateAtMinutes(day, start),
    end: dateAtMinutes(day, start + duration),
  };
}

/**
 * Resize one edge of an event.
 *
 * `minDurationMinutes` stops an event being collapsed to nothing — a zero-height event is
 * unselectable, so the user could never recover it.
 */
export function resizeEvent(
  event: SchedulerEvent,
  edge: 'start' | 'end',
  deltaMinutes: number,
  geometry: SchedulerGeometry,
  minDurationMinutes = 15,
): SchedulerEvent {
  const day = startOfDay(event.start);
  const startMin = minutesOfDay(event.start);
  const endMin = minutesOfDay(event.end);

  if (edge === 'start') {
    const raw = snapToGrid(startMin + deltaMinutes, geometry.snapMinutes);
    const clamped = clampToWindow(raw, geometry);
    const next = Math.min(clamped, endMin - minDurationMinutes);
    return { ...event, start: dateAtMinutes(day, Math.max(geometry.startHour * 60, next)) };
  }

  const raw = snapToGrid(endMin + deltaMinutes, geometry.snapMinutes);
  const clamped = clampToWindow(raw, geometry);
  const next = Math.max(clamped, startMin + minDurationMinutes);
  return { ...event, end: dateAtMinutes(day, Math.min(geometry.endHour * 60, next)) };
}

/** Build a new event from a drag over empty space. Handles upward drags. */
export function createEventFromDrag(
  day: Date,
  anchorY: number,
  currentY: number,
  geometry: SchedulerGeometry,
  minDurationMinutes = 15,
): { start: Date; end: Date } {
  const a = snapToGrid(clampToWindow(yToMinutes(anchorY, geometry), geometry), geometry.snapMinutes);
  const b = snapToGrid(clampToWindow(yToMinutes(currentY, geometry), geometry), geometry.snapMinutes);

  let start = Math.min(a, b);
  let end = Math.max(a, b);
  // A click (or a tiny drag) should still yield a usable event rather than a zero-length one.
  if (end - start < minDurationMinutes) end = start + minDurationMinutes;
  if (end > geometry.endHour * 60) {
    end = geometry.endHour * 60;
    start = Math.min(start, end - minDurationMinutes);
  }

  return { start: dateAtMinutes(day, start), end: dateAtMinutes(day, end) };
}

export interface LaidOutEvent {
  event: SchedulerEvent;
  top: number;
  height: number;
  /** 0-based column among overlapping events. */
  column: number;
  /** Total columns in this event's overlap cluster. */
  columns: number;
}

/**
 * Position a day's events, side-by-side where they overlap.
 *
 * Events are grouped into clusters of mutual overlap; every event in a cluster shares the same
 * column count so widths line up. Without this, overlapping events stack and hide each other.
 */
export function layoutDayEvents(
  events: SchedulerEvent[],
  geometry: SchedulerGeometry,
): LaidOutEvent[] {
  const sorted = [...events].sort((a, b) => {
    const diff = a.start.getTime() - b.start.getTime();
    return diff !== 0 ? diff : b.end.getTime() - a.end.getTime();
  });

  const result: LaidOutEvent[] = [];
  let cluster: SchedulerEvent[] = [];
  let clusterEnd = -Infinity;

  const flush = () => {
    if (cluster.length === 0) return;
    // Greedy column assignment: reuse the first column whose last event has finished.
    const columnEnds: number[] = [];
    const assigned = cluster.map((event) => {
      let column = columnEnds.findIndex((end) => end <= event.start.getTime());
      if (column === -1) {
        column = columnEnds.length;
        columnEnds.push(event.end.getTime());
      } else {
        columnEnds[column] = event.end.getTime();
      }
      return { event, column };
    });

    const columns = columnEnds.length;
    for (const { event, column } of assigned) {
      const top = minutesToY(minutesOfDay(event.start), geometry);
      const bottom = minutesToY(minutesOfDay(event.end), geometry);
      result.push({ event, top, height: Math.max(bottom - top, 8), column, columns });
    }
    cluster = [];
    clusterEnd = -Infinity;
  };

  for (const event of sorted) {
    if (cluster.length > 0 && event.start.getTime() >= clusterEnd) flush();
    cluster.push(event);
    clusterEnd = Math.max(clusterEnd, event.end.getTime());
  }
  flush();

  return result;
}

/** Hour labels for the visible window. */
export function hourLabels(geometry: SchedulerGeometry): { hour: number; label: string; y: number }[] {
  const out: { hour: number; label: string; y: number }[] = [];
  for (let hour = geometry.startHour; hour <= geometry.endHour; hour += 1) {
    const suffix = hour < 12 ? 'am' : 'pm';
    const display = hour % 12 === 0 ? 12 : hour % 12;
    out.push({ hour, label: `${display}${suffix}`, y: minutesToY(hour * 60, geometry) });
  }
  return out;
}

/** The days of the week containing `date`. */
export function weekDays(date: Date, weekStartsOn = 0): Date[] {
  const base = startOfDay(date);
  const offset = (base.getDay() - weekStartsOn + 7) % 7;
  const first = new Date(base.getTime() - offset * 86_400_000);
  return Array.from({ length: 7 }, (_, i) => new Date(first.getTime() + i * 86_400_000));
}

export function formatTimeRange(event: SchedulerEvent): string {
  const fmt = (d: Date) => {
    const h = d.getHours();
    const m = d.getMinutes();
    const suffix = h < 12 ? 'am' : 'pm';
    const display = h % 12 === 0 ? 12 : h % 12;
    return m === 0 ? `${display}${suffix}` : `${display}:${String(m).padStart(2, '0')}${suffix}`;
  };
  return `${fmt(event.start)} – ${fmt(event.end)}`;
}

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export interface DateRangePreset {
  /** Stable identifier, also used as the React key. */
  id: string;
  label: string;
  /** Built relative to `today` so presets stay correct across midnight and time zones. */
  getRange: (today: Date) => DateRange;
}

/** Midnight local time on the same calendar day. */
export function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

/** 23:59:59.999 local time — the inclusive end of a day, for range comparisons. */
export function endOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
}

export function addDays(date: Date, days: number): Date {
  const next = startOfDay(date);
  next.setDate(next.getDate() + days);
  return next;
}

export function addMonths(date: Date, months: number): Date {
  // Anchor to the 1st before shifting: setMonth on the 31st would otherwise skip a month
  // (Jan 31 + 1 month => Mar 3).
  const next = new Date(date.getFullYear(), date.getMonth(), 1);
  next.setMonth(next.getMonth() + months);
  return next;
}

export function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function endOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

export function isSameDay(a: Date | null, b: Date | null): boolean {
  if (!a || !b) return false;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/** Inclusive on both ends, compared at day granularity. */
export function isWithinRange(date: Date, range: DateRange): boolean {
  if (!range.start || !range.end) return false;
  const time = startOfDay(date).getTime();
  return time >= startOfDay(range.start).getTime() && time <= startOfDay(range.end).getTime();
}

export function isBefore(a: Date, b: Date): boolean {
  return startOfDay(a).getTime() < startOfDay(b).getTime();
}

/** Whole days between two dates, ignoring time-of-day. */
export function daysBetween(a: Date, b: Date): number {
  const MS_PER_DAY = 24 * 60 * 60 * 1000;
  return Math.round((startOfDay(b).getTime() - startOfDay(a).getTime()) / MS_PER_DAY);
}

export function clampToBounds(date: Date, minDate?: Date | null, maxDate?: Date | null): Date {
  if (minDate && isBefore(date, minDate)) return startOfDay(minDate);
  if (maxDate && isBefore(maxDate, date)) return startOfDay(maxDate);
  return startOfDay(date);
}

export function isSelectable(date: Date, minDate?: Date | null, maxDate?: Date | null): boolean {
  if (minDate && isBefore(date, minDate)) return false;
  if (maxDate && isBefore(maxDate, date)) return false;
  return true;
}

/**
 * Apply a tap to the current range.
 *
 * Two-phase: a tap with no pending selection (or on a complete range) starts a new one; the
 * next tap closes it. Tapping a date earlier than the pending start swaps the two rather than
 * rejecting the input, which is what users expect when they pick backwards.
 */
export function selectDate(current: DateRange, date: Date): DateRange {
  const day = startOfDay(date);
  const hasPendingStart = current.start !== null && current.end === null;
  if (!hasPendingStart) {
    return { start: day, end: null };
  }
  const start = current.start as Date;
  if (isBefore(day, start)) {
    return { start: day, end: startOfDay(start) };
  }
  return { start: startOfDay(start), end: day };
}

/**
 * Calendar grid for a month: whole weeks, padded with adjacent-month days so every row has
 * seven entries.
 *
 * @param weekStartsOn 0 = Sunday (default) through 6 = Saturday.
 */
export function buildMonthGrid(month: Date, weekStartsOn = 0): Date[][] {
  const first = startOfMonth(month);
  const offset = (first.getDay() - weekStartsOn + 7) % 7;
  const gridStart = addDays(first, -offset);

  const weeks: Date[][] = [];
  let cursor = gridStart;
  // Six rows covers every possible month layout, so the grid height never jumps between months.
  for (let week = 0; week < 6; week += 1) {
    const days: Date[] = [];
    for (let day = 0; day < 7; day += 1) {
      days.push(cursor);
      cursor = addDays(cursor, 1);
    }
    weeks.push(days);
  }
  return weeks;
}

/** Presets covering the common analytics ranges. `today` is injected to keep this pure. */
export const DEFAULT_PRESETS: DateRangePreset[] = [
  {
    id: 'today',
    label: 'Today',
    getRange: (today) => ({ start: startOfDay(today), end: startOfDay(today) }),
  },
  {
    id: 'yesterday',
    label: 'Yesterday',
    getRange: (today) => ({ start: addDays(today, -1), end: addDays(today, -1) }),
  },
  {
    id: 'last-7',
    label: 'Last 7 days',
    getRange: (today) => ({ start: addDays(today, -6), end: startOfDay(today) }),
  },
  {
    id: 'last-30',
    label: 'Last 30 days',
    getRange: (today) => ({ start: addDays(today, -29), end: startOfDay(today) }),
  },
  {
    id: 'this-month',
    label: 'This month',
    getRange: (today) => ({ start: startOfMonth(today), end: startOfDay(today) }),
  },
  {
    id: 'last-month',
    label: 'Last month',
    getRange: (today) => {
      const previous = addMonths(today, -1);
      return { start: startOfMonth(previous), end: endOfMonth(previous) };
    },
  },
];

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export function formatMonthLabel(date: Date): string {
  return `${MONTH_NAMES[date.getMonth()]} ${date.getFullYear()}`;
}

export function formatRangeLabel(range: DateRange): string {
  if (!range.start) return 'Select dates';
  const format = (date: Date) =>
    `${MONTH_NAMES[date.getMonth()].slice(0, 3)} ${date.getDate()}, ${date.getFullYear()}`;
  if (!range.end) return `${format(range.start)} — …`;
  if (isSameDay(range.start, range.end)) return format(range.start);
  return `${format(range.start)} — ${format(range.end)}`;
}

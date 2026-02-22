import type {
  CalendarDay,
  CalendarEvent,
  CalendarWeek,
  CalendarHorizontalConfig,
} from './types';

export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

export function getFirstDayOfWeek(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function isToday(date: Date): boolean {
  return isSameDay(date, new Date());
}

export function addMonths(date: Date, count: number): Date {
  const result = new Date(date);
  result.setMonth(result.getMonth() + count);
  return result;
}

export function addDays(date: Date, count: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + count);
  return result;
}

export function getWeekDays(): string[] {
  return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
}

export function getMonthName(month: number): string {
  const names = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return names[month];
}

export function getEventsForDate(
  events: CalendarEvent[],
  date: Date,
): CalendarEvent[] {
  return events.filter((e) => isSameDay(e.start, date));
}

export function formatTime(date: Date): string {
  const h = date.getHours();
  const m = date.getMinutes();
  const ampm = h >= 12 ? 'PM' : 'AM';
  const hour = h % 12 || 12;
  return `${hour}${m > 0 ? ':' + m.toString().padStart(2, '0') : ''}${ampm}`;
}

export function formatHour(hour: number): string {
  if (hour === 0) return '12 AM';
  if (hour < 12) return `${hour} AM`;
  if (hour === 12) return '12 PM';
  return `${hour - 12} PM`;
}

export function buildMonthGrid(
  year: number,
  month: number,
  events: CalendarEvent[],
): CalendarWeek[] {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfWeek(year, month);
  const weeks: CalendarWeek[] = [];
  let currentWeek: CalendarDay[] = [];

  // Fill leading days from previous month
  const prevMonth = month === 0 ? 11 : month - 1;
  const prevYear = month === 0 ? year - 1 : year;
  const daysInPrevMonth = getDaysInMonth(prevYear, prevMonth);
  for (let i = firstDay - 1; i >= 0; i--) {
    const date = new Date(prevYear, prevMonth, daysInPrevMonth - i);
    currentWeek.push({
      date,
      isCurrentMonth: false,
      isToday: isToday(date),
      events: getEventsForDate(events, date),
    });
  }

  // Fill current month days
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    currentWeek.push({
      date,
      isCurrentMonth: true,
      isToday: isToday(date),
      events: getEventsForDate(events, date),
    });
    if (currentWeek.length === 7) {
      weeks.push({ days: currentWeek });
      currentWeek = [];
    }
  }

  // Fill trailing days from next month
  if (currentWeek.length > 0) {
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextYear = month === 11 ? year + 1 : year;
    let nextDay = 1;
    while (currentWeek.length < 7) {
      const date = new Date(nextYear, nextMonth, nextDay++);
      currentWeek.push({
        date,
        isCurrentMonth: false,
        isToday: isToday(date),
        events: getEventsForDate(events, date),
      });
    }
    weeks.push({ days: currentWeek });
  }

  return weeks;
}

// --- Week/month date helpers ---

const SHORT_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const SHORT_MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

export function getWeekDates(displayDate: Date): Date[] {
  const day = displayDate.getDay();
  const sunday = addDays(displayDate, -day);
  const dates: Date[] = [];
  for (let i = 0; i < 7; i++) {
    dates.push(addDays(sunday, i));
  }
  return dates;
}

export function getMonthDates(displayDate: Date): Date[] {
  const year = displayDate.getFullYear();
  const month = displayDate.getMonth();
  const count = getDaysInMonth(year, month);
  const dates: Date[] = [];
  for (let d = 1; d <= count; d++) {
    dates.push(new Date(year, month, d));
  }
  return dates;
}

export function formatWeekDayShort(date: Date): string {
  return `${SHORT_DAYS[date.getDay()]} ${date.getDate()}`;
}

export function formatMonthDay(date: Date): string {
  return `${date.getDate()}`;
}

export function getWeekRangeTitle(displayDate: Date): string {
  const dates = getWeekDates(displayDate);
  const start = dates[0];
  const end = dates[6];
  if (start.getMonth() === end.getMonth()) {
    return `${SHORT_MONTHS[start.getMonth()]} ${start.getDate()} – ${end.getDate()}, ${start.getFullYear()}`;
  }
  if (start.getFullYear() === end.getFullYear()) {
    return `${SHORT_MONTHS[start.getMonth()]} ${start.getDate()} – ${SHORT_MONTHS[end.getMonth()]} ${end.getDate()}, ${start.getFullYear()}`;
  }
  return `${SHORT_MONTHS[start.getMonth()]} ${start.getDate()}, ${start.getFullYear()} – ${SHORT_MONTHS[end.getMonth()]} ${end.getDate()}, ${end.getFullYear()}`;
}

// --- Horizontal view utilities ---

export const DEFAULT_HORIZONTAL_CONFIG: Required<CalendarHorizontalConfig> = {
  startHour: 8,
  endHour: 17,
  slotMinutes: 30,
  slotWidth: 80,
  memberColumnWidth: 180,
  slotHeight: 60,
  timeColumnWidth: 60,
};

export function resolveHorizontalConfig(
  config?: CalendarHorizontalConfig,
): Required<CalendarHorizontalConfig> {
  return { ...DEFAULT_HORIZONTAL_CONFIG, ...config };
}

export function getTimeSlots(
  startHour: number,
  endHour: number,
  slotMinutes: number,
): string[] {
  const slots: string[] = [];
  for (let hour = startHour; hour <= endHour; hour++) {
    for (let min = 0; min < 60; min += slotMinutes) {
      if (hour === endHour && min > 0) break;
      slots.push(
        `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`,
      );
    }
  }
  return slots;
}

export function formatTimeRange(start: Date, end: Date): string {
  const fmt = (d: Date) =>
    `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
  return `${fmt(start)} - ${fmt(end)}`;
}

export function getEventLeftOffset(
  eventStart: Date,
  startHour: number,
  slotMinutes: number,
  slotWidth: number,
): number {
  const eventMinutes = eventStart.getHours() * 60 + eventStart.getMinutes();
  const timelineStartMinutes = startHour * 60;
  const minutesFromStart = eventMinutes - timelineStartMinutes;
  return (minutesFromStart / slotMinutes) * slotWidth;
}

export function getEventWidth(
  eventStart: Date,
  eventEnd: Date,
  slotMinutes: number,
  slotWidth: number,
): number {
  const durationMs = eventEnd.getTime() - eventStart.getTime();
  const durationMinutes = durationMs / (1000 * 60);
  return (durationMinutes / slotMinutes) * slotWidth;
}

export function getEventTopOffset(
  eventStart: Date,
  startHour: number,
  slotMinutes: number,
  slotHeight: number,
): number {
  const eventMinutes = eventStart.getHours() * 60 + eventStart.getMinutes();
  const timelineStartMinutes = startHour * 60;
  const minutesFromStart = eventMinutes - timelineStartMinutes;
  return (minutesFromStart / slotMinutes) * slotHeight;
}

export function getEventHeight(
  eventStart: Date,
  eventEnd: Date,
  slotMinutes: number,
  slotHeight: number,
): number {
  const durationMs = eventEnd.getTime() - eventStart.getTime();
  const durationMinutes = durationMs / (1000 * 60);
  return (durationMinutes / slotMinutes) * slotHeight;
}

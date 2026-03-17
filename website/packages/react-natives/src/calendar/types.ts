import type React from 'react';

export type CalendarLayout = 'horizontal' | 'vertical';
export type CalendarTimeRange = 'day' | 'week' | 'month';

/** @deprecated Use CalendarLayout instead */
export type CalendarView = CalendarLayout;

export type EventColor =
  | 'primary'
  | 'info'
  | 'success'
  | 'warning'
  | 'error'
  | 'tertiary';

export type EventVariant = 'subtle' | 'solid';

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  color?: EventColor;
  allDay?: boolean;
  memberId?: string;
}

export interface CalendarTeamMember {
  id: string;
  name: string;
  role?: string;
  initials: string;
  avatarColor?: EventColor;
}

export interface CalendarHorizontalConfig {
  startHour?: number;
  endHour?: number;
  slotMinutes?: number;
  slotWidth?: number;
  memberColumnWidth?: number;
  slotHeight?: number;
  timeColumnWidth?: number;
}

export interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  events: CalendarEvent[];
}

export interface CalendarWeek {
  days: CalendarDay[];
}

export interface CalendarProps {
  events?: CalendarEvent[];
  members?: CalendarTeamMember[];
  horizontalConfig?: CalendarHorizontalConfig;
  initialDate?: Date;
  initialLayout?: CalendarLayout;
  initialTimeRange?: CalendarTimeRange;
  /** @deprecated Use initialLayout instead */
  initialView?: CalendarLayout;
  onDateSelect?: (date: Date) => void;
  onEventPress?: (event: CalendarEvent) => void;
  onMonthChange?: (year: number, month: number) => void;
  onViewChange?: (layout: CalendarLayout) => void;
  onTimeRangeChange?: (timeRange: CalendarTimeRange) => void;
  renderEvent?: (event: CalendarEvent) => React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

export interface CalendarContextValue {
  currentDate: Date;
  displayDate: Date;
  layout: CalendarLayout;
  timeRange: CalendarTimeRange;
  /** @deprecated Use layout instead */
  view: CalendarLayout;
  events: CalendarEvent[];
  members: CalendarTeamMember[];
  horizontalConfig: Required<CalendarHorizontalConfig>;
  selectedDate: Date | null;
  setSelectedDate: (date: Date) => void;
  setDisplayDate: (date: Date) => void;
  setLayout: (layout: CalendarLayout) => void;
  setTimeRange: (timeRange: CalendarTimeRange) => void;
  /** @deprecated Use setLayout instead */
  setView: (layout: CalendarLayout) => void;
  navigateMonth: (direction: 1 | -1) => void;
  navigateWeek: (direction: 1 | -1) => void;
  navigateDay: (direction: 1 | -1) => void;
  getEventsForDate: (date: Date) => CalendarEvent[];
  getEventsForMember: (memberId: string, date: Date) => CalendarEvent[];
  onEventPress?: (event: CalendarEvent) => void;
  renderEvent?: (event: CalendarEvent) => React.ReactNode;
}

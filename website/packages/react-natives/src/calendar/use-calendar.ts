import { useState, useCallback, useMemo } from 'react';
import type {
  CalendarEvent,
  CalendarLayout,
  CalendarTimeRange,
  CalendarContextValue,
  CalendarTeamMember,
  CalendarHorizontalConfig,
} from './types';
import { addMonths, addDays, isSameDay, resolveHorizontalConfig } from './utils';

export function useCalendar(options: {
  events?: CalendarEvent[];
  members?: CalendarTeamMember[];
  horizontalConfig?: CalendarHorizontalConfig;
  initialDate?: Date;
  initialLayout?: CalendarLayout;
  initialTimeRange?: CalendarTimeRange;
  /** @deprecated Use initialLayout */
  initialView?: CalendarLayout;
  onDateSelect?: (date: Date) => void;
  onMonthChange?: (year: number, month: number) => void;
  onViewChange?: (layout: CalendarLayout) => void;
  onTimeRangeChange?: (timeRange: CalendarTimeRange) => void;
  onEventPress?: (event: CalendarEvent) => void;
  renderEvent?: (event: CalendarEvent) => React.ReactNode;
}): CalendarContextValue {
  const {
    events = [],
    members = [],
    horizontalConfig: horizontalConfigProp,
    initialDate = new Date(),
    initialLayout,
    initialTimeRange = 'day',
    initialView,
    onDateSelect,
    onMonthChange,
    onViewChange,
    onTimeRangeChange,
    onEventPress,
    renderEvent,
  } = options;

  const horizontalConfig = useMemo(
    () => resolveHorizontalConfig(horizontalConfigProp),
    [horizontalConfigProp],
  );

  const [displayDate, setDisplayDateState] = useState(initialDate);
  const [selectedDate, setSelectedDateState] = useState<Date | null>(null);
  const [layout, setLayoutState] = useState<CalendarLayout>(
    initialLayout ?? initialView ?? 'horizontal',
  );
  const [timeRange, setTimeRangeState] = useState<CalendarTimeRange>(initialTimeRange);

  const setDisplayDate = useCallback(
    (date: Date) => {
      setDisplayDateState(date);
      onMonthChange?.(date.getFullYear(), date.getMonth());
    },
    [onMonthChange],
  );

  const setSelectedDate = useCallback(
    (date: Date) => {
      setSelectedDateState(date);
      onDateSelect?.(date);
    },
    [onDateSelect],
  );

  const setLayout = useCallback(
    (newLayout: CalendarLayout) => {
      setLayoutState(newLayout);
      onViewChange?.(newLayout);
    },
    [onViewChange],
  );

  const setTimeRange = useCallback(
    (newTimeRange: CalendarTimeRange) => {
      setTimeRangeState(newTimeRange);
      onTimeRangeChange?.(newTimeRange);
    },
    [onTimeRangeChange],
  );

  const navigateMonth = useCallback(
    (direction: 1 | -1) => {
      setDisplayDate(addMonths(displayDate, direction));
    },
    [displayDate, setDisplayDate],
  );

  const navigateWeek = useCallback(
    (direction: 1 | -1) => {
      setDisplayDate(addDays(displayDate, direction * 7));
    },
    [displayDate, setDisplayDate],
  );

  const navigateDay = useCallback(
    (direction: 1 | -1) => {
      setDisplayDate(addDays(displayDate, direction));
    },
    [displayDate, setDisplayDate],
  );

  const getEventsForDate = useCallback(
    (date: Date) => {
      return events.filter((e) => isSameDay(e.start, date));
    },
    [events],
  );

  const getEventsForMember = useCallback(
    (memberId: string, date: Date) => {
      return events.filter(
        (e) => e.memberId === memberId && isSameDay(e.start, date),
      );
    },
    [events],
  );

  return useMemo(
    () => ({
      currentDate: new Date(),
      displayDate,
      layout,
      timeRange,
      view: layout,
      events,
      members,
      horizontalConfig,
      selectedDate,
      setSelectedDate,
      setDisplayDate,
      setLayout,
      setTimeRange,
      setView: setLayout,
      navigateMonth,
      navigateWeek,
      navigateDay,
      getEventsForDate,
      getEventsForMember,
      onEventPress,
      renderEvent,
    }),
    [
      displayDate,
      layout,
      timeRange,
      events,
      members,
      horizontalConfig,
      selectedDate,
      setSelectedDate,
      setDisplayDate,
      setLayout,
      setTimeRange,
      navigateMonth,
      navigateWeek,
      navigateDay,
      getEventsForDate,
      getEventsForMember,
      onEventPress,
      renderEvent,
    ],
  );
}

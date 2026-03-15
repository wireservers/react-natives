import React, { createContext, useContext } from 'react';
import { View } from 'react-native';
import type { CalendarProps, CalendarContextValue } from './types';
import { useCalendar } from './use-calendar';
import { calendarRootStyle } from './styles';

export const CalendarContext = createContext<CalendarContextValue | null>(null);

export function useCalendarContext(): CalendarContextValue {
  const ctx = useContext(CalendarContext);
  if (!ctx) {
    throw new Error(
      'Calendar compound components must be used within <Calendar>',
    );
  }
  return ctx;
}

export const Calendar = React.forwardRef<
  React.ElementRef<typeof View>,
  CalendarProps
>(
  (
    {
      events,
      members,
      horizontalConfig,
      initialDate,
      initialLayout,
      initialTimeRange,
      initialView,
      onDateSelect,
      onEventPress,
      onMonthChange,
      onViewChange,
      onTimeRangeChange,
      renderEvent,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const calendarState = useCalendar({
      events,
      members,
      horizontalConfig,
      initialDate,
      initialLayout,
      initialTimeRange,
      initialView,
      onDateSelect,
      onEventPress,
      onMonthChange,
      onViewChange,
      onTimeRangeChange,
      renderEvent,
    });

    return (
      <CalendarContext.Provider value={calendarState}>
        <View
          ref={ref}
          className={calendarRootStyle({ size: 'md', class: className })}
          {...props}
        >
          {children}
        </View>
      </CalendarContext.Provider>
    );
  },
);

Calendar.displayName = 'Calendar';

import React, { useMemo } from 'react';
import { View, Text } from 'react-native';
import { useCalendarContext } from './calendar';
import { addDays, getWeekDays, isSameDay } from './utils';
import { CalendarDayCell } from './calendar-day-cell';
import {
  calendarWeekDayLabelStyle,
  calendarWeekDayLabelTextStyle,
} from './styles';
import type { CalendarDay } from './types';

export const CalendarWeekView = React.forwardRef<
  React.ElementRef<typeof View>,
  { className?: string }
>(({ className, ...props }, ref) => {
  const { displayDate, getEventsForDate } = useCalendarContext();

  const weekDays = useMemo(() => {
    const dayOfWeek = displayDate.getDay();
    const sunday = addDays(displayDate, -dayOfWeek);
    const days: CalendarDay[] = [];
    for (let i = 0; i < 7; i++) {
      const date = addDays(sunday, i);
      days.push({
        date,
        isCurrentMonth: date.getMonth() === displayDate.getMonth(),
        isToday: isSameDay(date, new Date()),
        events: getEventsForDate(date),
      });
    }
    return days;
  }, [displayDate, getEventsForDate]);

  return (
    <View ref={ref} className={className} {...props}>
      <View className="flex-row">
        {getWeekDays().map((day) => (
          <View key={day} className={calendarWeekDayLabelStyle({})}>
            <Text className={calendarWeekDayLabelTextStyle({})}>{day}</Text>
          </View>
        ))}
      </View>
      <View className="flex-row">
        {weekDays.map((day) => (
          <CalendarDayCell key={day.date.toISOString()} day={day} />
        ))}
      </View>
    </View>
  );
});

CalendarWeekView.displayName = 'CalendarWeekView';

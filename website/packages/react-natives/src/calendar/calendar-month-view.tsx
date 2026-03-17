import React, { useMemo } from 'react';
import { View, Text } from 'react-native';
import { useCalendarContext } from './calendar';
import { buildMonthGrid, getWeekDays } from './utils';
import { CalendarDayCell } from './calendar-day-cell';
import {
  calendarWeekDayLabelStyle,
  calendarWeekDayLabelTextStyle,
} from './styles';

export const CalendarMonthView = React.forwardRef<
  React.ElementRef<typeof View>,
  { className?: string }
>(({ className, ...props }, ref) => {
  const { displayDate, events } = useCalendarContext();

  const weeks = useMemo(
    () =>
      buildMonthGrid(
        displayDate.getFullYear(),
        displayDate.getMonth(),
        events,
      ),
    [displayDate, events],
  );

  return (
    <View ref={ref} className={className} {...props}>
      <View className="flex-row">
        {getWeekDays().map((day) => (
          <View key={day} className={calendarWeekDayLabelStyle({})}>
            <Text className={calendarWeekDayLabelTextStyle({})}>{day}</Text>
          </View>
        ))}
      </View>
      {weeks.map((week, i) => (
        <View key={i} className="flex-row">
          {week.days.map((day) => (
            <CalendarDayCell key={day.date.toISOString()} day={day} />
          ))}
        </View>
      ))}
    </View>
  );
});

CalendarMonthView.displayName = 'CalendarMonthView';

import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useCalendarContext } from './calendar';
import { getMonthName, getWeekRangeTitle } from './utils';
import {
  calendarHeaderStyle,
  calendarHeaderTitleStyle,
  calendarNavButtonStyle,
} from './styles';

export const CalendarHeader = React.forwardRef<
  React.ElementRef<typeof View>,
  { className?: string }
>(({ className, ...props }, ref) => {
  const { displayDate, navigateMonth, navigateWeek, navigateDay, timeRange } =
    useCalendarContext();

  const navigate = (direction: 1 | -1) => {
    if (timeRange === 'month') navigateMonth(direction);
    else if (timeRange === 'week') navigateWeek(direction);
    else navigateDay(direction);
  };

  let title: string;
  switch (timeRange) {
    case 'day':
      title = `${getMonthName(displayDate.getMonth())} ${displayDate.getDate()}, ${displayDate.getFullYear()}`;
      break;
    case 'week':
      title = getWeekRangeTitle(displayDate);
      break;
    case 'month':
      title = `${getMonthName(displayDate.getMonth())} ${displayDate.getFullYear()}`;
      break;
  }

  return (
    <View
      ref={ref}
      className={calendarHeaderStyle({ class: className })}
      {...props}
    >
      <Pressable
        className={calendarNavButtonStyle({})}
        onPress={() => navigate(-1)}
      >
        <Text className="text-typography-700 text-lg">{'\u2039'}</Text>
      </Pressable>
      <Text className={calendarHeaderTitleStyle({})}>{title}</Text>
      <Pressable
        className={calendarNavButtonStyle({})}
        onPress={() => navigate(1)}
      >
        <Text className="text-typography-700 text-lg">{'\u203A'}</Text>
      </Pressable>
    </View>
  );
});

CalendarHeader.displayName = 'CalendarHeader';

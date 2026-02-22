import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useCalendarContext } from './calendar';
import type { CalendarDay } from './types';
import { isSameDay } from './utils';
import {
  calendarDayCellStyle,
  calendarDayNumberStyle,
  calendarDayNumberTextStyle,
} from './styles';
import { CalendarEvent as CalendarEventComponent } from './calendar-event';

interface CalendarDayCellProps {
  day: CalendarDay;
  className?: string;
}

export const CalendarDayCell = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  CalendarDayCellProps
>(({ day, className, ...props }, ref) => {
  const { selectedDate, setSelectedDate, renderEvent } = useCalendarContext();
  const isSelected = selectedDate ? isSameDay(selectedDate, day.date) : false;

  return (
    <Pressable
      ref={ref}
      className={calendarDayCellStyle({
        isCurrentMonth: day.isCurrentMonth,
        class: className,
      })}
      onPress={() => setSelectedDate(day.date)}
      {...props}
    >
      <View
        className={calendarDayNumberStyle({
          isToday: day.isToday,
          isSelected,
        })}
      >
        <Text
          className={calendarDayNumberTextStyle({
            isToday: day.isToday,
            isSelected,
            isCurrentMonth: day.isCurrentMonth,
          })}
        >
          {day.date.getDate()}
        </Text>
      </View>
      {day.events.slice(0, 2).map((event) =>
        renderEvent ? (
          <React.Fragment key={event.id}>{renderEvent(event)}</React.Fragment>
        ) : (
          <CalendarEventComponent key={event.id} event={event} compact />
        ),
      )}
      {day.events.length > 2 && (
        <Text className="text-2xs text-typography-500 mt-0.5">
          +{day.events.length - 2} more
        </Text>
      )}
    </Pressable>
  );
});

CalendarDayCell.displayName = 'CalendarDayCell';

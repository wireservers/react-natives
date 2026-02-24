import React, { useMemo } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useCalendarContext } from './calendar';
import { formatHour } from './utils';
import { CalendarEvent as CalendarEventComponent } from './calendar-event';
import {
  calendarTimeSlotStyle,
  calendarTimeSlotLabelStyle,
  calendarTimeSlotLabelTextStyle,
  calendarTimeSlotContentStyle,
} from './styles';

const HOURS = Array.from({ length: 24 }, (_, i) => i);

export const CalendarDayView = React.forwardRef<
  React.ElementRef<typeof ScrollView>,
  { className?: string }
>(({ className, ...props }, ref) => {
  const { displayDate, getEventsForDate, renderEvent } = useCalendarContext();

  const dayEvents = useMemo(
    () => getEventsForDate(displayDate),
    [displayDate, getEventsForDate],
  );

  const eventsByHour = useMemo(() => {
    const map = new Map<number, typeof dayEvents>();
    dayEvents.forEach((event) => {
      const hour = event.start.getHours();
      const existing = map.get(hour) || [];
      existing.push(event);
      map.set(hour, existing);
    });
    return map;
  }, [dayEvents]);

  return (
    <ScrollView ref={ref} className={className} {...props}>
      {HOURS.map((hour) => {
        const events = eventsByHour.get(hour) || [];
        return (
          <View key={hour} className={calendarTimeSlotStyle({})}>
            <View className={calendarTimeSlotLabelStyle({})}>
              <Text className={calendarTimeSlotLabelTextStyle({})}>
                {formatHour(hour)}
              </Text>
            </View>
            <View className={calendarTimeSlotContentStyle({})}>
              {events.map((event) =>
                renderEvent ? (
                  <React.Fragment key={event.id}>
                    {renderEvent(event)}
                  </React.Fragment>
                ) : (
                  <CalendarEventComponent key={event.id} event={event} />
                ),
              )}
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
});

CalendarDayView.displayName = 'CalendarDayView';

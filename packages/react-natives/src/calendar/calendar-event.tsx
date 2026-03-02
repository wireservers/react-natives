import React from 'react';
import { Text, Pressable } from 'react-native';
import { useCalendarContext } from './calendar';
import type {
  CalendarEvent as CalendarEventType,
  EventColor,
  EventVariant,
} from './types';
import { formatTime } from './utils';
import { calendarEventStyle, calendarEventTextStyle } from './styles';

const VALID_COLORS: EventColor[] = [
  'primary',
  'info',
  'success',
  'warning',
  'error',
  'tertiary',
];

function mapEventColor(color?: string): EventColor {
  if (color && VALID_COLORS.includes(color as EventColor)) {
    return color as EventColor;
  }
  return 'info';
}

interface CalendarEventComponentProps {
  event: CalendarEventType;
  compact?: boolean;
  variant?: EventVariant;
  className?: string;
}

export const CalendarEvent = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  CalendarEventComponentProps
>(({ event, compact = false, variant = 'subtle', className, ...props }, ref) => {
  const { onEventPress } = useCalendarContext();
  const color = mapEventColor(event.color);

  return (
    <Pressable
      ref={ref}
      className={calendarEventStyle({ color, variant, class: className })}
      onPress={() => onEventPress?.(event)}
      {...props}
    >
      <Text
        className={calendarEventTextStyle({ color, variant })}
        numberOfLines={compact ? 1 : undefined}
      >
        {compact ? event.title : `${formatTime(event.start)} ${event.title}`}
      </Text>
    </Pressable>
  );
});

CalendarEvent.displayName = 'CalendarEvent';

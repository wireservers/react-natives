import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useCalendarContext } from './calendar';
import type { CalendarLayout, CalendarTimeRange } from './types';
import {
  calendarViewSwitcherStyle,
  calendarViewButtonStyle,
  calendarViewButtonTextStyle,
} from './styles';

type SwitcherTarget = 'layout' | 'timeRange';

const DEFAULT_LAYOUT_VIEWS: { key: string; label: string }[] = [
  { key: 'horizontal', label: 'Horizontal' },
  { key: 'vertical', label: 'Vertical' },
];

const DEFAULT_TIME_RANGE_VIEWS: { key: string; label: string }[] = [
  { key: 'day', label: 'Day' },
  { key: 'week', label: 'Week' },
  { key: 'month', label: 'Month' },
];

export const CalendarViewSwitcher = React.forwardRef<
  React.ElementRef<typeof View>,
  {
    className?: string;
    views?: { key: string; label: string }[];
    target?: SwitcherTarget;
  }
>(({ className, views, target = 'layout', ...props }, ref) => {
  const ctx = useCalendarContext();

  const defaultViews = target === 'timeRange' ? DEFAULT_TIME_RANGE_VIEWS : DEFAULT_LAYOUT_VIEWS;
  const resolvedViews = views ?? defaultViews;

  const activeKey = target === 'timeRange' ? ctx.timeRange : ctx.layout;
  const setActive = target === 'timeRange'
    ? (key: string) => ctx.setTimeRange(key as CalendarTimeRange)
    : (key: string) => ctx.setLayout(key as CalendarLayout);

  return (
    <View
      ref={ref}
      className={calendarViewSwitcherStyle({ class: className })}
      {...props}
    >
      {resolvedViews.map(({ key, label }) => (
        <Pressable
          key={key}
          className={calendarViewButtonStyle({ active: activeKey === key })}
          onPress={() => setActive(key)}
        >
          <Text
            className={calendarViewButtonTextStyle({ active: activeKey === key })}
          >
            {label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
});

CalendarViewSwitcher.displayName = 'CalendarViewSwitcher';

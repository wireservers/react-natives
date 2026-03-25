import React from 'react';
import { View, Text } from 'react-native';
import type { EventColor } from './types';
import {
  calendarLegendContainerStyle,
  calendarLegendItemStyle,
  calendarLegendDotStyle,
  calendarLegendTextStyle,
} from './styles';

export interface CalendarLegendItem {
  color: EventColor;
  label: string;
}

interface CalendarLegendProps {
  items: CalendarLegendItem[];
  className?: string;
}

export const CalendarLegend = React.forwardRef<
  React.ElementRef<typeof View>,
  CalendarLegendProps
>(({ items, className, ...props }, ref) => {
  return (
    <View
      ref={ref}
      className={calendarLegendContainerStyle({ class: className })}
      {...props}
    >
      {items.map((item) => (
        <View key={item.label} className={calendarLegendItemStyle({})}>
          <View className={calendarLegendDotStyle({ color: item.color })} />
          <Text className={calendarLegendTextStyle({})}>{item.label}</Text>
        </View>
      ))}
    </View>
  );
});

CalendarLegend.displayName = 'CalendarLegend';

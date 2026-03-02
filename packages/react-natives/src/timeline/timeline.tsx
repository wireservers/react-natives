import React from 'react';
import { View } from 'react-native';
import type { TimelineProps, TimelineItemProps, TimelineDotProps, TimelineSeparatorProps, TimelineConnectorProps, TimelineContentProps } from './types';
import { timelineStyle, timelineItemStyle, timelineDotStyle, timelineSeparatorStyle, timelineConnectorStyle, timelineContentStyle } from './styles';

export const Timeline = React.forwardRef<
  React.ElementRef<typeof View>,
  TimelineProps
>(({ className, ...props }, ref) => {
  return <View ref={ref} className={timelineStyle({ class: className })} {...props} />;
});
Timeline.displayName = 'Timeline';

export const TimelineItem = React.forwardRef<
  React.ElementRef<typeof View>,
  TimelineItemProps
>(({ className, ...props }, ref) => {
  return <View ref={ref} className={timelineItemStyle({ class: className })} {...props} />;
});
TimelineItem.displayName = 'TimelineItem';

export const TimelineDot = React.forwardRef<
  React.ElementRef<typeof View>,
  TimelineDotProps
>(({ className, variant, color, ...props }, ref) => {
  return <View ref={ref} className={timelineDotStyle({ variant, color, class: className })} {...props} />;
});
TimelineDot.displayName = 'TimelineDot';

export const TimelineSeparator = React.forwardRef<
  React.ElementRef<typeof View>,
  TimelineSeparatorProps
>(({ className, ...props }, ref) => {
  return <View ref={ref} className={timelineSeparatorStyle({ class: className })} {...props} />;
});
TimelineSeparator.displayName = 'TimelineSeparator';

export const TimelineConnector = React.forwardRef<
  React.ElementRef<typeof View>,
  TimelineConnectorProps
>(({ className, ...props }, ref) => {
  return <View ref={ref} className={timelineConnectorStyle({ class: className })} {...props} />;
});
TimelineConnector.displayName = 'TimelineConnector';

export const TimelineContent = React.forwardRef<
  React.ElementRef<typeof View>,
  TimelineContentProps
>(({ className, ...props }, ref) => {
  return <View ref={ref} className={timelineContentStyle({ class: className })} {...props} />;
});
TimelineContent.displayName = 'TimelineContent';

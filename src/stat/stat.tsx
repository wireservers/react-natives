import React from 'react';
import { View, Text } from 'react-native';
import type { StatProps, StatLabelProps, StatNumberProps, StatHelpTextProps, StatArrowProps } from './types';
import { statStyle, statLabelStyle, statNumberStyle, statHelpTextStyle, statArrowStyle } from './styles';

export const Stat = React.forwardRef<
  React.ElementRef<typeof View>,
  StatProps
>(({ className, ...props }, ref) => {
  return <View ref={ref} className={statStyle({ class: className })} {...props} />;
});
Stat.displayName = 'Stat';

export const StatLabel = React.forwardRef<
  React.ElementRef<typeof Text>,
  StatLabelProps
>(({ className, ...props }, ref) => {
  return <Text ref={ref} className={statLabelStyle({ class: className })} {...props} />;
});
StatLabel.displayName = 'StatLabel';

export const StatNumber = React.forwardRef<
  React.ElementRef<typeof Text>,
  StatNumberProps
>(({ className, ...props }, ref) => {
  return <Text ref={ref} className={statNumberStyle({ class: className })} {...props} />;
});
StatNumber.displayName = 'StatNumber';

export const StatHelpText = React.forwardRef<
  React.ElementRef<typeof Text>,
  StatHelpTextProps
>(({ className, ...props }, ref) => {
  return <Text ref={ref} className={statHelpTextStyle({ class: className })} {...props} />;
});
StatHelpText.displayName = 'StatHelpText';

export const StatArrow = React.forwardRef<
  React.ElementRef<typeof View>,
  StatArrowProps
>(({ className, type = 'increase', ...props }, ref) => {
  return (
    <Text ref={ref as any} className={statArrowStyle({ type, class: className })} {...props}>
      {type === 'increase' ? '\u25B2' : '\u25BC'}
    </Text>
  );
});
StatArrow.displayName = 'StatArrow';

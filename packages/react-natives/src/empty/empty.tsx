import React from 'react';
import { View, Text } from 'react-native';
import type { EmptyProps, EmptyIconProps, EmptyTitleProps, EmptyDescriptionProps, EmptyActionProps } from './types';
import { emptyStyle, emptyIconStyle, emptyTitleStyle, emptyDescriptionStyle, emptyActionStyle } from './styles';

export const Empty = React.forwardRef<
  React.ElementRef<typeof View>,
  EmptyProps
>(({ className, ...props }, ref) => {
  return (
    <View ref={ref} className={emptyStyle({ class: className })} {...props} />
  );
});
Empty.displayName = 'Empty';

export const EmptyIcon = React.forwardRef<any, EmptyIconProps>(
  ({ as: AsComp, className, ...props }, ref) => {
    return (
      <AsComp ref={ref} className={emptyIconStyle({ class: className })} {...props} />
    );
  },
);
EmptyIcon.displayName = 'EmptyIcon';

export const EmptyTitle = React.forwardRef<
  React.ElementRef<typeof Text>,
  EmptyTitleProps
>(({ className, ...props }, ref) => {
  return (
    <Text ref={ref} className={emptyTitleStyle({ class: className })} {...props} />
  );
});
EmptyTitle.displayName = 'EmptyTitle';

export const EmptyDescription = React.forwardRef<
  React.ElementRef<typeof Text>,
  EmptyDescriptionProps
>(({ className, ...props }, ref) => {
  return (
    <Text ref={ref} className={emptyDescriptionStyle({ class: className })} {...props} />
  );
});
EmptyDescription.displayName = 'EmptyDescription';

export const EmptyAction = React.forwardRef<
  React.ElementRef<typeof View>,
  EmptyActionProps
>(({ className, ...props }, ref) => {
  return (
    <View ref={ref} className={emptyActionStyle({ class: className })} {...props} />
  );
});
EmptyAction.displayName = 'EmptyAction';

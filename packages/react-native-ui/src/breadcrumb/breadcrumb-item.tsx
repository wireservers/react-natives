import React from 'react';
import { View } from 'react-native';
import type { BreadcrumbItemProps } from './types';
import { breadcrumbItemStyle } from './styles';

export const BreadcrumbItem = React.forwardRef<
  React.ElementRef<typeof View>,
  BreadcrumbItemProps
>(({ className, isCurrent, ...props }, ref) => {
  return (
    <View
      ref={ref}
      aria-current={isCurrent ? 'page' : undefined}
      className={breadcrumbItemStyle({ class: className })}
      {...props}
    />
  );
});

BreadcrumbItem.displayName = 'BreadcrumbItem';

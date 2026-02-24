import React from 'react';
import { Text } from 'react-native';
import type { BreadcrumbTextProps } from './types';
import { breadcrumbTextStyle } from './styles';

export const BreadcrumbText = React.forwardRef<
  React.ElementRef<typeof Text>,
  BreadcrumbTextProps
>(({ className, ...props }, ref) => {
  return (
    <Text
      ref={ref}
      className={breadcrumbTextStyle({ class: className })}
      {...props}
    />
  );
});

BreadcrumbText.displayName = 'BreadcrumbText';

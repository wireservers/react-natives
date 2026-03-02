import React from 'react';
import { View, Text } from 'react-native';
import { createComponentContext } from '../utils/create-context';
import type { BreadcrumbProps, BreadcrumbContextValue } from './types';
import { breadcrumbStyle, breadcrumbSeparatorStyle } from './styles';

export const [BreadcrumbProvider, useBreadcrumbContext] =
  createComponentContext<BreadcrumbContextValue>('Breadcrumb');

export const Breadcrumb = React.forwardRef<
  React.ElementRef<typeof View>,
  BreadcrumbProps
>(({ className, separator = '/', children, ...props }, ref) => {
  const childArray = React.Children.toArray(children);

  return (
    <BreadcrumbProvider value={{ separator }}>
      <View
        ref={ref}
        role="navigation"
        aria-label="Breadcrumb"
        className={breadcrumbStyle({ class: className })}
        {...props}
      >
        {childArray.map((child, index) => (
          <React.Fragment key={index}>
            {child}
            {index < childArray.length - 1 &&
              (typeof separator === 'string' ? (
                <Text className={breadcrumbSeparatorStyle({})}>
                  {separator}
                </Text>
              ) : (
                separator
              ))}
          </React.Fragment>
        ))}
      </View>
    </BreadcrumbProvider>
  );
});

Breadcrumb.displayName = 'Breadcrumb';

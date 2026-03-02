import React from 'react';
import { Pressable } from 'react-native';
import type { BreadcrumbLinkProps } from './types';
import { breadcrumbLinkStyle } from './styles';

export const BreadcrumbLink = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  BreadcrumbLinkProps
>(({ className, ...props }, ref) => {
  return (
    <Pressable
      ref={ref}
      role="link"
      className={breadcrumbLinkStyle({ class: className })}
      {...props}
    />
  );
});

BreadcrumbLink.displayName = 'BreadcrumbLink';

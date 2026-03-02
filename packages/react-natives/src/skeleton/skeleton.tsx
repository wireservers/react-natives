import React from 'react';
import { View } from 'react-native';
import type { SkeletonProps } from './types';
import { skeletonStyle, SKELETON_VARIANT_STYLE } from './styles';

export const Skeleton = React.forwardRef<
  React.ElementRef<typeof View>,
  SkeletonProps
>(({ className, variant, width, height, isLoaded, children, style, ...props }, ref) => {
  if (isLoaded) {
    return <>{children}</>;
  }

  return (
    <View
      ref={ref}
      className={skeletonStyle({ class: className })}
      style={[
        SKELETON_VARIANT_STYLE[variant ?? 'rounded'],
        width !== undefined ? { width } : undefined,
        height !== undefined ? { height } : undefined,
        style,
      ]}
      {...props}
    />
  );
});

Skeleton.displayName = 'Skeleton';

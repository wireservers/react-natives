import React from 'react';
import { View, Text } from 'react-native';
import type { AvatarGroupProps, AvatarSize } from './types';
import {
  avatarGroupStyle,
  avatarGroupOverflowStyle,
  avatarGroupOverflowTextStyle,
} from './styles';

export const AvatarGroup = React.forwardRef<
  React.ElementRef<typeof View>,
  AvatarGroupProps
>(({ className, max, children, ...props }, ref) => {
  const childArray = React.Children.toArray(children);
  const totalCount = childArray.length;
  const shouldTruncate = max != null && totalCount > max;
  const visibleChildren = shouldTruncate
    ? childArray.slice(0, max)
    : childArray;
  const overflowCount = shouldTruncate ? totalCount - max : 0;

  // Try to read size from first Avatar child
  const firstChild = childArray[0];
  const size: AvatarSize =
    React.isValidElement<{ size?: AvatarSize }>(firstChild) && firstChild.props.size
      ? firstChild.props.size
      : 'md';

  return (
    <View
      ref={ref}
      className={avatarGroupStyle({ class: className })}
      {...props}
    >
      {visibleChildren.map((child, index) => (
        <View key={index} className={index > 0 ? '-ml-2' : ''}>
          {child}
        </View>
      ))}
      {shouldTruncate && (
        <View className="-ml-2">
          <View className={avatarGroupOverflowStyle({ size })}>
            <Text className={avatarGroupOverflowTextStyle({ size })}>
              +{overflowCount}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
});

AvatarGroup.displayName = 'AvatarGroup';

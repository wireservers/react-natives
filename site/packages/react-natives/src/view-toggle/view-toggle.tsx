import React from 'react';
import { Pressable, View } from 'react-native';
import { Text } from '../text';
import type { ViewToggleProps } from './types';

export const ViewToggle = React.forwardRef(
  <M extends string = string>(
    { className, value, onChange, modes, ...props }: ViewToggleProps<M>,
    ref: React.ForwardedRef<React.ElementRef<typeof View>>,
  ) => {
    return (
      <View ref={ref} className={`flex-row gap-1 ${className ?? ''}`} {...props}>
        {modes.map(({ mode, icon, label }) => {
          const selected = value === mode;
          const renderedIcon =
            typeof icon === 'function' ? icon(selected) : icon;
          return (
            <Pressable
              key={mode}
              accessibilityRole="button"
              accessibilityLabel={label}
              accessibilityState={{ selected }}
              onPress={() => onChange(mode)}
              className={`min-h-9 min-w-9 items-center justify-center rounded-lg px-2 ${
                selected ? 'bg-primary-500' : 'bg-background-50'
              }`}
            >
              {renderedIcon ?? (
                <Text
                  size="xs"
                  weight="bold"
                  className={selected ? 'text-white' : 'text-typography-600'}
                >
                  {label.slice(0, 1).toUpperCase()}
                </Text>
              )}
            </Pressable>
          );
        })}
      </View>
    );
  },
);

ViewToggle.displayName = 'ViewToggle';

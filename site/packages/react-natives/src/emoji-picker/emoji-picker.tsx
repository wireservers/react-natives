import React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { Text } from '../text';
import type { EmojiPickerProps } from './types';

export const EmojiPicker = React.forwardRef<
  React.ElementRef<typeof View>,
  EmojiPickerProps
>(
  (
    {
      className,
      label,
      value,
      options,
      onChange,
      clearOnReselect = true,
      ...props
    },
    ref,
  ) => {
    return (
      <View ref={ref} className={`gap-1.5 ${className ?? ''}`} {...props}>
        {label ? (
          <Text size="sm" weight="semibold" className="text-typography-700">
            {label}
          </Text>
        ) : null}
        <ScrollView
          className="rounded-lg border border-outline-200 bg-background-0"
          style={{ maxHeight: 196 }}
          contentContainerStyle={{ padding: 10 }}
        >
          <View className="flex-row flex-wrap gap-2">
            {options.map((emoji) => {
              const selected = value === emoji;
              return (
                <Pressable
                  key={emoji}
                  onPress={() => onChange(selected && clearOnReselect ? '' : emoji)}
                  accessibilityRole="button"
                  accessibilityState={{ selected }}
                  accessibilityLabel={`Icon ${emoji}`}
                  className={`h-10 w-10 items-center justify-center rounded-lg border ${
                    selected
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-outline-200 bg-background-50'
                  }`}
                >
                  <Text style={{ fontSize: 20, lineHeight: 26 }}>{emoji}</Text>
                </Pressable>
              );
            })}
          </View>
        </ScrollView>
      </View>
    );
  },
);

EmojiPicker.displayName = 'EmojiPicker';

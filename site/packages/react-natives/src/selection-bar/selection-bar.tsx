import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { Badge, BadgeText } from '../badge';
import { Button, ButtonText } from '../button';
import { Text } from '../text';
import type { SelectionBarProps } from './types';

export const SelectionBar = React.forwardRef<
  React.ElementRef<typeof View>,
  SelectionBarProps
>(
  (
    {
      className,
      count,
      label,
      summary,
      onClear,
      onCompare,
      compareDisabled = false,
      compareLabel = 'Compare',
      clearLabel = 'Clear',
      bottomInset = 0,
      leading,
      style,
      ...props
    },
    ref,
  ) => {
    if (count === 0) return null;

    return (
      <View
        ref={ref}
        style={[styles.root, { paddingBottom: 20 + bottomInset }, style]}
        pointerEvents="box-none"
        {...props}
      >
        <View
          style={styles.bar}
          className={`flex-row flex-wrap items-center justify-between gap-3 ${className ?? ''}`}
        >
          <View className="shrink gap-1">
            <View className="flex-row flex-wrap items-center gap-2">
              {leading}
              <Badge action="primary" variant="subtle">
                <BadgeText>{count} selected</BadgeText>
              </Badge>
              <Text size="xs" weight="bold" className="uppercase text-primary-700">
                {label}
              </Text>
            </View>
            <Text size="sm" className="text-typography-600" numberOfLines={1}>
              {summary}
            </Text>
          </View>
          <View className="flex-row gap-2">
            <Button variant="outline" action="default" size="sm" onPress={onClear} className="rounded-xl">
              <ButtonText>{clearLabel}</ButtonText>
            </Button>
            <Button size="sm" onPress={onCompare} isDisabled={compareDisabled} className="rounded-xl">
              <ButtonText>{compareLabel}</ButtonText>
            </Button>
          </View>
        </View>
      </View>
    );
  },
);

SelectionBar.displayName = 'SelectionBar';

const styles = StyleSheet.create({
  root: {
    position: Platform.OS === 'web' ? ('fixed' as never) : 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 900,
    alignItems: 'center',
    padding: 16,
  },
  bar: {
    width: '100%',
    maxWidth: 760,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#a7f3d0',
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    shadowColor: '#0f172a',
    shadowOpacity: 0.18,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 12 },
  },
});

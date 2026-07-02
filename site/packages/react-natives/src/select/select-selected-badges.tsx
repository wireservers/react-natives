import React from 'react';
import { Pressable, Text, View, type GestureResponderEvent } from 'react-native';
import { useSelectContext } from './select';
import type { SelectSelectedBadgesProps } from './types';
import {
  selectSelectedBadgeCloseButtonStyle,
  selectSelectedBadgeStyle,
  selectSelectedBadgeTextStyle,
  selectSelectedBadgesStyle,
} from './styles';

export const SelectSelectedBadges = React.forwardRef<
  React.ElementRef<typeof View>,
  SelectSelectedBadgesProps
>(
  (
    {
      className,
      badgeClassName,
      badgeTextClassName,
      badgeCloseButtonClassName,
      maxVisible,
      showRemoveButton = true,
      overflowLabel = (count) => `+${count}`,
      renderBadge,
      ...props
    },
    ref,
  ) => {
    const { selectedItems, onValueRemove, size, isDisabled } = useSelectContext();
    const visibleItems =
      maxVisible === undefined ? selectedItems : selectedItems.slice(0, maxVisible);
    const overflowCount =
      maxVisible === undefined
        ? 0
        : Math.max(selectedItems.length - maxVisible, 0);

    if (selectedItems.length === 0) {
      return null;
    }

    return (
      <View
        ref={ref}
        className={selectSelectedBadgesStyle({ class: className })}
        {...props}
      >
        {visibleItems.map((item) => {
          const remove = () => onValueRemove(item.value);
          const handleRemove = (event: GestureResponderEvent) => {
            event.stopPropagation?.();
            remove();
          };

          if (renderBadge) {
            return (
              <React.Fragment key={item.value}>
                {renderBadge(item, { remove, isDisabled })}
              </React.Fragment>
            );
          }

          return (
            <View
              key={item.value}
              className={selectSelectedBadgeStyle({
                isDisabled,
                class: badgeClassName,
              })}
            >
              <Text
                numberOfLines={1}
                className={selectSelectedBadgeTextStyle({
                  size,
                  class: badgeTextClassName,
                })}
              >
                {item.label}
              </Text>
              {showRemoveButton ? (
                <Pressable
                  disabled={isDisabled}
                  onPress={handleRemove}
                  className={selectSelectedBadgeCloseButtonStyle({
                    size,
                    class: badgeCloseButtonClassName,
                  })}
                  accessibilityRole="button"
                  accessibilityLabel={`Remove ${item.label}`}
                >
                  <Text className="text-typography-400">{'\u2715'}</Text>
                </Pressable>
              ) : null}
            </View>
          );
        })}
        {overflowCount > 0 ? (
          <View
            className={selectSelectedBadgeStyle({
              isDisabled,
              class: badgeClassName,
            })}
          >
            <Text
              className={selectSelectedBadgeTextStyle({
                size,
                class: badgeTextClassName,
              })}
            >
              {overflowLabel(overflowCount)}
            </Text>
          </View>
        ) : null}
      </View>
    );
  },
);

SelectSelectedBadges.displayName = 'SelectSelectedBadges';

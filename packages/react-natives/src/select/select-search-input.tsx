import React from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { useSelectContext } from './select';
import type { SelectSearchInputProps } from './types';
import {
  selectSearchClearButtonStyle,
  selectSearchInputFieldStyle,
  selectSearchInputStyle,
} from './styles';

export const SelectSearchInput = React.forwardRef<
  React.ElementRef<typeof TextInput>,
  SelectSearchInputProps
>(
  (
    {
      className,
      inputClassName,
      clearButtonClassName,
      clearLabel = 'Clear search',
      isClearable = true,
      placeholder = 'Search...',
      value,
      onChangeText,
      style,
      ...props
    },
    ref,
  ) => {
    const { size, searchValue, onSearchChange, isDisabled } = useSelectContext();
    const resolvedValue = value ?? searchValue;

    const handleChangeText = (nextValue: string) => {
      onSearchChange(nextValue);
      onChangeText?.(nextValue);
    };

    const handleClear = () => {
      handleChangeText('');
    };

    return (
      <View className={selectSearchInputStyle({ size, class: className })}>
        <TextInput
          ref={ref}
          value={resolvedValue}
          onChangeText={handleChangeText}
          editable={!isDisabled}
          readOnly={isDisabled}
          placeholder={placeholder}
          placeholderTextColor="rgb(var(--color-typography-400))"
          className={selectSearchInputFieldStyle({
            size,
            class: inputClassName,
          })}
          {...props}
          style={[{ backgroundColor: 'transparent' }, style]}
        />
        {isClearable && resolvedValue ? (
          <Pressable
            onPress={handleClear}
            className={selectSearchClearButtonStyle({
              size,
              class: clearButtonClassName,
            })}
            accessibilityRole="button"
            accessibilityLabel={clearLabel}
          >
            <Text className="text-typography-400">{'\u2715'}</Text>
          </Pressable>
        ) : null}
      </View>
    );
  },
);

SelectSearchInput.displayName = 'SelectSearchInput';

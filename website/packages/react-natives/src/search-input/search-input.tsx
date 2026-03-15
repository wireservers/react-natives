import React, { useState } from 'react';
import { View, TextInput, Pressable, Text } from 'react-native';
import { createComponentContext } from '../utils/create-context';
import type {
  SearchInputProps,
  SearchInputFieldProps,
  SearchInputIconProps,
  SearchInputClearButtonProps,
  SearchInputContextValue,
} from './types';
import {
  searchInputStyle,
  searchInputFieldStyle,
  searchInputIconStyle,
  searchInputClearButtonStyle,
} from './styles';

export const [SearchInputProvider, useSearchInputContext] =
  createComponentContext<SearchInputContextValue>('SearchInput');

export const SearchInput = React.forwardRef<
  React.ElementRef<typeof View>,
  SearchInputProps
>(
  (
    {
      className,
      size = 'md',
      value: controlledValue,
      onChangeText,
      isDisabled = false,
      children,
      ...props
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = useState('');
    const value =
      controlledValue !== undefined ? controlledValue : internalValue;
    const handleChange = (text: string) => {
      setInternalValue(text);
      onChangeText?.(text);
    };
    const onClear = () => handleChange('');
    return (
      <SearchInputProvider value={{ size, value, onChange: handleChange, onClear }}>
        <View
          ref={ref}
          className={searchInputStyle({ size, isDisabled, class: className })}
          {...props}
        >
          {children}
        </View>
      </SearchInputProvider>
    );
  },
);
SearchInput.displayName = 'SearchInput';

export const SearchInputField = React.forwardRef<
  React.ElementRef<typeof TextInput>,
  SearchInputFieldProps
>(({ className, ...props }, ref) => {
  const { size, value, onChange } = useSearchInputContext();
  return (
    <TextInput
      ref={ref}
      placeholder="Search..."
      value={value}
      onChangeText={onChange}
      className={searchInputFieldStyle({ size, class: className })}
      {...props}
    />
  );
});
SearchInputField.displayName = 'SearchInputField';

export const SearchInputIcon = React.forwardRef<any, SearchInputIconProps>(
  ({ as: AsComp, className, ...props }, ref) => {
    const { size } = useSearchInputContext();
    if (AsComp)
      return (
        <AsComp
          ref={ref}
          className={searchInputIconStyle({ size, class: className })}
          {...props}
        />
      );
    return (
      <Text className={searchInputIconStyle({ size, class: className })}>
        {'\uD83D\uDD0D'}
      </Text>
    );
  },
);
SearchInputIcon.displayName = 'SearchInputIcon';

export const SearchInputClearButton = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  SearchInputClearButtonProps
>(({ className, children, ...props }, ref) => {
  const { value, onClear } = useSearchInputContext();
  if (!value) return null;
  return (
    <Pressable
      ref={ref}
      onPress={onClear}
      className={searchInputClearButtonStyle({ class: className })}
      accessibilityRole="button"
      accessibilityLabel="Clear search"
      {...props}
    >
      {children ?? (
        <Text style={{ fontSize: 12, color: '#9CA3AF' }}>{'\u2715'}</Text>
      )}
    </Pressable>
  );
});
SearchInputClearButton.displayName = 'SearchInputClearButton';

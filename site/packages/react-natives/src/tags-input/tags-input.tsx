import React, { useState, createContext, useContext } from 'react';
import { View, TextInput, Pressable, Text } from 'react-native';
import { createComponentContext } from '../utils/create-context';
import type {
  TagsInputProps,
  TagsInputFieldProps,
  TagsInputTagProps,
  TagsInputTagTextProps,
  TagsInputTagCloseButtonProps,
  TagsInputContextValue,
} from './types';
import {
  tagsInputStyle,
  tagsInputFieldStyle,
  tagsInputTagStyle,
  tagsInputTagTextStyle,
  tagsInputTagCloseButtonStyle,
} from './styles';
import { BRAND_COLOR } from '../utils/brand';

export const [TagsInputProvider, useTagsInputContext] =
  createComponentContext<TagsInputContextValue>('TagsInput');

const TagValueContext = createContext<string | null>(null);

export const TagsInput = React.forwardRef<
  React.ElementRef<typeof View>,
  TagsInputProps
>(
  (
    {
      className,
      value = [],
      onValueChange,
      size = 'md',
      isDisabled = false,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <TagsInputProvider value={{ size, value, onValueChange, isDisabled }}>
        <View
          ref={ref}
          className={tagsInputStyle({ size, isDisabled, class: className })}
          {...props}
        >
          {children}
        </View>
      </TagsInputProvider>
    );
  },
);
TagsInput.displayName = 'TagsInput';

export const TagsInputField = React.forwardRef<
  React.ElementRef<typeof TextInput>,
  TagsInputFieldProps
>(({ className, ...props }, ref) => {
  const { size, value, onValueChange, isDisabled } = useTagsInputContext();
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !value.includes(trimmed)) {
      onValueChange?.([...value, trimmed]);
    }
    setInputValue('');
  };

  return (
    <TextInput
      ref={ref}
      className={tagsInputFieldStyle({ size, class: className })}
      value={inputValue}
      onChangeText={setInputValue}
      onSubmitEditing={handleSubmit}
      editable={!isDisabled}
      readOnly={isDisabled}
      blurOnSubmit={false}
      style={{ backgroundColor: 'transparent' }}
      {...props}
    />
  );
});
TagsInputField.displayName = 'TagsInputField';

export const TagsInputTag = React.forwardRef<
  React.ElementRef<typeof View>,
  TagsInputTagProps
>(({ className, value, onRemove, children, ...props }, ref) => {
  return (
    <TagValueContext.Provider value={value}>
      <View
        ref={ref}
        className={tagsInputTagStyle({ class: className })}
        {...props}
      >
        {children ?? <Text className={tagsInputTagTextStyle({})}>{value}</Text>}
      </View>
    </TagValueContext.Provider>
  );
});
TagsInputTag.displayName = 'TagsInputTag';

export const TagsInputTagText = React.forwardRef<
  React.ElementRef<typeof Text>,
  TagsInputTagTextProps
>(({ className, ...props }, ref) => {
  return (
    <Text
      ref={ref}
      className={tagsInputTagTextStyle({ class: className })}
      {...props}
    />
  );
});
TagsInputTagText.displayName = 'TagsInputTagText';

export const TagsInputTagCloseButton = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  TagsInputTagCloseButtonProps
>(({ className, onPress, ...props }, ref) => {
  const { value, onValueChange, isDisabled } = useTagsInputContext();
  const tagValue = useContext(TagValueContext);

  const handlePress = (e: any) => {
    if (tagValue != null) {
      onValueChange?.(value.filter((v) => v !== tagValue));
    }
    onPress?.(e);
  };

  return (
    <Pressable
      ref={ref}
      className={tagsInputTagCloseButtonStyle({ class: className })}
      accessibilityRole="button"
      accessibilityLabel="Remove tag"
      onPress={handlePress}
      disabled={isDisabled}
      {...props}
    >
      <Text style={{ fontSize: 10, color: BRAND_COLOR }}>{'\u2715'}</Text>
    </Pressable>
  );
});
TagsInputTagCloseButton.displayName = 'TagsInputTagCloseButton';

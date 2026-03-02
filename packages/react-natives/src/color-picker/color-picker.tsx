import React, { useState } from 'react';
import { View, Pressable, Text, TextInput, Modal } from 'react-native';
import { createComponentContext } from '../utils/create-context';
import type {
  ColorPickerProps,
  ColorPickerTriggerProps,
  ColorPickerContentProps,
  ColorPickerSwatchProps,
  ColorPickerInputProps,
  ColorPickerContextValue,
} from './types';
import {
  colorPickerTriggerStyle,
  colorPickerSwatchPreviewStyle,
  colorPickerContentStyle,
  colorPickerSwatchStyle,
  colorPickerInputStyle,
} from './styles';
import { BRAND_COLOR } from '../utils/brand';

export const [ColorPickerProvider, useColorPickerContext] =
  createComponentContext<ColorPickerContextValue>('ColorPicker');

export const ColorPicker: React.FC<ColorPickerProps> = ({
  isOpen: controlledOpen,
  onOpenChange,
  value,
  onChange,
  defaultValue = BRAND_COLOR,
  children,
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const [internalColor, setInternalColor] = useState(defaultValue);
  const isOpen =
    controlledOpen !== undefined ? controlledOpen : internalOpen;
  const color = value !== undefined ? value : internalColor;
  const onToggle = () => {
    const next = !isOpen;
    setInternalOpen(next);
    onOpenChange?.(next);
  };
  const onClose = () => {
    setInternalOpen(false);
    onOpenChange?.(false);
  };
  const onColorChange = (c: string) => {
    setInternalColor(c);
    onChange?.(c);
  };
  return (
    <ColorPickerProvider
      value={{ isOpen, onToggle, onClose, color, onColorChange }}
    >
      {children}
    </ColorPickerProvider>
  );
};
ColorPicker.displayName = 'ColorPicker';

export const ColorPickerTrigger = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ColorPickerTriggerProps
>(({ className, children, ...props }, ref) => {
  const { onToggle, color } = useColorPickerContext();
  return (
    <Pressable
      ref={ref}
      onPress={onToggle}
      className={colorPickerTriggerStyle({ class: className })}
      {...props}
    >
      {children ?? (
        <>
          <View
            className={colorPickerSwatchPreviewStyle({})}
            style={{ backgroundColor: color }}
          />
          <Text
            style={{
              fontSize: 14,
              color: '#374151',
              fontFamily: 'monospace',
            }}
          >
            {color}
          </Text>
        </>
      )}
    </Pressable>
  );
});
ColorPickerTrigger.displayName = 'ColorPickerTrigger';

export const ColorPickerContent = React.forwardRef<
  React.ElementRef<typeof View>,
  ColorPickerContentProps
>(({ className, children, ...props }, ref) => {
  const { isOpen, onClose } = useColorPickerContext();
  if (!isOpen) return null;
  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        onPress={onClose}
      >
        <Pressable onPress={(e) => e.stopPropagation()}>
          <View
            ref={ref}
            className={colorPickerContentStyle({ class: className })}
            {...props}
          >
            {children}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
});
ColorPickerContent.displayName = 'ColorPickerContent';

export const ColorPickerSwatch = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ColorPickerSwatchProps
>(({ className, color: swatchColor, ...props }, ref) => {
  const { color, onColorChange } = useColorPickerContext();
  const isSelected = color === swatchColor;
  return (
    <Pressable
      ref={ref}
      onPress={() => onColorChange(swatchColor)}
      className={colorPickerSwatchStyle({ isSelected, class: className })}
      style={{ backgroundColor: swatchColor }}
      accessibilityRole="button"
      accessibilityLabel={swatchColor}
      {...props}
    />
  );
});
ColorPickerSwatch.displayName = 'ColorPickerSwatch';

export const ColorPickerInput = React.forwardRef<
  React.ElementRef<typeof TextInput>,
  ColorPickerInputProps
>(({ className, ...props }, ref) => {
  const { color, onColorChange, onClose } = useColorPickerContext();
  return (
    <TextInput
      ref={ref}
      value={color}
      onChangeText={onColorChange}
      onSubmitEditing={onClose}
      className={colorPickerInputStyle({ class: className })}
      {...props}
    />
  );
});
ColorPickerInput.displayName = 'ColorPickerInput';

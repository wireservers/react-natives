import React, { useState, useRef } from 'react';
import { View, Pressable, Text, Modal, useWindowDimensions } from 'react-native';
import { createComponentContext } from '../utils/create-context';
import type {
  DatePickerProps,
  DatePickerTriggerProps,
  DatePickerContentProps,
  DatePickerInputProps,
  DatePickerContextValue,
} from './types';
import {
  datePickerInputStyle,
  datePickerInputTextStyle,
  datePickerInputPlaceholderStyle,
  datePickerContentStyle,
} from './styles';

export const [DatePickerProvider, useDatePickerContext] =
  createComponentContext<DatePickerContextValue>('DatePicker');

export const DatePicker: React.FC<DatePickerProps> = ({
  isOpen: controlledOpen,
  onOpenChange,
  value = null,
  onChange,
  children,
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const [triggerRect, setTriggerRect] = useState({ pageX: 0, pageY: 0, width: 0, height: 0 });
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;

  const onToggle = () => {
    const next = !isOpen;
    setInternalOpen(next);
    onOpenChange?.(next);
  };
  const onClose = () => {
    setInternalOpen(false);
    onOpenChange?.(false);
  };
  const onDateSelect = (date: Date) => {
    onChange?.(date);
    onClose();
  };

  return (
    <DatePickerProvider
      value={{ isOpen, onToggle, onClose, selectedDate: value, onDateSelect, triggerRect, setTriggerRect }}
    >
      <View>{children}</View>
    </DatePickerProvider>
  );
};
DatePicker.displayName = 'DatePicker';

export const DatePickerTrigger = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  DatePickerTriggerProps
>(({ className, children, ...props }, ref) => {
  const { onToggle } = useDatePickerContext();
  return (
    <Pressable ref={ref} onPress={onToggle} className={className} {...props}>
      {children}
    </Pressable>
  );
});
DatePickerTrigger.displayName = 'DatePickerTrigger';

export const DatePickerInput = React.forwardRef<
  React.ElementRef<typeof View>,
  DatePickerInputProps
>(({ className, placeholder = 'Select a date', format, ...props }, ref) => {
  const { selectedDate, onToggle, setTriggerRect } = useDatePickerContext();
  const innerRef = useRef<View>(null);
  const formatted = selectedDate ? selectedDate.toLocaleDateString() : null;

  const measure = () => {
    innerRef.current?.measure((_x, _y, width, height, pageX, pageY) => {
      setTriggerRect({ pageX, pageY, width, height });
    });
  };

  return (
    <Pressable onPress={() => { measure(); onToggle(); }}>
      <View
        ref={innerRef}
        onLayout={measure}
        className={datePickerInputStyle({ class: className })}
        {...props}
      >
        {formatted ? (
          <Text className={datePickerInputTextStyle()}>{formatted}</Text>
        ) : (
          <Text className={datePickerInputPlaceholderStyle()}>{placeholder}</Text>
        )}
        <Text style={{ fontSize: 16, color: '#9CA3AF' }}>📅</Text>
      </View>
    </Pressable>
  );
});
DatePickerInput.displayName = 'DatePickerInput';

export const DatePickerContent = React.forwardRef<
  React.ElementRef<typeof View>,
  DatePickerContentProps
>(({ className, children, ...props }, ref) => {
  const { isOpen, onClose, triggerRect } = useDatePickerContext();
  const { width: screenWidth } = useWindowDimensions();

  if (!isOpen) return null;

  // Right-align calendar to the right edge of the input (where the 📅 icon sits)
  const rightOffset = screenWidth - (triggerRect.pageX + triggerRect.width);

  return (
    <Modal visible transparent animationType="none" onRequestClose={onClose}>
      <Pressable style={{ flex: 1 }} onPress={onClose}>
        <Pressable onPress={(e) => e.stopPropagation()}>
          <View
            ref={ref}
            style={{
              position: 'absolute',
              top: triggerRect.pageY + triggerRect.height + 4,
              right: rightOffset,
            }}
            className={datePickerContentStyle({ class: className })}
            {...props}
          >
            {children}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
});
DatePickerContent.displayName = 'DatePickerContent';

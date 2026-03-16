import type { View, Pressable, Text as RNText } from 'react-native';

export interface DatePickerContextValue {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
  triggerRect: { pageX: number; pageY: number; width: number; height: number };
  setTriggerRect: (rect: { pageX: number; pageY: number; width: number; height: number }) => void;
}

export interface DatePickerProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  value?: Date | null;
  onChange?: (date: Date) => void;
  children: React.ReactNode;
}
export interface DatePickerTriggerProps
  extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string;
}
export interface DatePickerContentProps
  extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
}
export interface DatePickerInputProps
  extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  placeholder?: string;
  format?: string;
}

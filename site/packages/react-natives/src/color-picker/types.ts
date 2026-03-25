import type { View, Pressable, TextInput } from 'react-native';

export interface ColorPickerContextValue {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  color: string;
  onColorChange: (color: string) => void;
}

export interface ColorPickerProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  value?: string;
  onChange?: (color: string) => void;
  defaultValue?: string;
  children: React.ReactNode;
}
export interface ColorPickerTriggerProps
  extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string;
}
export interface ColorPickerContentProps
  extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
}
export interface ColorPickerSwatchProps
  extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string;
  color: string;
}
export interface ColorPickerInputProps
  extends React.ComponentPropsWithoutRef<typeof TextInput> {
  className?: string;
}
export interface ColorPickerBoxProps
  extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  /** Size of the saturation-value square in pixels. Default: 200. */
  size?: number;
}
export interface ColorPickerSliderProps
  extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  /** Height of the hue slider in pixels. Default: 200. */
  height?: number;
  /** Width of the hue slider in pixels. Default: 24. */
  width?: number;
}

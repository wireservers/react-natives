import type { View, TextInput } from 'react-native';

export type PinInputSize = 'sm' | 'md' | 'lg';

export interface PinInputContextValue {
  values: string[];
  onChangeAtIndex: (index: number, char: string) => void;
  size: PinInputSize;
  isDisabled: boolean;
  length: number;
}

export interface PinInputProps
  extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
  size?: PinInputSize;
  isDisabled?: boolean;
}
export interface PinInputFieldProps
  extends React.ComponentPropsWithoutRef<typeof TextInput> {
  className?: string;
  index: number;
}

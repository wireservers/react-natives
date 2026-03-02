import type { TextInput } from 'react-native';

export type TextareaVariant = 'outline' | 'filled' | 'underlined';
export type TextareaSize = 'sm' | 'md' | 'lg';

export interface TextareaProps
  extends React.ComponentPropsWithoutRef<typeof TextInput> {
  className?: string;
  variant?: TextareaVariant;
  size?: TextareaSize;
  isDisabled?: boolean;
  isInvalid?: boolean;
  isReadOnly?: boolean;
}

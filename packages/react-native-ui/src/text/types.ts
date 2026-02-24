import type { Text as RNText } from 'react-native';

export type TextSize =
  | '2xs'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl';

export type TextWeight =
  | 'normal'
  | 'medium'
  | 'semibold'
  | 'bold'
  | 'extrabold';

export interface TextProps
  extends React.ComponentPropsWithoutRef<typeof RNText> {
  className?: string;
  size?: TextSize;
  weight?: TextWeight;
  isTruncated?: boolean;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikeThrough?: boolean;
  highlight?: boolean;
  sub?: boolean;
  sup?: boolean;
}

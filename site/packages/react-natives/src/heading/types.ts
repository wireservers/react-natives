import type { Text as RNText } from 'react-native';

export type HeadingSize =
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl';

export interface HeadingProps
  extends React.ComponentPropsWithoutRef<typeof RNText> {
  className?: string;
  size?: HeadingSize;
  isTruncated?: boolean;
}

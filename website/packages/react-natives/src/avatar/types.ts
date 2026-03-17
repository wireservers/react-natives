import type { View, Text as RNText, ImageSourcePropType } from 'react-native';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface AvatarContextValue {
  size: AvatarSize;
}

export interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  size?: AvatarSize;
}

export interface AvatarImageProps {
  className?: string;
  source: ImageSourcePropType | { uri: string };
  alt?: string;
}

export interface AvatarFallbackTextProps
  extends React.ComponentPropsWithoutRef<typeof RNText> {
  className?: string;
}

export interface AvatarBadgeProps
  extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
}

export interface AvatarGroupProps
  extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  max?: number;
}

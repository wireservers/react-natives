import type { ImageProps as RNImageProps } from 'react-native';

export type ImageSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
export type ImageBorderRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface ImageProps extends Omit<RNImageProps, 'style' | 'borderRadius'> {
  className?: string;
  size?: ImageSize;
  borderRadius?: ImageBorderRadius;
  alt: string;
}

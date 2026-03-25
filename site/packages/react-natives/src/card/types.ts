import type { View } from 'react-native';

export type CardVariant = 'elevated' | 'outline' | 'ghost' | 'filled';
export type CardSize = 'sm' | 'md' | 'lg';

export interface CardContextValue {
  variant: CardVariant;
  size: CardSize;
}

export interface CardProps
  extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  variant?: CardVariant;
  size?: CardSize;
}

export interface CardHeaderProps
  extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
}

export interface CardBodyProps
  extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
}

export interface CardFooterProps
  extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
}

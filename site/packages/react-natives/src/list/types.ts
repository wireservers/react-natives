import type { View, Text as RNText } from 'react-native';

export type ListVariant = 'unordered' | 'ordered';

export interface ListContextValue { variant: ListVariant; }

export interface ListProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  variant?: ListVariant;
}
export interface ListItemProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  index?: number;
}
export interface ListItemTextProps extends React.ComponentPropsWithoutRef<typeof RNText> { className?: string; }
export interface ListItemDescriptionProps extends React.ComponentPropsWithoutRef<typeof RNText> { className?: string; }
export interface ListItemIconProps { as: React.ElementType; className?: string; }

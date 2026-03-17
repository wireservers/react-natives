import type { View, Pressable, Text as RNText } from 'react-native';

export type TabsVariant = 'underlined' | 'outline' | 'rounded';
export type TabsSize = 'sm' | 'md' | 'lg';

export interface TabsContextValue {
  selectedIndex: number;
  onChange: (index: number) => void;
  variant: TabsVariant;
  size: TabsSize;
  orientation: 'horizontal' | 'vertical';
  isFitted: boolean;
}

export interface TabsProps
  extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  defaultIndex?: number;
  index?: number;
  onChange?: (index: number) => void;
  variant?: TabsVariant;
  size?: TabsSize;
  orientation?: 'horizontal' | 'vertical';
  isFitted?: boolean;
}

export interface TabListProps
  extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
}

export interface TabProps
  extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string;
  /** @internal Injected by TabList */
  _index?: number;
}

export interface TabTextProps
  extends React.ComponentPropsWithoutRef<typeof RNText> {
  className?: string;
}

export interface TabPanelsProps
  extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
}

export interface TabPanelProps
  extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  index: number;
}

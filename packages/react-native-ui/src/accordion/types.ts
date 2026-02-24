import type { View, Pressable, Text as RNText } from 'react-native';

export type AccordionType = 'single' | 'multiple';
export type AccordionVariant = 'filled' | 'unfilled';
export type AccordionSize = 'sm' | 'md' | 'lg';

export interface AccordionContextValue {
  expandedItems: string[];
  toggleItem: (value: string) => void;
  type: AccordionType;
  isCollapsible: boolean;
  variant: AccordionVariant;
  size: AccordionSize;
}

export interface AccordionItemContextValue {
  value: string;
  isExpanded: boolean;
}

export interface AccordionProps
  extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  type?: AccordionType;
  defaultValue?: string[];
  value?: string[];
  onValueChange?: (value: string[]) => void;
  isCollapsible?: boolean;
  variant?: AccordionVariant;
  size?: AccordionSize;
}

export interface AccordionItemProps
  extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  value: string;
}

export interface AccordionTriggerProps
  extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string;
}

export interface AccordionContentProps
  extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
}

export interface AccordionIconProps {
  className?: string;
}

export interface AccordionTitleTextProps
  extends React.ComponentPropsWithoutRef<typeof RNText> {
  className?: string;
}

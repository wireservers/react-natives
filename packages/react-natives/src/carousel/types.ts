import type { View, Pressable, Animated } from 'react-native';

export interface CarouselContextValue {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  activeIndexRef: React.MutableRefObject<number>;
  itemCount: number;
  setItemCount: (count: number) => void;
  itemCountRef: React.MutableRefObject<number>;
  loop: boolean;
  width: number;
  setWidth: (width: number) => void;
  widthRef: React.MutableRefObject<number>;
  animX: Animated.Value;
  animXValueRef: React.MutableRefObject<number>;
  goTo: (index: number, animate?: boolean) => void;
  next: () => void;
  previous: () => void;
}

export interface CarouselProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  defaultIndex?: number;
  loop?: boolean;
  onIndexChange?: (index: number) => void;
}
export interface CarouselContentProps extends React.ComponentPropsWithoutRef<typeof View> { className?: string; }
export interface CarouselItemProps extends React.ComponentPropsWithoutRef<typeof View> { className?: string; onPress?: () => void; }
export interface CarouselPreviousProps extends React.ComponentPropsWithoutRef<typeof Pressable> { className?: string; }
export interface CarouselNextProps extends React.ComponentPropsWithoutRef<typeof Pressable> { className?: string; }
export interface CarouselDotsProps extends React.ComponentPropsWithoutRef<typeof View> { className?: string; }

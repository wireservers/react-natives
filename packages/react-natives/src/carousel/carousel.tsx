import React, { useState, useRef, useCallback, useEffect } from 'react';
import { View, Pressable, Text, Animated, PanResponder, LayoutChangeEvent } from 'react-native';
import { createComponentContext } from '../utils/create-context';
import type { CarouselProps, CarouselContentProps, CarouselItemProps, CarouselPreviousProps, CarouselNextProps, CarouselDotsProps, CarouselContextValue } from './types';
import { carouselStyle, carouselContentStyle, carouselItemStyle, carouselPreviousStyle, carouselNextStyle, carouselDotsStyle, carouselDotStyle } from './styles';

export const [CarouselProvider, useCarouselContext] = createComponentContext<CarouselContextValue>('Carousel');

export const Carousel = React.forwardRef<React.ElementRef<typeof View>, CarouselProps>(
  ({ className, defaultIndex = 0, loop = false, onIndexChange, children, ...props }, ref) => {
    const [activeIndex, _setActiveIndex] = useState(defaultIndex);
    const [itemCount, setItemCount] = useState(0);
    const [width, setWidth] = useState(0);
    const activeIndexRef = useRef(defaultIndex);
    const itemCountRef = useRef(0);
    const widthRef = useRef(0);
    const animX = useRef(new Animated.Value(0)).current;
    const animXValueRef = useRef(0);

    // Track animX value changes
    useEffect(() => {
      const id = animX.addListener(({ value }) => { animXValueRef.current = value; });
      return () => animX.removeListener(id);
    }, [animX]);

    const setActiveIndex = useCallback((index: number) => {
      activeIndexRef.current = index;
      _setActiveIndex(index);
      onIndexChange?.(index);
    }, [onIndexChange]);

    const goTo = useCallback((index: number, animate = true) => {
      const w = widthRef.current;
      const targetX = loop ? -(index + 1) * w : -index * w;
      setActiveIndex(index);
      if (animate) {
        Animated.timing(animX, { toValue: targetX, duration: 300, useNativeDriver: true }).start();
      } else {
        animX.setValue(targetX);
        animXValueRef.current = targetX;
      }
    }, [loop, animX, setActiveIndex]);

    const next = useCallback(() => {
      const count = itemCountRef.current;
      const w = widthRef.current;
      if (loop) {
        const nextIdx = activeIndexRef.current + 1;
        if (nextIdx >= count) {
          // Animate into clone-of-first, then jump to real first
          Animated.timing(animX, { toValue: -(count + 1) * w, duration: 300, useNativeDriver: true }).start(() => {
            animX.setValue(-w);
            animXValueRef.current = -w;
            setActiveIndex(0);
          });
        } else {
          goTo(nextIdx);
        }
      } else {
        goTo(Math.min(activeIndexRef.current + 1, count - 1));
      }
    }, [loop, animX, goTo, setActiveIndex]);

    const previous = useCallback(() => {
      const count = itemCountRef.current;
      const w = widthRef.current;
      if (loop) {
        const prevIdx = activeIndexRef.current - 1;
        if (prevIdx < 0) {
          // Animate into clone-of-last, then jump to real last
          Animated.timing(animX, { toValue: 0, duration: 300, useNativeDriver: true }).start(() => {
            animX.setValue(-count * w);
            animXValueRef.current = -count * w;
            setActiveIndex(count - 1);
          });
        } else {
          goTo(prevIdx);
        }
      } else {
        goTo(Math.max(activeIndexRef.current - 1, 0));
      }
    }, [loop, animX, goTo, setActiveIndex]);

    return (
      <CarouselProvider value={{ activeIndex, setActiveIndex, itemCount, setItemCount, itemCountRef, loop, width, setWidth, widthRef, animX, animXValueRef, goTo, next, previous }}>
        <View ref={ref} className={carouselStyle({ class: className })} {...props}>{children}</View>
      </CarouselProvider>
    );
  },
);
Carousel.displayName = 'Carousel';

export const CarouselContent = React.forwardRef<React.ElementRef<typeof View>, CarouselContentProps>(({ className, children, style, ...props }, ref) => {
  const { setWidth, setItemCount, itemCountRef, loop, setActiveIndex, animX, animXValueRef, widthRef } = useCarouselContext();
  const dragStartValue = useRef(0);
  const dragStartIndex = useRef(0);

  const childArray = React.Children.toArray(children);
  const count = childArray.length;
  useEffect(() => {
    setItemCount(count);
    itemCountRef.current = count;
  }, [count]);

  // In loop mode: [cloneLast, ...real, cloneFirst]
  const displayedChildren = loop && count > 0
    ? [
        React.cloneElement(childArray[count - 1] as React.ReactElement, { key: '__clone-last__' }),
        ...childArray,
        React.cloneElement(childArray[0] as React.ReactElement, { key: '__clone-first__' }),
      ]
    : children;

  const handleLayout = (e: LayoutChangeEvent) => {
    const w = e.nativeEvent.layout.width;
    widthRef.current = w;
    setWidth(w);
    if (loop && w > 0) {
      // Start at real first (padded index 1)
      animX.setValue(-w);
      animXValueRef.current = -w;
    }
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gs) =>
        Math.abs(gs.dx) > Math.abs(gs.dy) && Math.abs(gs.dx) > 8,
      onPanResponderGrant: () => {
        animX.stopAnimation();
        dragStartValue.current = animXValueRef.current;
        dragStartIndex.current = activeIndexRef.current;
      },
      onPanResponderMove: (_, gs) => {
        // Clamp drag to ±1 slide width so you can't skip multiple items
        const w = widthRef.current;
        const clamped = Math.max(-w, Math.min(w, gs.dx));
        animX.setValue(dragStartValue.current + clamped);
      },
      onPanResponderRelease: (_, gs) => {
        const w = widthRef.current;
        if (w === 0) return;
        const count = itemCountRef.current;
        const start = dragStartIndex.current;

        // Determine direction: fast swipe or passed 30% threshold
        let delta = 0;
        if (gs.vx < -0.3 || gs.dx < -w * 0.3) delta = 1;
        else if (gs.vx > 0.3 || gs.dx > w * 0.3) delta = -1;

        const targetLogical = start + delta;

        if (loop) {
          const paddedStart = start + 1; // padded index of start
          const targetPage = paddedStart + delta;

          if (targetPage <= 0) {
            // Swipe back from first → animate to clone-of-last, jump to real last
            Animated.timing(animX, { toValue: 0, duration: 200, useNativeDriver: true }).start(() => {
              animX.setValue(-count * w);
              animXValueRef.current = -count * w;
              setActiveIndex(count - 1);
            });
          } else if (targetPage >= count + 1) {
            // Swipe forward from last → animate to clone-of-first, jump to real first
            Animated.timing(animX, { toValue: -(count + 1) * w, duration: 200, useNativeDriver: true }).start(() => {
              animX.setValue(-w);
              animXValueRef.current = -w;
              setActiveIndex(0);
            });
          } else {
            setActiveIndex(Math.max(0, Math.min(count - 1, targetLogical)));
            Animated.timing(animX, { toValue: -targetPage * w, duration: 200, useNativeDriver: true }).start();
          }
        } else {
          const clampedIdx = Math.max(0, Math.min(count - 1, targetLogical));
          setActiveIndex(clampedIdx);
          Animated.timing(animX, { toValue: -clampedIdx * w, duration: 200, useNativeDriver: true }).start();
        }
      },
      onPanResponderTerminate: () => {
        // Snap back to start index on cancel
        const w = widthRef.current;
        if (w === 0) return;
        const start = dragStartIndex.current;
        const targetPage = loop ? start + 1 : start;
        setActiveIndex(start);
        Animated.timing(animX, { toValue: -targetPage * w, duration: 200, useNativeDriver: true }).start();
      },
    })
  ).current;

  return (
    <View
      ref={ref}
      className={carouselContentStyle({ class: className })}
      style={[{ overflow: 'hidden' }, style]}
      onLayout={handleLayout}
      {...panResponder.panHandlers}
      {...props}
    >
      <Animated.View style={{ flexDirection: 'row', transform: [{ translateX: animX }] }}>
        {displayedChildren}
      </Animated.View>
    </View>
  );
});
CarouselContent.displayName = 'CarouselContent';

export const CarouselItem = React.forwardRef<React.ElementRef<typeof View>, CarouselItemProps>(({ className, style, ...props }, ref) => {
  const { width } = useCarouselContext();
  return (
    <View
      ref={ref}
      className={carouselItemStyle({ class: className })}
      style={[width > 0 ? { width } : undefined, style]}
      {...props}
    />
  );
});
CarouselItem.displayName = 'CarouselItem';

export const CarouselPrevious = React.forwardRef<React.ElementRef<typeof Pressable>, CarouselPreviousProps>(({ className, children, ...props }, ref) => {
  const { previous } = useCarouselContext();
  return (
    <Pressable ref={ref} onPress={previous} className={carouselPreviousStyle({ class: className })} accessibilityRole="button" accessibilityLabel="Previous" {...props}>
      {children ?? <Text style={{ fontSize: 16, color: '#374151' }}>{'\u2039'}</Text>}
    </Pressable>
  );
});
CarouselPrevious.displayName = 'CarouselPrevious';

export const CarouselNext = React.forwardRef<React.ElementRef<typeof Pressable>, CarouselNextProps>(({ className, children, ...props }, ref) => {
  const { next } = useCarouselContext();
  return (
    <Pressable ref={ref} onPress={next} className={carouselNextStyle({ class: className })} accessibilityRole="button" accessibilityLabel="Next" {...props}>
      {children ?? <Text style={{ fontSize: 16, color: '#374151' }}>{'\u203A'}</Text>}
    </Pressable>
  );
});
CarouselNext.displayName = 'CarouselNext';

export const CarouselDots = React.forwardRef<React.ElementRef<typeof View>, CarouselDotsProps>(({ className, ...props }, ref) => {
  const { activeIndex, itemCount, goTo } = useCarouselContext();
  return (
    <View ref={ref} className={carouselDotsStyle({ class: className })} {...props}>
      {Array.from({ length: itemCount }, (_, i) => (
        <Pressable key={i} onPress={() => goTo(i)} accessibilityRole="button" accessibilityLabel={`Go to slide ${i + 1}`}>
          <View className={carouselDotStyle({ isActive: i === activeIndex })} />
        </Pressable>
      ))}
    </View>
  );
});
CarouselDots.displayName = 'CarouselDots';

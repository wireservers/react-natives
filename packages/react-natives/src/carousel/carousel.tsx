import React, { useState, useRef, useCallback, useEffect } from 'react';
import { View, Pressable, Text, Animated, PanResponder, LayoutChangeEvent, Platform } from 'react-native';
import { createComponentContext } from '../utils/create-context';
import type { CarouselProps, CarouselContentProps, CarouselItemProps, CarouselPreviousProps, CarouselNextProps, CarouselDotsProps, CarouselContextValue } from './types';
import { carouselStyle, carouselContentStyle, carouselItemStyle, carouselPreviousStyle, carouselNextStyle, carouselDotsStyle, carouselDotStyle } from './styles';

export const [CarouselProvider, useCarouselContext] = createComponentContext<CarouselContextValue>('Carousel');

export const Carousel = React.forwardRef<React.ElementRef<typeof View>, CarouselProps>(
  ({ className, defaultIndex = 0, loop = false, onIndexChange, itemWidth: itemWidthProp = 0, gap: gapProp = 0, autoPlay = false, autoPlayInterval = 3000, children, ...props }, ref) => {
    const [activeIndex, _setActiveIndex] = useState(defaultIndex);
    const [itemCount, setItemCount] = useState(0);
    const [width, setWidth] = useState(0);
    const activeIndexRef = useRef(defaultIndex);
    const itemCountRef = useRef(0);
    const widthRef = useRef(0);
    const animX = useRef(new Animated.Value(0)).current;
    const animXValueRef = useRef(0);

    // Keep prop refs stable for callbacks
    const itemWidthRef = useRef(itemWidthProp);
    itemWidthRef.current = itemWidthProp;
    const gapRef = useRef(gapProp);
    gapRef.current = gapProp;

    useEffect(() => {
      const id = animX.addListener(({ value }) => { animXValueRef.current = value; });
      return () => animX.removeListener(id);
    }, [animX]);

    const setActiveIndex = useCallback((index: number) => {
      activeIndexRef.current = index;
      _setActiveIndex(index);
      onIndexChange?.(index);
    }, [onIndexChange]);

    /** step = distance between one item start and the next */
    const getStep = useCallback(() => {
      const iw = itemWidthRef.current;
      return iw > 0 ? iw + gapRef.current : widthRef.current;
    }, []);

    /** How many items to clone on each side for seamless loop */
    const getCloneCount = useCallback(() => {
      const iw = itemWidthRef.current;
      if (!loop) return 0;
      if (iw > 0) {
        const step = iw + gapRef.current;
        return step > 0 ? Math.ceil(widthRef.current / step) + 1 : 1;
      }
      return 1;
    }, [loop]);

    const goTo = useCallback((index: number, animate = true) => {
      const step = getStep();
      const clones = getCloneCount();
      const targetX = loop ? -(index + clones) * step : -index * step;
      setActiveIndex(index);
      if (animate) {
        Animated.timing(animX, { toValue: targetX, duration: 300, useNativeDriver: true }).start();
      } else {
        animX.setValue(targetX);
        animXValueRef.current = targetX;
      }
    }, [loop, animX, setActiveIndex, getStep, getCloneCount]);

    const next = useCallback(() => {
      const count = itemCountRef.current;
      const step = getStep();
      const clones = getCloneCount();
      if (loop) {
        const nextIdx = activeIndexRef.current + 1;
        if (nextIdx >= count) {
          // Animate into first clone zone, then jump to real first
          Animated.timing(animX, { toValue: -(count + clones) * step, duration: 300, useNativeDriver: true }).start(() => {
            const jumpX = -clones * step;
            animX.setValue(jumpX);
            animXValueRef.current = jumpX;
            setActiveIndex(0);
          });
        } else {
          goTo(nextIdx);
        }
      } else {
        goTo(Math.min(activeIndexRef.current + 1, count - 1));
      }
    }, [loop, animX, goTo, setActiveIndex, getStep, getCloneCount]);

    const previous = useCallback(() => {
      const count = itemCountRef.current;
      const step = getStep();
      const clones = getCloneCount();
      if (loop) {
        const prevIdx = activeIndexRef.current - 1;
        if (prevIdx < 0) {
          // Animate into last clone zone, then jump to real last
          Animated.timing(animX, { toValue: -(clones - 1) * step, duration: 300, useNativeDriver: true }).start(() => {
            const jumpX = -(count - 1 + clones) * step;
            animX.setValue(jumpX);
            animXValueRef.current = jumpX;
            setActiveIndex(count - 1);
          });
        } else {
          goTo(prevIdx);
        }
      } else {
        goTo(Math.max(activeIndexRef.current - 1, 0));
      }
    }, [loop, animX, goTo, setActiveIndex, getStep, getCloneCount]);

    // Auto-play
    useEffect(() => {
      if (!autoPlay || itemCountRef.current === 0) return;
      const id = setInterval(() => { next(); }, autoPlayInterval);
      return () => clearInterval(id);
    }, [autoPlay, autoPlayInterval, next]);

    return (
      <CarouselProvider value={{ activeIndex, setActiveIndex, activeIndexRef, itemCount, setItemCount, itemCountRef, loop, width, setWidth, widthRef, animX, animXValueRef, goTo, next, previous, itemWidth: itemWidthProp, gap: gapProp }}>
        <View ref={ref} className={carouselStyle({ class: className })} {...props}>{children}</View>
      </CarouselProvider>
    );
  },
);
Carousel.displayName = 'Carousel';

export const CarouselContent = React.forwardRef<React.ElementRef<typeof View>, CarouselContentProps>(({ className, children, style, ...props }, ref) => {
  const { setWidth, setItemCount, itemCountRef, loop, setActiveIndex, activeIndexRef, animX, animXValueRef, widthRef, itemWidth: itemWidthProp, gap: gapProp } = useCarouselContext();
  const dragStartValue = useRef(0);
  const dragStartIndex = useRef(0);
  const internalRef = useRef<View>(null);

  const loopRef = useRef(loop);
  loopRef.current = loop;
  const setActiveIndexRef = useRef(setActiveIndex);
  setActiveIndexRef.current = setActiveIndex;
  const itemWidthRef = useRef(itemWidthProp);
  itemWidthRef.current = itemWidthProp;
  const gapRef = useRef(gapProp);
  gapRef.current = gapProp;

  const childArray = React.Children.toArray(children);
  const count = childArray.length;
  useEffect(() => {
    setItemCount(count);
    itemCountRef.current = count;
  }, [count]);

  const getStep = () => {
    const iw = itemWidthRef.current;
    return iw > 0 ? iw + gapRef.current : widthRef.current;
  };

  const getCloneCount = () => {
    const iw = itemWidthRef.current;
    if (!loopRef.current) return 0;
    if (iw > 0) {
      const step = iw + gapRef.current;
      return step > 0 ? Math.ceil(widthRef.current / step) + 1 : 1;
    }
    return 1;
  };

  // Build displayed children with clones for loop mode
  const cloneCount = getCloneCount();
  let displayedChildren: React.ReactNode;
  if (loop && count > 0 && cloneCount > 0) {
    const leadClones: React.ReactElement[] = [];
    const trailClones: React.ReactElement[] = [];
    for (let i = 0; i < cloneCount; i++) {
      // Lead clones: last `cloneCount` items
      const leadIdx = ((count - cloneCount + i) % count + count) % count;
      leadClones.push(
        React.cloneElement(childArray[leadIdx] as React.ReactElement, { key: `__clone-lead-${i}__` }),
      );
      // Trail clones: first `cloneCount` items
      const trailIdx = i % count;
      trailClones.push(
        React.cloneElement(childArray[trailIdx] as React.ReactElement, { key: `__clone-trail-${i}__` }),
      );
    }
    displayedChildren = [...leadClones, ...childArray, ...trailClones];
  } else {
    displayedChildren = children;
  }

  const handleLayout = (e: LayoutChangeEvent) => {
    const w = e.nativeEvent.layout.width;
    widthRef.current = w;
    setWidth(w);
    if (loop && w > 0) {
      const step = getStep();
      const clones = getCloneCount();
      const initialX = -clones * step;
      animX.setValue(initialX);
      animXValueRef.current = initialX;
    }
  };

  // --- Shared gesture helpers ---
  const gestureStart = () => {
    animX.stopAnimation();
    dragStartValue.current = animXValueRef.current;
    dragStartIndex.current = activeIndexRef.current;
  };

  const gestureMove = (dx: number) => {
    const step = getStep();
    const clamped = Math.max(-step, Math.min(step, dx));
    animX.setValue(dragStartValue.current + clamped);
  };

  const gestureEnd = (dx: number, vx: number) => {
    const step = getStep();
    if (step === 0) return;
    const cnt = itemCountRef.current;
    const start = dragStartIndex.current;
    const isLoop = loopRef.current;
    const setIdx = setActiveIndexRef.current;
    const clones = getCloneCount();

    let delta = 0;
    if (vx < -0.3 || dx < -step * 0.3) delta = 1;
    else if (vx > 0.3 || dx > step * 0.3) delta = -1;

    const targetLogical = start + delta;

    if (isLoop) {
      const paddedStart = start + clones;
      const targetPage = paddedStart + delta;

      if (targetPage < clones) {
        // Went before first real item — animate to clone, then jump
        Animated.timing(animX, { toValue: -targetPage * step, duration: 200, useNativeDriver: true }).start(() => {
          const jumpIdx = cnt - 1;
          const jumpX = -(jumpIdx + clones) * step;
          animX.setValue(jumpX);
          animXValueRef.current = jumpX;
          setIdx(jumpIdx);
        });
      } else if (targetPage >= cnt + clones) {
        // Went past last real item — animate to clone, then jump
        Animated.timing(animX, { toValue: -targetPage * step, duration: 200, useNativeDriver: true }).start(() => {
          const jumpX = -clones * step;
          animX.setValue(jumpX);
          animXValueRef.current = jumpX;
          setIdx(0);
        });
      } else {
        const idx = Math.max(0, Math.min(cnt - 1, targetLogical));
        setIdx(idx);
        Animated.timing(animX, { toValue: -targetPage * step, duration: 200, useNativeDriver: true }).start();
      }
    } else {
      const clampedIdx = Math.max(0, Math.min(cnt - 1, targetLogical));
      setIdx(clampedIdx);
      Animated.timing(animX, { toValue: -clampedIdx * step, duration: 200, useNativeDriver: true }).start();
    }
  };

  const gestureCancel = () => {
    const step = getStep();
    if (step === 0) return;
    const start = dragStartIndex.current;
    const clones = getCloneCount();
    const targetPage = loopRef.current ? start + clones : start;
    setActiveIndexRef.current(start);
    Animated.timing(animX, { toValue: -targetPage * step, duration: 200, useNativeDriver: true }).start();
  };

  // --- Native: PanResponder ---
  const panResponder = useRef(
    Platform.OS !== 'web'
      ? PanResponder.create({
          onMoveShouldSetPanResponder: (_, gs) =>
            Math.abs(gs.dx) > Math.abs(gs.dy) && Math.abs(gs.dx) > 8,
          onPanResponderGrant: gestureStart,
          onPanResponderMove: (_, gs) => gestureMove(gs.dx),
          onPanResponderRelease: (_, gs) => gestureEnd(gs.dx, gs.vx),
          onPanResponderTerminate: gestureCancel,
        })
      : null
  ).current;

  // --- Web: Pointer events ---
  useEffect(() => {
    if (Platform.OS !== 'web') return;
    const el = internalRef.current as unknown as HTMLElement;
    if (!el) return;

    let dragging = false;
    let startX = 0;
    let lastX = 0;
    let lastTime = 0;
    let moved = false;

    const removeDocListeners = () => {
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerup', onUp);
      document.removeEventListener('pointercancel', onCancel);
    };

    const onDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      dragging = true;
      moved = false;
      startX = e.clientX;
      lastX = e.clientX;
      lastTime = e.timeStamp;
      gestureStart();
      document.addEventListener('pointermove', onMove);
      document.addEventListener('pointerup', onUp);
      document.addEventListener('pointercancel', onCancel);
    };

    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      if (!moved && Math.abs(dx) <= 8) return;
      if (!moved) moved = true;
      e.preventDefault();
      gestureMove(dx);
      lastX = e.clientX;
      lastTime = e.timeStamp;
    };

    const onUp = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      removeDocListeners();
      if (!moved) {
        gestureCancel();
        return;
      }
      const dx = e.clientX - startX;
      const dt = Math.max(1, e.timeStamp - lastTime);
      const vx = (e.clientX - lastX) / dt;
      gestureEnd(dx, vx);
    };

    const onCancel = () => {
      if (!dragging) return;
      dragging = false;
      removeDocListeners();
      gestureCancel();
    };

    el.addEventListener('pointerdown', onDown);
    return () => {
      el.removeEventListener('pointerdown', onDown);
      removeDocListeners();
    };
  }, []);

  const setRef = useCallback((node: View | null) => {
    internalRef.current = node;
    if (typeof ref === 'function') ref(node);
    else if (ref) (ref as React.MutableRefObject<View | null>).current = node;
  }, [ref]);

  return (
    <View
      ref={setRef}
      className={carouselContentStyle({ class: className })}
      style={[
        { overflow: 'hidden' },
        Platform.OS === 'web' && ({ touchAction: 'pan-y', userSelect: 'none', cursor: 'grab' } as any),
        style,
      ]}
      onLayout={handleLayout}
      {...(panResponder?.panHandlers ?? {})}
      {...props}
    >
      <Animated.View style={{ flexDirection: 'row', gap: gapProp, transform: [{ translateX: animX }] }}>
        {displayedChildren}
      </Animated.View>
    </View>
  );
});
CarouselContent.displayName = 'CarouselContent';

export const CarouselItem = React.forwardRef<React.ElementRef<typeof View>, CarouselItemProps>(({ className, style, onPress, children, ...props }, ref) => {
  const { width, itemWidth } = useCarouselContext();
  const effectiveWidth = itemWidth > 0 ? itemWidth : width;
  return (
    <View
      ref={ref}
      className={carouselItemStyle({ class: className })}
      style={[effectiveWidth > 0 ? { width: effectiveWidth } : undefined, style]}
      {...props}
    >
      {onPress ? (
        <Pressable onPress={onPress} style={{ flex: 1 }}>
          {children}
        </Pressable>
      ) : (
        children
      )}
    </View>
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

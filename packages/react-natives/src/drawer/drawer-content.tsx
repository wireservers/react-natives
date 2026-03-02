import React from 'react';
import { View, Animated, type ViewStyle } from 'react-native';
import { useDrawerContext } from './drawer';
import type { DrawerContentProps } from './types';
import { drawerContentStyle } from './styles';
import type { DrawerPlacement, DrawerSize, DrawerSlideFrom } from './types';

const SIZE_MAP: Record<DrawerPlacement, Record<DrawerSize, ViewStyle>> = {
  left: {
    sm: { width: 240 },
    md: { width: 320 },
    lg: { width: 400 },
    full: { width: '100%' },
  },
  right: {
    sm: { width: 240 },
    md: { width: 320 },
    lg: { width: 400 },
    full: { width: '100%' },
  },
  top: {
    sm: { height: 200 },
    md: { height: 300 },
    lg: { height: 400 },
    full: { height: '100%' },
  },
  bottom: {
    sm: { height: 200 },
    md: { height: 300 },
    lg: { height: 400 },
    full: { height: '100%' },
  },
};

// Inline position styles that mirror the Tailwind placement classes.
const PLACEMENT_POSITION: Record<DrawerPlacement, ViewStyle> = {
  left:   { position: 'absolute', left: 0, top: 0, bottom: 0 },
  right:  { position: 'absolute', right: 0, top: 0, bottom: 0 },
  top:    { position: 'absolute', left: 0, right: 0, top: 0 },
  bottom: { position: 'absolute', left: 0, right: 0, bottom: 0 },
};

const SLIDE_OFFSET = 700;

function getSlideTransform(anim: Animated.Value, dir: DrawerSlideFrom): object[] {
  switch (dir) {
    case 'top':
      return [{ translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [0, -SLIDE_OFFSET] }) }];
    case 'bottom':
      return [{ translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [0, SLIDE_OFFSET] }) }];
    case 'left':
      return [{ translateX: anim.interpolate({ inputRange: [0, 1], outputRange: [0, -SLIDE_OFFSET] }) }];
    case 'right':
      return [{ translateX: anim.interpolate({ inputRange: [0, 1], outputRange: [0, SLIDE_OFFSET] }) }];
  }
}

export const DrawerContent = React.forwardRef<
  React.ElementRef<typeof View>,
  DrawerContentProps
>(({ className, style, ...props }, ref) => {
  const { placement, size, slideFrom, animationType, isOpen } = useDrawerContext();
  const sizeStyle = SIZE_MAP[placement][size];

  // slideFrom only applies when animationType is 'slide'; ignored for fade/none.
  const effectiveSlideFrom: DrawerSlideFrom | undefined =
    animationType === 'slide' ? (slideFrom ?? (placement as DrawerSlideFrom)) : undefined;

  const slideAnim = React.useRef(new Animated.Value(1)).current;
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (effectiveSlideFrom) {
      slideAnim.setValue(1);
      Animated.timing(slideAnim, {
        toValue: isOpen ? 0 : 1,
        duration: 280,
        useNativeDriver: true,
      }).start();
    } else if (animationType === 'fade') {
      fadeAnim.setValue(isOpen ? 0 : 1);
      Animated.timing(fadeAnim, {
        toValue: isOpen ? 1 : 0,
        duration: 280,
        useNativeDriver: true,
      }).start();
    }
  }, [isOpen, effectiveSlideFrom, animationType]);

  // Slide animation: outer Animated.View handles positioning + transform;
  // inner View handles NativeWind className (className doesn't work on Animated.View).
  if (effectiveSlideFrom) {
    return (
      <Animated.View
        style={[
          PLACEMENT_POSITION[placement],
          sizeStyle,
          { transform: getSlideTransform(slideAnim, effectiveSlideFrom) },
        ]}
      >
        <View
          ref={ref}
          className={drawerContentStyle({ placement, class: className })}
          style={[{ flex: 1, position: 'relative' }, style]}
          {...props}
        />
      </Animated.View>
    );
  }

  // Fade animation
  if (animationType === 'fade') {
    return (
      <Animated.View
        style={[
          PLACEMENT_POSITION[placement],
          sizeStyle,
          { opacity: fadeAnim },
        ]}
      >
        <View
          ref={ref}
          className={drawerContentStyle({ placement, class: className })}
          style={[{ flex: 1, position: 'relative' }, style]}
          {...props}
        />
      </Animated.View>
    );
  }

  // No animation ('none')
  return (
    <View
      ref={ref}
      className={drawerContentStyle({ placement, class: className })}
      style={[PLACEMENT_POSITION[placement], sizeStyle, style]}
      {...props}
    />
  );
});

DrawerContent.displayName = 'DrawerContent';

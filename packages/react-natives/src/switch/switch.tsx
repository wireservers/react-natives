import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useFormControlContext } from '../form-control/form-control';
import type { SwitchProps } from './types';
import { switchContainerStyle } from './styles';

const SWITCH_SIZES = {
  sm: {
    trackWidth: 36,
    trackHeight: 20,
    thumbSize: 16,
  },
  md: {
    trackWidth: 44,
    trackHeight: 24,
    thumbSize: 20,
  },
  lg: {
    trackWidth: 52,
    trackHeight: 28,
    thumbSize: 24,
  },
} as const;

export const Switch = React.forwardRef<
  React.ElementRef<typeof View>,
  SwitchProps
>(
  (
    {
      className,
      size = 'md',
      isDisabled: isDisabledProp,
      value: valueProp,
      defaultValue = false,
      onToggle,
      trackColor: trackColorProp,
      thumbColor: thumbColorProp,
      children,
      ...props
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const formControl = useFormControlContext();

    const isDisabled = isDisabledProp ?? formControl?.isDisabled ?? false;
    const isControlled = valueProp !== undefined;
    const isOn = isControlled ? valueProp : internalValue;

    const handleToggle = (newValue: boolean) => {
      if (isDisabled) return;
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onToggle?.(newValue);
    };

    const sizeConfig = SWITCH_SIZES[size] ?? SWITCH_SIZES.md;
    const thumbOffset =
      sizeConfig.trackWidth - sizeConfig.thumbSize - switchTokens.padding * 2;
    const trackBackgroundColor =
      trackColorProp?.[isOn ? 'true' : 'false'] ??
      (isOn ? switchTokens.onTrack : switchTokens.offTrack);
    const thumbColor = thumbColorProp ?? switchTokens.thumb;

    const pressableProps = {
      accessibilityRole: 'switch' as const,
      accessibilityState: { checked: isOn, disabled: isDisabled },
      disabled: isDisabled,
      onPress: () => handleToggle(!isOn),
    };

    return (
      <View
        ref={ref}
        className={switchContainerStyle({ isDisabled, class: className })}
        {...props}
      >
        <Pressable
          {...pressableProps}
          style={[
            styles.track,
            {
              width: sizeConfig.trackWidth,
              height: sizeConfig.trackHeight,
              borderRadius: sizeConfig.trackHeight / 2,
              backgroundColor: trackBackgroundColor,
              borderColor: isOn
                ? trackBackgroundColor
                : switchTokens.offTrackBorder,
            },
          ]}
        >
          <View
            style={[
              styles.thumb,
              {
                width: sizeConfig.thumbSize,
                height: sizeConfig.thumbSize,
                borderRadius: sizeConfig.thumbSize / 2,
                backgroundColor: thumbColor,
                transform: [{ translateX: isOn ? thumbOffset : 0 }],
              },
            ]}
          />
        </Pressable>
        {children}
      </View>
    );
  },
);

Switch.displayName = 'Switch';

const switchTokens = {
  padding: 2,
  offTrack: 'rgba(15, 23, 42, 0.12)',
  offTrackBorder: 'rgba(15, 23, 42, 0.16)',
  onTrack: '#0f9f8f',
  thumb: '#ffffff',
};

const styles = StyleSheet.create({
  track: {
    borderWidth: 1,
    justifyContent: 'center',
    padding: switchTokens.padding,
  },
  thumb: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
});

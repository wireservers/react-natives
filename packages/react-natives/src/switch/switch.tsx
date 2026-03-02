import React, { useState } from 'react';
import { View, Switch as RNSwitch } from 'react-native';
import { useFormControlContext } from '../form-control/form-control';
import type { SwitchProps } from './types';
import { switchContainerStyle } from './styles';

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

    const defaultTrackColor = {
      false: 'rgb(var(--color-background-300))',
      true: 'rgb(var(--color-primary-500))',
    };

    const defaultThumbColor = 'rgb(var(--color-background-0))';

    return (
      <View
        ref={ref}
        className={switchContainerStyle({ isDisabled, class: className })}
        {...props}
      >
        <RNSwitch
          value={isOn}
          onValueChange={handleToggle}
          disabled={isDisabled}
          trackColor={trackColorProp ?? defaultTrackColor}
          thumbColor={thumbColorProp ?? defaultThumbColor}
        />
        {children}
      </View>
    );
  },
);

Switch.displayName = 'Switch';

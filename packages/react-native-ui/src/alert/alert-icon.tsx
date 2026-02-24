import React from 'react';
import { Text } from 'react-native';
import { useAlertContext } from './alert';
import type { AlertIconProps } from './types';
import { alertIconStyle } from './styles';

const defaultIcons: Record<string, string> = {
  info: 'ℹ',
  success: '✓',
  warning: '⚠',
  error: '✕',
};

export const AlertIcon = React.forwardRef<any, AlertIconProps>(
  ({ as: AsComp, className, ...props }, ref) => {
    const { status, variant } = useAlertContext();

    if (AsComp) {
      return (
        <AsComp
          ref={ref}
          className={alertIconStyle({ status, variant, class: className })}
          {...props}
        />
      );
    }

    return (
      <Text
        ref={ref}
        className={alertIconStyle({ status, variant, class: className })}
        {...props}
      >
        {defaultIcons[status]}
      </Text>
    );
  },
);

AlertIcon.displayName = 'AlertIcon';

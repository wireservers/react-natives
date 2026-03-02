import React from 'react';
import { Text } from 'react-native';
import { useSelectContext } from './select';
import type { SelectIconProps } from './types';
import { selectIconStyle } from './styles';

export const SelectIcon = React.forwardRef<any, SelectIconProps>(
  ({ as: AsComp, className, ...props }, ref) => {
    const { size } = useSelectContext();

    const style = selectIconStyle({ size, class: className });

    if (AsComp) {
      return <AsComp ref={ref} className={style} {...props} />;
    }

    return (
      <Text ref={ref} className={style} {...props}>
        {'\u25BC'}
      </Text>
    );
  },
);

SelectIcon.displayName = 'SelectIcon';

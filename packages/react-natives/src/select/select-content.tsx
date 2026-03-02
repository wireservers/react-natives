import React from 'react';
import { View, ScrollView, useWindowDimensions } from 'react-native';
import { useSelectContext } from './select';
import type { SelectContentProps } from './types';
import { selectContentStyle } from './styles';

export const SelectContent = React.forwardRef<
  React.ElementRef<typeof View>,
  SelectContentProps
>(({ className, children, ...props }, ref) => {
  const { triggerLayout } = useSelectContext();
  const { height: windowHeight } = useWindowDimensions();

  if (!triggerLayout) {
    return null;
  }

  const triggerBottom = triggerLayout.pageY + triggerLayout.height;
  const spaceBelow = windowHeight - triggerBottom - 16;
  const maxDropdownHeight = Math.min(300, Math.max(spaceBelow, 120));

  return (
    <View
      style={{
        position: 'absolute',
        top: triggerBottom + 4,
        left: triggerLayout.pageX,
        width: triggerLayout.width,
        maxHeight: maxDropdownHeight,
      }}
    >
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator
        style={{ maxHeight: maxDropdownHeight }}
      >
        <View
          ref={ref}
          className={selectContentStyle({ class: className })}
          {...props}
        >
          {children}
        </View>
      </ScrollView>
    </View>
  );
});

SelectContent.displayName = 'SelectContent';

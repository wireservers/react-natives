import React from 'react';
import { View } from 'react-native';
import { useAccordionContext } from './accordion';
import { useAccordionItemContext } from './accordion-item';
import type { AccordionIconProps } from './types';
import { accordionIconStyle } from './styles';

export const AccordionIcon = React.forwardRef<
  React.ElementRef<typeof View>,
  AccordionIconProps
>(({ className, ...props }, ref) => {
  const { size } = useAccordionContext();
  const { isExpanded } = useAccordionItemContext();

  return (
    <View
      ref={ref}
      className={accordionIconStyle({ size, class: className })}
      style={{
        transform: [{ rotate: isExpanded ? '180deg' : '0deg' }],
      }}
      {...props}
    >
      {/* Chevron down SVG path rendered as a simple text fallback */}
      <ChevronDownIcon />
    </View>
  );
});

AccordionIcon.displayName = 'AccordionIcon';

/**
 * Simple chevron-down icon component.
 * Uses a unicode character as a lightweight cross-platform solution.
 * Can be replaced with a proper SVG icon library.
 */
function ChevronDownIcon() {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
      {/* Using a View-based approach for the chevron */}
      <View
        style={{
          width: 10,
          height: 10,
          borderRightWidth: 2,
          borderBottomWidth: 2,
          borderColor: '#737373',
          transform: [{ rotate: '45deg' }],
          marginTop: -3,
        }}
      />
    </View>
  );
}

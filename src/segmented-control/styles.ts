import { tv } from 'tailwind-variants';

export const segmentedControlStyle = tv({
  base: 'flex-row bg-background-100 rounded-lg p-1',
  variants: {},
});
export const segmentedControlItemStyle = tv({
  base: 'flex-1 items-center justify-center rounded-md',
  variants: {
    size: { sm: 'py-1 px-2', md: 'py-1.5 px-3', lg: 'py-2 px-4' },
    isSelected: { true: 'bg-background-0 shadow-soft-1', false: '' },
  },
  defaultVariants: { size: 'md', isSelected: false },
});
export const segmentedControlItemTextStyle = tv({
  base: 'font-medium',
  variants: {
    size: { sm: 'text-xs', md: 'text-sm', lg: 'text-base' },
    isSelected: { true: 'text-typography-900', false: 'text-typography-500' },
  },
  defaultVariants: { size: 'md', isSelected: false },
});

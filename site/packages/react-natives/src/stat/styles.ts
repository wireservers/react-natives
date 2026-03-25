import { tv } from 'tailwind-variants';

export const statStyle = tv({
  base: 'gap-0.5',
  variants: {},
});

export const statLabelStyle = tv({
  base: 'text-xs font-medium text-typography-500',
  variants: {},
});

export const statNumberStyle = tv({
  base: 'text-2xl font-bold text-typography-900',
  variants: {},
});

export const statHelpTextStyle = tv({
  base: 'text-xs text-typography-500 flex-row items-center gap-1',
  variants: {},
});

export const statArrowStyle = tv({
  base: 'text-xs',
  variants: {
    type: {
      increase: 'text-success-600',
      decrease: 'text-error-600',
    },
  },
  defaultVariants: {
    type: 'increase',
  },
});

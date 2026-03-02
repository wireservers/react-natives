import { tv } from 'tailwind-variants';

export const switchContainerStyle = tv({
  base: 'flex-row items-center gap-2',
  variants: {
    isDisabled: {
      true: 'opacity-40',
    },
  },
});

export const switchLabelStyle = tv({
  base: 'text-typography-900',
  variants: {
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

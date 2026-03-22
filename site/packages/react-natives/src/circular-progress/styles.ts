import { tv } from 'tailwind-variants';

export const circularProgressStyle = tv({
  base: 'items-center justify-center',
  variants: {
    size: {
      sm: 'h-8 w-8',
      md: 'h-12 w-12',
      lg: 'h-16 w-16',
      xl: 'h-24 w-24',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const circularProgressLabelStyle = tv({
  base: 'absolute font-semibold text-typography-700',
  variants: {
    size: {
      sm: 'text-2xs',
      md: 'text-xs',
      lg: 'text-sm',
      xl: 'text-lg',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

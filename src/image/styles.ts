import { tv } from 'tailwind-variants';

export const imageStyle = tv({
  base: 'overflow-hidden',
  variants: {
    size: {
      'xs': 'h-6 w-6',
      'sm': 'h-8 w-8',
      'md': 'h-12 w-12',
      'lg': 'h-16 w-16',
      'xl': 'h-24 w-24',
      '2xl': 'h-32 w-32',
      'full': 'w-full',
    },
    borderRadius: {
      none: 'rounded-none',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
      full: 'rounded-full',
    },
  },
  defaultVariants: {
    size: 'md',
    borderRadius: 'none',
  },
});

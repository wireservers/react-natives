import { tv } from 'tailwind-variants';

export const headingStyle = tv({
  base: 'text-typography-900 font-bold',
  variants: {
    size: {
      'xs': 'text-xs',
      'sm': 'text-sm',
      'md': 'text-base',
      'lg': 'text-lg',
      'xl': 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
      '4xl': 'text-4xl',
      '5xl': 'text-5xl',
    },
    isTruncated: {
      true: 'truncate',
    },
  },
  defaultVariants: {
    size: 'lg',
  },
});

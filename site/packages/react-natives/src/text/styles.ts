import { tv } from 'tailwind-variants';

export const textStyle = tv({
  base: 'text-typography-900 font-normal',
  variants: {
    size: {
      '2xs': 'text-2xs',
      'xs': 'text-xs',
      'sm': 'text-sm',
      'md': 'text-base',
      'lg': 'text-lg',
      'xl': 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
      '4xl': 'text-4xl',
      '5xl': 'text-5xl',
      '6xl': 'text-6xl',
    },
    weight: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
      extrabold: 'font-extrabold',
    },
    isTruncated: {
      true: 'truncate',
    },
    bold: {
      true: 'font-bold',
    },
    italic: {
      true: 'italic',
    },
    underline: {
      true: 'underline',
    },
    strikeThrough: {
      true: 'line-through',
    },
    highlight: {
      true: 'bg-warning-100',
    },
    sub: {
      true: 'text-xs',
    },
    sup: {
      true: 'text-xs',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

import { tv } from 'tailwind-variants';

export const cardStyle = tv({
  base: 'rounded-xl overflow-hidden',
  variants: {
    variant: {
      elevated: 'bg-background-0 shadow-hard-2',
      outline: 'bg-background-0 border border-outline-200',
      ghost: 'bg-transparent',
      filled: 'bg-background-50',
    },
    size: {
      sm: 'p-3',
      md: 'p-5',
      lg: 'p-6',
    },
  },
  defaultVariants: {
    variant: 'elevated',
    size: 'md',
  },
});

export const cardHeaderStyle = tv({
  base: 'flex-row items-center justify-between',
  variants: {
    size: {
      sm: 'mb-2',
      md: 'mb-3',
      lg: 'mb-4',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const cardBodyStyle = tv({
  base: '',
  variants: {
    size: {
      sm: 'mb-2',
      md: 'mb-3',
      lg: 'mb-4',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const cardFooterStyle = tv({
  base: 'flex-row items-center justify-end',
});

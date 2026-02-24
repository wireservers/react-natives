import { tv } from 'tailwind-variants';

export const accordionStyle = tv({
  base: 'w-full',
});

export const accordionItemStyle = tv({
  base: 'border-b border-outline-200',
  variants: {
    variant: {
      filled: 'bg-background-50 rounded-lg mb-2 border-0 overflow-hidden',
      unfilled: '',
    },
  },
  defaultVariants: {
    variant: 'unfilled',
  },
});

export const accordionTriggerStyle = tv({
  base: 'flex-row items-center justify-between w-full active:bg-background-100',
  variants: {
    size: {
      sm: 'px-3 py-2',
      md: 'px-4 py-3',
      lg: 'px-5 py-4',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const accordionTitleTextStyle = tv({
  base: 'text-typography-900 font-medium flex-1',
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

export const accordionIconStyle = tv({
  base: 'text-typography-500',
  variants: {
    size: {
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-5 w-5',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const accordionContentStyle = tv({
  base: 'overflow-hidden',
  variants: {
    size: {
      sm: 'px-3 pb-2',
      md: 'px-4 pb-3',
      lg: 'px-5 pb-4',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

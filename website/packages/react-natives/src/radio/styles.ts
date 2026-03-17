import { tv } from 'tailwind-variants';

export const radioGroupStyle = tv({
  base: 'gap-2',
});

export const radioStyle = tv({
  base: 'flex-row items-center gap-2',
});

export const radioIndicatorStyle = tv({
  base: 'border-2 border-outline-400 rounded-full items-center justify-center',
  variants: {
    size: {
      xs: 'h-4 w-4',
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-6 w-6',
      xl: 'h-6 w-6',
    },
    isSelected: {
      true: 'border-primary-500',
    },
    isInvalid: {
      true: 'border-error-500',
    },
    isDisabled: {
      true: 'opacity-40',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const radioIconStyle = tv({
  base: 'rounded-full bg-primary-500',
  variants: {
    size: {
      xs: 'h-1.5 w-1.5',
      sm: 'h-1.5 w-1.5',
      md: 'h-2 w-2',
      lg: 'h-2.5 w-2.5',
      xl: 'h-2.5 w-2.5',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const radioLabelStyle = tv({
  base: 'text-typography-900',
  variants: {
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
    },
    isDisabled: {
      true: 'opacity-40',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

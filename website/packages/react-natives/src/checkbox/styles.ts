import { tv } from 'tailwind-variants';

export const checkboxGroupStyle = tv({
  base: 'gap-2',
});

export const checkboxStyle = tv({
  base: 'flex-row items-center gap-2',
});

export const checkboxIndicatorStyle = tv({
  base: 'border-2 border-outline-400 rounded items-center justify-center',
  variants: {
    size: {
      xs: 'h-4 w-4',
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-6 w-6',
      xl: 'h-6 w-6',
    },
    isChecked: {
      true: 'bg-primary-500 border-primary-500',
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

export const checkboxIconStyle = tv({
  base: 'text-typography-0',
  variants: {
    size: {
      xs: 'h-3 w-3',
      sm: 'h-3 w-3',
      md: 'h-3.5 w-3.5',
      lg: 'h-4 w-4',
      xl: 'h-4 w-4',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const checkboxLabelStyle = tv({
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

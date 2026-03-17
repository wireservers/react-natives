import { tv } from 'tailwind-variants';

export const formControlStyle = tv({
  base: 'w-full',
  variants: {
    size: {
      xs: 'gap-0.5',
      sm: 'gap-1',
      md: 'gap-1',
      lg: 'gap-1.5',
      xl: 'gap-2',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const formControlLabelStyle = tv({
  base: 'flex-row items-center',
});

export const formControlLabelTextStyle = tv({
  base: 'text-typography-700 font-medium',
  variants: {
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-sm',
      lg: 'text-base',
      xl: 'text-lg',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const formControlHelperTextStyle = tv({
  base: 'text-typography-500',
  variants: {
    size: {
      xs: 'text-2xs',
      sm: 'text-xs',
      md: 'text-xs',
      lg: 'text-sm',
      xl: 'text-base',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const formControlErrorMessageStyle = tv({
  base: 'flex-row items-center gap-1',
});

export const formControlErrorMessageTextStyle = tv({
  base: 'text-error-600',
  variants: {
    size: {
      xs: 'text-2xs',
      sm: 'text-xs',
      md: 'text-xs',
      lg: 'text-sm',
      xl: 'text-base',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const formControlErrorIconStyle = tv({
  base: 'text-error-600',
  variants: {
    size: {
      xs: 'h-3 w-3',
      sm: 'h-3.5 w-3.5',
      md: 'h-4 w-4',
      lg: 'h-4 w-4',
      xl: 'h-5 w-5',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const formControlRequiredIndicatorStyle = tv({
  base: 'text-error-500 font-medium ml-0.5',
  variants: {
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-sm',
      lg: 'text-base',
      xl: 'text-lg',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

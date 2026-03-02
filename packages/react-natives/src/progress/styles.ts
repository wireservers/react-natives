import { tv } from 'tailwind-variants';

export const progressStyle = tv({
  base: 'w-full bg-background-200 rounded-full overflow-hidden',
  variants: {
    size: {
      xs: 'h-1',
      sm: 'h-1.5',
      md: 'h-2',
      lg: 'h-3',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const progressFilledTrackStyle = tv({
  base: 'h-full rounded-full',
  variants: {
    colorScheme: {
      primary: 'bg-primary-500',
      secondary: 'bg-secondary-500',
      tertiary: 'bg-tertiary-500',
      error: 'bg-error-500',
      success: 'bg-success-500',
      warning: 'bg-warning-500',
      info: 'bg-info-500',
    },
  },
  defaultVariants: {
    colorScheme: 'primary',
  },
});

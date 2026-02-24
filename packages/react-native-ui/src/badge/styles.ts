import { tv } from 'tailwind-variants';

export const badgeStyle = tv({
  base: 'flex-row items-center rounded-full',
  variants: {
    action: {
      primary: '',
      secondary: '',
      error: '',
      success: '',
      warning: '',
      info: '',
      muted: '',
    },
    variant: {
      solid: '',
      outline: 'bg-transparent border',
      subtle: '',
    },
    size: {
      sm: 'px-2 py-0.5',
      md: 'px-2.5 py-0.5',
      lg: 'px-3 py-1',
    },
  },
  compoundVariants: [
    // solid backgrounds
    { action: 'primary', variant: 'solid', class: 'bg-primary-500' },
    { action: 'secondary', variant: 'solid', class: 'bg-secondary-500' },
    { action: 'error', variant: 'solid', class: 'bg-error-500' },
    { action: 'success', variant: 'solid', class: 'bg-success-500' },
    { action: 'warning', variant: 'solid', class: 'bg-warning-500' },
    { action: 'info', variant: 'solid', class: 'bg-info-500' },
    { action: 'muted', variant: 'solid', class: 'bg-background-300' },

    // outline borders
    { action: 'primary', variant: 'outline', class: 'border-primary-500' },
    { action: 'secondary', variant: 'outline', class: 'border-secondary-500' },
    { action: 'error', variant: 'outline', class: 'border-error-500' },
    { action: 'success', variant: 'outline', class: 'border-success-500' },
    { action: 'warning', variant: 'outline', class: 'border-warning-500' },
    { action: 'info', variant: 'outline', class: 'border-info-500' },
    { action: 'muted', variant: 'outline', class: 'border-outline-300' },

    // subtle backgrounds
    { action: 'primary', variant: 'subtle', class: 'bg-primary-100' },
    { action: 'secondary', variant: 'subtle', class: 'bg-secondary-100' },
    { action: 'error', variant: 'subtle', class: 'bg-error-100' },
    { action: 'success', variant: 'subtle', class: 'bg-success-100' },
    { action: 'warning', variant: 'subtle', class: 'bg-warning-100' },
    { action: 'info', variant: 'subtle', class: 'bg-info-100' },
    { action: 'muted', variant: 'subtle', class: 'bg-background-100' },
  ],
  defaultVariants: {
    action: 'info',
    variant: 'subtle',
    size: 'md',
  },
});

export const badgeTextStyle = tv({
  base: 'font-medium',
  variants: {
    action: {
      primary: '',
      secondary: '',
      error: '',
      success: '',
      warning: '',
      info: '',
      muted: '',
    },
    variant: {
      solid: '',
      outline: '',
      subtle: '',
    },
    size: {
      sm: 'text-2xs',
      md: 'text-xs',
      lg: 'text-sm',
    },
  },
  compoundVariants: [
    // solid text colors (white on colored bg)
    { action: 'primary', variant: 'solid', class: 'text-typography-0' },
    { action: 'secondary', variant: 'solid', class: 'text-typography-0' },
    { action: 'error', variant: 'solid', class: 'text-typography-0' },
    { action: 'success', variant: 'solid', class: 'text-typography-0' },
    { action: 'warning', variant: 'solid', class: 'text-typography-0' },
    { action: 'info', variant: 'solid', class: 'text-typography-0' },
    { action: 'muted', variant: 'solid', class: 'text-typography-900' },

    // outline text colors
    { action: 'primary', variant: 'outline', class: 'text-primary-600' },
    { action: 'secondary', variant: 'outline', class: 'text-secondary-600' },
    { action: 'error', variant: 'outline', class: 'text-error-600' },
    { action: 'success', variant: 'outline', class: 'text-success-600' },
    { action: 'warning', variant: 'outline', class: 'text-warning-600' },
    { action: 'info', variant: 'outline', class: 'text-info-600' },
    { action: 'muted', variant: 'outline', class: 'text-typography-700' },

    // subtle text colors
    { action: 'primary', variant: 'subtle', class: 'text-primary-800' },
    { action: 'secondary', variant: 'subtle', class: 'text-secondary-800' },
    { action: 'error', variant: 'subtle', class: 'text-error-800' },
    { action: 'success', variant: 'subtle', class: 'text-success-800' },
    { action: 'warning', variant: 'subtle', class: 'text-warning-800' },
    { action: 'info', variant: 'subtle', class: 'text-info-800' },
    { action: 'muted', variant: 'subtle', class: 'text-typography-700' },
  ],
  defaultVariants: {
    action: 'info',
    variant: 'subtle',
    size: 'md',
  },
});

export const badgeIconStyle = tv({
  base: 'mr-1',
  variants: {
    action: {
      primary: '',
      secondary: '',
      error: '',
      success: '',
      warning: '',
      info: '',
      muted: '',
    },
    variant: {
      solid: '',
      outline: '',
      subtle: '',
    },
    size: {
      sm: 'h-3 w-3',
      md: 'h-3.5 w-3.5',
      lg: 'h-4 w-4',
    },
  },
  compoundVariants: [
    // solid icon colors (white on colored bg)
    { action: 'primary', variant: 'solid', class: 'text-typography-0' },
    { action: 'secondary', variant: 'solid', class: 'text-typography-0' },
    { action: 'error', variant: 'solid', class: 'text-typography-0' },
    { action: 'success', variant: 'solid', class: 'text-typography-0' },
    { action: 'warning', variant: 'solid', class: 'text-typography-0' },
    { action: 'info', variant: 'solid', class: 'text-typography-0' },
    { action: 'muted', variant: 'solid', class: 'text-typography-900' },

    // outline icon colors
    { action: 'primary', variant: 'outline', class: 'text-primary-600' },
    { action: 'secondary', variant: 'outline', class: 'text-secondary-600' },
    { action: 'error', variant: 'outline', class: 'text-error-600' },
    { action: 'success', variant: 'outline', class: 'text-success-600' },
    { action: 'warning', variant: 'outline', class: 'text-warning-600' },
    { action: 'info', variant: 'outline', class: 'text-info-600' },
    { action: 'muted', variant: 'outline', class: 'text-typography-700' },

    // subtle icon colors
    { action: 'primary', variant: 'subtle', class: 'text-primary-800' },
    { action: 'secondary', variant: 'subtle', class: 'text-secondary-800' },
    { action: 'error', variant: 'subtle', class: 'text-error-800' },
    { action: 'success', variant: 'subtle', class: 'text-success-800' },
    { action: 'warning', variant: 'subtle', class: 'text-warning-800' },
    { action: 'info', variant: 'subtle', class: 'text-info-800' },
    { action: 'muted', variant: 'subtle', class: 'text-typography-700' },
  ],
  defaultVariants: {
    action: 'info',
    variant: 'subtle',
    size: 'md',
  },
});

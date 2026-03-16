import { tv } from 'tailwind-variants';

export const tagStyle = tv({
  base: 'flex-row items-center rounded-full',
  variants: {
    action: {
      primary: '', secondary: '', error: '', success: '', warning: '', info: '', muted: '',
    },
    variant: {
      solid: '', outline: 'bg-transparent border', subtle: '',
    },
    size: {
      sm: 'px-2 py-0.5 gap-1',
      md: 'px-2.5 py-1 gap-1.5',
      lg: 'px-3 py-1.5 gap-2',
    },
    isDisabled: {
      true: 'opacity-50',
    },
  },
  compoundVariants: [
    { action: 'primary', variant: 'solid', class: 'bg-primary-500' },
    { action: 'primary', variant: 'outline', class: 'border-primary-300 bg-transparent' },
    { action: 'primary', variant: 'subtle', class: 'bg-primary-50' },
    { action: 'secondary', variant: 'solid', class: 'bg-secondary-500' },
    { action: 'secondary', variant: 'outline', class: 'border-secondary-300 bg-transparent' },
    { action: 'secondary', variant: 'subtle', class: 'bg-secondary-50' },
    { action: 'error', variant: 'solid', class: 'bg-error-500' },
    { action: 'error', variant: 'outline', class: 'border-error-300 bg-transparent' },
    { action: 'error', variant: 'subtle', class: 'bg-error-50' },
    { action: 'success', variant: 'solid', class: 'bg-success-500' },
    { action: 'success', variant: 'outline', class: 'border-success-300 bg-transparent' },
    { action: 'success', variant: 'subtle', class: 'bg-success-50' },
    { action: 'warning', variant: 'solid', class: 'bg-warning-500' },
    { action: 'warning', variant: 'outline', class: 'border-warning-300 bg-transparent' },
    { action: 'warning', variant: 'subtle', class: 'bg-warning-50' },
    { action: 'info', variant: 'solid', class: 'bg-info-500' },
    { action: 'info', variant: 'outline', class: 'border-info-300 bg-transparent' },
    { action: 'info', variant: 'subtle', class: 'bg-info-50' },
    { action: 'muted', variant: 'solid', class: 'bg-background-300' },
    { action: 'muted', variant: 'outline', class: 'border-outline-300 bg-transparent' },
    { action: 'muted', variant: 'subtle', class: 'bg-background-50' },
  ],
  defaultVariants: {
    action: 'info',
    variant: 'subtle',
    size: 'md',
  },
});

export const tagTextStyle = tv({
  base: 'font-medium',
  variants: {
    action: {
      primary: '', secondary: '', error: '', success: '', warning: '', info: '', muted: '',
    },
    variant: {
      solid: 'text-typography-0', outline: '', subtle: '',
    },
    size: {
      sm: 'text-2xs',
      md: 'text-xs',
      lg: 'text-sm',
    },
  },
  compoundVariants: [
    { action: 'primary', variant: 'outline', class: 'text-primary-600' },
    { action: 'primary', variant: 'subtle', class: 'text-primary-700' },
    { action: 'secondary', variant: 'outline', class: 'text-secondary-600' },
    { action: 'secondary', variant: 'subtle', class: 'text-secondary-700' },
    { action: 'error', variant: 'outline', class: 'text-error-600' },
    { action: 'error', variant: 'subtle', class: 'text-error-700' },
    { action: 'success', variant: 'outline', class: 'text-success-600' },
    { action: 'success', variant: 'subtle', class: 'text-success-700' },
    { action: 'warning', variant: 'outline', class: 'text-warning-600' },
    { action: 'warning', variant: 'subtle', class: 'text-warning-700' },
    { action: 'info', variant: 'outline', class: 'text-info-600' },
    { action: 'info', variant: 'subtle', class: 'text-info-700' },
    { action: 'muted', variant: 'outline', class: 'text-typography-600' },
    { action: 'muted', variant: 'subtle', class: 'text-typography-700' },
  ],
  defaultVariants: {
    action: 'info',
    variant: 'subtle',
    size: 'md',
  },
});

export const tagIconStyle = tv({
  base: '',
  variants: {
    size: {
      sm: 'h-3 w-3',
      md: 'h-3.5 w-3.5',
      lg: 'h-4 w-4',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const tagCloseButtonStyle = tv({
  base: 'rounded-full items-center justify-center',
  variants: {
    size: {
      sm: 'h-3.5 w-3.5',
      md: 'h-4 w-4',
      lg: 'h-5 w-5',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

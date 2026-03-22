import { tv } from 'tailwind-variants';

export const iconButtonStyle = tv({
  base: 'items-center justify-center rounded-lg',
  variants: {
    action: {
      primary: '', secondary: '', positive: '', negative: '', default: '',
    },
    variant: {
      solid: '', outline: 'bg-transparent border', ghost: 'bg-transparent',
    },
    size: {
      xs: 'h-7 w-7',
      sm: 'h-8 w-8',
      md: 'h-10 w-10',
      lg: 'h-12 w-12',
      xl: 'h-14 w-14',
    },
    isDisabled: {
      true: 'opacity-50',
    },
  },
  compoundVariants: [
    { action: 'primary', variant: 'solid', class: 'bg-primary-500' },
    { action: 'primary', variant: 'outline', class: 'border-primary-300' },
    { action: 'secondary', variant: 'solid', class: 'bg-secondary-500' },
    { action: 'secondary', variant: 'outline', class: 'border-secondary-300' },
    { action: 'positive', variant: 'solid', class: 'bg-success-500' },
    { action: 'positive', variant: 'outline', class: 'border-success-300' },
    { action: 'negative', variant: 'solid', class: 'bg-error-500' },
    { action: 'negative', variant: 'outline', class: 'border-error-300' },
    { action: 'default', variant: 'solid', class: 'bg-background-200' },
    { action: 'default', variant: 'outline', class: 'border-outline-300' },
  ],
  defaultVariants: {
    action: 'primary',
    variant: 'solid',
    size: 'md',
  },
});

export const iconButtonIconStyle = tv({
  base: '',
  variants: {
    action: {
      primary: '', secondary: '', positive: '', negative: '', default: '',
    },
    variant: {
      solid: 'text-typography-0',
      outline: '',
      ghost: '',
    },
    size: {
      xs: 'h-3.5 w-3.5',
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-6 w-6',
      xl: 'h-7 w-7',
    },
  },
  compoundVariants: [
    { action: 'primary', variant: 'outline', class: 'text-primary-500' },
    { action: 'primary', variant: 'ghost', class: 'text-primary-500' },
    { action: 'secondary', variant: 'outline', class: 'text-secondary-500' },
    { action: 'secondary', variant: 'ghost', class: 'text-secondary-500' },
    { action: 'positive', variant: 'outline', class: 'text-success-500' },
    { action: 'positive', variant: 'ghost', class: 'text-success-500' },
    { action: 'negative', variant: 'outline', class: 'text-error-500' },
    { action: 'negative', variant: 'ghost', class: 'text-error-500' },
    { action: 'default', variant: 'outline', class: 'text-typography-700' },
    { action: 'default', variant: 'ghost', class: 'text-typography-700' },
  ],
  defaultVariants: {
    action: 'primary',
    variant: 'solid',
    size: 'md',
  },
});

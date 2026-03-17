import { tv } from 'tailwind-variants';

export const alertStyle = tv({
  base: 'flex-row items-start rounded-lg px-4 py-3 gap-3',
  variants: {
    status: {
      info: '',
      success: '',
      warning: '',
      error: '',
    },
    variant: {
      solid: '',
      subtle: '',
      outline: 'bg-transparent border',
    },
  },
  compoundVariants: [
    // solid
    { status: 'info', variant: 'solid', class: 'bg-info-500' },
    { status: 'success', variant: 'solid', class: 'bg-success-500' },
    { status: 'warning', variant: 'solid', class: 'bg-warning-500' },
    { status: 'error', variant: 'solid', class: 'bg-error-500' },
    // subtle
    { status: 'info', variant: 'subtle', class: 'bg-info-50' },
    { status: 'success', variant: 'subtle', class: 'bg-success-50' },
    { status: 'warning', variant: 'subtle', class: 'bg-warning-50' },
    { status: 'error', variant: 'subtle', class: 'bg-error-50' },
    // outline
    { status: 'info', variant: 'outline', class: 'border-info-500' },
    { status: 'success', variant: 'outline', class: 'border-success-500' },
    { status: 'warning', variant: 'outline', class: 'border-warning-500' },
    { status: 'error', variant: 'outline', class: 'border-error-500' },
  ],
  defaultVariants: {
    status: 'info',
    variant: 'subtle',
  },
});

export const alertIconStyle = tv({
  base: 'h-5 w-5 mt-0.5',
  variants: {
    status: {
      info: '',
      success: '',
      warning: '',
      error: '',
    },
    variant: {
      solid: 'text-typography-0',
      subtle: '',
      outline: '',
    },
  },
  compoundVariants: [
    { status: 'info', variant: 'subtle', class: 'text-info-600' },
    { status: 'success', variant: 'subtle', class: 'text-success-600' },
    { status: 'warning', variant: 'subtle', class: 'text-warning-600' },
    { status: 'error', variant: 'subtle', class: 'text-error-600' },
    { status: 'info', variant: 'outline', class: 'text-info-600' },
    { status: 'success', variant: 'outline', class: 'text-success-600' },
    { status: 'warning', variant: 'outline', class: 'text-warning-600' },
    { status: 'error', variant: 'outline', class: 'text-error-600' },
  ],
  defaultVariants: {
    status: 'info',
    variant: 'subtle',
  },
});

export const alertBodyStyle = tv({
  base: 'flex-1 gap-1',
});

export const alertTextStyle = tv({
  base: 'text-sm',
  variants: {
    status: {
      info: '',
      success: '',
      warning: '',
      error: '',
    },
    variant: {
      solid: 'text-typography-0',
      subtle: '',
      outline: '',
    },
    isBold: {
      true: 'font-semibold',
    },
  },
  compoundVariants: [
    { status: 'info', variant: 'subtle', class: 'text-info-900' },
    { status: 'success', variant: 'subtle', class: 'text-success-900' },
    { status: 'warning', variant: 'subtle', class: 'text-warning-900' },
    { status: 'error', variant: 'subtle', class: 'text-error-900' },
    { status: 'info', variant: 'outline', class: 'text-info-900' },
    { status: 'success', variant: 'outline', class: 'text-success-900' },
    { status: 'warning', variant: 'outline', class: 'text-warning-900' },
    { status: 'error', variant: 'outline', class: 'text-error-900' },
  ],
  defaultVariants: {
    status: 'info',
    variant: 'subtle',
  },
});

export const alertCloseButtonStyle = tv({
  base: 'p-1 rounded active:opacity-70',
});

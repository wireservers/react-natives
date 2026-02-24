import { tv } from 'tailwind-variants';

export const toastContainerStyle = tv({
  base: 'absolute w-full pointer-events-box-none p-4',
  variants: {
    placement: {
      top: 'top-0 items-center',
      'top-right': 'top-0 right-0 items-end',
      'top-left': 'top-0 left-0 items-start',
      bottom: 'bottom-0 items-center',
      'bottom-right': 'bottom-0 right-0 items-end',
      'bottom-left': 'bottom-0 left-0 items-start',
    },
  },
  defaultVariants: {
    placement: 'top',
  },
});

export const toastStyle = tv({
  base: 'flex-row items-center rounded-lg px-4 py-3 gap-3 shadow-hard-3 mx-4 mb-2',
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

export const toastTitleStyle = tv({
  base: 'font-semibold text-sm',
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

export const toastDescriptionStyle = tv({
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
  },
  compoundVariants: [
    { status: 'info', variant: 'subtle', class: 'text-info-800' },
    { status: 'success', variant: 'subtle', class: 'text-success-800' },
    { status: 'warning', variant: 'subtle', class: 'text-warning-800' },
    { status: 'error', variant: 'subtle', class: 'text-error-800' },
    { status: 'info', variant: 'outline', class: 'text-info-800' },
    { status: 'success', variant: 'outline', class: 'text-success-800' },
    { status: 'warning', variant: 'outline', class: 'text-warning-800' },
    { status: 'error', variant: 'outline', class: 'text-error-800' },
  ],
  defaultVariants: {
    status: 'info',
    variant: 'subtle',
  },
});

import { tv } from 'tailwind-variants';

export const snackbarStyle = tv({
  base: 'flex-row items-center justify-between rounded-lg px-4 py-3 shadow-hard-5',
  variants: {
    action: {
      info: 'bg-background-800',
      success: 'bg-success-700',
      warning: 'bg-warning-700',
      error: 'bg-error-700',
    },
  },
  defaultVariants: { action: 'info' },
});

export const snackbarTextStyle = tv({
  base: 'text-sm text-typography-0 flex-1 mr-3',
  variants: {},
});

export const snackbarActionButtonStyle = tv({
  base: 'px-2 py-1 rounded',
  variants: {},
});

export const snackbarActionButtonTextStyle = tv({
  base: 'text-sm font-semibold text-primary-200',
  variants: {},
});

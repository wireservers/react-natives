import { tv } from 'tailwind-variants';

export const alertDialogContentStyle = tv({
  base: 'bg-background-0 rounded-xl p-6 shadow-hard-2 w-full',
  variants: {
    size: {
      xs: 'max-w-[280px]',
      sm: 'max-w-[320px]',
      md: 'max-w-[400px]',
      lg: 'max-w-[520px]',
      full: 'max-w-full mx-4',
    },
  },
  defaultVariants: { size: 'md' },
});

export const alertDialogBackdropStyle = tv({
  base: 'absolute inset-0 bg-black/50',
  variants: {},
});

export const alertDialogHeaderStyle = tv({
  base: 'flex-row items-center justify-between mb-2',
  variants: {},
});

export const alertDialogBodyStyle = tv({
  base: 'mb-4',
  variants: {},
});

export const alertDialogFooterStyle = tv({
  base: 'flex-row justify-end gap-3',
  variants: {},
});

export const alertDialogCloseButtonStyle = tv({
  base: 'p-1 rounded',
  variants: {},
});

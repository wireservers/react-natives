import { tv } from 'tailwind-variants';

export const modalBackdropStyle = tv({
  base: 'absolute inset-0 bg-black/50',
});

export const modalContentStyle = tv({
  base: 'bg-background-0 rounded-xl overflow-hidden shadow-hard-5',
  variants: {
    size: {
      xs: 'w-[60%] max-w-[280px]',
      sm: 'w-[70%] max-w-[360px]',
      md: 'w-[80%] max-w-[480px]',
      lg: 'w-[90%] max-w-[640px]',
      full: 'w-[95%] max-w-full max-h-[90%]',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const modalHeaderStyle = tv({
  base: 'flex-row items-center justify-between px-5 pt-5 pb-2',
});

export const modalBodyStyle = tv({
  base: 'px-5 py-3',
});

export const modalFooterStyle = tv({
  base: 'flex-row items-center justify-end gap-3 px-5 pb-5 pt-2',
});

export const modalCloseButtonStyle = tv({
  base: 'p-1 rounded-md active:bg-background-200',
});

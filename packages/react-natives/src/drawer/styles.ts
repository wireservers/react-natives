import { tv } from 'tailwind-variants';

export const drawerBackdropStyle = tv({
  base: 'absolute inset-0 bg-black/50',
});

export const drawerContentStyle = tv({
  base: 'bg-background-0 absolute',
  variants: {
    placement: {
      left: 'left-0 top-0 bottom-0',
      right: 'right-0 top-0 bottom-0',
      top: 'left-0 right-0 top-0',
      bottom: 'left-0 right-0 bottom-0',
    },
  },
  defaultVariants: {
    placement: 'left',
  },
});

export const drawerHeaderStyle = tv({
  base: 'flex-row items-center justify-between px-5 pt-5 pb-2',
});

export const drawerBodyStyle = tv({
  base: 'px-5 py-3 flex-1',
});

export const drawerFooterStyle = tv({
  base: 'flex-row items-center justify-end gap-3 px-5 pb-5 pt-2',
});

export const drawerCloseButtonStyle = tv({
  base: 'p-1 rounded-md active:bg-background-200',
});

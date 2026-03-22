import { tv } from 'tailwind-variants';

export const menuContentStyle = tv({ base: 'bg-background-0 rounded-lg py-1 shadow-hard-2 border border-outline-100 min-w-[180px]', variants: {} });
export const menuItemStyle = tv({
  base: 'flex-row items-center px-3 py-2.5 gap-2',
  variants: {
    isDisabled: { true: 'opacity-50' },
  },
});
export const menuItemTextStyle = tv({ base: 'text-sm text-typography-700 flex-1', variants: {} });
export const menuItemIconStyle = tv({ base: 'h-4 w-4 text-typography-500', variants: {} });
export const menuSeparatorStyle = tv({ base: 'h-px bg-outline-100 my-1', variants: {} });
export const menuGroupStyle = tv({ base: '', variants: {} });
export const menuGroupTitleStyle = tv({ base: 'px-3 py-1.5 text-xs font-semibold text-typography-400 uppercase', variants: {} });

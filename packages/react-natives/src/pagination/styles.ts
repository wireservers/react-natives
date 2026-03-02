import { tv } from 'tailwind-variants';

export const paginationStyle = tv({ base: 'flex-row items-center gap-1', variants: {} });
export const paginationItemStyle = tv({
  base: 'items-center justify-center rounded-lg',
  variants: {
    size: { sm: 'h-8 w-8', md: 'h-10 w-10', lg: 'h-12 w-12' },
    isActive: { true: 'bg-primary-500', false: 'bg-transparent' },
    isDisabled: { true: 'opacity-50' },
  },
  defaultVariants: { size: 'md', isActive: false },
});
export const paginationItemTextStyle = tv({
  base: 'font-medium',
  variants: {
    size: { sm: 'text-xs', md: 'text-sm', lg: 'text-base' },
    isActive: { true: 'text-typography-0', false: 'text-typography-700' },
  },
  defaultVariants: { size: 'md', isActive: false },
});
export const paginationEllipsisStyle = tv({
  base: 'items-center justify-center',
  variants: {
    size: { sm: 'h-8 w-8', md: 'h-10 w-10', lg: 'h-12 w-12' },
  },
  defaultVariants: { size: 'md' },
});

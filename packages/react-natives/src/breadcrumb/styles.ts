import { tv } from 'tailwind-variants';

export const breadcrumbStyle = tv({
  base: 'flex-row items-center flex-wrap',
});

export const breadcrumbItemStyle = tv({
  base: 'flex-row items-center',
});

export const breadcrumbLinkStyle = tv({
  base: 'active:opacity-70',
  variants: {
    isCurrent: {
      true: '',
      false: '',
    },
  },
});

export const breadcrumbTextStyle = tv({
  base: 'text-sm',
  variants: {
    isCurrent: {
      true: 'text-typography-900 font-semibold',
      false: 'text-primary-600',
    },
  },
  defaultVariants: {
    isCurrent: false,
  },
});

export const breadcrumbSeparatorStyle = tv({
  base: 'text-typography-400 text-sm mx-2',
});

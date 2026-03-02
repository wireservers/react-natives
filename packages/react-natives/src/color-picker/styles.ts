import { tv } from 'tailwind-variants';

export const colorPickerTriggerStyle = tv({
  base: 'flex-row items-center gap-2 border border-outline-300 rounded-lg bg-background-0 h-10 px-3',
  variants: {},
});
export const colorPickerSwatchPreviewStyle = tv({
  base: 'h-5 w-5 rounded-full border border-outline-200',
  variants: {},
});
export const colorPickerContentStyle = tv({
  base: 'bg-background-0 rounded-xl p-4 shadow-hard-2 border border-outline-100 gap-3',
  variants: {},
});
export const colorPickerSwatchStyle = tv({
  base: 'h-8 w-8 rounded-full border-2 border-transparent',
  variants: {
    isSelected: { true: 'border-primary-500' },
  },
});
export const colorPickerInputStyle = tv({
  base: 'border border-outline-300 rounded-lg bg-background-0 h-10 px-3 text-sm text-typography-900 font-mono',
  variants: {},
});
export const colorPickerBoxStyle = tv({
  base: '',
  variants: {},
});
export const colorPickerSliderStyle = tv({
  base: '',
  variants: {},
});

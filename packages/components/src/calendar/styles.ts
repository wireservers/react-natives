import { tva } from '@gluestack-ui/utils/nativewind-utils';

export const calendarRootStyle = tva({
  base: 'bg-background-0 rounded-xl overflow-hidden border border-outline-200',
  variants: {
    size: {
      sm: 'p-2',
      md: 'p-3',
      lg: 'p-4',
    },
  },
});

export const calendarHeaderStyle = tva({
  base: 'flex-row items-center justify-between px-2 py-3',
});

export const calendarHeaderTitleStyle = tva({
  base: 'text-lg font-semibold text-typography-900',
});

export const calendarNavButtonStyle = tva({
  base: 'p-2 rounded-lg active:bg-background-200',
});

export const calendarViewSwitcherStyle = tva({
  base: 'flex-row rounded-lg bg-background-100 p-0.5',
});

export const calendarViewButtonStyle = tva({
  base: 'px-3 py-1.5 rounded-md',
  variants: {
    active: {
      true: 'bg-background-0 shadow-hard-5',
      false: 'bg-transparent',
    },
  },
});

export const calendarViewButtonTextStyle = tva({
  base: 'text-sm font-medium',
  variants: {
    active: {
      true: 'text-typography-900',
      false: 'text-typography-500',
    },
  },
});

export const calendarWeekDayLabelStyle = tva({
  base: 'flex-1 items-center py-2',
});

export const calendarWeekDayLabelTextStyle = tva({
  base: 'text-xs font-medium text-typography-500 uppercase',
});

export const calendarDayCellStyle = tva({
  base: 'flex-1 min-h-[48px] items-center py-1 border-b border-outline-100',
  variants: {
    isCurrentMonth: {
      true: '',
      false: 'opacity-40',
    },
  },
});

export const calendarDayNumberStyle = tva({
  base: 'w-7 h-7 rounded-full items-center justify-center',
  variants: {
    isToday: {
      true: 'bg-primary-500',
      false: '',
    },
    isSelected: {
      true: 'bg-info-500',
      false: '',
    },
  },
});

export const calendarDayNumberTextStyle = tva({
  base: 'text-sm text-typography-900',
  variants: {
    isToday: {
      true: 'text-typography-0 font-bold',
      false: '',
    },
    isSelected: {
      true: 'text-typography-0 font-bold',
      false: '',
    },
    isCurrentMonth: {
      true: '',
      false: 'text-typography-400',
    },
  },
});

export const calendarEventStyle = tva({
  base: 'rounded px-1.5 py-0.5 mt-0.5 w-full',
  variants: {
    color: {
      primary: '',
      info: '',
      success: '',
      warning: '',
      error: '',
      tertiary: '',
    },
    variant: {
      subtle: '',
      solid: '',
    },
  },
  compoundVariants: [
    { color: 'primary', variant: 'subtle', class: 'bg-primary-100' },
    { color: 'info', variant: 'subtle', class: 'bg-info-100' },
    { color: 'success', variant: 'subtle', class: 'bg-success-100' },
    { color: 'warning', variant: 'subtle', class: 'bg-warning-100' },
    { color: 'error', variant: 'subtle', class: 'bg-error-100' },
    { color: 'tertiary', variant: 'subtle', class: 'bg-tertiary-100' },
    { color: 'primary', variant: 'solid', class: 'bg-primary-500' },
    { color: 'info', variant: 'solid', class: 'bg-info-500' },
    { color: 'success', variant: 'solid', class: 'bg-success-500' },
    { color: 'warning', variant: 'solid', class: 'bg-warning-500' },
    { color: 'error', variant: 'solid', class: 'bg-error-500' },
    { color: 'tertiary', variant: 'solid', class: 'bg-tertiary-500' },
  ],
  defaultVariants: {
    variant: 'subtle',
  },
});

export const calendarEventTextStyle = tva({
  base: 'text-2xs font-medium',
  variants: {
    color: {
      primary: '',
      info: '',
      success: '',
      warning: '',
      error: '',
      tertiary: '',
    },
    variant: {
      subtle: '',
      solid: 'text-typography-0 font-semibold',
    },
  },
  compoundVariants: [
    { color: 'primary', variant: 'subtle', class: 'text-primary-800' },
    { color: 'info', variant: 'subtle', class: 'text-info-800' },
    { color: 'success', variant: 'subtle', class: 'text-success-800' },
    { color: 'warning', variant: 'subtle', class: 'text-warning-800' },
    { color: 'error', variant: 'subtle', class: 'text-error-800' },
    { color: 'tertiary', variant: 'subtle', class: 'text-tertiary-800' },
  ],
  defaultVariants: {
    variant: 'subtle',
  },
});

export const calendarTimeSlotStyle = tva({
  base: 'flex-row min-h-[56px] border-b border-outline-100',
});

export const calendarTimeSlotLabelStyle = tva({
  base: 'w-16 py-2 pr-2 items-end',
});

export const calendarTimeSlotLabelTextStyle = tva({
  base: 'text-xs text-typography-400',
});

export const calendarTimeSlotContentStyle = tva({
  base: 'flex-1 border-l border-outline-100 px-1 py-0.5',
});

// --- Horizontal view styles ---

export const calendarHorizontalMemberColumnStyle = tva({
  base: 'border-r border-outline-200 bg-background-0 z-10',
});

export const calendarHorizontalMemberCellStyle = tva({
  base: 'flex-row items-center px-3 py-2 border-b border-outline-100 min-h-[72px]',
});

export const calendarHorizontalAvatarStyle = tva({
  base: 'w-10 h-10 rounded-full items-center justify-center mr-3',
  variants: {
    color: {
      primary: 'bg-primary-500',
      info: 'bg-info-500',
      success: 'bg-success-500',
      warning: 'bg-warning-500',
      error: 'bg-error-500',
      tertiary: 'bg-tertiary-500',
    },
  },
  defaultVariants: {
    color: 'primary',
  },
});

export const calendarHorizontalAvatarTextStyle = tva({
  base: 'text-xs font-bold text-typography-0',
});

export const calendarHorizontalMemberNameStyle = tva({
  base: 'text-sm font-semibold text-typography-900',
});

export const calendarHorizontalMemberRoleStyle = tva({
  base: 'text-2xs text-typography-400',
});

export const calendarHorizontalTimeHeaderStyle = tva({
  base: 'flex-row border-b border-outline-200 bg-background-50',
});

export const calendarHorizontalTimeSlotHeaderStyle = tva({
  base: 'items-center justify-center border-r border-outline-100 py-2',
});

export const calendarHorizontalTimeSlotHeaderTextStyle = tva({
  base: 'text-2xs text-typography-500 font-medium',
});

export const calendarHorizontalRowStyle = tva({
  base: 'flex-row border-b border-outline-100 relative min-h-[72px]',
});

export const calendarHorizontalGridCellStyle = tva({
  base: 'border-r border-outline-50 min-h-[72px]',
});

export const calendarHorizontalEventStyle = tva({
  base: 'absolute rounded-lg px-2 py-1 overflow-hidden justify-center',
  variants: {
    color: {
      primary: 'bg-primary-500',
      info: 'bg-info-500',
      success: 'bg-success-500',
      warning: 'bg-warning-500',
      error: 'bg-error-500',
      tertiary: 'bg-tertiary-500',
    },
  },
});

export const calendarHorizontalEventTitleStyle = tva({
  base: 'text-xs font-semibold text-typography-0',
});

export const calendarHorizontalEventTimeStyle = tva({
  base: 'text-2xs text-typography-0 opacity-80',
});

// --- Vertical view styles ---

export const calendarVerticalMemberHeaderStyle = tva({
  base: 'flex-row border-b border-outline-200 bg-background-50',
});

export const calendarVerticalMemberCellStyle = tva({
  base: 'items-center justify-center py-2 px-1 border-r border-outline-100',
});

export const calendarVerticalMemberNameStyle = tva({
  base: 'text-xs font-semibold text-typography-900 text-center mt-1',
});

export const calendarVerticalMemberRoleStyle = tva({
  base: 'text-2xs text-typography-400 text-center',
});

export const calendarVerticalTimeColumnStyle = tva({
  base: 'border-r border-outline-200 bg-background-0 z-10',
});

export const calendarVerticalTimeCellStyle = tva({
  base: 'justify-center items-end pr-2 border-b border-outline-100',
});

export const calendarVerticalTimeCellTextStyle = tva({
  base: 'text-2xs text-typography-500 font-medium',
});

export const calendarVerticalColumnStyle = tva({
  base: 'border-r border-outline-100 relative',
});

export const calendarVerticalGridCellStyle = tva({
  base: 'border-b border-outline-50',
});

export const calendarVerticalEventStyle = tva({
  base: 'absolute rounded-lg px-1.5 py-1 overflow-hidden left-1 right-1',
  variants: {
    color: {
      primary: 'bg-primary-500',
      info: 'bg-info-500',
      success: 'bg-success-500',
      warning: 'bg-warning-500',
      error: 'bg-error-500',
      tertiary: 'bg-tertiary-500',
    },
  },
});

export const calendarVerticalEventTitleStyle = tva({
  base: 'text-2xs font-semibold text-typography-0',
});

export const calendarVerticalEventTimeStyle = tva({
  base: 'text-2xs text-typography-0 opacity-80',
});

// --- Compact event styles (used in week/month timeline cells) ---

export const calendarCompactEventStyle = tva({
  base: 'rounded px-1.5 py-0.5 mb-0.5',
  variants: {
    color: {
      primary: 'bg-primary-500',
      info: 'bg-info-500',
      success: 'bg-success-500',
      warning: 'bg-warning-500',
      error: 'bg-error-500',
      tertiary: 'bg-tertiary-500',
    },
  },
});

export const calendarCompactEventTextStyle = tva({
  base: 'text-2xs font-medium text-typography-0',
});

// --- Legend styles ---

export const calendarLegendContainerStyle = tva({
  base: 'flex-row flex-wrap gap-4 px-2 py-2',
});

export const calendarLegendItemStyle = tva({
  base: 'flex-row items-center gap-1.5',
});

export const calendarLegendDotStyle = tva({
  base: 'w-2.5 h-2.5 rounded-full',
  variants: {
    color: {
      primary: 'bg-primary-500',
      info: 'bg-info-500',
      success: 'bg-success-500',
      warning: 'bg-warning-500',
      error: 'bg-error-500',
      tertiary: 'bg-tertiary-500',
    },
  },
});

export const calendarLegendTextStyle = tva({
  base: 'text-xs text-typography-600',
});

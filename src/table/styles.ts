import { tv } from 'tailwind-variants';

export const tableStyle = tv({ base: 'w-full flex-col', variants: {} });
export const tableHeadStyle = tv({ base: 'flex-col bg-background-50', variants: {} });
export const tableBodyStyle = tv({ base: 'flex-col', variants: {} });
export const tableFooterStyle = tv({ base: 'bg-background-50', variants: {} });
export const tableRowStyle = tv({ base: 'flex-row border-b border-outline-100', variants: {} });
export const tableCellStyle = tv({ base: 'flex-1 px-4 py-3 justify-center', variants: {} });
export const tableHeaderCellStyle = tv({ base: 'flex-1 px-4 py-3 justify-center', variants: {} });
export const tableHeaderCellTextStyle = tv({ base: 'text-xs font-semibold text-typography-500 uppercase', variants: {} });
export const tableCellTextStyle = tv({ base: 'text-sm text-typography-700', variants: {} });
export const tableCaptionStyle = tv({ base: 'text-sm text-typography-400 py-3 text-center', variants: {} });

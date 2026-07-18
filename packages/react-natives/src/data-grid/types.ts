import type React from 'react';
import type { ImageSourcePropType, TextInput, View } from 'react-native';

export type DataGridCellKind =
  | 'text'
  | 'number'
  | 'markdown'
  | 'bubble'
  | 'image'
  | 'drilldown'
  | 'uri'
  | 'boolean'
  | 'custom';

export type DataGridSelectionMode = 'none' | 'single' | 'multiple';
export type DataGridSelectionScope = 'row' | 'cell' | 'column' | 'mixed';

export type DataGridSortDirection = 'asc' | 'desc';

export interface DataGridSort {
  columnId: string;
  direction: DataGridSortDirection;
}

export interface DataGridColumn<TColumnMeta = unknown> {
  id: string;
  title: string;
  group?: string;
  kind?: DataGridCellKind;
  width?: number;
  minWidth?: number;
  maxWidth?: number;
  editable?: boolean;
  resizable?: boolean;
  draggable?: boolean;
  /** Allow clicking this column's header to sort by it. Overrides the grid-level `sortable`. */
  sortable?: boolean;
  /** Show a filter input for this column in the filter row. Overrides the grid-level `filterable`. */
  filterable?: boolean;
  align?: 'left' | 'center' | 'right';
  meta?: TColumnMeta;
}

export interface DataGridCell<TValue = unknown> {
  kind?: DataGridCellKind;
  value?: TValue;
  displayValue?: string;
  source?: ImageSourcePropType;
  href?: string;
  badgeColor?: string;
  readonly?: boolean;
  disabled?: boolean;
  className?: string;
  accessibilityLabel?: string;
}

export interface DataGridCellCoordinate {
  row: number;
  columnId: string;
}

export interface DataGridMergedCell {
  row: number;
  columnId: string;
  rowSpan?: number;
  colSpan?: number;
}

export interface DataGridSelection {
  rows?: number[];
  columns?: string[];
  cells?: DataGridCellCoordinate[];
}

export interface DataGridEditEvent<TValue = unknown> {
  row: number;
  column: DataGridColumn;
  value: TValue;
  previousValue: unknown;
}

export interface DataGridRenderCellInfo {
  row: number;
  column: DataGridColumn;
  cell: DataGridCell;
  isSelected: boolean;
  isEditing: boolean;
}

export interface DataGridRenderHeaderInfo {
  column: DataGridColumn;
  index: number;
  isSelected: boolean;
}

export interface DataGridProps extends Omit<React.ComponentPropsWithoutRef<typeof View>, 'children'> {
  columns: DataGridColumn[];
  rowCount: number;
  getCellContent: (row: number, column: DataGridColumn) => DataGridCell | string | number | boolean | null | undefined;
  getRowKey?: (row: number) => string;
  rowHeight?: number | ((row: number) => number);
  headerHeight?: number;
  estimatedRowHeight?: number;
  selectionMode?: DataGridSelectionMode;
  selectionScope?: DataGridSelectionScope;
  selection?: DataGridSelection;
  defaultSelection?: DataGridSelection;
  onSelectionChange?: (selection: DataGridSelection) => void;
  editable?: boolean;
  onCellEdit?: (event: DataGridEditEvent) => void;
  renderEditCell?: (info: DataGridRenderCellInfo & { onChange: (value: unknown) => void; inputRef: React.RefObject<TextInput | null> }) => React.ReactNode;
  renderCell?: (info: DataGridRenderCellInfo) => React.ReactNode;
  renderHeaderCell?: (info: DataGridRenderHeaderInfo) => React.ReactNode;
  mergedCells?: DataGridMergedCell[];
  overscanRows?: number;
  initialNumToRender?: number;
  maxToRenderPerBatch?: number;
  windowSize?: number;
  stickyHeader?: boolean;
  allowColumnResize?: boolean;
  allowColumnReorder?: boolean;
  onColumnResize?: (columnId: string, width: number) => void;
  onColumnOrderChange?: (columns: DataGridColumn[]) => void;
  onCellPress?: (row: number, column: DataGridColumn, cell: DataGridCell) => void;
  /**
   * Enable click-to-sort on every column header (opt a column out with `column.sortable = false`).
   * The grid sorts the rows itself using each cell's value; numeric cells compare numerically.
   */
  sortable?: boolean;
  /** Controlled active sort. Pass with `onSortChange` to manage sort state yourself. */
  sort?: DataGridSort | null;
  /** Initial sort for the uncontrolled case. */
  defaultSort?: DataGridSort | null;
  onSortChange?: (sort: DataGridSort | null) => void;
  /**
   * Show a per-column filter row under the header (opt a column out with `column.filterable = false`).
   * The grid hides rows whose cell text doesn't contain the (case-insensitive) filter substring.
   */
  filterable?: boolean;
  /** Controlled filter values keyed by column id. Pass with `onFiltersChange` to manage them yourself. */
  filters?: Record<string, string>;
  /** Initial filters for the uncontrolled case. */
  defaultFilters?: Record<string, string>;
  onFiltersChange?: (filters: Record<string, string>) => void;
  /**
   * Optional override for the value the grid sorts/filters a cell by. Defaults to the cell's
   * `value` (numeric-aware) / `displayValue`. Useful when the displayed cell is a custom node.
   */
  getSortValue?: (row: number, column: DataGridColumn) => string | number | boolean | null | undefined;
  className?: string;
}

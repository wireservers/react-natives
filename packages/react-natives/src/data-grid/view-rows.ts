import type { DataGridCell, DataGridColumn, DataGridSort } from './types';

export function toCell(
  input: DataGridCell | string | number | boolean | null | undefined,
  column: DataGridColumn,
): DataGridCell {
  if (input == null) return { kind: column.kind ?? 'text', value: '' };
  if (typeof input === 'object' && !Array.isArray(input)) {
    return { kind: input.kind ?? column.kind ?? 'text', ...input };
  }
  return { kind: column.kind ?? (typeof input === 'number' ? 'number' : 'text'), value: input };
}

export function formatValue(cell: DataGridCell) {
  if (cell.displayValue != null) return cell.displayValue;
  if (cell.value == null) return '';
  if (typeof cell.value === 'boolean') return cell.value ? 'Yes' : 'No';
  return String(cell.value);
}

// Normalize a cell (or a getSortValue override) to something orderable: numbers/booleans sort
// numerically, everything else sorts as its lowercased display text.
export function toComparable(raw: unknown, cell?: DataGridCell): number | string {
  if (typeof raw === 'number') return raw;
  if (typeof raw === 'boolean') return raw ? 1 : 0;
  if (raw != null) return String(raw).toLowerCase();
  if (cell) {
    if (typeof cell.value === 'number') return cell.value;
    if (typeof cell.value === 'boolean') return cell.value ? 1 : 0;
    return formatValue(cell).toLowerCase();
  }
  return '';
}

export function compareComparable(a: number | string, b: number | string): number {
  if (typeof a === 'number' && typeof b === 'number') return a - b;
  return String(a).localeCompare(String(b), undefined, { numeric: true, sensitivity: 'base' });
}

export interface ComputeViewRowsOptions {
  columns: DataGridColumn[];
  rowCount: number;
  getCellContent: (row: number, column: DataGridColumn) => DataGridCell | string | number | boolean | null | undefined;
  getSortValue?: (row: number, column: DataGridColumn) => string | number | boolean | null | undefined;
  sort?: DataGridSort | null;
  filters?: Record<string, string>;
  /** Skip client-side sorting — the caller's data source is already sorted (server-side mode). */
  manualSort?: boolean;
  /** Skip client-side filtering — the caller's data source is already filtered (server-side mode). */
  manualFilter?: boolean;
}

/**
 * Filtered + sorted permutation of data-row indices.
 *
 * Returns `null` for the identity case (nothing to sort or filter) so the common path stays
 * zero-cost. Callers treat `null` as "display position === data row".
 *
 * Exported so consumers — notably the export routines in `@wireservers-ui/react-natives-pro` —
 * can reproduce exactly the rows the grid is showing without duplicating these rules.
 */
export function computeViewRows(options: ComputeViewRowsOptions): number[] | null {
  const {
    columns,
    rowCount,
    getCellContent,
    getSortValue,
    sort,
    filters,
    manualSort = false,
    manualFilter = false,
  } = options;

  const filterEntries = manualFilter
    ? []
    : Object.entries(filters ?? {}).filter(([, value]) => value && value.trim());
  const hasFilter = filterEntries.length > 0;
  const activeSort = manualSort ? null : sort;
  if (!activeSort && !hasFilter) return null;

  let rows: number[] = [];
  for (let row = 0; row < rowCount; row += 1) rows.push(row);

  if (hasFilter) {
    rows = rows.filter((row) =>
      filterEntries.every(([columnId, value]) => {
        const column = columns.find((item) => item.id === columnId);
        if (!column) return true;
        const text = getSortValue
          ? String(getSortValue(row, column) ?? '')
          : formatValue(toCell(getCellContent(row, column), column));
        return text.toLowerCase().includes(value.trim().toLowerCase());
      }),
    );
  }

  if (activeSort) {
    const column = columns.find((item) => item.id === activeSort.columnId);
    if (column) {
      const direction = activeSort.direction === 'desc' ? -1 : 1;
      const valueFor = (row: number) =>
        getSortValue
          ? toComparable(getSortValue(row, column))
          : toComparable(undefined, toCell(getCellContent(row, column), column));
      rows.sort((a, b) => compareComparable(valueFor(a), valueFor(b)) * direction);
    }
  }

  return rows;
}

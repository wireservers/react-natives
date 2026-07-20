import React from 'react';
import {
  ActivityIndicator,
  Image,
  Linking,
  PanResponder,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import type { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import type {
  DataGridCell,
  DataGridCellCoordinate,
  DataGridColumn,
  DataGridMergedCell,
  DataGridProps,
  DataGridSelection,
  DataGridSelectionScope,
  DataGridSort,
} from './types';
import { computeViewRows, formatValue, toCell } from './view-rows';
import {
  dataGridBubbleStyle,
  dataGridCellStyle,
  dataGridCellTextStyle,
  dataGridEditInputStyle,
  dataGridGroupHeaderStyle,
  dataGridGroupHeaderTextStyle,
  dataGridHeaderCellStyle,
  dataGridHeaderCellTextStyle,
  dataGridHeaderStyle,
  dataGridImageStyle,
  dataGridResizeHandleStyle,
  dataGridRowStyle,
  dataGridStyle,
} from './styles';

const DEFAULT_ROW_HEIGHT = 44;
const DEFAULT_HEADER_HEIGHT = 40;
const DEFAULT_COLUMN_WIDTH = 160;
const DEFAULT_OVERSCAN_ROWS = 6;

function cellKey(cell: DataGridCellCoordinate) {
  return `${cell.row}:${cell.columnId}`;
}

function uniqueNumbers(values?: number[]) {
  return Array.from(new Set(values ?? []));
}

function uniqueStrings(values?: string[]) {
  return Array.from(new Set(values ?? []));
}

function uniqueCells(values?: DataGridCellCoordinate[]) {
  const seen = new Set<string>();
  const result: DataGridCellCoordinate[] = [];
  for (const value of values ?? []) {
    const key = cellKey(value);
    if (!seen.has(key)) {
      seen.add(key);
      result.push(value);
    }
  }
  return result;
}

function normalizeSelection(selection?: DataGridSelection): DataGridSelection {
  return {
    rows: uniqueNumbers(selection?.rows),
    columns: uniqueStrings(selection?.columns),
    cells: uniqueCells(selection?.cells),
  };
}

function selectionHas(selection: DataGridSelection, row: number, columnId: string, scope: 'row' | 'column' | 'cell') {
  if (scope === 'row') return Boolean(selection.rows?.includes(row));
  if (scope === 'column') return Boolean(selection.columns?.includes(columnId));
  return Boolean(selection.cells?.some((cell) => cell.row === row && cell.columnId === columnId));
}

function findMerge(mergedCells: DataGridMergedCell[] | undefined, row: number, columnId: string, columns: DataGridColumn[]) {
  if (!mergedCells?.length) return { hidden: false, span: undefined as DataGridMergedCell | undefined };
  const columnIndex = columns.findIndex((column) => column.id === columnId);
  for (const merge of mergedCells) {
    const startColumn = columns.findIndex((column) => column.id === merge.columnId);
    const rowSpan = merge.rowSpan ?? 1;
    const colSpan = merge.colSpan ?? 1;
    const inRows = row >= merge.row && row < merge.row + rowSpan;
    const inColumns = columnIndex >= startColumn && columnIndex < startColumn + colSpan;
    if (inRows && inColumns) {
      const isStart = row === merge.row && columnId === merge.columnId;
      return { hidden: !isStart, span: merge };
    }
  }
  return { hidden: false, span: undefined };
}

function getCellWidth(column: DataGridColumn, columnWidths: Record<string, number>) {
  return columnWidths[column.id] ?? column.width ?? DEFAULT_COLUMN_WIDTH;
}

function clampWidth(column: DataGridColumn, width: number) {
  const min = column.minWidth ?? 72;
  const max = column.maxWidth ?? 640;
  return Math.max(min, Math.min(max, width));
}

function MarkdownText({ value, align }: { value: string; align: DataGridColumn['align'] }) {
  const parts = value.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
  return (
    <Text className={dataGridCellTextStyle({ align })} numberOfLines={2}>
      {parts.map((part, index) => {
        const bold = part.startsWith('**') && part.endsWith('**');
        return (
          <Text key={`${part}-${index}`} className={bold ? 'font-semibold' : undefined}>
            {bold ? part.slice(2, -2) : part}
          </Text>
        );
      })}
    </Text>
  );
}

function DefaultCellContent({ cell, column }: { cell: DataGridCell; column: DataGridColumn }) {
  const kind = cell.kind ?? column.kind ?? 'text';
  const text = formatValue(cell);

  if (kind === 'image' && cell.source) {
    return <Image source={cell.source} className={dataGridImageStyle({})} accessibilityLabel={cell.accessibilityLabel} />;
  }

  if (kind === 'boolean') {
    const checked = Boolean(cell.value);
    return (
      <View className={`h-5 w-5 items-center justify-center rounded border ${checked ? 'border-typography-400 bg-typography-400' : 'border-outline-300 bg-background-0'}`}>
        {checked ? <Text className="text-xs font-bold text-white">✓</Text> : null}
      </View>
    );
  }

  if (kind === 'bubble') {
    return (
      <View className={dataGridBubbleStyle({})}>
        <Text className={dataGridCellTextStyle({ align: column.align })} numberOfLines={1}>{text}</Text>
      </View>
    );
  }

  if (kind === 'uri') {
    return (
      <Text
        className="text-sm text-primary-600 underline"
        numberOfLines={1}
        onPress={() => {
          const href = cell.href ?? text;
          if (href) void Linking.openURL(href);
        }}
      >
        {text}
      </Text>
    );
  }

  if (kind === 'drilldown') {
    return (
      <View className="flex-row items-center gap-2">
        <Text className={dataGridCellTextStyle({ align: column.align })} numberOfLines={1}>{text}</Text>
        <Text className="text-sm font-semibold text-primary-600">›</Text>
      </View>
    );
  }

  if (kind === 'markdown') {
    return <MarkdownText value={text} align={column.align} />;
  }

  return <Text className={dataGridCellTextStyle({ align: column.align })} numberOfLines={1}>{text}</Text>;
}

function HeaderCell({
  column,
  index,
  width,
  height,
  isSelected,
  canResize,
  canReorder,
  sortable,
  sortDirection,
  renderHeaderCell,
  onResize,
  onMove,
  onSelect,
  onSort,
}: {
  column: DataGridColumn;
  index: number;
  width: number;
  height: number;
  isSelected: boolean;
  canResize: boolean;
  canReorder: boolean;
  sortable: boolean;
  sortDirection: 'asc' | 'desc' | null;
  renderHeaderCell?: DataGridProps['renderHeaderCell'];
  onResize: (column: DataGridColumn, width: number) => void;
  onMove: (fromIndex: number, toIndex: number) => void;
  onSelect: () => void;
  onSort: () => void;
}) {
  const startWidth = React.useRef(width);
  const dragDx = React.useRef(0);
  const resizeResponder = React.useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => canResize,
        onMoveShouldSetPanResponder: () => canResize,
        onPanResponderGrant: () => {
          startWidth.current = width;
        },
        onPanResponderMove: (_, gesture) => {
          onResize(column, clampWidth(column, startWidth.current + gesture.dx));
        },
      }),
    [canResize, column, onResize, width],
  );
  const dragResponder = React.useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => false,
        onMoveShouldSetPanResponder: (_, gesture) => canReorder && Math.abs(gesture.dx) > 14 && Math.abs(gesture.dx) > Math.abs(gesture.dy),
        onPanResponderMove: (_, gesture) => {
          dragDx.current = gesture.dx;
        },
        onPanResponderRelease: () => {
          if (!canReorder) return;
          const hops = Math.round(dragDx.current / Math.max(width, 1));
          dragDx.current = 0;
          if (hops !== 0) onMove(index, index + hops);
        },
      }),
    [canReorder, index, onMove, width],
  );

  return (
    <Pressable
      onPress={sortable ? onSort : onSelect}
      className={dataGridHeaderCellStyle({ isSelected })}
      style={{ width, height }}
      accessibilityRole="button"
      accessibilityLabel={
        sortable
          ? `${column.title}, sorted ${sortDirection === 'asc' ? 'ascending' : sortDirection === 'desc' ? 'descending' : 'none'}`
          : column.title
      }
      {...dragResponder.panHandlers}
    >
      {renderHeaderCell ? (
        renderHeaderCell({ column, index, isSelected })
      ) : (
        <View className="flex-row items-center gap-1">
          <Text className={dataGridHeaderCellTextStyle({})} numberOfLines={1}>{column.title}</Text>
          {sortable && sortDirection ? (
            <Text className="text-xs font-semibold text-primary-600">{sortDirection === 'asc' ? '▲' : '▼'}</Text>
          ) : null}
        </View>
      )}
      {canResize ? <View className={dataGridResizeHandleStyle({})} {...resizeResponder.panHandlers} /> : null}
    </Pressable>
  );
}

export const DataGrid = React.forwardRef<React.ElementRef<typeof View>, DataGridProps>(
  (
    {
      columns,
      rowCount,
      getCellContent,
      getRowKey,
      rowHeight = DEFAULT_ROW_HEIGHT,
      headerHeight = DEFAULT_HEADER_HEIGHT,
      estimatedRowHeight = DEFAULT_ROW_HEIGHT,
      selectionMode = 'none',
      selectionScope = 'cell',
      selection,
      defaultSelection,
      onSelectionChange,
      editable = false,
      onCellEdit,
      renderEditCell,
      renderCell,
      renderHeaderCell,
      mergedCells,
      overscanRows = DEFAULT_OVERSCAN_ROWS,
      initialNumToRender = 12,
      maxToRenderPerBatch = 12,
      // Deprecated no-op. Destructured only so it never reaches the spread below and lands on
      // the underlying View as an unknown prop.
      windowSize: _windowSize,
      stickyHeader = true,
      allowColumnResize = true,
      allowColumnReorder = true,
      onColumnResize,
      onColumnOrderChange,
      onCellPress,
      sortable = false,
      sort,
      defaultSort = null,
      onSortChange,
      filterable = false,
      filters,
      defaultFilters,
      onFiltersChange,
      getSortValue,
      manualSort = false,
      manualFilter = false,
      loading = false,
      onEndReached,
      onEndReachedThreshold = 2,
      className,
      ...props
    },
    ref,
  ) => {
    const [orderedColumns, setOrderedColumns] = React.useState(columns);
    const [columnWidths, setColumnWidths] = React.useState<Record<string, number>>({});
    const [internalSelection, setInternalSelection] = React.useState(() => normalizeSelection(defaultSelection));
    const [editingCell, setEditingCell] = React.useState<DataGridCellCoordinate | null>(null);
    const [editingValue, setEditingValue] = React.useState<unknown>('');
    const [scrollOffset, setScrollOffset] = React.useState(0);
    const [viewportHeight, setViewportHeight] = React.useState(0);
    const inputRef = React.useRef<TextInput | null>(null);
    // Row count at the moment `onEndReached` last fired; re-arms once more rows arrive so a
    // single page request isn't issued repeatedly while the user sits at the bottom.
    const endReachedAtCount = React.useRef<number | null>(null);
    // In the pinned layout the header and body scroll horizontally as two separate views that
    // must stay aligned. `syncingFrom` records which one initiated the current sync so the
    // programmatic scrollTo on the other doesn't echo back and fight the user's gesture.
    const headerScrollRef = React.useRef<ScrollView | null>(null);
    const bodyScrollRef = React.useRef<ScrollView | null>(null);
    const syncingFrom = React.useRef<'header' | 'body' | null>(null);
    const [internalSort, setInternalSort] = React.useState<DataGridSort | null>(defaultSort);
    const [internalFilters, setInternalFilters] = React.useState<Record<string, string>>(defaultFilters ?? {});
    const isControlled = selection != null;
    const currentSelection = React.useMemo(() => normalizeSelection(isControlled ? selection : internalSelection), [internalSelection, isControlled, selection]);
    const currentSort = sort !== undefined ? sort : internalSort;
    const currentFilters = filters !== undefined ? filters : internalFilters;

    React.useEffect(() => {
      setOrderedColumns(columns);
    }, [columns]);

    const groups = React.useMemo(() => orderedColumns.some((column) => column.group), [orderedColumns]);
    const isColumnSortable = React.useCallback(
      (column: DataGridColumn) => column.sortable ?? sortable,
      [sortable],
    );
    const isColumnFilterable = React.useCallback(
      (column: DataGridColumn) => column.filterable ?? filterable,
      [filterable],
    );
    const showFilterRow = React.useMemo(
      () => orderedColumns.some((column) => isColumnFilterable(column)),
      [orderedColumns, isColumnFilterable],
    );

    const applySort = React.useCallback(
      (columnId: string) => {
        const next: DataGridSort | null =
          !currentSort || currentSort.columnId !== columnId
            ? { columnId, direction: 'asc' }
            : currentSort.direction === 'asc'
              ? { columnId, direction: 'desc' }
              : null;
        if (sort === undefined) setInternalSort(next);
        onSortChange?.(next);
      },
      [currentSort, onSortChange, sort],
    );

    const setFilter = React.useCallback(
      (columnId: string, value: string) => {
        const next = { ...currentFilters, [columnId]: value };
        if (filters === undefined) setInternalFilters(next);
        onFiltersChange?.(next);
      },
      [currentFilters, filters, onFiltersChange],
    );

    // Filtered + sorted permutation of data-row indices. `null` = identity (no sort, no active
    // filter) so the common case stays a zero-cost fast path and behaves exactly as before.
    // In server-side mode (`manualSort`/`manualFilter`) the corresponding step is skipped and
    // the data source is trusted to have already applied it.
    const viewRows = React.useMemo(
      () =>
        computeViewRows({
          columns: orderedColumns,
          rowCount,
          getCellContent,
          getSortValue,
          sort: currentSort,
          filters: currentFilters,
          manualSort,
          manualFilter,
        }),
      [currentSort, currentFilters, rowCount, orderedColumns, getCellContent, getSortValue, manualSort, manualFilter],
    );

    const viewCount = viewRows ? viewRows.length : rowCount;

    const setNextSelection = React.useCallback(
      (next: DataGridSelection) => {
        const normalized = normalizeSelection(next);
        if (!isControlled) setInternalSelection(normalized);
        onSelectionChange?.(normalized);
      },
      [isControlled, onSelectionChange],
    );

    const toggleSelection = React.useCallback(
      (row: number, columnId: string, scope: DataGridSelectionScope) => {
        if (selectionMode === 'none') return;
        const next = normalizeSelection(selectionMode === 'single' ? undefined : currentSelection);
        if (scope === 'row') {
          const exists = next.rows?.includes(row);
          next.rows = exists ? next.rows?.filter((item) => item !== row) : [...(next.rows ?? []), row];
        } else if (scope === 'column') {
          const exists = next.columns?.includes(columnId);
          next.columns = exists ? next.columns?.filter((item) => item !== columnId) : [...(next.columns ?? []), columnId];
        } else if (scope === 'cell' || scope === 'mixed') {
          const exists = next.cells?.some((item) => item.row === row && item.columnId === columnId);
          next.cells = exists ? next.cells?.filter((item) => item.row !== row || item.columnId !== columnId) : [...(next.cells ?? []), { row, columnId }];
        }
        setNextSelection(next);
      },
      [currentSelection, selectionMode, setNextSelection],
    );

    const resizeColumn = React.useCallback(
      (column: DataGridColumn, width: number) => {
        setColumnWidths((prev) => ({ ...prev, [column.id]: width }));
        onColumnResize?.(column.id, width);
      },
      [onColumnResize],
    );

    const moveColumn = React.useCallback(
      (fromIndex: number, toIndex: number) => {
        setOrderedColumns((prev) => {
          const clampedTo = Math.max(0, Math.min(prev.length - 1, toIndex));
          if (fromIndex === clampedTo) return prev;
          const next = [...prev];
          const [item] = next.splice(fromIndex, 1);
          next.splice(clampedTo, 0, item);
          onColumnOrderChange?.(next);
          return next;
        });
      },
      [onColumnOrderChange],
    );

    const commitEdit = React.useCallback(
      (row: number, column: DataGridColumn, previousValue: unknown) => {
        onCellEdit?.({ row, column, value: editingValue, previousValue });
        setEditingCell(null);
      },
      [editingValue, onCellEdit],
    );

    const renderGridCell = React.useCallback(
      ({ row, column }: { row: number; column: DataGridColumn }) => {
        const merge = findMerge(mergedCells, row, column.id, orderedColumns);
        if (merge.hidden) return null;
        const rawCell = getCellContent(row, column);
        const cell = toCell(rawCell, column);
        const width = merge.span?.colSpan
          ? orderedColumns.slice(orderedColumns.findIndex((item) => item.id === column.id), orderedColumns.findIndex((item) => item.id === column.id) + (merge.span.colSpan ?? 1)).reduce((total, item) => total + getCellWidth(item, columnWidths), 0)
          : getCellWidth(column, columnWidths);
        const height = typeof rowHeight === 'function' ? rowHeight(row) : rowHeight;
        const isSelected =
          selectionHas(currentSelection, row, column.id, 'cell') ||
          selectionHas(currentSelection, row, column.id, 'row') ||
          selectionHas(currentSelection, row, column.id, 'column');
        const isEditing = editingCell?.row === row && editingCell.columnId === column.id;
        const canEdit = editable && column.editable !== false && !cell.readonly && !cell.disabled;
        const scope = selectionScope === 'mixed' ? 'cell' : selectionScope;

        return (
          <Pressable
            key={`${row}-${column.id}`}
            className={dataGridCellStyle({ isSelected, isEditing, class: cell.className })}
            style={{ width, height: merge.span?.rowSpan ? height * (merge.span.rowSpan ?? 1) : height }}
            onPress={() => {
              toggleSelection(row, column.id, scope);
              onCellPress?.(row, column, cell);
            }}
            onLongPress={() => {
              if (canEdit) {
                setEditingValue(cell.value ?? cell.displayValue ?? '');
                setEditingCell({ row, columnId: column.id });
              }
            }}
            accessibilityRole="button"
            accessibilityLabel={cell.accessibilityLabel ?? `${column.title}, row ${row + 1}, ${formatValue(cell)}`}
          >
            {isEditing ? (
              renderEditCell ? (
                renderEditCell({
                  row,
                  column,
                  cell,
                  isSelected,
                  isEditing,
                  onChange: setEditingValue,
                  inputRef,
                })
              ) : (
                <TextInput
                  ref={inputRef}
                  className={dataGridEditInputStyle({})}
                  value={String(editingValue ?? '')}
                  onChangeText={setEditingValue}
                  onBlur={() => commitEdit(row, column, cell.value)}
                  onSubmitEditing={() => commitEdit(row, column, cell.value)}
                  autoFocus
                />
              )
            ) : (
              renderCell?.({ row, column, cell, isSelected, isEditing }) ?? <DefaultCellContent cell={cell} column={column} />
            )}
          </Pressable>
        );
      },
      [
        columnWidths,
        commitEdit,
        currentSelection,
        editable,
        editingCell,
        editingValue,
        getCellContent,
        mergedCells,
        onCellPress,
        orderedColumns,
        renderCell,
        renderEditCell,
        rowHeight,
        selectionScope,
        toggleSelection,
      ],
    );

    const renderRow = React.useCallback(
      ({ item: row, columns: rowColumns }: { item: number; columns?: DataGridColumn[] }) => {
        const height = typeof rowHeight === 'function' ? rowHeight(row) : rowHeight;
        const isSelected = Boolean(currentSelection.rows?.includes(row));
        return (
          <View className={dataGridRowStyle({ isSelected })} style={{ minHeight: height }}>
            {(rowColumns ?? orderedColumns).map((column) => renderGridCell({ row, column }))}
          </View>
        );
      },
      [currentSelection.rows, orderedColumns, renderGridCell, rowHeight],
    );

    // Pinned columns are grouped at their edge; the rest keep their relative order in the
    // middle. `hasPinned` gates the three-pane layout so grids without pinning keep the
    // original single-scroller render path untouched.
    const leftColumns = React.useMemo(() => orderedColumns.filter((column) => column.pinned === 'left'), [orderedColumns]);
    const rightColumns = React.useMemo(() => orderedColumns.filter((column) => column.pinned === 'right'), [orderedColumns]);
    const middleColumns = React.useMemo(() => orderedColumns.filter((column) => !column.pinned), [orderedColumns]);
    const hasPinned = leftColumns.length > 0 || rightColumns.length > 0;
    const widthOf = React.useCallback(
      (cols: DataGridColumn[]) => cols.reduce((total, column) => total + getCellWidth(column, columnWidths), 0),
      [columnWidths],
    );

    const totalWidth = orderedColumns.reduce((total, column) => total + getCellWidth(column, columnWidths), 0);
    const fixedRowHeight = typeof rowHeight === 'number' ? rowHeight : undefined;
    const estimatedHeight = fixedRowHeight ?? estimatedRowHeight;
    const totalHeight = viewCount * estimatedHeight;
    const visibleWindow = Math.max(initialNumToRender, Math.ceil((viewportHeight || estimatedHeight * initialNumToRender) / estimatedHeight));
    const startRow = Math.max(0, Math.floor(scrollOffset / estimatedHeight) - overscanRows);
    const endRow = Math.min(viewCount - 1, startRow + visibleWindow + overscanRows * 2 + maxToRenderPerBatch);
    // Display positions currently on screen; each maps to a data-row index via `viewRows`
    // (identity when no sort/filter is active).
    const visiblePositions = React.useMemo(() => {
      const positions: number[] = [];
      for (let position = startRow; position <= endRow; position += 1) positions.push(position);
      return positions;
    }, [endRow, startRow]);

    const handleVerticalScroll = React.useCallback(
      (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
        setScrollOffset(contentOffset.y);
        if (!onEndReached) return;
        const distanceFromEnd = contentSize.height - contentOffset.y - layoutMeasurement.height;
        if (distanceFromEnd > layoutMeasurement.height * onEndReachedThreshold) return;
        if (endReachedAtCount.current === rowCount) return;
        endReachedAtCount.current = rowCount;
        onEndReached();
      },
      [onEndReached, onEndReachedThreshold, rowCount],
    );

    // Header stack (group band + header row + filter row) for a given set of columns. In the
    // pinned layout this is called once per pane so each edge renders its own header segment.
    const buildHeaderBlock = (cols: DataGridColumn[]) => (
      <>
        {groups ? (
          <View className={dataGridGroupHeaderStyle({})} style={{ height: Math.max(28, Math.round(headerHeight * 0.72)) }}>
            {cols.map((column) => (
              <View key={`group-${column.id}`} className="justify-center border-r border-outline-100 px-3" style={{ width: getCellWidth(column, columnWidths) }}>
                <Text className={dataGridGroupHeaderTextStyle({})} numberOfLines={1}>{column.group ?? ''}</Text>
              </View>
            ))}
          </View>
        ) : null}
        <View className={dataGridHeaderStyle({})}>
          {cols.map((column) => {
            const columnSortable = isColumnSortable(column);
            return (
              <HeaderCell
                key={column.id}
                column={column}
                // Index into the full column list so drag-reorder still moves the right column.
                index={orderedColumns.indexOf(column)}
                width={getCellWidth(column, columnWidths)}
                height={headerHeight}
                isSelected={Boolean(currentSelection.columns?.includes(column.id))}
                canResize={allowColumnResize && column.resizable !== false}
                canReorder={allowColumnReorder && column.draggable !== false}
                sortable={columnSortable}
                sortDirection={currentSort?.columnId === column.id ? currentSort.direction : null}
                renderHeaderCell={renderHeaderCell}
                onResize={resizeColumn}
                onMove={moveColumn}
                onSelect={() => {
                  if (selectionScope === 'column' || selectionScope === 'mixed') toggleSelection(0, column.id, 'column');
                }}
                onSort={() => applySort(column.id)}
              />
            );
          })}
        </View>
        {showFilterRow ? (
          <View className="flex-row border-b border-outline-200 bg-background-0">
            {cols.map((column) => (
              <View
                key={`filter-${column.id}`}
                className="justify-center border-r border-outline-100 px-2 py-1"
                style={{ width: getCellWidth(column, columnWidths) }}
              >
                {isColumnFilterable(column) ? (
                  <TextInput
                    value={currentFilters[column.id] ?? ''}
                    onChangeText={(text) => setFilter(column.id, text)}
                    placeholder="Filter"
                    placeholderTextColor="#94a3b8"
                    className="rounded-md border border-outline-200 bg-background-0 px-2 py-1 text-xs text-typography-900"
                    accessibilityLabel={`Filter ${column.title}`}
                  />
                ) : null}
              </View>
            ))}
          </View>
        ) : null}
      </>
    );

    // Absolutely-positioned row stack for a set of columns. Every pane uses the same
    // `visiblePositions` and the same `top` maths, which is what keeps the panes aligned.
    const buildRowStack = (cols: DataGridColumn[]) => (
      <View style={{ height: totalHeight, position: 'relative' }}>
        {visiblePositions.map((position) => {
          const row = viewRows ? viewRows[position] : position;
          if (row == null) return null;
          const height = typeof rowHeight === 'function' ? rowHeight(row) : rowHeight;
          return (
            <View key={getRowKey?.(row) ?? String(row)} style={{ position: 'absolute', top: position * estimatedHeight, left: 0, right: 0, height }}>
              {renderRow({ item: row, columns: cols })}
            </View>
          );
        })}
      </View>
    );

    const loadingFooter = loading ? (
      <View className="flex-row items-center justify-center gap-2 border-t border-outline-100 py-3">
        <ActivityIndicator size="small" />
        <Text className="text-xs text-typography-500">Loading…</Text>
      </View>
    ) : null;

    // --- Unpinned layout (the original single-scroller path, unchanged) ---------------------
    if (!hasPinned) {
      const headerBlock = buildHeaderBlock(orderedColumns);
      return (
        <View ref={ref} className={dataGridStyle({ class: className })} {...props}>
          <ScrollView horizontal bounces={false} style={{ flex: 1 }}>
            <View style={{ width: totalWidth, flex: 1 }}>
              {stickyHeader ? headerBlock : null}
              <ScrollView
                onLayout={(event) => setViewportHeight(event.nativeEvent.layout.height)}
                onScroll={handleVerticalScroll}
                scrollEventThrottle={16}
                bounces={false}
                removeClippedSubviews
                style={{ flex: 1 }}
              >
                {stickyHeader ? null : headerBlock}
                {buildRowStack(orderedColumns)}
                {loadingFooter}
              </ScrollView>
            </View>
          </ScrollView>
        </View>
      );
    }

    // --- Pinned layout ----------------------------------------------------------------------
    // Three panes share one vertical scroller, so vertical alignment is free. Only the middle
    // pane scrolls horizontally; its header and body are separate ScrollViews kept in step by
    // `syncHorizontal`.
    const syncHorizontal = (source: 'header' | 'body') => (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (syncingFrom.current && syncingFrom.current !== source) return;
      const x = event.nativeEvent.contentOffset.x;
      syncingFrom.current = source;
      const target = source === 'header' ? bodyScrollRef.current : headerScrollRef.current;
      target?.scrollTo({ x, animated: false });
      // Released on the next tick so the echoed scroll event from `target` is ignored.
      requestAnimationFrame(() => {
        syncingFrom.current = null;
      });
    };

    const middleWidth = widthOf(middleColumns);
    const headerRow = (
      <View className="flex-row">
        {leftColumns.length ? <View>{buildHeaderBlock(leftColumns)}</View> : null}
        <ScrollView
          ref={headerScrollRef}
          horizontal
          bounces={false}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          onScroll={syncHorizontal('header')}
          // Size to content, shrinking (and scrolling) only when it exceeds the space.
          // `flex: 1` would stretch the pane past its columns and leave a dead gap before the
          // right-pinned edge whenever the middle columns are narrower than the viewport.
          style={{ flexGrow: 0, flexShrink: 1, flexBasis: middleWidth }}
        >
          <View style={{ width: middleWidth }}>{buildHeaderBlock(middleColumns)}</View>
        </ScrollView>
        {rightColumns.length ? <View>{buildHeaderBlock(rightColumns)}</View> : null}
      </View>
    );

    return (
      <View ref={ref} className={dataGridStyle({ class: className })} {...props}>
        {stickyHeader ? headerRow : null}
        <ScrollView
          onLayout={(event) => setViewportHeight(event.nativeEvent.layout.height)}
          onScroll={handleVerticalScroll}
          scrollEventThrottle={16}
          bounces={false}
          removeClippedSubviews
          style={{ flex: 1 }}
        >
          {stickyHeader ? null : headerRow}
          <View className="flex-row">
            {leftColumns.length ? (
              <View style={{ width: widthOf(leftColumns) }}>{buildRowStack(leftColumns)}</View>
            ) : null}
            <ScrollView
              ref={bodyScrollRef}
              horizontal
              bounces={false}
              scrollEventThrottle={16}
              onScroll={syncHorizontal('body')}
              // Must match the header pane's sizing exactly or the two drift out of alignment.
              style={{ flexGrow: 0, flexShrink: 1, flexBasis: middleWidth }}
            >
              <View style={{ width: middleWidth }}>{buildRowStack(middleColumns)}</View>
            </ScrollView>
            {rightColumns.length ? (
              <View style={{ width: widthOf(rightColumns) }}>{buildRowStack(rightColumns)}</View>
            ) : null}
          </View>
          {loadingFooter}
        </ScrollView>
      </View>
    );
  },
);

DataGrid.displayName = 'DataGrid';

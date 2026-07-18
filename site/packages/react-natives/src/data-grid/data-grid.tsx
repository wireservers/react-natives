import React from 'react';
import {
  Image,
  Linking,
  PanResponder,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import type {
  DataGridCell,
  DataGridCellCoordinate,
  DataGridColumn,
  DataGridMergedCell,
  DataGridProps,
  DataGridSelection,
  DataGridSelectionScope,
} from './types';
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

function toCell(input: DataGridCell | string | number | boolean | null | undefined, column: DataGridColumn): DataGridCell {
  if (input == null) return { kind: column.kind ?? 'text', value: '' };
  if (typeof input === 'object' && !Array.isArray(input)) {
    return { kind: input.kind ?? column.kind ?? 'text', ...input };
  }
  return { kind: column.kind ?? (typeof input === 'number' ? 'number' : 'text'), value: input };
}

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

function formatValue(cell: DataGridCell) {
  if (cell.displayValue != null) return cell.displayValue;
  if (cell.value == null) return '';
  if (typeof cell.value === 'boolean') return cell.value ? 'Yes' : 'No';
  return String(cell.value);
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
  renderHeaderCell,
  onResize,
  onMove,
  onSelect,
}: {
  column: DataGridColumn;
  index: number;
  width: number;
  height: number;
  isSelected: boolean;
  canResize: boolean;
  canReorder: boolean;
  renderHeaderCell?: DataGridProps['renderHeaderCell'];
  onResize: (column: DataGridColumn, width: number) => void;
  onMove: (fromIndex: number, toIndex: number) => void;
  onSelect: () => void;
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
      onPress={onSelect}
      className={dataGridHeaderCellStyle({ isSelected })}
      style={{ width, height }}
      accessibilityRole="button"
      accessibilityLabel={column.title}
      {...dragResponder.panHandlers}
    >
      {renderHeaderCell ? (
        renderHeaderCell({ column, index, isSelected })
      ) : (
        <Text className={dataGridHeaderCellTextStyle({})} numberOfLines={1}>{column.title}</Text>
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
      windowSize: _windowSize = 5,
      allowColumnResize = true,
      allowColumnReorder = true,
      onColumnResize,
      onColumnOrderChange,
      onCellPress,
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
    const isControlled = selection != null;
    const currentSelection = React.useMemo(() => normalizeSelection(isControlled ? selection : internalSelection), [internalSelection, isControlled, selection]);

    React.useEffect(() => {
      setOrderedColumns(columns);
    }, [columns]);

    const groups = React.useMemo(() => orderedColumns.some((column) => column.group), [orderedColumns]);

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
      ({ item: row }: { item: number }) => {
        const height = typeof rowHeight === 'function' ? rowHeight(row) : rowHeight;
        const isSelected = Boolean(currentSelection.rows?.includes(row));
        return (
          <View className={dataGridRowStyle({ isSelected })} style={{ minHeight: height }}>
            {orderedColumns.map((column) => renderGridCell({ row, column }))}
          </View>
        );
      },
      [currentSelection.rows, orderedColumns, renderGridCell, rowHeight],
    );

    const totalWidth = orderedColumns.reduce((total, column) => total + getCellWidth(column, columnWidths), 0);
    const fixedRowHeight = typeof rowHeight === 'number' ? rowHeight : undefined;
    const estimatedHeight = fixedRowHeight ?? estimatedRowHeight;
    const totalHeight = rowCount * estimatedHeight;
    const visibleWindow = Math.max(initialNumToRender, Math.ceil((viewportHeight || estimatedHeight * initialNumToRender) / estimatedHeight));
    const startRow = Math.max(0, Math.floor(scrollOffset / estimatedHeight) - overscanRows);
    const endRow = Math.min(rowCount - 1, startRow + visibleWindow + overscanRows * 2 + maxToRenderPerBatch);
    const visibleRows = React.useMemo(() => {
      const rows: number[] = [];
      for (let row = startRow; row <= endRow; row += 1) rows.push(row);
      return rows;
    }, [endRow, startRow]);

    return (
      <View ref={ref} className={dataGridStyle({ class: className })} {...props}>
        <ScrollView horizontal bounces={false} style={{ flex: 1 }}>
          <View style={{ width: totalWidth, flex: 1 }}>
            {groups ? (
              <View className={dataGridGroupHeaderStyle({})} style={{ height: Math.max(28, Math.round(headerHeight * 0.72)) }}>
                {orderedColumns.map((column) => (
                  <View key={`group-${column.id}`} className="justify-center border-r border-outline-100 px-3" style={{ width: getCellWidth(column, columnWidths) }}>
                    <Text className={dataGridGroupHeaderTextStyle({})} numberOfLines={1}>{column.group ?? ''}</Text>
                  </View>
                ))}
              </View>
            ) : null}
            <View className={dataGridHeaderStyle({})}>
              {orderedColumns.map((column, index) => (
                <HeaderCell
                  key={column.id}
                  column={column}
                  index={index}
                  width={getCellWidth(column, columnWidths)}
                  height={headerHeight}
                  isSelected={Boolean(currentSelection.columns?.includes(column.id))}
                  canResize={allowColumnResize && column.resizable !== false}
                  canReorder={allowColumnReorder && column.draggable !== false}
                  renderHeaderCell={renderHeaderCell}
                  onResize={resizeColumn}
                  onMove={moveColumn}
                  onSelect={() => {
                    if (selectionScope === 'column' || selectionScope === 'mixed') toggleSelection(0, column.id, 'column');
                  }}
                />
              ))}
            </View>
            <ScrollView
              onLayout={(event) => setViewportHeight(event.nativeEvent.layout.height)}
              onScroll={(event) => setScrollOffset(event.nativeEvent.contentOffset.y)}
              scrollEventThrottle={16}
              bounces={false}
              removeClippedSubviews
              style={{ flex: 1 }}
            >
              <View style={{ height: totalHeight, position: 'relative' }}>
                {visibleRows.map((row) => {
                  const height = typeof rowHeight === 'function' ? rowHeight(row) : rowHeight;
                  return (
                    <View key={getRowKey?.(row) ?? String(row)} style={{ position: 'absolute', top: row * estimatedHeight, left: 0, right: 0, height }}>
                      {renderRow({ item: row })}
                    </View>
                  );
                })}
              </View>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    );
  },
);

DataGrid.displayName = 'DataGrid';

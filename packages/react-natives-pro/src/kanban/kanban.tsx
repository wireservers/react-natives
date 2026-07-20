import React from 'react';
import { PanResponder, ScrollView, Text, View } from 'react-native';
import { WithLicenseWatermark } from '../licensing/watermark';
import {
  columnAtX,
  insertionIndex,
  isColumnFull,
  moveCard,
  type KanbanCard,
  type KanbanColumn,
} from './kanban-utils';

export interface KanbanProps {
  columns: KanbanColumn[];
  onChange?: (columns: KanbanColumn[]) => void;
  onCardPress?: (card: KanbanCard, columnId: string) => void;
  columnWidth?: number;
  cardHeight?: number;
  className?: string;
}

interface DragState {
  cardId: string;
  fromColumn: string;
  /** Pointer position in board coordinates. */
  x: number;
  y: number;
}

/**
 * Drag-and-drop board with WIP limits.
 *
 * Two hard-won details from the Scheduler apply here as well:
 *   1. PanResponder instances are cached per card. Recreating them on the state update that a
 *      drag itself triggers makes React Native Web drop the active responder mid-gesture.
 *   2. `onPanResponderTerminationRequest` returns false, or the surrounding ScrollView claims
 *      the gesture on the first move and the release never fires.
 */
export function Kanban({
  columns,
  onChange,
  onCardPress,
  columnWidth = 240,
  cardHeight = 76,
  className,
}: KanbanProps) {
  const [drag, setDrag] = React.useState<DragState | null>(null);
  const dragRef = React.useRef<DragState | null>(null);
  const setDragState = React.useCallback((next: DragState | null) => {
    dragRef.current = next;
    setDrag(next);
  }, []);

  // Live props for the stable responders below.
  const live = React.useRef({ columns, onChange, onCardPress, columnWidth, cardHeight });
  live.current = { columns, onChange, onCardPress, columnWidth, cardHeight };

  const responders = React.useRef(new Map<string, ReturnType<typeof PanResponder.create>>());

  /** Resolve a pointer position to a concrete drop target. */
  const resolveTarget = (x: number, y: number) => {
    const { columns: cols, columnWidth: width, cardHeight: height } = live.current;
    const lefts = cols.map((_, i) => i * width);
    const widths = cols.map(() => width);
    const columnIndex = columnAtX(x, lefts, widths);
    if (columnIndex === -1) return null;

    const column = cols[columnIndex];
    const tops = column.cards.map((_, i) => i * height);
    const heights = column.cards.map(() => height);
    return { columnId: column.id, index: insertionIndex(y, tops, heights) };
  };

  const responderFor = (card: KanbanCard, fromColumn: string) => {
    const existing = responders.current.get(card.id);
    if (existing) return existing;

    const responder = PanResponder.create({
      // Claim the start so the horizontal board ScrollView cannot treat this as a pan.
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderTerminationRequest: () => false,
      onPanResponderGrant: (event) => {
        setDragState({
          cardId: card.id,
          fromColumn,
          x: event.nativeEvent.pageX,
          y: event.nativeEvent.pageY,
        });
      },
      onPanResponderMove: (event) => {
        const current = dragRef.current;
        if (!current) return;
        setDragState({ ...current, x: event.nativeEvent.pageX, y: event.nativeEvent.pageY });
      },
      onPanResponderRelease: (_event, gesture) => {
        const current = dragRef.current;
        setDragState(null);
        if (!current) return;

        // Below the slop threshold this was a tap, not a drag.
        if (Math.abs(gesture.dx) < 5 && Math.abs(gesture.dy) < 5) {
          live.current.onCardPress?.(card, fromColumn);
          return;
        }
        const target = resolveTarget(gesture.moveX, gesture.moveY);
        if (!target) return;
        const next = moveCard(live.current.columns, card.id, target);
        if (next !== live.current.columns) live.current.onChange?.(next);
      },
      onPanResponderTerminate: () => setDragState(null),
    });

    responders.current.set(card.id, responder);
    return responder;
  };

  return (
    <WithLicenseWatermark>
      <View className={className} style={{ flex: 1 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-3">
            {columns.map((column) => {
              const full = isColumnFull(column);
              return (
                <View
                  key={column.id}
                  style={{ width: columnWidth }}
                  className="rounded-lg bg-background-50 p-2"
                >
                  <View className="mb-2 flex-row items-center justify-between px-1">
                    <Text className="text-xs font-semibold text-typography-700">{column.title}</Text>
                    <Text className={`text-[10px] ${full ? 'text-error-600' : 'text-typography-400'}`}>
                      {column.cards.length}
                      {column.limit != null ? ` / ${column.limit}` : ''}
                    </Text>
                  </View>

                  <ScrollView style={{ maxHeight: 420 }}>
                    {column.cards.map((card) => {
                      const isDragging = drag?.cardId === card.id;
                      return (
                        <View
                          key={card.id}
                          {...responderFor(card, column.id).panHandlers}
                          accessibilityRole="button"
                          accessibilityLabel={`${card.title}, in ${column.title}`}
                          style={{ opacity: isDragging ? 0.4 : 1, minHeight: cardHeight - 8 }}
                          className="mb-2 rounded-md border border-outline-200 bg-background-0 p-2"
                        >
                          <Text className="text-xs font-medium text-typography-900" numberOfLines={2}>
                            {card.title}
                          </Text>
                          {card.description ? (
                            <Text className="mt-0.5 text-[10px] text-typography-500" numberOfLines={2}>
                              {card.description}
                            </Text>
                          ) : null}
                          {card.badge ? (
                            <View className="mt-1 self-start rounded-full bg-primary-100 px-2 py-0.5">
                              <Text className="text-[9px] text-primary-700">{card.badge}</Text>
                            </View>
                          ) : null}
                        </View>
                      );
                    })}

                    {column.cards.length === 0 ? (
                      <View className="items-center justify-center rounded-md border border-dashed border-outline-200 py-6">
                        <Text className="text-[10px] text-typography-400">Drop here</Text>
                      </View>
                    ) : null}
                  </ScrollView>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </WithLicenseWatermark>
  );
}

Kanban.displayName = 'Kanban';

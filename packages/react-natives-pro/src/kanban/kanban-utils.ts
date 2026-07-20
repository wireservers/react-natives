/**
 * Board reordering logic for the Kanban component.
 *
 * Pure so the index maths — which is where drag-and-drop bugs actually live — can be tested
 * without a pointer.
 */

export interface KanbanCard {
  id: string;
  title: string;
  description?: string;
  /** Free-form badge text (assignee, priority, …). */
  badge?: string;
  color?: string;
}

export interface KanbanColumn {
  id: string;
  title: string;
  cards: KanbanCard[];
  /** Refuse drops beyond this many cards. */
  limit?: number;
}

export interface DropTarget {
  columnId: string;
  /** Insertion index within the destination column. */
  index: number;
}

/** Locate a card on the board. Returns `null` when absent. */
export function findCard(columns: KanbanColumn[], cardId: string): { columnIndex: number; cardIndex: number } | null {
  for (let c = 0; c < columns.length; c += 1) {
    const index = columns[c].cards.findIndex((card) => card.id === cardId);
    if (index !== -1) return { columnIndex: c, cardIndex: index };
  }
  return null;
}

/**
 * Move a card to a new column/index, returning new column objects.
 *
 * Input is never mutated — the caller's previous state must stay intact so an optimistic drag
 * can be rolled back.
 *
 * The destination index is interpreted against the list *after* removal, which is what makes
 * same-column reordering behave: dragging item 0 to index 2 in a 3-item column lands it last,
 * not out of bounds.
 */
export function moveCard(columns: KanbanColumn[], cardId: string, target: DropTarget): KanbanColumn[] {
  const found = findCard(columns, cardId);
  if (!found) return columns;

  const destIndex = columns.findIndex((c) => c.id === target.columnId);
  if (destIndex === -1) return columns;

  const card = columns[found.columnIndex].cards[found.cardIndex];

  // Respect a WIP limit, except when reordering inside the same column.
  const destination = columns[destIndex];
  const sameColumn = destIndex === found.columnIndex;
  if (!sameColumn && destination.limit != null && destination.cards.length >= destination.limit) {
    return columns;
  }

  const next = columns.map((column) => ({ ...column, cards: [...column.cards] }));
  next[found.columnIndex].cards.splice(found.cardIndex, 1);

  const clamped = Math.max(0, Math.min(target.index, next[destIndex].cards.length));
  next[destIndex].cards.splice(clamped, 0, card);
  return next;
}

/** Insertion index for a pointer y within a column, given each card's height. */
export function insertionIndex(y: number, cardTops: number[], cardHeights: number[]): number {
  for (let i = 0; i < cardTops.length; i += 1) {
    const middle = cardTops[i] + cardHeights[i] / 2;
    if (y < middle) return i;
  }
  return cardTops.length;
}

/** Column index for a pointer x, given each column's left edge and width. */
export function columnAtX(x: number, lefts: number[], widths: number[]): number {
  for (let i = 0; i < lefts.length; i += 1) {
    if (x >= lefts[i] && x < lefts[i] + widths[i]) return i;
  }
  // Outside the board: clamp to the nearest edge rather than reporting "no column", so a
  // slightly-overshot drag still lands somewhere sensible.
  if (lefts.length === 0) return -1;
  return x < lefts[0] ? 0 : lefts.length - 1;
}

export function isColumnFull(column: KanbanColumn): boolean {
  return column.limit != null && column.cards.length >= column.limit;
}

export function cardCount(columns: KanbanColumn[]): number {
  return columns.reduce((sum, column) => sum + column.cards.length, 0);
}

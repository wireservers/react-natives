/**
 * Step sequencing and spotlight geometry for the ProductTour component.
 *
 * Pure so the placement maths — the part that silently puts a tooltip off-screen on a
 * phone — can be tested at every viewport size without rendering.
 */

export type TourPlacement = 'top' | 'bottom' | 'left' | 'right' | 'center';

export interface TourStep {
  /** Matches the `id` given to an anchor via `useTourAnchor(id)`. Omit for a centered step. */
  target?: string;
  title: string;
  body: string;
  /** Preferred placement. Flipped automatically when it doesn't fit. */
  placement?: TourPlacement;
  /** Skip this step entirely when false. Evaluated each time the tour advances. */
  enabled?: boolean;
  /** Extra space around the highlighted element, in px. */
  padding?: number;
}

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Size {
  width: number;
  height: number;
}

export function isStepEnabled(step: TourStep): boolean {
  return step.enabled !== false;
}

/** Index of the first enabled step, or -1 when the tour has nothing to show. */
export function firstStep(steps: TourStep[]): number {
  return steps.findIndex(isStepEnabled);
}

/** Next enabled step after `index`, or -1 when the tour is finished. */
export function nextStep(steps: TourStep[], index: number): number {
  for (let i = index + 1; i < steps.length; i += 1) {
    if (isStepEnabled(steps[i])) return i;
  }
  return -1;
}

/** Previous enabled step, or the current index when there is nothing behind it. */
export function previousStep(steps: TourStep[], index: number): number {
  for (let i = index - 1; i >= 0; i -= 1) {
    if (isStepEnabled(steps[i])) return i;
  }
  return index;
}

/** Position of `index` among enabled steps, and how many there are — for "3 of 7". */
export function stepPosition(steps: TourStep[], index: number): { current: number; total: number } {
  const enabled = steps.filter(isStepEnabled);
  const total = enabled.length;
  const step = steps[index];
  if (!step || !isStepEnabled(step)) return { current: 0, total };
  return { current: enabled.indexOf(step) + 1, total };
}

/** Grow a rect by `padding` on all sides, clamped so it never leaves the viewport. */
export function spotlightRect(target: Rect, padding: number, viewport: Size): Rect {
  // Computed as edges rather than width-with-corrections: clamping each edge independently
  // is the only version that stays correct when the target starts off-screen.
  const left = Math.max(0, target.x - padding);
  const top = Math.max(0, target.y - padding);
  const right = Math.min(viewport.width, target.x + target.width + padding);
  const bottom = Math.min(viewport.height, target.y + target.height + padding);
  return {
    x: left,
    y: top,
    width: Math.max(0, right - left),
    height: Math.max(0, bottom - top),
  };
}

/**
 * Resolve the placement actually used, flipping to the opposite side when the preferred one
 * has no room. Falls back to `center` when nothing fits — better a centered card than a
 * tooltip half off the screen.
 */
export function resolvePlacement(
  preferred: TourPlacement,
  spotlight: Rect,
  card: Size,
  viewport: Size,
  gap = 12,
): TourPlacement {
  if (preferred === 'center') return 'center';

  const room: Record<Exclude<TourPlacement, 'center'>, number> = {
    top: spotlight.y,
    bottom: viewport.height - (spotlight.y + spotlight.height),
    left: spotlight.x,
    right: viewport.width - (spotlight.x + spotlight.width),
  };
  const needed = (side: TourPlacement) =>
    (side === 'top' || side === 'bottom' ? card.height : card.width) + gap;

  if (room[preferred] >= needed(preferred)) return preferred;

  const opposite: Record<Exclude<TourPlacement, 'center'>, Exclude<TourPlacement, 'center'>> = {
    top: 'bottom', bottom: 'top', left: 'right', right: 'left',
  };
  const flipped = opposite[preferred];
  if (room[flipped] >= needed(flipped)) return flipped;

  // Neither axis-mate fits; try the perpendicular sides before giving up.
  for (const side of ['bottom', 'top', 'right', 'left'] as const) {
    if (room[side] >= needed(side)) return side;
  }
  return 'center';
}

/**
 * Top-left corner for the tooltip card, clamped into the viewport with an `edge` margin.
 *
 * Clamping matters more than centering: a perfectly centered card that hangs off the right
 * edge of a phone is unreadable, and this is the failure people actually report.
 */
export function cardPosition(
  placement: TourPlacement,
  spotlight: Rect,
  card: Size,
  viewport: Size,
  gap = 12,
  edge = 8,
): { x: number; y: number } {
  let x: number;
  let y: number;

  switch (placement) {
    case 'top':
      x = spotlight.x + spotlight.width / 2 - card.width / 2;
      y = spotlight.y - card.height - gap;
      break;
    case 'bottom':
      x = spotlight.x + spotlight.width / 2 - card.width / 2;
      y = spotlight.y + spotlight.height + gap;
      break;
    case 'left':
      x = spotlight.x - card.width - gap;
      y = spotlight.y + spotlight.height / 2 - card.height / 2;
      break;
    case 'right':
      x = spotlight.x + spotlight.width + gap;
      y = spotlight.y + spotlight.height / 2 - card.height / 2;
      break;
    default:
      x = viewport.width / 2 - card.width / 2;
      y = viewport.height / 2 - card.height / 2;
      break;
  }

  return {
    x: clamp(x, edge, Math.max(edge, viewport.width - card.width - edge)),
    y: clamp(y, edge, Math.max(edge, viewport.height - card.height - edge)),
  };
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * Centre of the arrow along the card's edge, relative to the card.
 *
 * Computed after the card is clamped, so the arrow keeps pointing at the target even when
 * the card slid sideways to stay on screen. Returns null when it would overhang the corner.
 */
export function arrowOffset(
  placement: TourPlacement,
  spotlight: Rect,
  cardPos: { x: number; y: number },
  card: Size,
  size = 8,
): number | null {
  const horizontal = placement === 'top' || placement === 'bottom';
  if (placement === 'center') return null;

  const targetCentre = horizontal
    ? spotlight.x + spotlight.width / 2 - cardPos.x
    : spotlight.y + spotlight.height / 2 - cardPos.y;
  const extent = horizontal ? card.width : card.height;

  const min = size + 4;
  const max = extent - size - 4;
  if (max < min) return null;
  if (targetCentre < min || targetCentre > max) return null;
  return targetCentre;
}

/** Storage key for "this user already saw tour X", so a tour auto-runs exactly once. */
export function tourStorageKey(tourId: string): string {
  return `wsui.tour.${tourId}.completed`;
}

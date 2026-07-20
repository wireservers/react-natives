import React from 'react';
import { Modal, Platform, Pressable, Text, View, useWindowDimensions } from 'react-native';
import { WithLicenseWatermark } from '../licensing/watermark';
import {
  arrowOffset,
  cardPosition,
  firstStep,
  nextStep,
  previousStep,
  resolvePlacement,
  spotlightRect,
  stepPosition,
  type Rect,
  type TourStep,
} from './tour-utils';

export interface ProductTourProps {
  steps: TourStep[];
  /** Controlled visibility. Omit to drive it with `defaultOpen`. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
  /** Fired when the user reaches the end. Not fired on skip. */
  onFinish?: () => void;
  onSkip?: () => void;
  onStepChange?: (index: number, step: TourStep) => void;
  nextLabel?: string;
  backLabel?: string;
  finishLabel?: string;
  skipLabel?: string;
  /** Default halo around the highlighted element. Per-step `padding` wins. */
  padding?: number;
  /** Advance when the user taps the highlighted element itself. */
  advanceOnTargetPress?: boolean;
  /**
   * The tree containing the tour's targets. `useTourAnchor` only reaches anchors rendered
   * inside this provider, so wrap the screen (or the app) rather than mounting the tour as
   * a sibling of what it points at.
   */
  children?: React.ReactNode;
}

type Measure = () => Promise<Rect | null>;

interface TourContextValue {
  register: (id: string, measure: Measure) => () => void;
}

const TourContext = React.createContext<TourContextValue | null>(null);

/**
 * Fallback anchor registry, used when `useTourAnchor` is called outside a `<ProductTour>`.
 *
 * Without it, calling the hook in the same component that *renders* the tour registers
 * nothing — that component sits above its own provider — and the tour silently shows an
 * un-spotlighted centred card. That is the most natural way to reach for this API, so it has
 * to work rather than merely be documented against.
 */
const globalAnchors = new Map<string, Measure>();

const warnedTargets = new Set<string>();

/**
 * Registers a view as a tour target.
 *
 * Spread the returned props onto the element you want highlighted; the `id` must match a
 * step's `target`. Works whether or not it is called beneath a `<ProductTour>`.
 */
export function useTourAnchor(id: string) {
  const context = React.useContext(TourContext);
  const ref = React.useRef<View | null>(null);

  React.useEffect(() => {
    const measure: Measure = () =>
      new Promise<Rect | null>((resolve) => {
        const node = ref.current;
        if (!node || typeof node.measureInWindow !== 'function') { resolve(null); return; }
        node.measureInWindow((x, y, width, height) => {
          // An unmounted or display:none target measures as zero — treat it as absent so the
          // tour centres its card instead of spotlighting the top-left corner.
          if (!width && !height) resolve(null);
          else resolve({ x, y, width, height });
        });
      });

    if (context) return context.register(id, measure);

    globalAnchors.set(id, measure);
    return () => {
      // Only clear the slot if it is still ours; a remount registers before the old unmounts.
      if (globalAnchors.get(id) === measure) globalAnchors.delete(id);
    };
  }, [context, id]);

  return { ref, collapsable: false } as const;
}

const CARD = { width: 300, height: 168 };

/**
 * Guided product tour: spotlight overlay, positioned tooltip, and step navigation.
 *
 * Targets are measured on each step rather than once up front, so a tour still lands
 * correctly after a layout shift, rotation, or scroll between steps.
 */
export function ProductTour({
  steps,
  open: controlledOpen,
  onOpenChange,
  defaultOpen = false,
  onFinish,
  onSkip,
  onStepChange,
  nextLabel = 'Next',
  backLabel = 'Back',
  finishLabel = 'Done',
  skipLabel = 'Skip',
  padding = 6,
  advanceOnTargetPress = true,
  children,
}: ProductTourProps) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const [index, setIndex] = React.useState(() => firstStep(steps));
  const [target, setTarget] = React.useState<Rect | null>(null);
  const viewport = useWindowDimensions();

  const open = controlledOpen ?? internalOpen;
  const anchors = React.useRef(new Map<string, () => Promise<Rect | null>>());

  const register = React.useCallback((id: string, measure: () => Promise<Rect | null>) => {
    anchors.current.set(id, measure);
    return () => { anchors.current.delete(id); };
  }, []);
  const contextValue = React.useMemo<TourContextValue>(() => ({ register }), [register]);

  const setOpen = React.useCallback((next: boolean) => {
    if (controlledOpen === undefined) setInternalOpen(next);
    onOpenChange?.(next);
  }, [controlledOpen, onOpenChange]);

  const step: TourStep | undefined = steps[index];

  const targetId = step?.target;

  // Re-measure whenever the step or the viewport changes.
  //
  // Keyed on the target *id*, never the step object: callers almost always pass `steps` as an
  // inline array literal, so the object identity changes on every render. Depending on it
  // re-fires this effect each time it sets state, which spins.
  React.useEffect(() => {
    let canceled = false;
    if (!open || !targetId) { setTarget(null); return; }

    // Anchors below this provider win; anything registered outside it still resolves.
    const measure = anchors.current.get(targetId) ?? globalAnchors.get(targetId);
    if (!measure) {
      // Warned once per id: a step pointing at an anchor that never mounted degrades to a
      // plain centred card, which looks intentional and would otherwise ship unnoticed.
      if (!warnedTargets.has(targetId)) {
        warnedTargets.add(targetId);
        console.warn(
          `[react-natives-pro] ProductTour step targets "${targetId}", but no useTourAnchor("${targetId}") is mounted. The step will render centred with no spotlight.`,
        );
      }
      setTarget(null);
      return;
    }
    void measure().then((rect) => { if (!canceled) setTarget(rect); });
    return () => { canceled = true; };
  }, [open, targetId, index, viewport.width, viewport.height]);

  const onStepChangeRef = React.useRef(onStepChange);
  onStepChangeRef.current = onStepChange;
  const stepRef = React.useRef(step);
  stepRef.current = step;
  // Same reasoning: fire on the index actually changing, not on a new object each render.
  React.useEffect(() => {
    const current = stepRef.current;
    if (open && current) onStepChangeRef.current?.(index, current);
  }, [open, index]);

  const goNext = React.useCallback(() => {
    const next = nextStep(steps, index);
    if (next === -1) {
      setOpen(false);
      setIndex(firstStep(steps));
      onFinish?.();
      return;
    }
    setIndex(next);
  }, [index, onFinish, setOpen, steps]);

  const goBack = React.useCallback(() => setIndex((i) => previousStep(steps, i)), [steps]);

  const skip = React.useCallback(() => {
    setOpen(false);
    setIndex(firstStep(steps));
    onSkip?.();
  }, [onSkip, setOpen, steps]);

  // Escape closes on web, matching every other overlay in the library.
  React.useEffect(() => {
    if (!open || Platform.OS !== 'web' || typeof document === 'undefined') return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') skip();
      else if (event.key === 'ArrowRight' || event.key === 'Enter') goNext();
      else if (event.key === 'ArrowLeft') goBack();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, skip, goNext, goBack]);

  const overlay = () => {
    if (!open || !step) return null;

    const size = { width: viewport.width, height: viewport.height };
    const spot = target ? spotlightRect(target, step.padding ?? padding, size) : null;
    const placement = spot
      ? resolvePlacement(step.placement ?? 'bottom', spot, CARD, size)
      : 'center';
    const position = cardPosition(placement, spot ?? { x: 0, y: 0, width: 0, height: 0 }, CARD, size);
    const arrow = spot ? arrowOffset(placement, spot, position, CARD) : null;
    const { current, total } = stepPosition(steps, index);
    const isLast = nextStep(steps, index) === -1;

    return (
      <Modal visible transparent animationType="fade" onRequestClose={skip}>
        <View style={{ flex: 1 }}>
          {/* Four panes around the spotlight rather than one dimmed sheet with a hole:
              React Native has no cut-out, and this keeps the target genuinely visible. */}
          {spot ? (
            <>
              <Backdrop onPress={skip} style={{ top: 0, left: 0, right: 0, height: spot.y }} />
              <Backdrop onPress={skip} style={{ top: spot.y + spot.height, left: 0, right: 0, bottom: 0 }} />
              <Backdrop onPress={skip} style={{ top: spot.y, left: 0, width: spot.x, height: spot.height }} />
              <Backdrop onPress={skip} style={{ top: spot.y, left: spot.x + spot.width, right: 0, height: spot.height }} />
              <View
                pointerEvents={advanceOnTargetPress ? 'auto' : 'none'}
                style={{
                  position: 'absolute',
                  left: spot.x, top: spot.y, width: spot.width, height: spot.height,
                  borderRadius: 8, borderWidth: 2, borderColor: '#6366f1',
                }}
              >
                {advanceOnTargetPress ? (
                  <Pressable
                    onPress={goNext}
                    accessibilityRole="button"
                    accessibilityLabel={`${step.title} — continue`}
                    style={{ flex: 1 }}
                  />
                ) : null}
              </View>
            </>
          ) : (
            <Backdrop onPress={skip} style={{ top: 0, left: 0, right: 0, bottom: 0 }} />
          )}

          <WithLicenseWatermark>
            <View
              accessibilityViewIsModal
              accessibilityLabel={`${step.title}. Step ${current} of ${total}`}
              style={{
                position: 'absolute',
                left: position.x, top: position.y, width: CARD.width,
                borderRadius: 12, padding: 16,
                backgroundColor: '#ffffff',
                shadowColor: '#0f172a', shadowOpacity: 0.18, shadowRadius: 16,
                shadowOffset: { width: 0, height: 6 }, elevation: 8,
              }}
            >
              {arrow != null ? <Arrow placement={placement} offset={arrow} /> : null}

              <Text className="text-sm font-semibold text-typography-900">{step.title}</Text>
              <Text className="mt-1 text-xs leading-5 text-typography-600">{step.body}</Text>

              <View className="mt-4 flex-row items-center justify-between">
                <Text className="text-[11px] text-typography-400">{current} of {total}</Text>
                <View className="flex-row items-center gap-2">
                  <Pressable onPress={skip} accessibilityRole="button" accessibilityLabel={skipLabel} className="px-2 py-1">
                    <Text className="text-[11px] text-typography-500">{skipLabel}</Text>
                  </Pressable>
                  {previousStep(steps, index) !== index ? (
                    <Pressable
                      onPress={goBack}
                      accessibilityRole="button"
                      accessibilityLabel={backLabel}
                      className="rounded-md border border-outline-300 px-3 py-1.5"
                    >
                      <Text className="text-xs text-typography-700">{backLabel}</Text>
                    </Pressable>
                  ) : null}
                  <Pressable
                    onPress={goNext}
                    accessibilityRole="button"
                    accessibilityLabel={isLast ? finishLabel : nextLabel}
                    className="rounded-md bg-primary-500 px-3 py-1.5"
                  >
                    <Text className="text-xs font-medium text-typography-0">
                      {isLast ? finishLabel : nextLabel}
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </WithLicenseWatermark>
        </View>
      </Modal>
    );
  };

  return (
    <TourContext.Provider value={contextValue}>
      {children}
      {overlay()}
    </TourContext.Provider>
  );
}

function Backdrop({ onPress, style }: { onPress: () => void; style: object }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityLabel="Dismiss tour"
      style={[{ position: 'absolute', backgroundColor: 'rgba(15,23,42,0.55)' }, style]}
    />
  );
}

function Arrow({ placement, offset }: { placement: string; offset: number }) {
  const base = { position: 'absolute' as const, width: 12, height: 12, backgroundColor: '#ffffff', transform: [{ rotate: '45deg' }] };
  switch (placement) {
    case 'top': return <View style={{ ...base, bottom: -6, left: offset - 6 }} />;
    case 'bottom': return <View style={{ ...base, top: -6, left: offset - 6 }} />;
    case 'left': return <View style={{ ...base, right: -6, top: offset - 6 }} />;
    case 'right': return <View style={{ ...base, left: -6, top: offset - 6 }} />;
    default: return null;
  }
}

ProductTour.displayName = 'ProductTour';

import React from 'react';
import { PanResponder, ScrollView, Text, View } from 'react-native';
import { WithLicenseWatermark } from '../licensing/watermark';
import {
  DEFAULT_GEOMETRY,
  createEventFromDrag,
  formatTimeRange,
  hourLabels,
  isSameDay,
  layoutDayEvents,
  minutesToY,
  moveEvent,
  resizeEvent,
  weekDays,
  type SchedulerEvent,
  type SchedulerGeometry,
} from './scheduler-utils';

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const TIME_GUTTER_WIDTH = 56;

export interface SchedulerProps {
  events: SchedulerEvent[];
  /** Anchor date; the week containing it is shown. Defaults to today. */
  date?: Date;
  /** 'week' shows seven days, 'day' shows only the anchor date. */
  view?: 'week' | 'day';
  geometry?: Partial<SchedulerGeometry>;
  weekStartsOn?: number;
  /** Drag on empty space to create. Omit to disable creation. */
  onEventCreate?: (draft: { start: Date; end: Date }) => void;
  /** Drag an event body to move it, or an edge to resize. */
  onEventChange?: (event: SchedulerEvent) => void;
  onEventPress?: (event: SchedulerEvent) => void;
  /** Minimum event length in minutes. Defaults to 15. */
  minDurationMinutes?: number;
  className?: string;
}

type DragState =
  | { kind: 'none' }
  | { kind: 'create'; day: Date; anchorY: number; currentY: number }
  | { kind: 'move'; event: SchedulerEvent; deltaMinutes: number }
  | { kind: 'resize'; event: SchedulerEvent; edge: 'start' | 'end'; deltaMinutes: number };

/**
 * Week/day scheduler with drag-to-create, drag-to-move, and edge resize.
 *
 * The base library's free `Calendar` already covers month/week/day *display*; this adds the
 * direct-manipulation editing on top, which is the part that is genuinely hard to build.
 *
 * Gestures are previewed optimistically and only committed on release, so a drag that is
 * cancelled leaves the underlying data untouched.
 */
export function Scheduler({
  events,
  date,
  view = 'week',
  geometry: geometryOverride,
  weekStartsOn = 0,
  onEventCreate,
  onEventChange,
  onEventPress,
  minDurationMinutes = 15,
  className,
}: SchedulerProps) {
  const geometry: SchedulerGeometry = { ...DEFAULT_GEOMETRY, ...geometryOverride };
  const anchor = React.useMemo(() => date ?? new Date(), [date]);
  const days = React.useMemo(
    () => (view === 'day' ? [anchor] : weekDays(anchor, weekStartsOn)),
    [anchor, view, weekStartsOn],
  );

  const [drag, setDrag] = React.useState<DragState>({ kind: 'none' });
  // Mirrors `drag` for the PanResponder closures, which capture stale state otherwise.
  const dragRef = React.useRef<DragState>({ kind: 'none' });
  const setDragState = React.useCallback((next: DragState) => {
    dragRef.current = next;
    setDrag(next);
  }, []);

  /**
   * Everything the gesture handlers need, behind a ref.
   *
   * The PanResponder instances below MUST stay identical across renders: granting a responder
   * triggers a state update, and if that re-render produced fresh handler props, React Native
   * Web would drop the active responder and never deliver the release — the gesture would
   * start and then silently die. Reading mutable values through this ref keeps the responders
   * stable while still seeing current props.
   */
  const live = React.useRef({ geometry, onEventCreate, onEventChange, onEventPress, minDurationMinutes });
  live.current = { geometry, onEventCreate, onEventChange, onEventPress, minDurationMinutes };

  const pxToMinutes = React.useCallback(
    (dy: number) => (dy / live.current.geometry.hourHeight) * 60,
    [],
  );
  const gridHeight = minutesToY(geometry.endHour * 60, geometry);

  /** Drag on empty space in a day column -> create. */
  const makeCreateResponder = (day: Date) =>
    PanResponder.create({
      onStartShouldSetPanResponder: () => Boolean(live.current.onEventCreate),
      onMoveShouldSetPanResponder: () => Boolean(live.current.onEventCreate),
      onPanResponderGrant: (event) => {
        const y = event.nativeEvent.locationY;
        setDragState({ kind: 'create', day, anchorY: y, currentY: y });
      },
      onPanResponderMove: (_event, gesture) => {
        const current = dragRef.current;
        if (current.kind !== 'create') return;
        setDragState({ ...current, currentY: current.anchorY + gesture.dy });
      },
      onPanResponderRelease: () => {
        const current = dragRef.current;
        setDragState({ kind: 'none' });
        const { onEventCreate: create, geometry: geo, minDurationMinutes: minDur } = live.current;
        if (current.kind !== 'create' || !create) return;
        create(createEventFromDrag(current.day, current.anchorY, current.currentY, geo, minDur));
      },
      // Refuse to hand the gesture to the scrolling ancestor. The default is to ALLOW
      // termination, so the parent ScrollView claims the drag on the first move and the
      // release never fires — the gesture starts and silently dies.
      onPanResponderTerminationRequest: () => false,
      onPanResponderTerminate: () => setDragState({ kind: 'none' }),
    });

  /** Drag an event body -> move. */
  const makeMoveResponder = (event: SchedulerEvent) =>
    PanResponder.create({
      // Claim the start so the surrounding day column cannot treat this as "create on empty
      // space". A tap is then distinguished from a drag at release time, by distance.
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => setDragState({ kind: 'move', event, deltaMinutes: 0 }),
      onPanResponderMove: (_e, gesture) => {
        setDragState({ kind: 'move', event, deltaMinutes: pxToMinutes(gesture.dy) });
      },
      onPanResponderRelease: (_e, gesture) => {
        setDragState({ kind: 'none' });
        const { onEventChange: change, onEventPress: press, geometry: geo } = live.current;
        // Below the slop threshold this was a tap, not a drag.
        if (Math.abs(gesture.dy) < 4 && Math.abs(gesture.dx) < 4) {
          press?.(event);
          return;
        }
        if (!change) return;
        change(moveEvent(event, pxToMinutes(gesture.dy), geo));
      },
      // Refuse to hand the gesture to the scrolling ancestor. The default is to ALLOW
      // termination, so the parent ScrollView claims the drag on the first move and the
      // release never fires — the gesture starts and silently dies.
      onPanResponderTerminationRequest: () => false,
      onPanResponderTerminate: () => setDragState({ kind: 'none' }),
    });

  /** Drag an event edge -> resize. */
  const makeResizeResponder = (event: SchedulerEvent, edge: 'start' | 'end') =>
    PanResponder.create({
      onStartShouldSetPanResponder: () => Boolean(live.current.onEventChange),
      onMoveShouldSetPanResponder: () => Boolean(live.current.onEventChange),
      onPanResponderGrant: () => setDragState({ kind: 'resize', event, edge, deltaMinutes: 0 }),
      onPanResponderMove: (_e, gesture) => {
        setDragState({ kind: 'resize', event, edge, deltaMinutes: pxToMinutes(gesture.dy) });
      },
      onPanResponderRelease: (_e, gesture) => {
        setDragState({ kind: 'none' });
        const { onEventChange: change, geometry: geo, minDurationMinutes: minDur } = live.current;
        if (!change) return;
        change(resizeEvent(event, edge, pxToMinutes(gesture.dy), geo, minDur));
      },
      // Refuse to hand the gesture to the scrolling ancestor. The default is to ALLOW
      // termination, so the parent ScrollView claims the drag on the first move and the
      // release never fires — the gesture starts and silently dies.
      onPanResponderTerminationRequest: () => false,
      onPanResponderTerminate: () => setDragState({ kind: 'none' }),
    });

  /**
   * Responder caches.
   *
   * Keyed by day / event id so each target keeps ONE PanResponder instance for its lifetime.
   * Recreating them per render is what silently breaks dragging: the grant triggers a state
   * update, the re-render swaps in new handlers, and the release never arrives.
   */
  const createResponders = React.useRef(new Map<string, ReturnType<typeof PanResponder.create>>());
  const moveResponders = React.useRef(new Map<string, ReturnType<typeof PanResponder.create>>());
  const resizeResponders = React.useRef(new Map<string, ReturnType<typeof PanResponder.create>>());

  const createResponder = (day: Date) => {
    const key = day.toISOString();
    let responder = createResponders.current.get(key);
    if (!responder) {
      responder = makeCreateResponder(day);
      createResponders.current.set(key, responder);
    }
    return responder;
  };

  const moveResponder = (event: SchedulerEvent) => {
    let responder = moveResponders.current.get(event.id);
    if (!responder) {
      responder = makeMoveResponder(event);
      moveResponders.current.set(event.id, responder);
    }
    return responder;
  };

  const resizeResponder = (event: SchedulerEvent, edge: 'start' | 'end') => {
    const key = `${event.id}:${edge}`;
    let responder = resizeResponders.current.get(key);
    if (!responder) {
      responder = makeResizeResponder(event, edge);
      resizeResponders.current.set(key, responder);
    }
    return responder;
  };

  /** Apply the in-flight gesture so the user sees the result before releasing. */
  const previewEvent = (event: SchedulerEvent): SchedulerEvent => {
    if (drag.kind === 'move' && drag.event.id === event.id) {
      return moveEvent(event, drag.deltaMinutes, geometry);
    }
    if (drag.kind === 'resize' && drag.event.id === event.id) {
      return resizeEvent(event, drag.edge, drag.deltaMinutes, geometry, minDurationMinutes);
    }
    return event;
  };

  const labels = hourLabels(geometry);

  return (
    <WithLicenseWatermark>
      <View className={className} style={{ flex: 1 }}>
        {/* Day headings */}
        <View className="flex-row border-b border-outline-200">
          <View style={{ width: TIME_GUTTER_WIDTH }} />
          {days.map((day) => (
            <View key={day.toISOString()} className="flex-1 items-center py-2">
              <Text className="text-[11px] text-typography-500">{DAY_LABELS[day.getDay()]}</Text>
              <Text
                className={
                  isSameDay(day, new Date())
                    ? 'text-sm font-bold text-primary-600'
                    : 'text-sm font-semibold text-typography-900'
                }
              >
                {day.getDate()}
              </Text>
            </View>
          ))}
        </View>

        <ScrollView style={{ flex: 1 }}>
          <View className="flex-row" style={{ height: gridHeight }}>
            {/* Hour gutter */}
            <View style={{ width: TIME_GUTTER_WIDTH }}>
              {labels.map((label) => (
                <Text
                  key={label.hour}
                  className="absolute text-[10px] text-typography-400"
                  style={{ top: label.y - 6, right: 6 }}
                >
                  {label.label}
                </Text>
              ))}
            </View>

            {days.map((day) => {
              const dayEvents = events.filter((event) => isSameDay(event.start, day));
              const laidOut = layoutDayEvents(dayEvents.map(previewEvent), geometry);
              const creating = drag.kind === 'create' && isSameDay(drag.day, day) ? drag : null;
              const preview = creating
                ? createEventFromDrag(creating.day, creating.anchorY, creating.currentY, geometry, minDurationMinutes)
                : null;

              return (
                <View
                  key={day.toISOString()}
                  className="flex-1 border-l border-outline-100"
                  {...createResponder(day).panHandlers}
                >
                  {/* Hour rules */}
                  {labels.map((label) => (
                    <View
                      key={label.hour}
                      className="absolute left-0 right-0 border-t border-outline-100"
                      style={{ top: label.y }}
                    />
                  ))}

                  {/* Live preview of a create drag */}
                  {preview ? (
                    <View
                      pointerEvents="none"
                      className="absolute rounded-md border border-primary-400 bg-primary-100 opacity-70"
                      style={{
                        top: minutesToY(preview.start.getHours() * 60 + preview.start.getMinutes(), geometry),
                        height: Math.max(
                          minutesToY(preview.end.getHours() * 60 + preview.end.getMinutes(), geometry) -
                            minutesToY(preview.start.getHours() * 60 + preview.start.getMinutes(), geometry),
                          8,
                        ),
                        left: 2,
                        right: 2,
                      }}
                    >
                      <Text className="px-1 text-[10px] text-primary-700">New event</Text>
                    </View>
                  ) : null}

                  {laidOut.map(({ event, top, height, column, columns }) => {
                    const widthPct = 100 / columns;
                    return (
                      <View
                        key={event.id}
                        className="absolute overflow-hidden rounded-md border border-primary-500 bg-primary-500"
                        style={{
                          top,
                          height,
                          left: `${column * widthPct}%`,
                          width: `${widthPct}%`,
                        }}
                        {...moveResponder(event).panHandlers}
                      >
                        {/* Top resize handle */}
                        <View
                          className="absolute left-0 right-0 top-0 h-2"
                          {...resizeResponder(event, 'start').panHandlers}
                        />
                        <View
                          accessibilityRole="button"
                          accessibilityLabel={`${event.title}, ${formatTimeRange(event)}`}
                          style={{ flex: 1, paddingHorizontal: 4, paddingVertical: 2 }}
                        >
                          <Text className="text-[10px] font-semibold text-typography-0" numberOfLines={1}>
                            {event.title}
                          </Text>
                          {height > 26 ? (
                            <Text className="text-[9px] text-typography-0 opacity-90" numberOfLines={1}>
                              {formatTimeRange(event)}
                            </Text>
                          ) : null}
                        </View>
                        {/* Bottom resize handle */}
                        <View
                          className="absolute bottom-0 left-0 right-0 h-2"
                          {...resizeResponder(event, 'end').panHandlers}
                        />
                      </View>
                    );
                  })}
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </WithLicenseWatermark>
  );
}

Scheduler.displayName = 'Scheduler';

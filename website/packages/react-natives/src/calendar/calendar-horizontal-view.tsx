import React, { useMemo } from 'react';
import { View, Text, Pressable } from 'react-native';
import type { DimensionValue } from 'react-native';
import { useCalendarContext } from './calendar';
import type {
  CalendarEvent as CalendarEventType,
  EventColor,
} from './types';
import {
  getTimeSlots,
  formatTimeRange,
  getWeekDates,
  getMonthDates,
  formatWeekDayShort,
  formatMonthDay,
  isSameDay,
} from './utils';
import {
  calendarHorizontalMemberColumnStyle,
  calendarHorizontalMemberCellStyle,
  calendarHorizontalAvatarStyle,
  calendarHorizontalAvatarTextStyle,
  calendarHorizontalMemberNameStyle,
  calendarHorizontalMemberRoleStyle,
  calendarHorizontalTimeHeaderStyle,
  calendarHorizontalTimeSlotHeaderStyle,
  calendarHorizontalTimeSlotHeaderTextStyle,
  calendarHorizontalRowStyle,
  calendarHorizontalGridCellStyle,
  calendarHorizontalEventStyle,
  calendarHorizontalEventTitleStyle,
  calendarHorizontalEventTimeStyle,
  calendarCompactEventStyle,
  calendarCompactEventTextStyle,
} from './styles';

const VALID_COLORS: EventColor[] = [
  'primary',
  'info',
  'success',
  'warning',
  'error',
  'tertiary',
];

function mapEventColor(color?: string): EventColor {
  if (color && VALID_COLORS.includes(color as EventColor)) {
    return color as EventColor;
  }
  return 'info';
}

// --- Day mode: percentage-positioned event blocks ---

interface HorizontalEventBlockProps {
  event: CalendarEventType;
  left: DimensionValue;
  width: DimensionValue;
  onPress?: (event: CalendarEventType) => void;
}

const HorizontalEventBlock: React.FC<HorizontalEventBlockProps> = ({
  event,
  left,
  width,
  onPress,
}) => {
  const color = mapEventColor(event.color);
  const timeStr = formatTimeRange(event.start, event.end);

  return (
    <Pressable
      className={calendarHorizontalEventStyle({ color })}
      style={{
        left,
        width,
        minWidth: 20,
        top: 4,
        bottom: 4,
      }}
      onPress={() => onPress?.(event)}
    >
      <Text
        className={calendarHorizontalEventTitleStyle({})}
        numberOfLines={1}
      >
        {event.title}
      </Text>
      <Text
        className={calendarHorizontalEventTimeStyle({})}
        numberOfLines={1}
      >
        {timeStr}
      </Text>
    </Pressable>
  );
};

interface DayMemberRowProps {
  events: CalendarEventType[];
  timeSlots: string[];
  totalMinutes: number;
  startHour: number;
  onEventPress?: (event: CalendarEventType) => void;
}

const DayMemberRow: React.FC<DayMemberRowProps> = ({
  events,
  timeSlots,
  totalMinutes,
  startHour,
  onEventPress,
}) => {
  return (
    <View className={calendarHorizontalRowStyle({})}>
      {timeSlots.map((slot) => (
        <View
          key={slot}
          className={calendarHorizontalGridCellStyle({})}
          style={{ flex: 1 }}
        />
      ))}
      {events.map((event) => {
        const minutesSinceStart =
          (event.start.getHours() - startHour) * 60 +
          event.start.getMinutes();
        const durationMinutes =
          (event.end.getTime() - event.start.getTime()) / 60000;
        const leftPct =
          `${(minutesSinceStart / totalMinutes) * 100}%` as DimensionValue;
        const widthPct =
          `${(durationMinutes / totalMinutes) * 100}%` as DimensionValue;
        return (
          <HorizontalEventBlock
            key={event.id}
            event={event}
            left={leftPct}
            width={widthPct}
            onPress={onEventPress}
          />
        );
      })}
    </View>
  );
};

// --- Week/Month mode: compact stacked events per day cell ---

interface CompactEventProps {
  event: CalendarEventType;
  onPress?: (event: CalendarEventType) => void;
}

const CompactEvent: React.FC<CompactEventProps> = ({ event, onPress }) => {
  const color = mapEventColor(event.color);
  return (
    <Pressable
      className={calendarCompactEventStyle({ color })}
      onPress={() => onPress?.(event)}
    >
      <Text className={calendarCompactEventTextStyle({})} numberOfLines={1}>
        {event.title}
      </Text>
    </Pressable>
  );
};

interface DateMemberRowProps {
  memberId: string;
  dates: Date[];
  events: CalendarEventType[];
  onEventPress?: (event: CalendarEventType) => void;
}

const DateMemberRow: React.FC<DateMemberRowProps> = ({
  dates,
  events,
  onEventPress,
}) => {
  return (
    <View
      className={calendarHorizontalRowStyle({})}
      style={{ minHeight: 72 }}
    >
      {dates.map((date) => {
        const dayEvents = events.filter((e) => isSameDay(e.start, date));
        return (
          <View
            key={date.toISOString()}
            className={calendarHorizontalGridCellStyle({})}
            style={{ flex: 1, padding: 2 }}
          >
            {dayEvents.slice(0, 3).map((event) => (
              <CompactEvent
                key={event.id}
                event={event}
                onPress={onEventPress}
              />
            ))}
            {dayEvents.length > 3 && (
              <Text className="text-2xs text-typography-400 px-1">
                +{dayEvents.length - 3}
              </Text>
            )}
          </View>
        );
      })}
    </View>
  );
};

// --- Main component ---

export const CalendarHorizontalView = React.forwardRef<
  React.ElementRef<typeof View>,
  { className?: string }
>(({ className, ...props }, ref) => {
  const {
    displayDate,
    timeRange,
    members,
    events,
    horizontalConfig: config,
    getEventsForMember,
    onEventPress,
  } = useCalendarContext();

  // Day mode: time slots
  const timeSlots = useMemo(
    () => getTimeSlots(config.startHour, config.endHour, config.slotMinutes),
    [config.startHour, config.endHour, config.slotMinutes],
  );

  const totalMinutes = (config.endHour - config.startHour) * 60;

  // Week/month mode: date columns
  const dates = useMemo(() => {
    if (timeRange === 'week') return getWeekDates(displayDate);
    if (timeRange === 'month') return getMonthDates(displayDate);
    return [];
  }, [timeRange, displayDate]);

  // Compute header labels
  const headers = useMemo(() => {
    if (timeRange === 'day') return timeSlots;
    if (timeRange === 'week') return dates.map(formatWeekDayShort);
    return dates.map(formatMonthDay);
  }, [timeRange, timeSlots, dates]);

  // Day mode: events per member for the display date
  const dayMemberEvents = useMemo(() => {
    if (timeRange !== 'day') return new Map<string, CalendarEventType[]>();
    const map = new Map<string, CalendarEventType[]>();
    members.forEach((member) => {
      map.set(member.id, getEventsForMember(member.id, displayDate));
    });
    return map;
  }, [timeRange, members, displayDate, getEventsForMember]);

  // Week/month mode: all events for each member across the date range
  const dateMemberEvents = useMemo(() => {
    if (timeRange === 'day') return new Map<string, CalendarEventType[]>();
    const map = new Map<string, CalendarEventType[]>();
    members.forEach((member) => {
      map.set(
        member.id,
        events.filter(
          (e) =>
            e.memberId === member.id &&
            dates.some((d) => isSameDay(e.start, d)),
        ),
      );
    });
    return map;
  }, [timeRange, members, events, dates]);

  const TIME_HEADER_HEIGHT = 36;

  return (
    <View ref={ref} className={className} {...props}>
      <View className="flex-row">
        {/* Fixed left column: member info */}
        <View
          className={calendarHorizontalMemberColumnStyle({})}
          style={{ width: config.memberColumnWidth }}
        >
          <View
            className="border-b border-outline-200 justify-center px-3"
            style={{ height: TIME_HEADER_HEIGHT }}
          >
            <Text className="text-xs font-medium text-typography-500">
              Team Member
            </Text>
          </View>
          {members.map((member) => (
            <View
              key={member.id}
              className={calendarHorizontalMemberCellStyle({})}
            >
              <View
                className={calendarHorizontalAvatarStyle({
                  color: member.avatarColor || 'primary',
                })}
              >
                <Text className={calendarHorizontalAvatarTextStyle({})}>
                  {member.initials}
                </Text>
              </View>
              <View>
                <Text className={calendarHorizontalMemberNameStyle({})}>
                  {member.name}
                </Text>
                {member.role && (
                  <Text className={calendarHorizontalMemberRoleStyle({})}>
                    {member.role}
                  </Text>
                )}
              </View>
            </View>
          ))}
        </View>

        {/* Right section: all modes use flex to fill 100% width */}
        <View className="flex-1">
          {/* Header row */}
          <View
            className={calendarHorizontalTimeHeaderStyle({})}
            style={{ height: TIME_HEADER_HEIGHT }}
          >
            {headers.map((label, i) => (
              <View
                key={`${label}-${i}`}
                className={calendarHorizontalTimeSlotHeaderStyle({})}
                style={{ flex: 1 }}
              >
                <Text
                  className={calendarHorizontalTimeSlotHeaderTextStyle({})}
                >
                  {label}
                </Text>
              </View>
            ))}
          </View>

          {/* Grid body: one row per member */}
          {members.map((member) =>
            timeRange === 'day' ? (
              <DayMemberRow
                key={member.id}
                events={dayMemberEvents.get(member.id) || []}
                timeSlots={timeSlots}
                totalMinutes={totalMinutes}
                startHour={config.startHour}
                onEventPress={onEventPress}
              />
            ) : (
              <DateMemberRow
                key={member.id}
                memberId={member.id}
                dates={dates}
                events={dateMemberEvents.get(member.id) || []}
                onEventPress={onEventPress}
              />
            ),
          )}
        </View>
      </View>
    </View>
  );
});

CalendarHorizontalView.displayName = 'CalendarHorizontalView';

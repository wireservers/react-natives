import React, { useMemo } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { useCalendarContext } from './calendar';
import type { CalendarEvent as CalendarEventType, EventColor } from './types';
import {
  getTimeSlots,
  formatTimeRange,
  getEventTopOffset,
  getEventHeight,
  getWeekDates,
  getMonthDates,
  formatWeekDayShort,
  formatMonthDay,
  isSameDay,
} from './utils';
import {
  calendarVerticalMemberHeaderStyle,
  calendarVerticalMemberCellStyle,
  calendarVerticalMemberNameStyle,
  calendarVerticalMemberRoleStyle,
  calendarVerticalTimeColumnStyle,
  calendarVerticalTimeCellStyle,
  calendarVerticalTimeCellTextStyle,
  calendarVerticalColumnStyle,
  calendarVerticalGridCellStyle,
  calendarVerticalEventStyle,
  calendarVerticalEventTitleStyle,
  calendarVerticalEventTimeStyle,
  calendarHorizontalAvatarStyle,
  calendarHorizontalAvatarTextStyle,
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

// --- Day mode: precisely positioned event blocks ---

interface VerticalEventBlockProps {
  event: CalendarEventType;
  top: number;
  height: number;
  onPress?: (event: CalendarEventType) => void;
}

const VerticalEventBlock: React.FC<VerticalEventBlockProps> = ({
  event,
  top,
  height,
  onPress,
}) => {
  const color = mapEventColor(event.color);
  const timeStr = formatTimeRange(event.start, event.end);

  return (
    <Pressable
      className={calendarVerticalEventStyle({ color })}
      style={{
        top,
        height: Math.max(height - 2, 20),
      }}
      onPress={() => onPress?.(event)}
    >
      <Text
        className={calendarVerticalEventTitleStyle({})}
        numberOfLines={1}
      >
        {event.title}
      </Text>
      {height > 40 && (
        <Text
          className={calendarVerticalEventTimeStyle({})}
          numberOfLines={1}
        >
          {timeStr}
        </Text>
      )}
    </Pressable>
  );
};

interface DayMemberColumnProps {
  events: CalendarEventType[];
  timeSlots: string[];
  config: {
    startHour: number;
    slotMinutes: number;
    slotHeight: number;
  };
  totalHeight: number;
  onEventPress?: (event: CalendarEventType) => void;
}

const DayMemberColumn: React.FC<DayMemberColumnProps> = ({
  events,
  timeSlots,
  config,
  totalHeight,
  onEventPress,
}) => {
  return (
    <View
      className={calendarVerticalColumnStyle({})}
      style={{ flex: 1, height: totalHeight }}
    >
      {timeSlots.map((slot) => (
        <View
          key={slot}
          className={calendarVerticalGridCellStyle({})}
          style={{ height: config.slotHeight }}
        />
      ))}
      {events.map((event) => {
        const top = getEventTopOffset(
          event.start,
          config.startHour,
          config.slotMinutes,
          config.slotHeight,
        );
        const height = getEventHeight(
          event.start,
          event.end,
          config.slotMinutes,
          config.slotHeight,
        );
        return (
          <VerticalEventBlock
            key={event.id}
            event={event}
            top={top}
            height={height}
            onPress={onEventPress}
          />
        );
      })}
    </View>
  );
};

// --- Week/Month mode: compact stacked events per date row ---

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

interface DateMemberColumnProps {
  dates: Date[];
  events: CalendarEventType[];
  rowHeight: number;
  columnWidth?: number;
  totalHeight: number;
  flexColumn?: boolean;
  onEventPress?: (event: CalendarEventType) => void;
}

const DateMemberColumn: React.FC<DateMemberColumnProps> = ({
  dates,
  events,
  rowHeight,
  columnWidth,
  totalHeight,
  flexColumn,
  onEventPress,
}) => {
  return (
    <View
      className={calendarVerticalColumnStyle({})}
      style={flexColumn ? { flex: 1, height: totalHeight } : { width: columnWidth, height: totalHeight }}
    >
      {dates.map((date) => {
        const dayEvents = events.filter((e) => isSameDay(e.start, date));
        return (
          <View
            key={date.toISOString()}
            className={calendarVerticalGridCellStyle({})}
            style={{ height: rowHeight, padding: 2 }}
          >
            {dayEvents.slice(0, 2).map((event) => (
              <CompactEvent
                key={event.id}
                event={event}
                onPress={onEventPress}
              />
            ))}
            {dayEvents.length > 2 && (
              <Text className="text-2xs text-typography-400 px-1">
                +{dayEvents.length - 2}
              </Text>
            )}
          </View>
        );
      })}
    </View>
  );
};

// --- Main component ---

export const CalendarVerticalView = React.forwardRef<
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

  // Week/month mode: date rows
  const dates = useMemo(() => {
    if (timeRange === 'week') return getWeekDates(displayDate);
    if (timeRange === 'month') return getMonthDates(displayDate);
    return [];
  }, [timeRange, displayDate]);

  // Compute row labels and row height
  const rowHeight = timeRange === 'month' ? 48 : config.slotHeight;
  const rowLabels = useMemo(() => {
    if (timeRange === 'day') return timeSlots;
    if (timeRange === 'week') return dates.map(formatWeekDayShort);
    return dates.map(formatMonthDay);
  }, [timeRange, timeSlots, dates]);

  const totalGridHeight =
    timeRange === 'day'
      ? timeSlots.length * config.slotHeight
      : dates.length * rowHeight;

  // Day mode: events per member for the display date
  const dayMemberEvents = useMemo(() => {
    if (timeRange !== 'day') return new Map<string, CalendarEventType[]>();
    const map = new Map<string, CalendarEventType[]>();
    members.forEach((member) => {
      map.set(member.id, getEventsForMember(member.id, displayDate));
    });
    return map;
  }, [timeRange, members, displayDate, getEventsForMember]);

  // Week/month mode: all events per member across the date range
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

  const MEMBER_HEADER_HEIGHT = 80;

  return (
    <View ref={ref} className={className} {...props}>
      <View className="flex-row">
        {/* Fixed left column: empty corner + row labels */}
        <View
          className={calendarVerticalTimeColumnStyle({})}
          style={{ width: config.timeColumnWidth }}
        >
          <View
            className="border-b border-outline-200"
            style={{ height: MEMBER_HEADER_HEIGHT }}
          />
          {rowLabels.map((label, i) => (
            <View
              key={`${label}-${i}`}
              className={calendarVerticalTimeCellStyle({})}
              style={{ height: timeRange === 'day' ? config.slotHeight : rowHeight }}
            >
              <Text className={calendarVerticalTimeCellTextStyle({})}>
                {label}
              </Text>
            </View>
          ))}
        </View>

        {/* Right section: member columns fill 100% width */}
        <View className="flex-1">
          {/* Member header row */}
          <View
            className={calendarVerticalMemberHeaderStyle({})}
            style={{ height: MEMBER_HEADER_HEIGHT }}
          >
            {members.map((member) => (
              <View
                key={member.id}
                className={calendarVerticalMemberCellStyle({})}
                style={{ flex: 1 }}
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
                <Text
                  className={calendarVerticalMemberNameStyle({})}
                  numberOfLines={1}
                >
                  {member.name}
                </Text>
                {member.role && (
                  <Text
                    className={calendarVerticalMemberRoleStyle({})}
                    numberOfLines={1}
                  >
                    {member.role}
                  </Text>
                )}
              </View>
            ))}
          </View>

          {/* Grid body: one column per member */}
          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator>
            <View style={{ flexDirection: 'row', width: '100%' }}>
              {members.map((member) =>
                timeRange === 'day' ? (
                  <DayMemberColumn
                    key={member.id}
                    events={dayMemberEvents.get(member.id) || []}
                    timeSlots={timeSlots}
                    config={config}
                    totalHeight={totalGridHeight}
                    onEventPress={onEventPress}
                  />
                ) : (
                  <DateMemberColumn
                    key={member.id}
                    dates={dates}
                    events={dateMemberEvents.get(member.id) || []}
                    rowHeight={rowHeight}
                    totalHeight={totalGridHeight}
                    flexColumn
                    onEventPress={onEventPress}
                  />
                ),
              )}
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
});

CalendarVerticalView.displayName = 'CalendarVerticalView';

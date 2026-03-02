import React, { useState } from 'react';
import { View } from 'react-native';
import { ExampleSection } from '../example-section';
import { VariantPicker } from '../variant-picker';
import {
  Calendar,
  CalendarHeader,
  CalendarViewSwitcher,
  CalendarHorizontalView,
  CalendarVerticalView,
  CalendarLegend,
  useCalendarContext,
} from '@wireservers-ui/react-natives';
import type {
  CalendarEventType,
  CalendarTeamMember,
  CalendarLegendItem,
  CalendarLayout,
} from '@wireservers-ui/react-natives';
import { useExampleCode } from '../example-code-context';

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth();
const day = today.getDate();

const TEAM_MEMBERS: CalendarTeamMember[] = [
  { id: 'sc', name: 'Sarah Chen', role: 'Product Manager', initials: 'SC', avatarColor: 'info' },
  { id: 'mj', name: 'Marcus Johnson', role: 'Lead Developer', initials: 'MJ', avatarColor: 'info' },
  { id: 'er', name: 'Emily Rodriguez', role: 'UX Designer', initials: 'ER', avatarColor: 'info' },
  { id: 'dp', name: 'David Park', role: 'Marketing Lead', initials: 'DP', avatarColor: 'success' },
  { id: 'aw', name: 'Aisha Williams', role: 'Sales Director', initials: 'AW', avatarColor: 'tertiary' },
];

const LEGEND_ITEMS: CalendarLegendItem[] = [
  { color: 'info', label: 'Meeting' },
  { color: 'tertiary', label: 'Focus Time' },
  { color: 'warning', label: 'Client' },
  { color: 'success', label: 'Break' },
];

const SAMPLE_EVENTS: CalendarEventType[] = [
  // Sarah Chen
  { id: 'sc1', title: 'Team Standup', start: new Date(year, month, day, 9, 0), end: new Date(year, month, day, 9, 30), color: 'info', memberId: 'sc' },
  { id: 'sc2', title: 'Product Review', start: new Date(year, month, day, 11, 0), end: new Date(year, month, day, 12, 0), color: 'info', memberId: 'sc' },
  { id: 'sc3', title: 'Client Call', start: new Date(year, month, day, 14, 0), end: new Date(year, month, day, 15, 0), color: 'warning', memberId: 'sc' },
  { id: 'sc4', title: 'Strategy Session', start: new Date(year, month, day, 14, 30), end: new Date(year, month, day, 15, 30), color: 'tertiary', memberId: 'sc' },

  // Marcus Johnson
  { id: 'mj1', title: 'Team Standup', start: new Date(year, month, day, 9, 0), end: new Date(year, month, day, 9, 30), color: 'info', memberId: 'mj' },
  { id: 'mj2', title: 'Code Review', start: new Date(year, month, day, 10, 0), end: new Date(year, month, day, 11, 0), color: 'tertiary', memberId: 'mj' },
  { id: 'mj3', title: 'Tech Talk', start: new Date(year, month, day, 10, 30), end: new Date(year, month, day, 11, 30), color: 'tertiary', memberId: 'mj' },
  { id: 'mj4', title: 'Architecture Meeting', start: new Date(year, month, day, 13, 0), end: new Date(year, month, day, 14, 0), color: 'info', memberId: 'mj' },
  { id: 'mj5', title: 'Sprint Planning', start: new Date(year, month, day, 15, 30), end: new Date(year, month, day, 16, 30), color: 'tertiary', memberId: 'mj' },

  // Emily Rodriguez
  { id: 'er1', title: 'Design Critique', start: new Date(year, month, day, 10, 0), end: new Date(year, month, day, 11, 0), color: 'info', memberId: 'er' },
  { id: 'er2', title: 'User Research', start: new Date(year, month, day, 11, 0), end: new Date(year, month, day, 12, 0), color: 'tertiary', memberId: 'er' },
  { id: 'er3', title: 'Client Call', start: new Date(year, month, day, 14, 0), end: new Date(year, month, day, 15, 0), color: 'warning', memberId: 'er' },

  // David Park
  { id: 'dp1', title: 'Campaign Review', start: new Date(year, month, day, 9, 30), end: new Date(year, month, day, 10, 30), color: 'info', memberId: 'dp' },
  { id: 'dp2', title: 'Lunch Break', start: new Date(year, month, day, 12, 0), end: new Date(year, month, day, 13, 0), color: 'success', memberId: 'dp' },
  { id: 'dp3', title: 'Brand Meeting', start: new Date(year, month, day, 12, 30), end: new Date(year, month, day, 13, 30), color: 'info', memberId: 'dp' },
  { id: 'dp4', title: 'Client Call', start: new Date(year, month, day, 14, 0), end: new Date(year, month, day, 15, 0), color: 'warning', memberId: 'dp' },
  { id: 'dp5', title: 'Content Planning', start: new Date(year, month, day, 16, 0), end: new Date(year, month, day, 17, 0), color: 'tertiary', memberId: 'dp' },

  // Aisha Williams
  { id: 'aw1', title: 'Sales Standup', start: new Date(year, month, day, 8, 30), end: new Date(year, month, day, 9, 0), color: 'info', memberId: 'aw' },
  { id: 'aw2', title: 'Prospect Demo', start: new Date(year, month, day, 10, 0), end: new Date(year, month, day, 11, 0), color: 'warning', memberId: 'aw' },
  { id: 'aw3', title: 'Deal Review', start: new Date(year, month, day, 13, 0), end: new Date(year, month, day, 14, 0), color: 'info', memberId: 'aw' },
  { id: 'aw4', title: 'Q1 Planning', start: new Date(year, month, day, 15, 0), end: new Date(year, month, day, 16, 0), color: 'tertiary', memberId: 'aw' },

  // Spread events across the week
  { id: 'w1', title: 'Team Standup', start: new Date(year, month, day + 1, 9, 0), end: new Date(year, month, day + 1, 9, 30), color: 'info', memberId: 'sc' },
  { id: 'w2', title: 'Design Review', start: new Date(year, month, day + 1, 14, 0), end: new Date(year, month, day + 1, 15, 0), color: 'info', memberId: 'er' },
  { id: 'w3', title: 'Sprint Planning', start: new Date(year, month, day + 2, 10, 0), end: new Date(year, month, day + 2, 11, 30), color: 'tertiary', memberId: 'mj' },
  { id: 'w4', title: 'Client Presentation', start: new Date(year, month, day + 2, 14, 0), end: new Date(year, month, day + 2, 15, 0), color: 'warning', memberId: 'aw' },
  { id: 'w5', title: 'Lunch & Learn', start: new Date(year, month, day + 3, 12, 0), end: new Date(year, month, day + 3, 13, 0), color: 'success', memberId: 'dp' },
  { id: 'w6', title: 'Deploy v2.0', start: new Date(year, month, day + 4, 16, 0), end: new Date(year, month, day + 4, 17, 0), color: 'error', memberId: 'mj' },
  { id: 'w7', title: 'Retro', start: new Date(year, month, day + 5, 15, 0), end: new Date(year, month, day + 5, 16, 0), color: 'info', memberId: 'sc' },
];

function CalendarBody() {
  const { layout } = useCalendarContext();
  if (layout === 'vertical') return <CalendarVerticalView />;
  return <CalendarHorizontalView />;
}

export default function CalendarExamples() {
  const [layout, setLayout] = useState<string>('horizontal');

  useExampleCode(`import { Calendar, CalendarHeader, CalendarViewSwitcher, CalendarHorizontalView, CalendarVerticalView, CalendarLegend } from '@wireservers-ui/react-natives';

export default function Example() {
  return (
    <Calendar events={events} members={members} initialLayout="${layout}">
      <CalendarLegend items={legendItems} />
      <CalendarHeader />
      <CalendarViewSwitcher target="timeRange" />
      <CalendarViewSwitcher target="layout" />
      {layout === 'vertical' ? <CalendarVerticalView /> : <CalendarHorizontalView />}
    </Calendar>
  );
}`, [layout]);

  return (
    <View style={{ gap: 24 }}>
      <ExampleSection
        title="Team Calendar"
        description="Full calendar with header, view switchers, legend, and event grid. Use the switchers to change between day/week/month and horizontal/vertical layouts."
      >
        <VariantPicker
          label="Initial Layout"
          options={['horizontal', 'vertical']}
          value={layout}
          onChange={setLayout}
        />

        <View style={{ minHeight: 500 }}>
          <Calendar
            events={SAMPLE_EVENTS}
            members={TEAM_MEMBERS}
            initialLayout={layout as CalendarLayout}
            onDateSelect={(date) => console.log('Selected:', date.toDateString())}
            onEventPress={(event) => console.log('Event:', event.title)}
          >
            <CalendarLegend items={LEGEND_ITEMS} className="mb-2" />
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <CalendarHeader />
              <View style={{ flexDirection: 'row', gap: 8 }}>
                <CalendarViewSwitcher target="timeRange" />
                <CalendarViewSwitcher target="layout" />
              </View>
            </View>
            <CalendarBody />
          </Calendar>
        </View>
      </ExampleSection>

      <ExampleSection
        title="Minimal Calendar"
        description="A simpler setup with just the header and a single layout view, no legend or view switchers."
      >
        <View style={{ minHeight: 400 }}>
          <Calendar
            events={SAMPLE_EVENTS.filter((e) => e.memberId === 'sc')}
            members={TEAM_MEMBERS.filter((m) => m.id === 'sc')}
          >
            <CalendarHeader />
            <CalendarHorizontalView />
          </Calendar>
        </View>
      </ExampleSection>
    </View>
  );
}

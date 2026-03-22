import React, { useState } from 'react';
import { View } from 'react-native';
import { ExampleSection } from '../example-section';
import {
  DatePicker, DatePickerTrigger, DatePickerInput, DatePickerContent,
  useDatePickerContext,
  Calendar, CalendarHeader, CalendarMonthView,
  Text,
} from '@wireservers-ui/react-natives';
import { useExampleCode } from '../example-code-context';

/** Bridges the Calendar's onDateSelect to the DatePicker context. */
function DatePickerCalendar() {
  const { onDateSelect } = useDatePickerContext();
  return (
    <Calendar initialTimeRange="month" onDateSelect={onDateSelect}>
      <CalendarHeader />
      <CalendarMonthView />
    </Calendar>
  );
}

export default function DatePickerExamples() {
  const [date, setDate] = useState<Date | undefined>(undefined);

  useExampleCode(`import {
  DatePicker, DatePickerTrigger, DatePickerInput, DatePickerContent,
  useDatePickerContext,
  Calendar, CalendarHeader, CalendarMonthView,
} from '@wireservers-ui/react-natives';

// You can place any content or calendar inside DatePickerContent.
// Below shows how to use our Calendar component with the DatePicker.

function DatePickerCalendar() {
  // useDatePickerContext() gives access to onDateSelect,
  // which updates the selected date and closes the picker.
  const { onDateSelect } = useDatePickerContext();

  return (
    <Calendar initialTimeRange="month" onDateSelect={onDateSelect}>
      <CalendarHeader />
      <CalendarMonthView />
    </Calendar>
  );
}

export default function Example() {
  const [date, setDate] = useState<Date | undefined>();
  return (
    <DatePicker value={date} onChange={setDate}>
      <DatePickerTrigger>
        <DatePickerInput placeholder="Select a date" />
      </DatePickerTrigger>
      <DatePickerContent>
        <DatePickerCalendar />
      </DatePickerContent>
    </DatePicker>
  );
}`, []);

  return (
    <View style={{ gap: 24 }}>
      <ExampleSection title="Date Picker" description="A date picker using our Calendar component. Tap the input to open, then pick a date."
        code={`import { useState } from 'react';
import {
  DatePicker, DatePickerTrigger, DatePickerInput, DatePickerContent,
  useDatePickerContext,
  Calendar, CalendarHeader, CalendarMonthView,
} from '@wireservers-ui/react-natives';

function DatePickerCalendar() {
  const { onDateSelect } = useDatePickerContext();
  return (
    <Calendar initialTimeRange="month" onDateSelect={onDateSelect}>
      <CalendarHeader />
      <CalendarMonthView />
    </Calendar>
  );
}

export default function Example() {
  const [date, setDate] = useState<Date | undefined>();
  return (
    <DatePicker value={date} onChange={setDate}>
      <DatePickerTrigger>
        <DatePickerInput placeholder="Select a date" />
      </DatePickerTrigger>
      <DatePickerContent>
        <DatePickerCalendar />
      </DatePickerContent>
    </DatePicker>
  );
}`}
      >
        <View style={{ maxWidth: 320 }}>
          <DatePicker value={date} onChange={setDate}>
            <DatePickerTrigger>
              <DatePickerInput placeholder="Select a date" />
            </DatePickerTrigger>
            <DatePickerContent>
              <DatePickerCalendar />
            </DatePickerContent>
          </DatePicker>
        </View>
        {date && <Text className="text-sm text-typography-500 mt-1">Selected: {date.toLocaleDateString()}</Text>}
      </ExampleSection>
    </View>
  );
}

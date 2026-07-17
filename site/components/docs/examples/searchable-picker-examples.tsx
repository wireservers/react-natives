import React from 'react';
import { View } from 'react-native';
import { ExampleSection } from '../example-section';
import { SearchablePicker, Text } from '@wireservers-ui/react-natives';
import { useExampleCode } from '../example-code-context';

const options = [
  { value: 'checking', label: 'Checking', group: 'Accounts', icon: 'C' },
  { value: 'savings', label: 'Savings', group: 'Accounts', icon: 'S' },
  { value: 'rent', label: 'Rent', group: 'Categories', icon: 'R' },
  { value: 'utilities', label: 'Utilities', group: 'Categories', icon: 'U' },
];

export default function SearchablePickerExamples() {
  const [value, setValue] = React.useState('checking');

  useExampleCode(`import { SearchablePicker } from '@wireservers-ui/react-natives';

export default function Example() {
  return (
    <SearchablePicker
      label="Account"
      value="checking"
      onChange={() => {}}
      options={[
        { value: 'checking', label: 'Checking', group: 'Accounts' },
        { value: 'savings', label: 'Savings', group: 'Accounts' },
      ]}
      emptyText="No matches"
    />
  );
}`);

  return (
    <View style={{ gap: 24 }}>
      <ExampleSection title="Grouped Search" description="Search and select from grouped options.">
        <SearchablePicker
          label="Destination"
          value={value}
          onChange={setValue}
          options={options}
          placeholder="Search accounts or categories"
          emptyText="No matches"
        />
        <Text size="sm" className="text-typography-500">
          Selected: {value}
        </Text>
      </ExampleSection>
    </View>
  );
}

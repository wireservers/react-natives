import React from 'react';
import { View } from 'react-native';
import { ExampleSection } from '../example-section';
import { Text, ViewToggle } from '@wireservers-ui/react-natives';
import { useExampleCode } from '../example-code-context';

const modes = [
  { mode: 'cards', label: 'Cards', icon: (selected: boolean) => <Text className={selected ? 'text-white' : 'text-typography-600'}>C</Text> },
  { mode: 'list', label: 'List', icon: (selected: boolean) => <Text className={selected ? 'text-white' : 'text-typography-600'}>L</Text> },
  { mode: 'compact', label: 'Compact', icon: (selected: boolean) => <Text className={selected ? 'text-white' : 'text-typography-600'}>D</Text> },
] as const;

export default function ViewToggleExamples() {
  const [value, setValue] = React.useState<'cards' | 'list' | 'compact'>('cards');

  useExampleCode(`import { ViewToggle } from '@wireservers-ui/react-natives';

export default function Example() {
  return (
    <ViewToggle
      value="cards"
      onChange={() => {}}
      modes={[
        { mode: 'cards', label: 'Cards' },
        { mode: 'list', label: 'List' },
      ]}
    />
  );
}`);

  return (
    <View style={{ gap: 24 }}>
      <ExampleSection title="Display Modes" description="Toggle between presentation modes.">
        <ViewToggle value={value} onChange={setValue} modes={[...modes]} />
        <Text size="sm" className="text-typography-500">
          Mode: {value}
        </Text>
      </ExampleSection>
    </View>
  );
}

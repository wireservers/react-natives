import React, { useState } from 'react';
import { View } from 'react-native';
import { ExampleSection } from '../example-section';
import { VariantPicker } from '../variant-picker';
import { SegmentedControl, SegmentedControlItem, Text } from '@wireservers-ui/react-natives';
import { useExampleCode } from '../example-code-context';

const sizes = ['sm', 'md', 'lg'] as const;

export default function SegmentedControlExamples() {
  const [size, setSize] = useState<string>('md');
  const [value, setValue] = useState('all');

  useExampleCode(`import { SegmentedControl, SegmentedControlItem, Text } from '@wireservers-ui/react-natives';

export default function Example() {
  const [value, setValue] = useState('all');
  return (
    <SegmentedControl value={value} onValueChange={setValue} size="${size}">
      <SegmentedControlItem value="all"><Text>All</Text></SegmentedControlItem>
      <SegmentedControlItem value="active"><Text>Active</Text></SegmentedControlItem>
      <SegmentedControlItem value="completed"><Text>Completed</Text></SegmentedControlItem>
    </SegmentedControl>
  );
}`, [size]);

  return (
    <View style={{ gap: 24 }}>
      <ExampleSection title="Interactive" description="Switch between segmented views.">
        <VariantPicker label="Size" options={[...sizes]} value={size} onChange={setSize} />
        <SegmentedControl value={value} onValueChange={setValue} size={size as any} className="mt-2">
          <SegmentedControlItem value="all"><Text>All</Text></SegmentedControlItem>
          <SegmentedControlItem value="active"><Text>Active</Text></SegmentedControlItem>
          <SegmentedControlItem value="completed"><Text>Completed</Text></SegmentedControlItem>
        </SegmentedControl>
        <Text className="text-sm text-typography-500 mt-1">Selected: {value}</Text>
      </ExampleSection>
    </View>
  );
}

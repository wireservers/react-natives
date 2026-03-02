import React, { useState } from 'react';
import { View } from 'react-native';
import { ExampleSection } from '../example-section';
import { VariantPicker } from '../variant-picker';
import { ToggleGroup, ToggleGroupItem, Text } from '@wireservers-ui/react-natives';
import { useExampleCode } from '../example-code-context';

const types = ['single', 'multiple'] as const;

export default function ToggleGroupExamples() {
  const [type, setType] = useState<string>('single');
  const [value, setValue] = useState<string | string[]>('center');

  const valueStr = type === 'single'
    ? `"${value}"`
    : `[${(value as string[]).map(v => `"${v}"`).join(', ')}]`;

  useExampleCode(`import { ToggleGroup, ToggleGroupItem, Text } from '@wireservers-ui/react-natives';

export default function Example() {
  return (
    <ToggleGroup type="${type}" value={${valueStr}}>
      <ToggleGroupItem value="left"><Text>Left</Text></ToggleGroupItem>
      <ToggleGroupItem value="center"><Text>Center</Text></ToggleGroupItem>
      <ToggleGroupItem value="right"><Text>Right</Text></ToggleGroupItem>
    </ToggleGroup>
  );
}`, [type, value]);

  return (
    <View style={{ gap: 24 }}>
      <ExampleSection title="Interactive" description="Choose between single and multiple selection.">
        <VariantPicker label="Type" options={[...types]} value={type} onChange={(t) => { setType(t); setValue(t === 'single' ? 'center' : ['center']); }} />
        <View style={{ marginTop: 8, alignItems: 'flex-start' }}>
          <ToggleGroup type={type as any} value={value} onValueChange={setValue}>
            <ToggleGroupItem value="left"><Text>Left</Text></ToggleGroupItem>
            <ToggleGroupItem value="center"><Text>Center</Text></ToggleGroupItem>
            <ToggleGroupItem value="right"><Text>Right</Text></ToggleGroupItem>
          </ToggleGroup>
        </View>
      </ExampleSection>
    </View>
  );
}

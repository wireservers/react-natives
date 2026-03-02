import React, { useState } from 'react';
import { View, Text as RNText } from 'react-native';
import { ExampleSection } from '../example-section';
import { VariantPicker } from '../variant-picker';
import { CircularProgress, CircularProgressLabel, Text } from '@wireservers-ui/react-natives';
import { useExampleCode } from '../example-code-context';

const sizes = ['sm', 'md', 'lg', 'xl'] as const;

export default function CircularProgressExamples() {
  const [size, setSize] = useState<string>('md');

  useExampleCode(`import { CircularProgress, CircularProgressLabel } from '@wireservers-ui/react-natives';

export default function Example() {
  return (
    <CircularProgress value={65} size="${size}">
      <CircularProgressLabel>65%</CircularProgressLabel>
    </CircularProgress>
  );
}`, [size]);

  return (
    <View style={{ gap: 24 }}>
      <ExampleSection title="Interactive" description="Adjust the size of the circular progress.">
        <VariantPicker label="Size" options={[...sizes]} value={size} onChange={setSize} />
        <View style={{ marginTop: 8, alignItems: 'flex-start' }}>
          <CircularProgress value={65} size={size as any}>
            <CircularProgressLabel>65%</CircularProgressLabel>
          </CircularProgress>
        </View>
      </ExampleSection>

      <ExampleSection title="Various Values" description="Circular progress at different completion levels.">
        <View style={{ flexDirection: 'row', gap: 16, alignItems: 'flex-end' }}>
          {[25, 50, 75, 100].map(v => (
            <CircularProgress key={v} value={v} size="md">
              <CircularProgressLabel>{v}%</CircularProgressLabel>
            </CircularProgress>
          ))}
        </View>
      </ExampleSection>
    </View>
  );
}

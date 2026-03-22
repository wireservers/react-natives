import React, { useState } from 'react';
import { View } from 'react-native';
import { ExampleSection } from '../example-section';
import { VariantPicker } from '../variant-picker';
import { PinInput, PinInputField, Text } from '@wireservers-ui/react-natives';
import { useExampleCode } from '../example-code-context';

const sizes = ['sm', 'md', 'lg'] as const;

export default function PinInputExamples() {
  const [size, setSize] = useState<string>('md');
  const [value, setValue] = useState('');

  useExampleCode(`import { PinInput, PinInputField } from '@wireservers-ui/react-natives';

export default function Example() {
  return (
    <PinInput length={4} size="${size}">
      <PinInputField index={0} />
      <PinInputField index={1} />
      <PinInputField index={2} />
      <PinInputField index={3} />
    </PinInput>
  );
}`, [size]);

  return (
    <View style={{ gap: 24 }}>
      <ExampleSection title="Interactive" description="A multi-digit PIN/OTP input.">
        <VariantPicker label="Size" options={[...sizes]} value={size} onChange={setSize} />
        <View style={{ marginTop: 8, alignItems: 'flex-start' }}>
          <PinInput length={4} value={value} onChange={setValue} size={size as any}>
            <PinInputField index={0} />
            <PinInputField index={1} />
            <PinInputField index={2} />
            <PinInputField index={3} />
          </PinInput>
        </View>
        {value.length === 4 && <Text className="text-sm text-success-500 mt-1">PIN entered: {value}</Text>}
      </ExampleSection>

      <ExampleSection title="6-Digit Code" description="A longer PIN input for verification codes." code={`import { PinInput, PinInputField } from '@wireservers-ui/react-natives';

export default function Example() {
  return (
    <PinInput length={6}>
      <PinInputField index={0} />
      <PinInputField index={1} />
      <PinInputField index={2} />
      <PinInputField index={3} />
      <PinInputField index={4} />
      <PinInputField index={5} />
    </PinInput>
  );
}`}>
        <PinInput length={6} size="md">
          {[0, 1, 2, 3, 4, 5].map(i => (
            <PinInputField key={i} index={i} />
          ))}
        </PinInput>
      </ExampleSection>
    </View>
  );
}

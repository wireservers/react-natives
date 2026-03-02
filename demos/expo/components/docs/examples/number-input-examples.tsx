import React, { useState } from 'react';
import { View } from 'react-native';
import { ExampleSection } from '../example-section';
import { VariantPicker } from '../variant-picker';
import { NumberInput, NumberInputField, NumberInputStepper, NumberInputIncrementButton, NumberInputDecrementButton, Text } from '@wireservers-ui/react-natives';
import { useExampleCode } from '../example-code-context';

const sizes = ['sm', 'md', 'lg'] as const;

export default function NumberInputExamples() {
  const [size, setSize] = useState<string>('md');
  const [value, setValue] = useState(0);

  useExampleCode(`import { NumberInput, NumberInputField, NumberInputStepper, NumberInputIncrementButton, NumberInputDecrementButton } from '@wireservers-ui/react-natives';

export default function Example() {
  return (
    <NumberInput defaultValue={0} min={0} max={100} size="${size}">
      <NumberInputField placeholder="Enter number" />
      <NumberInputStepper>
        <NumberInputIncrementButton />
        <NumberInputDecrementButton />
      </NumberInputStepper>
    </NumberInput>
  );
}`, [size]);

  return (
    <View style={{ gap: 24 }}>
      <ExampleSection title="Interactive" description="A numeric input with increment/decrement buttons.">
        <VariantPicker label="Size" options={[...sizes]} value={size} onChange={setSize} />
        <View style={{ marginTop: 8, maxWidth: 320 }}>
          <NumberInput value={value} onChange={setValue} min={0} max={100} size={size as any}>
            <NumberInputField placeholder="Enter number" />
            <NumberInputStepper>
              <NumberInputIncrementButton />
              <NumberInputDecrementButton />
            </NumberInputStepper>
          </NumberInput>
        </View>
        <Text className="text-sm text-typography-500 mt-1">Value: {value}</Text>
      </ExampleSection>
    </View>
  );
}

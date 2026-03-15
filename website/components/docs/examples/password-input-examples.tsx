import React, { useState } from 'react';
import { View } from 'react-native';
import { ExampleSection } from '../example-section';
import { VariantPicker } from '../variant-picker';
import { PasswordInput, PasswordInputField, PasswordInputToggle, Text } from '@wireservers-ui/react-natives';
import { useExampleCode } from '../example-code-context';

const sizes = ['sm', 'md', 'lg'] as const;

export default function PasswordInputExamples() {
  const [size, setSize] = useState<string>('md');

  useExampleCode(`import { PasswordInput, PasswordInputField, PasswordInputToggle } from '@wireservers-ui/react-natives';

export default function Example() {
  return (
    <PasswordInput size="${size}">
      <PasswordInputField placeholder="Enter password" />
      <PasswordInputToggle />
    </PasswordInput>
  );
}`, [size]);

  return (
    <View style={{ gap: 24 }}>
      <ExampleSection title="Interactive" description="A password input with show/hide toggle.">
        <VariantPicker label="Size" options={[...sizes]} value={size} onChange={setSize} />
        <View style={{ marginTop: 8, maxWidth: 320 }}>
          <PasswordInput size={size as any}>
            <PasswordInputField placeholder="Enter password" />
            <PasswordInputToggle />
          </PasswordInput>
        </View>
      </ExampleSection>
    </View>
  );
}

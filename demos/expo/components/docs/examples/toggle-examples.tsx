import React, { useState } from 'react';
import { View } from 'react-native';
import { ExampleSection } from '../example-section';
import { VariantPicker } from '../variant-picker';
import { Toggle, Text } from '@wireservers-ui/react-natives';
import { useExampleCode } from '../example-code-context';

const variants = ['outline', 'solid'] as const;
const sizes = ['sm', 'md', 'lg'] as const;

export default function ToggleExamples() {
  const [variant, setVariant] = useState<string>('outline');
  const [size, setSize] = useState<string>('md');
  const [pressed, setPressed] = useState(false);

  useExampleCode(`import { Toggle, Text } from '@wireservers-ui/react-natives';
import { useState } from 'react';

export default function Example() {
  const [pressed, setPressed] = useState(false);
  return (
    <Toggle
      isPressed={pressed}
      onPressedChange={setPressed}
      variant="${variant}"
      size="${size}"
    >
      <Text>{pressed ? 'On' : 'Off'}</Text>
    </Toggle>
  );
}`, [variant, size]);

  return (
    <View style={{ gap: 24 }}>
      <ExampleSection title="Interactive" description="Toggle a button on and off.">
        <VariantPicker label="Variant" options={[...variants]} value={variant} onChange={setVariant} />
        <VariantPicker label="Size" options={[...sizes]} value={size} onChange={setSize} />
        <View style={{ marginTop: 8, alignItems: 'flex-start' }}>
          <Toggle isPressed={pressed} onPressedChange={setPressed} variant={variant as any} size={size as any}>
            <Text>{pressed ? 'On' : 'Off'}</Text>
          </Toggle>
        </View>
      </ExampleSection>
    </View>
  );
}

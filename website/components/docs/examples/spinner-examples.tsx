import React, { useState } from 'react';
import { View, Text as RNText } from 'react-native';
import { ExampleSection } from '../example-section';
import { VariantPicker } from '../variant-picker';
import { Spinner } from '@wireservers-ui/react-natives';
import { useExampleCode } from '../example-code-context';

const sizes = ['sm', 'md', 'lg'] as const;

export default function SpinnerExamples() {
  const [size, setSize] = useState<string>('md');

  useExampleCode(`import { Spinner } from '@wireservers-ui/react-natives';

export default function Example() {
  return <Spinner size="${size}" />;
}`, [size]);

  return (
    <View style={{ gap: 24 }}>
      {/* Interactive Example */}
      <ExampleSection
        title="Interactive"
        description="Select a size to preview the Spinner component."
      >
        <VariantPicker
          label="Size"
          options={[...sizes]}
          value={size}
          onChange={setSize}
        />

        <View style={{ marginTop: 8, alignItems: 'flex-start' }}>
          <Spinner size={size as any} />
        </View>
      </ExampleSection>

      {/* All Sizes */}
      <ExampleSection
        title="All Sizes"
        description="Spinners render at small (16px), medium (32px), and large (48px)."
        code={`import { Spinner } from '@wireservers-ui/react-natives';
import { View, Text } from 'react-native';

export default function Example() {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 24 }}>
      <View style={{ alignItems: 'center', gap: 8 }}>
        <Spinner size="sm" />
        <Text>sm</Text>
      </View>
      <View style={{ alignItems: 'center', gap: 8 }}>
        <Spinner size="md" />
        <Text>md</Text>
      </View>
      <View style={{ alignItems: 'center', gap: 8 }}>
        <Spinner size="lg" />
        <Text>lg</Text>
      </View>
    </View>
  );
}`}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 24 }}>
          {sizes.map((s) => (
            <View key={s} style={{ alignItems: 'center', gap: 8 }}>
              <Spinner size={s} />
              <RNText style={{ fontSize: 12, color: '#6b7280' }}>{s}</RNText>
            </View>
          ))}
        </View>
      </ExampleSection>

      {/* Custom Color */}
      <ExampleSection
        title="Custom Color"
        description="Pass a color prop to tint the spinner."
        code={`import { Spinner } from '@wireservers-ui/react-natives';
import { View } from 'react-native';

export default function Example() {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 24 }}>
      <Spinner size="md" color="#6366f1" />
      <Spinner size="md" color="#ef4444" />
      <Spinner size="md" color="#22c55e" />
    </View>
  );
}`}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 24 }}>
          <Spinner size="md" color="#6366f1" />
          <Spinner size="md" color="#ef4444" />
          <Spinner size="md" color="#22c55e" />
        </View>
      </ExampleSection>
    </View>
  );
}

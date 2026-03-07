import React, { useState } from 'react';
import { View, Text as RNText } from 'react-native';
import { ExampleSection } from '../example-section';
import { VariantPicker } from '../variant-picker';
import { Icon } from '@wireservers-ui/react-natives';
import { useExampleCode } from '../example-code-context';

const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;

/** Placeholder box component used as an icon stand-in via the `as` prop. */
function PlaceholderIcon({ className, size, ...props }: { className?: string; size?: number }) {
  return (
    <View
      style={[
        { backgroundColor: '#6366f1', borderRadius: 2 },
        size ? { width: size, height: size } : undefined,
      ]}
      {...props}
    />
  );
}

export default function IconExamples() {
  const [size, setSize] = useState<string>('md');

  useExampleCode(`import { Icon } from '@wireservers-ui/react-natives';
import { Star } from 'lucide-react-native';

export default function Example() {
  return <Icon as={Star} size="${size}" />;
}`, [size]);

  return (
    <View style={{ gap: 24 }}>
      {/* Interactive Example */}
      <ExampleSection
        title="Interactive"
        description="Select a size to preview the Icon component using a placeholder box."
      >
        <VariantPicker
          label="Size"
          options={[...sizes]}
          value={size}
          onChange={setSize}
        />

        <View style={{ marginTop: 8, alignItems: 'flex-start' }}>
          <Icon as={PlaceholderIcon} size={size as any} />
        </View>
      </ExampleSection>

      {/* All Sizes */}
      <ExampleSection
        title="All Sizes"
        description="Icons scale from xs (16px) through 2xl (48px)."
        code={`import { Icon } from '@wireservers-ui/react-natives';
import { Star } from 'lucide-react-native';

export default function Example() {
  return <Icon as={Star} size="lg" />;
}`}
      >
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 16 }}>
          {sizes.map((s) => (
            <View key={s} style={{ alignItems: 'center', gap: 8 }}>
              <Icon as={PlaceholderIcon} size={s} />
              <RNText style={{ fontSize: 10, color: '#8c8c8c' }}>{s}</RNText>
            </View>
          ))}
        </View>
      </ExampleSection>

      {/* Numeric Size */}
      <ExampleSection
        title="Custom Numeric Size"
        description="Pass a number to the size prop for pixel-exact sizing."
        code={`import { Icon } from '@wireservers-ui/react-natives';
import { Star } from 'lucide-react-native';

export default function Example() {
  return <Icon as={Star} size={32} />;
}`}
      >
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 16 }}>
          {[16, 24, 32, 48].map((n) => (
            <View key={n} style={{ alignItems: 'center', gap: 8 }}>
              <Icon as={PlaceholderIcon} size={n} />
              <RNText style={{ fontSize: 10, color: '#8c8c8c' }}>{n}px</RNText>
            </View>
          ))}
        </View>
      </ExampleSection>
    </View>
  );
}

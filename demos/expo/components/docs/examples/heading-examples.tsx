import React, { useState } from 'react';
import { View } from 'react-native';
import { ExampleSection } from '../example-section';
import { VariantPicker } from '../variant-picker';
import { Heading } from '@wireservers-ui/react-natives';
import { useExampleCode } from '../example-code-context';

const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl'] as const;

export default function HeadingExamples() {
  const [size, setSize] = useState<string>('lg');

  useExampleCode(`import { Heading } from '@wireservers-ui/react-natives';

export default function Example() {
  return (
    <Heading size="${size}">Heading Preview</Heading>
  );
}`, [size]);

  return (
    <View style={{ gap: 24 }}>
      {/* Interactive Example */}
      <ExampleSection
        title="Interactive"
        description="Select a size to preview the Heading component."
      >
        <VariantPicker
          label="Size"
          options={[...sizes]}
          value={size}
          onChange={setSize}
        />

        <View style={{ marginTop: 8 }}>
          <Heading size={size as any}>Heading Preview</Heading>
        </View>
      </ExampleSection>

      {/* All Sizes */}
      <ExampleSection
        title="All Sizes"
        description="Headings render from xs through 5xl, defaulting to lg."
        code={`import { Heading } from '@wireservers-ui/react-natives';

export default function Example() {
  return <Heading size="xl">The quick brown fox</Heading>;
}`}
      >
        <View style={{ gap: 16 }}>
          {sizes.map((s) => (
            <View key={s} style={{ gap: 4 }}>
              <Heading size="xs" className="text-typography-400">
                size=&quot;{s}&quot;
              </Heading>
              <Heading size={s}>The quick brown fox</Heading>
            </View>
          ))}
        </View>
      </ExampleSection>

      {/* Truncation */}
      <ExampleSection
        title="Truncation"
        description="Use isTruncated to clip overflowing heading text."
        code={`import { Heading } from '@wireservers-ui/react-natives';

export default function Example() {
  return (
    <Heading size="lg" isTruncated>
      This is a very long heading that should be truncated
    </Heading>
  );
}`}
      >
        <View style={{ width: 192 }}>
          <Heading size="lg" isTruncated>
            This is a very long heading that should be truncated
          </Heading>
        </View>
      </ExampleSection>
    </View>
  );
}

import React, { useState } from 'react';
import { View } from 'react-native';
import { ExampleSection } from '../example-section';
import { VariantPicker, BooleanPicker } from '../variant-picker';
import { Text } from '@wireservers-ui/react-natives';
import { useExampleCode } from '../example-code-context';

const sizes = ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;
const weights = ['normal', 'medium', 'semibold', 'bold', 'extrabold'] as const;

export default function TextExamples() {
  const [size, setSize] = useState<string>('md');
  const [weight, setWeight] = useState<string>('normal');
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);

  const boolProps = [bold && 'bold', italic && 'italic', isTruncated && 'isTruncated'].filter(Boolean);
  useExampleCode(`import { Text } from '@wireservers-ui/react-natives';

export default function Example() {
  return (
    <Text size="${size}" weight="${weight}"${boolProps.map(p => `\n      ${p}`).join('')}>
      The quick brown fox jumps over the lazy dog.
    </Text>
  );
}`, [size, weight, bold, italic, isTruncated]);

  return (
    <View style={{ gap: 24 }}>
      {/* Interactive Example */}
      <ExampleSection
        title="Interactive"
        description="Adjust size, weight, and modifiers to preview the Text component."
      >
        <VariantPicker
          label="Size"
          options={[...sizes]}
          value={size}
          onChange={setSize}
        />
        <VariantPicker
          label="Weight"
          options={[...weights]}
          value={weight}
          onChange={setWeight}
        />
        <BooleanPicker label="Italic" value={italic} onChange={setItalic} />
        <BooleanPicker
          label="Truncated"
          value={isTruncated}
          onChange={setIsTruncated}
        />

        <View style={{ marginTop: 8, maxWidth: '100%', overflow: 'hidden' }}>
          <Text
            size={size as any}
            weight={weight as any}
            bold={bold}
            italic={italic}
            isTruncated={isTruncated}
          >
            The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. This sentence is long
            enough to demonstrate truncation when enabled.
          </Text>
        </View>
      </ExampleSection>

      {/* All Sizes */}
      <ExampleSection
        title="Sizes"
        description="Text renders at various predefined sizes from 2xs through 2xl."
      >
        <View style={{ gap: 12 }}>
          {sizes.map((s) => (
            <View key={s} style={{ flexDirection: 'row', alignItems: 'baseline', gap: 12 }}>
              <Text size="xs" className="w-8 text-typography-500">
                {s}
              </Text>
              <Text size={s}>The quick brown fox</Text>
            </View>
          ))}
        </View>
      </ExampleSection>

      {/* Weights */}
      <ExampleSection
        title="Weights"
        description="Font weight can be set via the weight prop."
      >
        <View style={{ gap: 12 }}>
          {weights.map((w) => (
            <View key={w} style={{ flexDirection: 'row', alignItems: 'baseline', gap: 12 }}>
              <Text size="xs" className="w-20 text-typography-500">
                {w}
              </Text>
              <Text weight={w}>The quick brown fox</Text>
            </View>
          ))}
        </View>
      </ExampleSection>

      {/* Modifiers */}
      <ExampleSection
        title="Modifiers"
        description="Boolean props control bold, italic, underline, strikethrough, and highlight."
      >
        <View style={{ gap: 12 }}>
          <Text bold>Bold text</Text>
          <Text italic>Italic text</Text>
          <Text underline>Underlined text</Text>
          <Text strikeThrough>Strikethrough text</Text>
          <Text highlight>Highlighted text</Text>
        </View>
      </ExampleSection>

      {/* Truncation */}
      <ExampleSection
        title="Truncation"
        description="Use isTruncated to clip overflowing text with an ellipsis."
      >
        <View style={{ width: 192 }}>
          <Text isTruncated>
            This is a really long piece of text that should be truncated when it
            overflows the container width.
          </Text>
        </View>
      </ExampleSection>
    </View>
  );
}

import React, { useState } from 'react';
import { View, Text as RNText } from 'react-native';
import { ExampleSection } from '../example-section';
import { VariantPicker } from '../variant-picker';
import { Image } from '@wireservers-ui/react-natives';
import { useExampleCode } from '../example-code-context';

const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', 'full'] as const;
const borderRadii = ['none', 'sm', 'md', 'lg', 'xl', 'full'] as const;

export default function ImageExamples() {
  const [size, setSize] = useState<string>('md');
  const [borderRadius, setBorderRadius] = useState<string>('none');

  useExampleCode(`import { Image } from '@wireservers-ui/react-natives';

export default function Example() {
  return (
    <Image
      source={{ uri: 'https://picsum.photos/200' }}
      alt="Sample image"
      size="${size}"
      borderRadius="${borderRadius}"
    />
  );
}`, [size, borderRadius]);

  return (
    <View style={{ gap: 24 }}>
      {/* Interactive Example */}
      <ExampleSection
        title="Interactive"
        description="Adjust size and border radius to preview the Image component."
      >
        <VariantPicker
          label="Size"
          options={[...sizes]}
          value={size}
          onChange={setSize}
        />
        <VariantPicker
          label="Border Radius"
          options={[...borderRadii]}
          value={borderRadius}
          onChange={setBorderRadius}
        />

        <View style={{ marginTop: 8, alignItems: 'flex-start' }}>
          <Image
            source={{ uri: 'https://picsum.photos/200' }}
            alt="Random sample image"
            size={size as any}
            borderRadius={borderRadius as any}
          />
        </View>
      </ExampleSection>

      {/* All Sizes */}
      <ExampleSection
        title="All Sizes"
        description="Image sizes range from xs (24px) through 2xl (128px) and full width."
        code={`import { Image } from '@wireservers-ui/react-natives';

export default function Example() {
  return (
    <Image
      source={{ uri: 'https://picsum.photos/200' }}
      alt="Sample image"
      size="lg"
    />
  );
}`}
      >
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-end', gap: 16 }}>
          {sizes
            .filter((s) => s !== 'full')
            .map((s) => (
              <View key={s} style={{ alignItems: 'center', gap: 8 }}>
                <Image
                  source={{ uri: 'https://picsum.photos/200' }}
                  alt={`${s} image`}
                  size={s}
                />
                <RNText style={{ fontSize: 10, color: '#8c8c8c' }}>{s}</RNText>
              </View>
            ))}
        </View>
      </ExampleSection>

      {/* Border Radius */}
      <ExampleSection
        title="Border Radius"
        description="Control the roundedness of images with the borderRadius prop."
        code={`import { Image } from '@wireservers-ui/react-natives';

export default function Example() {
  return (
    <Image
      source={{ uri: 'https://picsum.photos/200' }}
      alt="Rounded image"
      size="lg"
      borderRadius="full"
    />
  );
}`}
      >
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-end', gap: 16 }}>
          {borderRadii.map((r) => (
            <View key={r} style={{ alignItems: 'center', gap: 8 }}>
              <Image
                source={{ uri: 'https://picsum.photos/200' }}
                alt={`${r} radius image`}
                size="lg"
                borderRadius={r}
              />
              <RNText style={{ fontSize: 10, color: '#8c8c8c' }}>{r}</RNText>
            </View>
          ))}
        </View>
      </ExampleSection>

      {/* Full Width */}
      <ExampleSection
        title="Full Width"
        description="Use size='full' to make the image span its container width."
        code={`import { Image } from '@wireservers-ui/react-natives';

export default function Example() {
  return (
    <Image
      source={{ uri: 'https://picsum.photos/600/200' }}
      alt="Full width image"
      size="full"
      borderRadius="lg"
    />
  );
}`}
      >
        <Image
          source={{ uri: 'https://picsum.photos/600/200' }}
          alt="Full width landscape image"
          size="full"
          borderRadius="lg"
          className="h-32"
        />
      </ExampleSection>
    </View>
  );
}

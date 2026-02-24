import React, { useState } from 'react';
import { View, Text as RNText } from 'react-native';
import { ExampleSection } from '../example-section';
import { VariantPicker } from '../variant-picker';
import { Image } from '@wireservers-ui/react-native-ui';

const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', 'full'] as const;
const borderRadii = ['none', 'sm', 'md', 'lg', 'xl', 'full'] as const;

export default function ImageExamples() {
  const [size, setSize] = useState<string>('md');
  const [borderRadius, setBorderRadius] = useState<string>('none');

  return (
    <View className="gap-6">
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

        <View className="mt-2 items-start">
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
      >
        <View className="flex-row flex-wrap items-end gap-4">
          {sizes
            .filter((s) => s !== 'full')
            .map((s) => (
              <View key={s} className="items-center gap-2">
                <Image
                  source={{ uri: 'https://picsum.photos/200' }}
                  alt={`${s} image`}
                  size={s}
                />
                <RNText className="text-2xs text-typography-500">{s}</RNText>
              </View>
            ))}
        </View>
      </ExampleSection>

      {/* Border Radius */}
      <ExampleSection
        title="Border Radius"
        description="Control the roundedness of images with the borderRadius prop."
      >
        <View className="flex-row flex-wrap items-end gap-4">
          {borderRadii.map((r) => (
            <View key={r} className="items-center gap-2">
              <Image
                source={{ uri: 'https://picsum.photos/200' }}
                alt={`${r} radius image`}
                size="lg"
                borderRadius={r}
              />
              <RNText className="text-2xs text-typography-500">{r}</RNText>
            </View>
          ))}
        </View>
      </ExampleSection>

      {/* Full Width */}
      <ExampleSection
        title="Full Width"
        description="Use size='full' to make the image span its container width."
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

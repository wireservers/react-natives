import React, { useState } from 'react';
import { View, Text as RNText } from 'react-native';
import { ExampleSection } from '../example-section';
import { VariantPicker } from '../variant-picker';
import { Icon } from '@wireservers-ui/react-native-ui';

const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;

/** Placeholder box component used as an icon stand-in via the `as` prop. */
function PlaceholderIcon({ className, ...props }: { className?: string }) {
  return (
    <View
      className={`bg-primary-500 rounded-sm ${className ?? ''}`}
      {...props}
    />
  );
}

export default function IconExamples() {
  const [size, setSize] = useState<string>('md');

  return (
    <View className="gap-6">
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

        <View className="mt-2 items-start">
          <Icon as={PlaceholderIcon} size={size as any} />
        </View>
      </ExampleSection>

      {/* All Sizes */}
      <ExampleSection
        title="All Sizes"
        description="Icons scale from xs (12px) through 2xl (28px)."
      >
        <View className="flex-row items-end gap-4">
          {sizes.map((s) => (
            <View key={s} className="items-center gap-2">
              <Icon as={PlaceholderIcon} size={s} />
              <RNText className="text-2xs text-typography-500">{s}</RNText>
            </View>
          ))}
        </View>
      </ExampleSection>

      {/* Numeric Size */}
      <ExampleSection
        title="Custom Numeric Size"
        description="Pass a number to the size prop for pixel-exact sizing."
      >
        <View className="flex-row items-end gap-4">
          {[16, 24, 32, 48].map((n) => (
            <View key={n} className="items-center gap-2">
              <Icon as={PlaceholderIcon} size={n} />
              <RNText className="text-2xs text-typography-500">{n}px</RNText>
            </View>
          ))}
        </View>
      </ExampleSection>
    </View>
  );
}

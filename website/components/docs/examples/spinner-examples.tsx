import React, { useState } from 'react';
import { View, Text as RNText } from 'react-native';
import { ExampleSection } from '../example-section';
import { VariantPicker } from '../variant-picker';
import { Spinner } from '@wireservers-ui/react-native-ui';

const sizes = ['sm', 'md', 'lg'] as const;

export default function SpinnerExamples() {
  const [size, setSize] = useState<string>('md');

  return (
    <View className="gap-6">
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

        <View className="mt-2 items-start">
          <Spinner size={size as any} />
        </View>
      </ExampleSection>

      {/* All Sizes */}
      <ExampleSection
        title="All Sizes"
        description="Spinners render at small (16px), medium (32px), and large (48px)."
      >
        <View className="flex-row items-center gap-6">
          {sizes.map((s) => (
            <View key={s} className="items-center gap-2">
              <Spinner size={s} />
              <RNText className="text-xs text-typography-500">{s}</RNText>
            </View>
          ))}
        </View>
      </ExampleSection>

      {/* Custom Color */}
      <ExampleSection
        title="Custom Color"
        description="Pass a color prop to tint the spinner."
      >
        <View className="flex-row items-center gap-6">
          <Spinner size="md" color="#6366f1" />
          <Spinner size="md" color="#ef4444" />
          <Spinner size="md" color="#22c55e" />
        </View>
      </ExampleSection>
    </View>
  );
}

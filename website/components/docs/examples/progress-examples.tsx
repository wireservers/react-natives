import React, { useState } from 'react';
import { View, Text as RNText } from 'react-native';
import { ExampleSection } from '../example-section';
import { VariantPicker } from '../variant-picker';
import { Progress, ProgressFilledTrack } from '@wireservers-ui/react-native-ui';

const sizes = ['xs', 'sm', 'md', 'lg'] as const;
const valueOptions = ['0', '25', '50', '75', '100'] as const;

export default function ProgressExamples() {
  const [size, setSize] = useState<string>('md');
  const [value, setValue] = useState<string>('50');

  return (
    <View className="gap-6">
      {/* Interactive Example */}
      <ExampleSection
        title="Interactive"
        description="Adjust size and value to preview the Progress component."
      >
        <VariantPicker
          label="Size"
          options={[...sizes]}
          value={size}
          onChange={setSize}
        />
        <VariantPicker
          label="Value"
          options={[...valueOptions]}
          value={value}
          onChange={setValue}
        />

        <View className="mt-2 gap-1">
          <RNText className="text-sm text-typography-600">{value}%</RNText>
          <Progress value={Number(value)} size={size as any}>
            <ProgressFilledTrack />
          </Progress>
        </View>
      </ExampleSection>

      {/* All Sizes */}
      <ExampleSection
        title="Sizes"
        description="Progress bars are available in xs, sm, md, and lg sizes."
      >
        <View className="gap-4">
          {sizes.map((s) => (
            <View key={s} className="gap-1">
              <RNText className="text-xs text-typography-500">{s}</RNText>
              <Progress value={60} size={s}>
                <ProgressFilledTrack />
              </Progress>
            </View>
          ))}
        </View>
      </ExampleSection>

      {/* Value Demonstrations */}
      <ExampleSection
        title="Values"
        description="Progress displays a filled track proportional to its value (0-100)."
      >
        <View className="gap-3">
          {[10, 30, 60, 90].map((v) => (
            <View key={v} className="gap-1">
              <RNText className="text-xs text-typography-500">{v}%</RNText>
              <Progress value={v} size="md">
                <ProgressFilledTrack />
              </Progress>
            </View>
          ))}
        </View>
      </ExampleSection>
    </View>
  );
}

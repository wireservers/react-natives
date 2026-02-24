import React, { useState } from 'react';
import { View, Text as RNText } from 'react-native';
import { ExampleSection } from '../example-section';
import { VariantPicker, BooleanPicker } from '../variant-picker';
import { Fab, FabLabel } from '@wireservers-ui/react-native-ui';

const sizes = ['sm', 'md', 'lg'] as const;
const placements = [
  'bottom-right',
  'bottom-left',
  'top-right',
  'top-left',
  'bottom-center',
  'top-center',
] as const;

export default function FabExamples() {
  const [size, setSize] = useState<string>('md');
  const [isExtended, setIsExtended] = useState(false);
  const [placement, setPlacement] = useState<string>('bottom-right');

  return (
    <View className="gap-6">
      {/* Interactive Example */}
      <ExampleSection
        title="Interactive"
        description="Adjust size, placement, and extension to preview the Fab component. The Fab is rendered inside a contained area."
      >
        <VariantPicker
          label="Size"
          options={[...sizes]}
          value={size}
          onChange={setSize}
        />
        <VariantPicker
          label="Placement"
          options={[...placements]}
          value={placement}
          onChange={setPlacement}
        />
        <BooleanPicker
          label="isExtended"
          value={isExtended}
          onChange={setIsExtended}
        />

        <View className="mt-2 h-48 bg-background-50 rounded-lg border border-outline-200 relative overflow-hidden">
          <View className="flex-1 items-center justify-center">
            <RNText className="text-xs text-typography-400">
              Container area
            </RNText>
          </View>
          <Fab
            placement={placement as any}
            size={size as any}
            isExtended={isExtended}
          >
            <FabLabel>{isExtended ? 'Create' : '+'}</FabLabel>
          </Fab>
        </View>
      </ExampleSection>

      {/* Size Comparison */}
      <ExampleSection
        title="Sizes"
        description="Fab is available in sm, md, and lg sizes."
      >
        <View className="flex-row gap-4 items-center">
          {sizes.map((s) => (
            <View key={s} className="items-center gap-2">
              <View className="relative h-16 w-16 bg-background-50 rounded-lg border border-outline-200 overflow-hidden">
                <Fab placement="bottom-right" size={s}>
                  <FabLabel>+</FabLabel>
                </Fab>
              </View>
              <RNText className="text-xs text-typography-500">{s}</RNText>
            </View>
          ))}
        </View>
      </ExampleSection>

      {/* Extended Fab */}
      <ExampleSection
        title="Extended Fab"
        description="When isExtended is true, the Fab expands to show its label text alongside the icon."
      >
        <View className="h-32 bg-background-50 rounded-lg border border-outline-200 relative overflow-hidden">
          <View className="flex-1 items-center justify-center">
            <RNText className="text-xs text-typography-400">
              Extended Fab demo
            </RNText>
          </View>
          <Fab placement="bottom-right" size="md" isExtended>
            <FabLabel>New Item</FabLabel>
          </Fab>
        </View>
      </ExampleSection>
    </View>
  );
}

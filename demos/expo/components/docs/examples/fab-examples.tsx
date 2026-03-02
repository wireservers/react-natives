import React, { useState } from 'react';
import { View, Text as RNText } from 'react-native';
import { ExampleSection } from '../example-section';
import { VariantPicker, BooleanPicker } from '../variant-picker';
import { Fab, FabLabel } from '@wireservers-ui/react-natives';
import { useExampleCode } from '../example-code-context';

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

  useExampleCode(`import { Fab, FabLabel } from '@wireservers-ui/react-natives';

export default function Example() {
  return (
    <Fab placement="${placement}" size="${size}"${isExtended ? ' isExtended' : ''}>
      <FabLabel>${isExtended ? 'Create' : '+'}</FabLabel>
    </Fab>
  );
}`, [size, placement, isExtended]);

  return (
    <View style={{ gap: 24 }}>
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

        <View style={{ marginTop: 8, height: 192, backgroundColor: '#FAFAFA', borderRadius: 8, borderWidth: 1, borderColor: '#E5E7EB', position: 'relative', overflow: 'hidden' }}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <RNText style={{ fontSize: 12, color: '#9CA3AF' }}>
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
        <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
          {sizes.map((s) => (
            <View key={s} style={{ alignItems: 'center', gap: 8 }}>
              <View style={{ position: 'relative', height: 64, width: 64, backgroundColor: '#FAFAFA', borderRadius: 8, borderWidth: 1, borderColor: '#E5E7EB', overflow: 'hidden' }}>
                <Fab placement="bottom-right" size={s}>
                  <FabLabel>+</FabLabel>
                </Fab>
              </View>
              <RNText style={{ fontSize: 12, color: '#6B7280' }}>{s}</RNText>
            </View>
          ))}
        </View>
      </ExampleSection>

      {/* Extended Fab */}
      <ExampleSection
        title="Extended Fab"
        description="When isExtended is true, the Fab expands to show its label text alongside the icon."
      >
        <View style={{ height: 128, backgroundColor: '#FAFAFA', borderRadius: 8, borderWidth: 1, borderColor: '#E5E7EB', position: 'relative', overflow: 'hidden' }}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <RNText style={{ fontSize: 12, color: '#9CA3AF' }}>
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

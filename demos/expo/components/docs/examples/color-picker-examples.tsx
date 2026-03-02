import React, { useState } from 'react';
import { View } from 'react-native';
import { ExampleSection } from '../example-section';
import { ColorPicker, ColorPickerTrigger, ColorPickerContent, ColorPickerBox, ColorPickerSlider, ColorPickerSwatch, ColorPickerInput, Text } from '@wireservers-ui/react-natives';
import { useExampleCode } from '../example-code-context';

const presetColors = ['#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899', '#6B7280', '#000000'];

export default function ColorPickerExamples() {
  const [color, setColor] = useState('#3B82F6');

  useExampleCode(`import { ColorPicker, ColorPickerTrigger, ColorPickerContent, ColorPickerBox, ColorPickerSlider, ColorPickerSwatch, ColorPickerInput, Text } from '@wireservers-ui/react-natives';

export default function Example() {
  const [color, setColor] = useState('#3B82F6');
  const presetColors = ['#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899', '#6B7280', '#000000'];
  return (
    <>
      <ColorPicker value={color} onChange={setColor}>
        <ColorPickerTrigger />
        <ColorPickerContent>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <ColorPickerBox size={180} />
            <ColorPickerSlider height={180} />
          </View>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {presetColors.map(c => (
              <ColorPickerSwatch key={c} color={c} />
            ))}
          </View>
          <ColorPickerInput />
        </ColorPickerContent>
      </ColorPicker>
      <Text className="text-sm text-typography-500 mt-1">Selected: {color}</Text>
    </>
  );
}`, []);

  return (
    <View style={{ gap: 24 }}>
      <ExampleSection title="Color Picker" description="Select a color from swatches or enter a hex value.">
        <ColorPicker value={color} onChange={setColor}>
          <ColorPickerTrigger />
          <ColorPickerContent>
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <ColorPickerBox size={180} />
              <ColorPickerSlider height={180} />
            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
              {presetColors.map(c => (
                <ColorPickerSwatch key={c} color={c} />
              ))}
            </View>
            <ColorPickerInput />
          </ColorPickerContent>
        </ColorPicker>
        <Text className="text-sm text-typography-500 mt-1">Selected: {color}</Text>
      </ExampleSection>
    </View>
  );
}

import React, { useState } from 'react';
import { View } from 'react-native';
import { ExampleSection } from '../example-section';
import { VariantPicker } from '../variant-picker';
import { AspectRatio, Box, Text } from '@wireservers-ui/react-natives';
import { useExampleCode } from '../example-code-context';

const ratios = ['1', '4/3', '16/9', '21/9'] as const;
const ratioValues: Record<string, number> = { '1': 1, '4/3': 4/3, '16/9': 16/9, '21/9': 21/9 };

export default function AspectRatioExamples() {
  const [ratio, setRatio] = useState<string>('16/9');

  useExampleCode(`import { AspectRatio, Box, Text } from '@wireservers-ui/react-natives';

export default function Example() {
  return (
    <AspectRatio ratio={${ratioValues[ratio]}}>
      <Box className="flex-1 bg-primary-100 rounded-lg items-center justify-center">
        <Text>Ratio: ${ratio}</Text>
      </Box>
    </AspectRatio>
  );
}`, [ratio]);

  return (
    <View style={{ gap: 24 }}>
      <ExampleSection title="Interactive" description="Select an aspect ratio to preview.">
        <VariantPicker label="Ratio" options={[...ratios]} value={ratio} onChange={setRatio} />
        <View style={{ marginTop: 8, maxWidth: 320 }}>
          <AspectRatio ratio={ratioValues[ratio]}>
            <Box className="flex-1 bg-primary-100 rounded-lg items-center justify-center">
              <Text>Ratio: {ratio}</Text>
            </Box>
          </AspectRatio>
        </View>
      </ExampleSection>
    </View>
  );
}

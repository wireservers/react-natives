import React, { useState } from 'react';
import { View } from 'react-native';
import { ExampleSection } from '../example-section';
import { VariantPicker } from '../variant-picker';
import { Stack, VStack, HStack, Box, Text } from '@wireservers-ui/react-natives';
import { useExampleCode } from '../example-code-context';

const spaces = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;

export default function StackExamples() {
  const [space, setSpace] = useState<string>('md');

  useExampleCode(`import { VStack, HStack, Box, Text } from '@wireservers-ui/react-natives';

export default function Example() {
  return (
    <VStack space="${space}">
      <Box className="p-3 bg-primary-100 rounded-md"><Text>Item 1</Text></Box>
      <Box className="p-3 bg-primary-100 rounded-md"><Text>Item 2</Text></Box>
      <Box className="p-3 bg-primary-100 rounded-md"><Text>Item 3</Text></Box>
    </VStack>
  );
}`, [space]);

  return (
    <View style={{ gap: 24 }}>
      <ExampleSection title="Interactive" description="Adjust spacing between stack items.">
        <VariantPicker label="Space" options={[...spaces]} value={space} onChange={setSpace} />
        <VStack space={space as any} style={{ marginTop: 8 }}>
          <Box className="p-3 bg-primary-100 rounded-md"><Text>Item 1</Text></Box>
          <Box className="p-3 bg-primary-100 rounded-md"><Text>Item 2</Text></Box>
          <Box className="p-3 bg-primary-100 rounded-md"><Text>Item 3</Text></Box>
        </VStack>
      </ExampleSection>

      <ExampleSection title="VStack (Vertical)" description="Stack children vertically.">
        <VStack space="sm">
          <Box className="p-3 bg-primary-100 rounded-md"><Text>Top</Text></Box>
          <Box className="p-3 bg-primary-100 rounded-md"><Text>Middle</Text></Box>
          <Box className="p-3 bg-primary-100 rounded-md"><Text>Bottom</Text></Box>
        </VStack>
      </ExampleSection>

      <ExampleSection title="HStack (Horizontal)" description="Stack children horizontally.">
        <HStack space="sm">
          <Box className="p-3 bg-primary-100 rounded-md"><Text>Left</Text></Box>
          <Box className="p-3 bg-primary-100 rounded-md"><Text>Center</Text></Box>
          <Box className="p-3 bg-primary-100 rounded-md"><Text>Right</Text></Box>
        </HStack>
      </ExampleSection>
    </View>
  );
}

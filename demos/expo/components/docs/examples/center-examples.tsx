import React from 'react';
import { View } from 'react-native';
import { ExampleSection } from '../example-section';
import { Center, Text, Box } from '@wireservers-ui/react-natives';
import { useExampleCode } from '../example-code-context';

export default function CenterExamples() {
  useExampleCode(`import { Center, Text } from '@wireservers-ui/react-natives';

export default function Example() {
  return (
    <Center className="h-32 bg-background-100 rounded-lg border border-outline-200">
      <Text>Centered content</Text>
    </Center>
  );
}`, []);

  return (
    <View style={{ gap: 24 }}>
      <ExampleSection title="Basic Center" description="Centers content both horizontally and vertically.">
        <Center className="h-32 bg-background-100 rounded-lg border border-outline-200">
          <Text>Centered content</Text>
        </Center>
      </ExampleSection>

      <ExampleSection title="With Sized Content" description="Center with a fixed-size child element.">
        <Center className="h-40 bg-background-50 rounded-lg">
          <Box className="w-24 h-24 bg-primary-500 rounded-lg items-center justify-center">
            <Text className="text-white">Box</Text>
          </Box>
        </Center>
      </ExampleSection>
    </View>
  );
}

import React from 'react';
import { View } from 'react-native';
import { ExampleSection } from '../example-section';
import { Box, Text } from '@wireservers-ui/react-natives';
import { useExampleCode } from '../example-code-context';

export default function BoxExamples() {
  useExampleCode(`import { Box, Text } from '@wireservers-ui/react-natives';

export default function Example() {
  return (
    <Box className="p-4 bg-background-100 rounded-lg border border-outline-200">
      <Text>Content inside a Box</Text>
    </Box>
  );
}`, []);

  return (
    <View style={{ gap: 24 }}>
      <ExampleSection title="Basic Box" description="A styled View wrapper that accepts className."
        code={`import { Box, Text } from '@wireservers-ui/react-natives';

export default function Example() {
  return (
    <Box className="p-4 bg-background-100 rounded-lg border border-outline-200">
      <Text>Content inside a Box</Text>
    </Box>
  );
}`}
      >
        <Box className="p-4 bg-background-100 rounded-lg border border-outline-200" style={{ alignSelf: 'flex-start' }}>
          <Text>Content inside a Box</Text>
        </Box>
      </ExampleSection>

      <ExampleSection title="Nested Boxes" description="Boxes can be nested for complex layouts."
        code={`import { Box, Text } from '@wireservers-ui/react-natives';

export default function Example() {
  return (
    <Box className="p-4 bg-background-50 rounded-lg" style={{ gap: 12 }}>
      <Box className="p-3 bg-primary-50 rounded-md">
        <Text>First nested box</Text>
      </Box>
      <Box className="p-3 bg-success-50 rounded-md">
        <Text>Second nested box</Text>
      </Box>
    </Box>
  );
}`}
      >
        <Box className="p-4 bg-background-50 rounded-lg" style={{ alignSelf: 'flex-start', gap: 12 }}>
          <Box className="p-3 bg-primary-50 rounded-md">
            <Text>First nested box</Text>
          </Box>
          <Box className="p-3 bg-success-50 rounded-md">
            <Text>Second nested box</Text>
          </Box>
        </Box>
      </ExampleSection>
    </View>
  );
}

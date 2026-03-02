import React from 'react';
import { View } from 'react-native';
import { ExampleSection } from '../example-section';
import { VisuallyHidden, Text, Box } from '@wireservers-ui/react-natives';
import { useExampleCode } from '../example-code-context';

export default function VisuallyHiddenExamples() {
  useExampleCode(`import { VisuallyHidden, Text, Box } from '@wireservers-ui/react-natives';

export default function Example() {
  return (
    <Box className="p-4 bg-background-100 rounded-lg border border-outline-200 gap-2">
      <Text>Visible text above</Text>
      <VisuallyHidden>
        <Text>This text is hidden but accessible to screen readers</Text>
      </VisuallyHidden>
      <Text className="text-sm text-typography-500">The VisuallyHidden component between these lines contains screen-reader-only text.</Text>
    </Box>
  );
}`, []);

  return (
    <View style={{ gap: 24 }}>
      <ExampleSection
        title="VisuallyHidden"
        description="Hides content visually while keeping it accessible to screen readers and assistive technology."
      >
        <Box className="p-4 bg-background-100 rounded-lg border border-outline-200 gap-2">
          <Text>Visible text above</Text>
          <VisuallyHidden>
            <Text>This text is hidden but accessible to screen readers</Text>
          </VisuallyHidden>
          <Text className="text-sm text-typography-500">The VisuallyHidden component between these lines contains screen-reader-only text.</Text>
        </Box>
      </ExampleSection>
    </View>
  );
}

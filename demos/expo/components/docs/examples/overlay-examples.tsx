import React from 'react';
import { View } from 'react-native';
import { ExampleSection } from '../example-section';
import { Overlay, Text, Box } from '@wireservers-ui/react-natives';
import { useExampleCode } from '../example-code-context';

export default function OverlayExamples() {
  useExampleCode(`import { Overlay } from '@wireservers-ui/react-natives';

export default function Example() {
  return <Overlay isVisible />;
}`, []);

  return (
    <View style={{ gap: 24 }}>
      <ExampleSection
        title="Overlay"
        description="A full-screen semi-transparent backdrop. Used internally by Modal, Drawer, ActionSheet, and other overlay components."
      >
        <Box className="p-4 bg-background-100 rounded-lg border border-outline-200">
          <Text>Overlay provides the dimmed background behind modals, drawers, and popovers. It is typically not used directly.</Text>
        </Box>
      </ExampleSection>
    </View>
  );
}

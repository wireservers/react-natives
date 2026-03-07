import React, { useState } from 'react';
import { View, Text as RNText } from 'react-native';
import { ExampleSection } from '../example-section';
import { VariantPicker } from '../variant-picker';
import { Divider, Text } from '@wireservers-ui/react-natives';
import { useExampleCode } from '../example-code-context';

const orientations = ['horizontal', 'vertical'] as const;

export default function DividerExamples() {
  const [orientation, setOrientation] = useState<string>('horizontal');

  useExampleCode(`import { Divider, Text } from '@wireservers-ui/react-natives';
import { View } from 'react-native';

export default function Example() {
  return (${orientation === 'vertical' ? `
    <View style={{ flexDirection: 'row', alignItems: 'center', height: 80 }}>
      <Text style={{ paddingHorizontal: 12 }}>Left</Text>
      <Divider orientation="vertical" />
      <Text style={{ paddingHorizontal: 12 }}>Right</Text>
    </View>` : `
    <View>
      <Text style={{ paddingVertical: 8 }}>Above</Text>
      <Divider orientation="horizontal" />
      <Text style={{ paddingVertical: 8 }}>Below</Text>
    </View>`}
  );
}`, [orientation]);

  return (
    <View style={{ gap: 24 }}>
      {/* Interactive Example */}
      <ExampleSection
        title="Interactive"
        description="Toggle between horizontal and vertical orientation."
      >
        <VariantPicker
          label="Orientation"
          options={[...orientations]}
          value={orientation}
          onChange={setOrientation}
        />

        {orientation === 'vertical' ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', height: 80, marginTop: 8 }}>
            <Text style={{ paddingHorizontal: 12 }}>Left</Text>
            <Divider orientation="vertical" />
            <Text style={{ paddingHorizontal: 12 }}>Right</Text>
          </View>
        ) : (
          <View style={{ marginTop: 8 }}>
            <Text style={{ paddingVertical: 8 }}>Above</Text>
            <Divider orientation="horizontal" />
            <Text style={{ paddingVertical: 8 }}>Below</Text>
          </View>
        )}
      </ExampleSection>

      {/* Horizontal */}
      <ExampleSection
        title="Horizontal Divider"
        description="The default orientation. Renders a full-width 1px line."
        code={`import { Divider, Text } from '@wireservers-ui/react-natives';
import { View } from 'react-native';

export default function Example() {
  return (
    <View style={{ gap: 12 }}>
      <Text>First section</Text>
      <Divider />
      <Text>Second section</Text>
    </View>
  );
}`}
      >
        <View style={{ gap: 12 }}>
          <Text>First section</Text>
          <Divider />
          <Text>Second section</Text>
          <Divider />
          <Text>Third section</Text>
        </View>
      </ExampleSection>

      {/* Vertical */}
      <ExampleSection
        title="Vertical Divider"
        description="Use orientation='vertical' to separate inline items. The parent must have a defined height."
        code={`import { Divider, Text } from '@wireservers-ui/react-natives';
import { View } from 'react-native';

export default function Example() {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', height: 40 }}>
      <Text style={{ paddingHorizontal: 12 }}>Home</Text>
      <Divider orientation="vertical" />
      <Text style={{ paddingHorizontal: 12 }}>About</Text>
    </View>
  );
}`}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', height: 40 }}>
          <Text style={{ paddingHorizontal: 12 }}>Home</Text>
          <Divider orientation="vertical" />
          <Text style={{ paddingHorizontal: 12 }}>About</Text>
          <Divider orientation="vertical" />
          <Text style={{ paddingHorizontal: 12 }}>Contact</Text>
        </View>
      </ExampleSection>
    </View>
  );
}

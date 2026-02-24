import React, { useState } from 'react';
import { View, Text as RNText } from 'react-native';
import { ExampleSection } from '../example-section';
import { VariantPicker } from '../variant-picker';
import { Divider, Text } from '@wireservers-ui/react-native-ui';

const orientations = ['horizontal', 'vertical'] as const;

export default function DividerExamples() {
  const [orientation, setOrientation] = useState<string>('horizontal');

  return (
    <View className="gap-6">
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

        <View
          className={`mt-2 ${
            orientation === 'vertical'
              ? 'flex-row items-center h-20'
              : ''
          }`}
        >
          {orientation === 'vertical' ? (
            <>
              <Text className="px-3">Left</Text>
              <Divider orientation="vertical" />
              <Text className="px-3">Right</Text>
            </>
          ) : (
            <>
              <Text className="py-2">Above</Text>
              <Divider orientation="horizontal" />
              <Text className="py-2">Below</Text>
            </>
          )}
        </View>
      </ExampleSection>

      {/* Horizontal */}
      <ExampleSection
        title="Horizontal Divider"
        description="The default orientation. Renders a full-width 1px line."
      >
        <View className="gap-3">
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
      >
        <View className="flex-row items-center h-10 gap-0">
          <Text className="px-3">Home</Text>
          <Divider orientation="vertical" />
          <Text className="px-3">About</Text>
          <Divider orientation="vertical" />
          <Text className="px-3">Contact</Text>
        </View>
      </ExampleSection>
    </View>
  );
}

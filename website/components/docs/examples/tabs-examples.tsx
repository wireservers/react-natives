import React, { useState } from 'react';
import { View, Text as RNText } from 'react-native';
import { ExampleSection } from '../example-section';
import { VariantPicker } from '../variant-picker';
import {
  Tabs,
  TabList,
  Tab,
  TabText,
  TabPanels,
  TabPanel,
} from '@wireservers-ui/react-native-ui';

const variants = ['underlined', 'outline', 'rounded'] as const;

export default function TabsExamples() {
  const [variant, setVariant] = useState<string>('underlined');
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <View className="gap-6">
      {/* Interactive Example */}
      <ExampleSection
        title="Interactive"
        description="Choose a variant to preview different tab styles."
      >
        <VariantPicker
          label="Variant"
          options={[...variants]}
          value={variant}
          onChange={(v) => {
            setVariant(v);
            setActiveIndex(0);
          }}
        />

        <View className="mt-2">
          <Tabs
            index={activeIndex}
            onChange={setActiveIndex}
            variant={variant as any}
          >
            <TabList>
              <Tab>
                <TabText>Overview</TabText>
              </Tab>
              <Tab>
                <TabText>Features</TabText>
              </Tab>
              <Tab>
                <TabText>Pricing</TabText>
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel index={0}>
                <View className="py-3">
                  <RNText className="text-sm text-typography-700">
                    This is the overview panel. It provides a high-level summary
                    of the product and its capabilities.
                  </RNText>
                </View>
              </TabPanel>
              <TabPanel index={1}>
                <View className="py-3">
                  <RNText className="text-sm text-typography-700">
                    Explore the features available including real-time
                    collaboration, custom themes, and advanced analytics.
                  </RNText>
                </View>
              </TabPanel>
              <TabPanel index={2}>
                <View className="py-3">
                  <RNText className="text-sm text-typography-700">
                    Choose from our free, pro, or enterprise plans to get
                    started.
                  </RNText>
                </View>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </View>
      </ExampleSection>

      {/* Variant Comparison */}
      <ExampleSection
        title="All Variants"
        description="Side-by-side comparison of the underlined, outline, and rounded tab styles."
      >
        <View className="gap-6">
          {variants.map((v) => (
            <View key={v} className="gap-1">
              <RNText className="text-xs text-typography-500 uppercase tracking-wide mb-1">
                {v}
              </RNText>
              <Tabs defaultIndex={0} variant={v}>
                <TabList>
                  <Tab>
                    <TabText>Tab 1</TabText>
                  </Tab>
                  <Tab>
                    <TabText>Tab 2</TabText>
                  </Tab>
                  <Tab>
                    <TabText>Tab 3</TabText>
                  </Tab>
                </TabList>
                <TabPanels>
                  <TabPanel index={0}>
                    <View className="py-2">
                      <RNText className="text-sm text-typography-600">
                        Content for tab 1 ({v} variant)
                      </RNText>
                    </View>
                  </TabPanel>
                  <TabPanel index={1}>
                    <View className="py-2">
                      <RNText className="text-sm text-typography-600">
                        Content for tab 2 ({v} variant)
                      </RNText>
                    </View>
                  </TabPanel>
                  <TabPanel index={2}>
                    <View className="py-2">
                      <RNText className="text-sm text-typography-600">
                        Content for tab 3 ({v} variant)
                      </RNText>
                    </View>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </View>
          ))}
        </View>
      </ExampleSection>
    </View>
  );
}

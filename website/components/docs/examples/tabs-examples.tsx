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
} from '@wireservers-ui/react-natives';
import { useExampleCode } from '../example-code-context';

const variants = ['underlined', 'outline', 'rounded'] as const;

export default function TabsExamples() {
  const [variant, setVariant] = useState<string>('underlined');
  const [activeIndex, setActiveIndex] = useState(0);

  useExampleCode(`import { Tabs, TabList, Tab, TabText, TabPanels, TabPanel } from '@wireservers-ui/react-natives';

export default function Example() {
  return (
    <Tabs variant="${variant}">
      <TabList>
        <Tab><TabText>Tab 1</TabText></Tab>
        <Tab><TabText>Tab 2</TabText></Tab>
        <Tab><TabText>Tab 3</TabText></Tab>
      </TabList>
      <TabPanels>
        <TabPanel index={0}>Content 1</TabPanel>
        <TabPanel index={1}>Content 2</TabPanel>
        <TabPanel index={2}>Content 3</TabPanel>
      </TabPanels>
    </Tabs>
  );
}`, [variant]);

  return (
    <View style={{ gap: 24 }}>
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

        <View style={{ marginTop: 8 }}>
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
                <View style={{ paddingVertical: 12 }}>
                  <RNText style={{ fontSize: 14, color: '#525252' }}>
                    This is the overview panel. It provides a high-level summary
                    of the product and its capabilities.
                  </RNText>
                </View>
              </TabPanel>
              <TabPanel index={1}>
                <View style={{ paddingVertical: 12 }}>
                  <RNText style={{ fontSize: 14, color: '#525252' }}>
                    Explore the features available including real-time
                    collaboration, custom themes, and advanced analytics.
                  </RNText>
                </View>
              </TabPanel>
              <TabPanel index={2}>
                <View style={{ paddingVertical: 12 }}>
                  <RNText style={{ fontSize: 14, color: '#525252' }}>
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
        code={`import { Tabs, TabList, Tab, TabText, TabPanels, TabPanel } from '@wireservers-ui/react-natives';

export default function Example() {
  return (
    <Tabs defaultIndex={0} variant="underlined">
      <TabList>
        <Tab><TabText>Tab 1</TabText></Tab>
        <Tab><TabText>Tab 2</TabText></Tab>
        <Tab><TabText>Tab 3</TabText></Tab>
      </TabList>
      <TabPanels>
        <TabPanel index={0}>Content for tab 1</TabPanel>
        <TabPanel index={1}>Content for tab 2</TabPanel>
        <TabPanel index={2}>Content for tab 3</TabPanel>
      </TabPanels>
    </Tabs>
  );
}`}
      >
        <View style={{ gap: 24 }}>
          {variants.map((v) => (
            <View key={v} style={{ gap: 4 }}>
              <RNText style={{ fontSize: 11, color: '#737373', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>
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
                    <View style={{ paddingVertical: 8 }}>
                      <RNText style={{ fontSize: 14, color: '#525252' }}>
                        Content for tab 1 ({v} variant)
                      </RNText>
                    </View>
                  </TabPanel>
                  <TabPanel index={1}>
                    <View style={{ paddingVertical: 8 }}>
                      <RNText style={{ fontSize: 14, color: '#525252' }}>
                        Content for tab 2 ({v} variant)
                      </RNText>
                    </View>
                  </TabPanel>
                  <TabPanel index={2}>
                    <View style={{ paddingVertical: 8 }}>
                      <RNText style={{ fontSize: 14, color: '#525252' }}>
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

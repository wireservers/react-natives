import React, { useState } from 'react';
import { View, Text as RNText } from 'react-native';
import { ExampleSection } from '../example-section';
import { VariantPicker, BooleanPicker } from '../variant-picker';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  AccordionIcon,
  AccordionTitleText,
} from '@wireservers-ui/react-natives';
import { useExampleCode } from '../example-code-context';

const types = ['single', 'multiple'] as const;

export default function AccordionExamples() {
  const [type, setType] = useState<string>('single');
  const [isCollapsible, setIsCollapsible] = useState(true);

  useExampleCode(`import { Accordion, AccordionItem, AccordionTrigger, AccordionContent, AccordionIcon, AccordionTitleText } from '@wireservers-ui/react-natives';

export default function Example() {
  return (
    <Accordion type="${type}"${isCollapsible ? ' isCollapsible' : ''}>
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <AccordionTitleText>Section 1</AccordionTitleText>
          <AccordionIcon />
        </AccordionTrigger>
        <AccordionContent>
          Content for section 1.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}`, [type, isCollapsible]);

  return (
    <View style={{ gap: 24 }}>
      {/* Interactive Example */}
      <ExampleSection
        title="Interactive"
        description="Toggle between single and multiple expansion modes. Enable isCollapsible to allow closing all items."
      >
        <VariantPicker
          label="Type"
          options={[...types]}
          value={type}
          onChange={setType}
        />
        <BooleanPicker
          label="isCollapsible"
          value={isCollapsible}
          onChange={setIsCollapsible}
        />

        <View style={{ marginTop: 8 }}>
          <Accordion
            type={type as any}
            isCollapsible={isCollapsible}
            defaultValue={['item-1']}
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <AccordionTitleText>
                  What is wireservers-ui?
                </AccordionTitleText>
                <AccordionIcon />
              </AccordionTrigger>
              <AccordionContent>
                <RNText style={{ fontSize: 14, color: '#525252' }}>
                  Wireservers UI is a cross-platform component library built
                  with React Native, NativeWind, and Gluestack UI primitives.
                </RNText>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>
                <AccordionTitleText>
                  How does theming work?
                </AccordionTitleText>
                <AccordionIcon />
              </AccordionTrigger>
              <AccordionContent>
                <RNText style={{ fontSize: 14, color: '#525252' }}>
                  Theming is powered by CSS variables and Tailwind CSS. Light and
                  dark modes are supported out of the box through the theme
                  provider.
                </RNText>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>
                <AccordionTitleText>
                  Can I use it with Expo?
                </AccordionTitleText>
                <AccordionIcon />
              </AccordionTrigger>
              <AccordionContent>
                <RNText style={{ fontSize: 14, color: '#525252' }}>
                  Yes, wireservers-ui is fully compatible with Expo SDK 54 and
                  uses Expo Router for file-based navigation in the demo app.
                </RNText>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </View>
      </ExampleSection>

      {/* Multiple Mode */}
      <ExampleSection
        title="Multiple Expansion"
        description="With type='multiple', several accordion items can be expanded simultaneously."
      >
        <Accordion type="multiple" isCollapsible defaultValue={['a', 'b']}>
          <AccordionItem value="a">
            <AccordionTrigger>
              <AccordionTitleText>Section A</AccordionTitleText>
              <AccordionIcon />
            </AccordionTrigger>
            <AccordionContent>
              <RNText style={{ fontSize: 14, color: '#525252' }}>
                Content for section A. This item starts expanded.
              </RNText>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="b">
            <AccordionTrigger>
              <AccordionTitleText>Section B</AccordionTitleText>
              <AccordionIcon />
            </AccordionTrigger>
            <AccordionContent>
              <RNText style={{ fontSize: 14, color: '#525252' }}>
                Content for section B. This item also starts expanded.
              </RNText>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="c">
            <AccordionTrigger>
              <AccordionTitleText>Section C</AccordionTitleText>
              <AccordionIcon />
            </AccordionTrigger>
            <AccordionContent>
              <RNText style={{ fontSize: 14, color: '#525252' }}>
                Content for section C. Tap to expand.
              </RNText>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </ExampleSection>
    </View>
  );
}

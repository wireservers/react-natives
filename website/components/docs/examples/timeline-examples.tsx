import React, { useState } from 'react';
import { View } from 'react-native';
import { ExampleSection } from '../example-section';
import { VariantPicker } from '../variant-picker';
import { Timeline, TimelineItem, TimelineDot, TimelineSeparator, TimelineConnector, TimelineContent, Text } from '@wireservers-ui/react-natives';
import { useExampleCode } from '../example-code-context';

const variants = ['solid', 'outline'] as const;

export default function TimelineExamples() {
  const [variant, setVariant] = useState<string>('solid');

  useExampleCode(`import { Timeline, TimelineItem, TimelineDot, TimelineSeparator, TimelineConnector, TimelineContent, Text } from '@wireservers-ui/react-natives';

export default function Example() {
  return (
    <Timeline>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot variant="${variant}" />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent><Text>First event</Text></TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot variant="${variant}" />
        </TimelineSeparator>
        <TimelineContent><Text>Second event</Text></TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}`, [variant]);

  return (
    <View style={{ gap: 24 }}>
      <ExampleSection title="Interactive" description="Toggle the timeline variant.">
        <VariantPicker label="Variant" options={[...variants]} value={variant} onChange={setVariant} />
        <Timeline className="mt-2">
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot variant={variant as any} />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent><Text className="font-semibold">Order placed</Text><Text className="text-sm text-typography-500">Jan 15, 2025</Text></TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot variant={variant as any} />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent><Text className="font-semibold">Shipped</Text><Text className="text-sm text-typography-500">Jan 17, 2025</Text></TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot variant={variant as any} />
            </TimelineSeparator>
            <TimelineContent><Text className="font-semibold">Delivered</Text><Text className="text-sm text-typography-500">Jan 20, 2025</Text></TimelineContent>
          </TimelineItem>
        </Timeline>
      </ExampleSection>
    </View>
  );
}

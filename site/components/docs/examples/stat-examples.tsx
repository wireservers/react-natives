import React from 'react';
import { View } from 'react-native';
import { ExampleSection } from '../example-section';
import { Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Text } from '@wireservers-ui/react-natives';
import { useExampleCode } from '../example-code-context';

export default function StatExamples() {
  useExampleCode(`import { View } from 'react-native';
import { Stat, StatLabel, StatNumber, StatHelpText, StatArrow } from '@wireservers-ui/react-natives';

export default function Example() {
  return (
    <View style={{ flexDirection: 'row', gap: 24 }}>
      <Stat>
        <StatLabel>Revenue</StatLabel>
        <StatNumber>$45,670</StatNumber>
        <StatHelpText>
          <StatArrow type="increase" />
          12.5%
        </StatHelpText>
      </Stat>
      <Stat>
        <StatLabel>Users</StatLabel>
        <StatNumber>2,340</StatNumber>
        <StatHelpText>
          <StatArrow type="increase" />
          8.2%
        </StatHelpText>
      </Stat>
      <Stat>
        <StatLabel>Bounce Rate</StatLabel>
        <StatNumber>24.3%</StatNumber>
        <StatHelpText>
          <StatArrow type="decrease" />
          3.1%
        </StatHelpText>
      </Stat>
    </View>
  );
}`, []);

  return (
    <View style={{ gap: 24 }}>
      <ExampleSection title="Basic Stat" description="Display key metrics with trend indicators." code={`import { Stat, StatLabel, StatNumber, StatHelpText, StatArrow } from '@wireservers-ui/react-natives';

export default function Example() {
  return (
    <Stat>
      <StatLabel>Revenue</StatLabel>
      <StatNumber>$45,670</StatNumber>
      <StatHelpText>
        <StatArrow type="increase" />
        12.5%
      </StatHelpText>
    </Stat>
  );
}`}>
        <View style={{ flexDirection: 'row', gap: 24 }}>
          <Stat>
            <StatLabel>Revenue</StatLabel>
            <StatNumber>$45,670</StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              12.5%
            </StatHelpText>
          </Stat>
          <Stat>
            <StatLabel>Users</StatLabel>
            <StatNumber>2,340</StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              8.2%
            </StatHelpText>
          </Stat>
          <Stat>
            <StatLabel>Bounce Rate</StatLabel>
            <StatNumber>24.3%</StatNumber>
            <StatHelpText>
              <StatArrow type="decrease" />
              3.1%
            </StatHelpText>
          </Stat>
        </View>
      </ExampleSection>
    </View>
  );
}

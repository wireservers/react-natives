import React, { useState } from 'react';
import { View } from 'react-native';
import { ExampleSection } from '../example-section';
import { Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody, PopoverCloseButton, Button, ButtonText, Heading, Text } from '@wireservers-ui/react-natives';
import { useExampleCode } from '../example-code-context';

export default function PopoverExamples() {
  useExampleCode(`import { Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody, PopoverCloseButton, Button, ButtonText, Heading, Text } from '@wireservers-ui/react-natives';

export default function Example() {
  return (
    <Popover placement="bottom">
      <PopoverTrigger>
        <Button><ButtonText>Open Popover</ButtonText></Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <Heading size="sm">Details</Heading>
          <PopoverCloseButton />
        </PopoverHeader>
        <PopoverBody>
          <Text>Additional information or actions can be placed here.</Text>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}`, []);

  return (
    <View style={{ gap: 24 }}>
      <ExampleSection title="Basic Popover" description="A positioned overlay relative to a trigger." code={`import { Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody, PopoverCloseButton, Button, ButtonText, Heading, Text } from '@wireservers-ui/react-natives';

export default function Example() {
  return (
    <Popover placement="bottom">
      <PopoverTrigger>
        <Button><ButtonText>Open Popover</ButtonText></Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <Heading size="sm">Details</Heading>
          <PopoverCloseButton />
        </PopoverHeader>
        <PopoverBody>
          <Text>Additional information or actions can be placed here.</Text>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}`}>
        <Popover placement="bottom">
          <PopoverTrigger>
            <Button><ButtonText>Open Popover</ButtonText></Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverHeader>
              <Heading size="sm">Details</Heading>
              <PopoverCloseButton />
            </PopoverHeader>
            <PopoverBody>
              <Text>Additional information or actions can be placed here.</Text>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </ExampleSection>
    </View>
  );
}

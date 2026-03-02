import React, { useState } from 'react';
import { View } from 'react-native';
import { ExampleSection } from '../example-section';
import { VariantPicker } from '../variant-picker';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Text,
  Button,
  ButtonText,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
} from '@wireservers-ui/react-natives';
import { useExampleCode } from '../example-code-context';

const variants = ['elevated', 'outline', 'ghost', 'filled'] as const;
const sizes = ['sm', 'md', 'lg'] as const;

export default function CardExamples() {
  const [variant, setVariant] = useState<string>('elevated');
  const [size, setSize] = useState<string>('md');
  const [actionOpen, setActionOpen] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);
  const [startOpen, setStartOpen] = useState(false);

  useExampleCode(`import { Card, CardHeader, CardBody, CardFooter } from '@wireservers-ui/react-natives';

export default function Example() {
  return (
    <Card variant="${variant}" size="${size}">
      <CardHeader>
        <Heading>Card Title</Heading>
      </CardHeader>
      <CardBody>
        <Text>Card content goes here.</Text>
      </CardBody>
      <CardFooter>
        <Button><ButtonText>Action</ButtonText></Button>
      </CardFooter>
    </Card>
  );
}`, [variant, size]);

  return (
    <View style={{ gap: 24 }}>
      {/* Interactive Example */}
      <ExampleSection
        title="Interactive"
        description="Select variant and size to preview the Card component."
      >
        <VariantPicker
          label="Variant"
          options={[...variants]}
          value={variant}
          onChange={setVariant}
        />
        <VariantPicker
          label="Size"
          options={[...sizes]}
          value={size}
          onChange={setSize}
        />

        <View style={{ marginTop: 8 }}>
          <Card variant={variant as any} size={size as any}>
            <CardHeader>
              <Heading size="md">Card Title</Heading>
            </CardHeader>
            <CardBody>
              <Text>
                This is the card body content. It can contain any elements you
                need to display.
              </Text>
            </CardBody>
            <CardFooter>
              <Popover isOpen={actionOpen} onOpenChange={setActionOpen}>
                <PopoverTrigger>
                  <Button size="sm" variant="outline" action="primary">
                    <ButtonText>Action</ButtonText>
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverHeader>
                    <Heading size="sm">Confirm Action</Heading>
                  </PopoverHeader>
                  <PopoverBody>
                    <Text size="sm">Are you sure you want to perform this action?</Text>
                  </PopoverBody>
                  <PopoverFooter>
                    <View style={{ flexDirection: 'row', gap: 8, justifyContent: 'flex-end' }}>
                      <Button size="sm" variant="outline" action="default" onPress={() => setActionOpen(false)}>
                        <ButtonText>Cancel</ButtonText>
                      </Button>
                      <Button size="sm" variant="solid" action="primary" onPress={() => setActionOpen(false)}>
                        <ButtonText>Confirm</ButtonText>
                      </Button>
                    </View>
                  </PopoverFooter>
                </PopoverContent>
              </Popover>
            </CardFooter>
          </Card>
        </View>
      </ExampleSection>

      {/* All Variants */}
      <ExampleSection
        title="Variants"
        description="Elevated, outline, ghost, and filled card styles."
      >
        <View style={{ gap: 16 }}>
          {variants.map((v) => (
            <Card key={v} variant={v} size="md">
              <CardHeader>
                <Heading size="sm">{v}</Heading>
              </CardHeader>
              <CardBody>
                <Text size="sm">
                  This card uses the &quot;{v}&quot; variant.
                </Text>
              </CardBody>
            </Card>
          ))}
        </View>
      </ExampleSection>

      {/* All Sizes */}
      <ExampleSection
        title="Sizes"
        description="Small, medium, and large control the internal padding."
      >
        <View style={{ gap: 16 }}>
          {sizes.map((s) => (
            <Card key={s} variant="outline" size={s}>
              <CardHeader>
                <Heading size="sm">Size: {s}</Heading>
              </CardHeader>
              <CardBody>
                <Text size="sm">
                  This card has size=&quot;{s}&quot; which adjusts the padding.
                </Text>
              </CardBody>
              <CardFooter>
                <Text size="xs" style={{ color: '#9CA3AF' }}>
                  Footer content
                </Text>
              </CardFooter>
            </Card>
          ))}
        </View>
      </ExampleSection>

      {/* Rich Content Card */}
      <ExampleSection
        title="Rich Content"
        description="Cards compose well with Heading, Text, and Button components."
      >
        <Card variant="elevated" size="lg">
          <CardHeader>
            <Heading size="lg">Getting Started</Heading>
          </CardHeader>
          <CardBody>
            <Text>
              Wireservers UI provides a comprehensive set of components for
              building polished cross-platform apps. Cards are a great way to
              group related content together.
            </Text>
          </CardBody>
          <CardFooter>
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <Popover isOpen={cancelOpen} onOpenChange={setCancelOpen}>
                <PopoverTrigger>
                  <Button size="sm" variant="outline" action="default">
                    <ButtonText>Cancel</ButtonText>
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverHeader>
                    <Heading size="sm">Discard changes?</Heading>
                  </PopoverHeader>
                  <PopoverBody>
                    <Text size="sm">Any unsaved progress will be lost.</Text>
                  </PopoverBody>
                  <PopoverFooter>
                    <View style={{ flexDirection: 'row', gap: 8, justifyContent: 'flex-end' }}>
                      <Button size="sm" variant="outline" action="default" onPress={() => setCancelOpen(false)}>
                        <ButtonText>Keep Editing</ButtonText>
                      </Button>
                      <Button size="sm" variant="solid" action="negative" onPress={() => setCancelOpen(false)}>
                        <ButtonText>Discard</ButtonText>
                      </Button>
                    </View>
                  </PopoverFooter>
                </PopoverContent>
              </Popover>
              <Popover isOpen={startOpen} onOpenChange={setStartOpen}>
                <PopoverTrigger>
                  <Button size="sm" variant="solid" action="primary">
                    <ButtonText>Get Started</ButtonText>
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverHeader>
                    <Heading size="sm">Welcome!</Heading>
                  </PopoverHeader>
                  <PopoverBody>
                    <Text size="sm">You&apos;re all set to start building with Wireservers UI.</Text>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </View>
          </CardFooter>
        </Card>
      </ExampleSection>
    </View>
  );
}

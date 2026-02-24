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
} from '@wireservers-ui/react-native-ui';

const variants = ['elevated', 'outline', 'ghost', 'filled'] as const;
const sizes = ['sm', 'md', 'lg'] as const;

export default function CardExamples() {
  const [variant, setVariant] = useState<string>('elevated');
  const [size, setSize] = useState<string>('md');

  return (
    <View className="gap-6">
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

        <View className="mt-2">
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
              <Button size="sm" variant="outline" action="primary">
                <ButtonText>Action</ButtonText>
              </Button>
            </CardFooter>
          </Card>
        </View>
      </ExampleSection>

      {/* All Variants */}
      <ExampleSection
        title="Variants"
        description="Elevated, outline, ghost, and filled card styles."
      >
        <View className="gap-4">
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
        <View className="gap-4">
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
                <Text size="xs" className="text-typography-400">
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
              building beautiful cross-platform apps. Cards are a great way to
              group related content together.
            </Text>
          </CardBody>
          <CardFooter>
            <View className="flex-row gap-3">
              <Button size="sm" variant="outline" action="default">
                <ButtonText>Cancel</ButtonText>
              </Button>
              <Button size="sm" variant="solid" action="primary">
                <ButtonText>Get Started</ButtonText>
              </Button>
            </View>
          </CardFooter>
        </Card>
      </ExampleSection>
    </View>
  );
}

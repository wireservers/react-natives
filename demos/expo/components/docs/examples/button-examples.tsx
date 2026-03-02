import React, { useState } from 'react';
import { View, Text as RNText } from 'react-native';
import { ExampleSection } from '../example-section';
import { VariantPicker, BooleanPicker } from '../variant-picker';
import {
  Button,
  ButtonText,
  ButtonSpinner,
} from '@wireservers-ui/react-natives';
import { useExampleCode } from '../example-code-context';

const actions = ['primary', 'secondary', 'positive', 'negative', 'default'] as const;
const variants = ['solid', 'outline', 'link'] as const;
const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

export default function ButtonExamples() {
  const [action, setAction] = useState<string>('primary');
  const [variant, setVariant] = useState<string>('solid');
  const [size, setSize] = useState<string>('md');
  const [isLoading, setIsLoading] = useState(false);

  useExampleCode(`import { Button, ButtonText } from '@wireservers-ui/react-natives';

export default function Example() {
  return (
    <Button action="${action}" variant="${variant}" size="${size}">
      <ButtonText>Button</ButtonText>
    </Button>
  );
}`, [action, variant, size]);

  return (
    <View style={{ gap: 24 }}>
      {/* Interactive Example */}
      <ExampleSection
        title="Interactive"
        description="Combine action, variant, and size to customise the button."
      >
        <VariantPicker
          label="Action"
          options={[...actions]}
          value={action}
          onChange={setAction}
        />
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

        <View style={{ marginTop: 8, flexDirection: 'row' }}>
          <Button
            action={action as any}
            variant={variant as any}
            size={size as any}
          >
            <ButtonText>Button</ButtonText>
          </Button>
        </View>
      </ExampleSection>

      {/* Actions */}
      <ExampleSection
        title="Actions"
        description="Semantic actions with the solid variant."
      >
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
          {actions.map((a) => (
            <Button key={a} action={a} variant="solid" size="md">
              <ButtonText>{a}</ButtonText>
            </Button>
          ))}
        </View>
      </ExampleSection>

      {/* Variants */}
      <ExampleSection
        title="Variants"
        description="Solid, outline, and link styles with the primary action."
      >
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
          {variants.map((v) => (
            <Button key={v} action="primary" variant={v} size="md">
              <ButtonText>{v}</ButtonText>
            </Button>
          ))}
        </View>
      </ExampleSection>

      {/* Sizes */}
      <ExampleSection
        title="Sizes"
        description="Buttons scale from xs through xl."
      >
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 12 }}>
          {sizes.map((s) => (
            <Button key={s} action="primary" variant="solid" size={s}>
              <ButtonText>{s}</ButtonText>
            </Button>
          ))}
        </View>
      </ExampleSection>

      {/* Disabled */}
      <ExampleSection
        title="Disabled"
        description="Use isDisabled to visually and functionally disable a button."
      >
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
          <Button action="primary" variant="solid" size="md" isDisabled>
            <ButtonText>Disabled Solid</ButtonText>
          </Button>
          <Button action="primary" variant="outline" size="md" isDisabled>
            <ButtonText>Disabled Outline</ButtonText>
          </Button>
          <Button action="primary" variant="link" size="md" isDisabled>
            <ButtonText>Disabled Link</ButtonText>
          </Button>
        </View>
      </ExampleSection>

      {/* Loading */}
      <ExampleSection
        title="Loading State"
        description="Use ButtonSpinner to indicate a loading state. Tap the button to toggle."
      >
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
          <Button
            action="primary"
            variant="solid"
            size="md"
            isDisabled={isLoading}
            onPress={() => {
              setIsLoading(true);
              setTimeout(() => setIsLoading(false), 2000);
            }}
          >
            {isLoading && <ButtonSpinner />}
            <ButtonText>{isLoading ? 'Loading...' : 'Tap to Load'}</ButtonText>
          </Button>

          {/* Static loading preview */}
          <Button action="secondary" variant="solid" size="md" isDisabled>
            <ButtonSpinner />
            <ButtonText>Processing</ButtonText>
          </Button>
        </View>
      </ExampleSection>

      {/* Variant + Action Matrix */}
      <ExampleSection
        title="Variant + Action Matrix"
        description="All combinations of variant and action."
      >
        <View style={{ gap: 16 }}>
          {variants.map((v) => (
            <View key={v} style={{ gap: 8 }}>
              <RNText style={{ fontSize: 11, fontWeight: '500', color: '#6B7280', textTransform: 'uppercase' }}>
                {v}
              </RNText>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                {actions.map((a) => (
                  <Button key={`${v}-${a}`} action={a} variant={v} size="sm">
                    <ButtonText>{a}</ButtonText>
                  </Button>
                ))}
              </View>
            </View>
          ))}
        </View>
      </ExampleSection>
    </View>
  );
}

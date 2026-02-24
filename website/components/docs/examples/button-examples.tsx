import React, { useState } from 'react';
import { View, Text as RNText } from 'react-native';
import { ExampleSection } from '../example-section';
import { VariantPicker, BooleanPicker } from '../variant-picker';
import {
  Button,
  ButtonText,
  ButtonSpinner,
} from '@wireservers-ui/react-native-ui';

const actions = ['primary', 'secondary', 'positive', 'negative', 'default'] as const;
const variants = ['solid', 'outline', 'link'] as const;
const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

export default function ButtonExamples() {
  const [action, setAction] = useState<string>('primary');
  const [variant, setVariant] = useState<string>('solid');
  const [size, setSize] = useState<string>('md');
  const [isLoading, setIsLoading] = useState(false);

  return (
    <View className="gap-6">
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

        <View className="mt-2 flex-row">
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
        <View className="flex-row flex-wrap gap-3">
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
        <View className="flex-row flex-wrap gap-3">
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
        <View className="flex-row flex-wrap items-center gap-3">
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
        <View className="flex-row flex-wrap gap-3">
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
        <View className="flex-row flex-wrap gap-3">
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
        <View className="gap-4">
          {variants.map((v) => (
            <View key={v} className="gap-2">
              <RNText className="text-xs font-medium text-typography-500 uppercase">
                {v}
              </RNText>
              <View className="flex-row flex-wrap gap-2">
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

import React, { useState } from 'react';
import { View } from 'react-native';
import { ExampleSection } from '../example-section';
import { VariantPicker } from '../variant-picker';
import { Badge, BadgeText } from '@wireservers-ui/react-native-ui';

const actions = [
  'primary',
  'secondary',
  'error',
  'success',
  'warning',
  'info',
  'muted',
] as const;
const variants = ['solid', 'outline', 'subtle'] as const;
const sizes = ['sm', 'md', 'lg'] as const;

export default function BadgeExamples() {
  const [action, setAction] = useState<string>('info');
  const [variant, setVariant] = useState<string>('subtle');
  const [size, setSize] = useState<string>('md');

  return (
    <View className="gap-6">
      {/* Interactive Example */}
      <ExampleSection
        title="Interactive"
        description="Combine action, variant, and size to customise the badge."
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
          <Badge
            action={action as any}
            variant={variant as any}
            size={size as any}
          >
            <BadgeText>Badge</BadgeText>
          </Badge>
        </View>
      </ExampleSection>

      {/* Actions */}
      <ExampleSection
        title="Actions"
        description="Seven semantic action colours available in each variant."
      >
        <View className="flex-row flex-wrap gap-2">
          {actions.map((a) => (
            <Badge key={a} action={a} variant="solid">
              <BadgeText>{a}</BadgeText>
            </Badge>
          ))}
        </View>
      </ExampleSection>

      {/* Variants */}
      <ExampleSection
        title="Variants"
        description="Solid, outline, and subtle variants with the primary action."
      >
        <View className="flex-row flex-wrap gap-2">
          {variants.map((v) => (
            <Badge key={v} action="primary" variant={v}>
              <BadgeText>{v}</BadgeText>
            </Badge>
          ))}
        </View>
      </ExampleSection>

      {/* Sizes */}
      <ExampleSection
        title="Sizes"
        description="Small, medium, and large badges."
      >
        <View className="flex-row items-center gap-2">
          {sizes.map((s) => (
            <Badge key={s} action="primary" variant="subtle" size={s}>
              <BadgeText>{s}</BadgeText>
            </Badge>
          ))}
        </View>
      </ExampleSection>

      {/* Matrix */}
      <ExampleSection
        title="Variant + Action Matrix"
        description="All combinations of variant and action displayed together."
      >
        <View className="gap-3">
          {variants.map((v) => (
            <View key={v} className="gap-1">
              <Badge action="muted" variant="subtle" size="sm">
                <BadgeText>{v}</BadgeText>
              </Badge>
              <View className="flex-row flex-wrap gap-2 mt-1">
                {actions.map((a) => (
                  <Badge key={`${v}-${a}`} action={a} variant={v}>
                    <BadgeText>{a}</BadgeText>
                  </Badge>
                ))}
              </View>
            </View>
          ))}
        </View>
      </ExampleSection>
    </View>
  );
}

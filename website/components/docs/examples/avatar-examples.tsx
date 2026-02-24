import React, { useState } from 'react';
import { View, Text as RNText } from 'react-native';
import { ExampleSection } from '../example-section';
import { VariantPicker } from '../variant-picker';
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  AvatarBadge,
  AvatarGroup,
} from '@wireservers-ui/react-native-ui';

const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;

export default function AvatarExamples() {
  const [size, setSize] = useState<string>('md');

  return (
    <View className="gap-6">
      {/* Interactive Example */}
      <ExampleSection
        title="Interactive"
        description="Select a size to preview the Avatar with fallback text."
      >
        <VariantPicker
          label="Size"
          options={[...sizes]}
          value={size}
          onChange={setSize}
        />

        <View className="mt-2 flex-row gap-3">
          <Avatar size={size as any}>
            <AvatarFallbackText>Jane Doe</AvatarFallbackText>
          </Avatar>
          <Avatar size={size as any}>
            <AvatarFallbackText>John Smith</AvatarFallbackText>
          </Avatar>
          <Avatar size={size as any}>
            <AvatarFallbackText>Alex Chen</AvatarFallbackText>
          </Avatar>
        </View>
      </ExampleSection>

      {/* All Sizes */}
      <ExampleSection
        title="All Sizes"
        description="Avatars scale from xs (24px) through 2xl (64px)."
      >
        <View className="flex-row items-end gap-3">
          {sizes.map((s) => (
            <View key={s} className="items-center gap-2">
              <Avatar size={s}>
                <AvatarFallbackText>AB</AvatarFallbackText>
              </Avatar>
              <RNText className="text-2xs text-typography-500">{s}</RNText>
            </View>
          ))}
        </View>
      </ExampleSection>

      {/* Avatar with Image */}
      <ExampleSection
        title="With Image"
        description="Display a photo using AvatarImage. Falls back to AvatarFallbackText on error."
      >
        <View className="flex-row gap-3">
          <Avatar size="lg">
            <AvatarFallbackText>Jane Doe</AvatarFallbackText>
            <AvatarImage
              source={{ uri: 'https://picsum.photos/100' }}
              alt="Jane Doe"
            />
          </Avatar>
          <Avatar size="lg">
            <AvatarFallbackText>Alex Chen</AvatarFallbackText>
            <AvatarImage
              source={{ uri: 'https://picsum.photos/101' }}
              alt="Alex Chen"
            />
          </Avatar>
          <Avatar size="lg">
            <AvatarFallbackText>Sam Lee</AvatarFallbackText>
            <AvatarImage
              source={{ uri: 'https://picsum.photos/102' }}
              alt="Sam Lee"
            />
          </Avatar>
        </View>
      </ExampleSection>

      {/* Avatar with Badge */}
      <ExampleSection
        title="With Badge"
        description="Add an AvatarBadge to indicate online status."
      >
        <View className="flex-row gap-4">
          {(['sm', 'md', 'lg', 'xl'] as const).map((s) => (
            <Avatar key={s} size={s}>
              <AvatarFallbackText>AB</AvatarFallbackText>
              <AvatarBadge />
            </Avatar>
          ))}
        </View>
      </ExampleSection>

      {/* Avatar Group */}
      <ExampleSection
        title="Avatar Group"
        description="AvatarGroup stacks avatars with an overflow indicator via the max prop."
      >
        <View className="gap-4">
          <RNText className="text-sm text-typography-500">
            max=3 (showing 3 of 5)
          </RNText>
          <AvatarGroup max={3}>
            <Avatar size="md">
              <AvatarFallbackText>Alice</AvatarFallbackText>
            </Avatar>
            <Avatar size="md">
              <AvatarFallbackText>Bob</AvatarFallbackText>
            </Avatar>
            <Avatar size="md">
              <AvatarFallbackText>Carol</AvatarFallbackText>
            </Avatar>
            <Avatar size="md">
              <AvatarFallbackText>Dave</AvatarFallbackText>
            </Avatar>
            <Avatar size="md">
              <AvatarFallbackText>Eve</AvatarFallbackText>
            </Avatar>
          </AvatarGroup>

          <RNText className="text-sm text-typography-500 mt-2">
            max=2 (showing 2 of 4)
          </RNText>
          <AvatarGroup max={2}>
            <Avatar size="lg">
              <AvatarFallbackText>Alice</AvatarFallbackText>
            </Avatar>
            <Avatar size="lg">
              <AvatarFallbackText>Bob</AvatarFallbackText>
            </Avatar>
            <Avatar size="lg">
              <AvatarFallbackText>Carol</AvatarFallbackText>
            </Avatar>
            <Avatar size="lg">
              <AvatarFallbackText>Dave</AvatarFallbackText>
            </Avatar>
          </AvatarGroup>
        </View>
      </ExampleSection>
    </View>
  );
}

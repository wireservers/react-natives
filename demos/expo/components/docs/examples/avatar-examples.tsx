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
} from '@wireservers-ui/react-natives';
import { useExampleCode } from '../example-code-context';

const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;

export default function AvatarExamples() {
  const [size, setSize] = useState<string>('md');

  useExampleCode(`import { Avatar, AvatarImage, AvatarFallbackText } from '@wireservers-ui/react-natives';

export default function Example() {
  return (
    <Avatar size="${size}">
      <AvatarImage source={{ uri: 'https://i.pravatar.cc/150' }} alt="User" />
      <AvatarFallbackText>John Doe</AvatarFallbackText>
    </Avatar>
  );
}`, [size]);

  return (
    <View style={{ gap: 24 }}>
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

        <View style={{ marginTop: 8, flexDirection: 'row', gap: 12 }}>
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
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 12 }}>
          {sizes.map((s) => (
            <View key={s} style={{ alignItems: 'center', gap: 8 }}>
              <Avatar size={s}>
                <AvatarFallbackText>AB</AvatarFallbackText>
              </Avatar>
              <RNText style={{ fontSize: 11, color: '#6B7280' }}>{s}</RNText>
            </View>
          ))}
        </View>
      </ExampleSection>

      {/* Avatar with Image */}
      <ExampleSection
        title="With Image"
        description="Display a photo using AvatarImage. Falls back to AvatarFallbackText on error."
      >
        <View style={{ flexDirection: 'row', gap: 12 }}>
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
        <View style={{ flexDirection: 'row', gap: 16 }}>
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
        <View style={{ gap: 16 }}>
          <RNText style={{ fontSize: 14, color: '#6B7280' }}>
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

          <RNText style={{ fontSize: 14, color: '#6B7280', marginTop: 8 }}>
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

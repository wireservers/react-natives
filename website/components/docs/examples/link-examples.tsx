import React from 'react';
import { View, Text as RNText } from 'react-native';
import { ExampleSection } from '../example-section';
import { Link, LinkText } from '@wireservers-ui/react-native-ui';

export default function LinkExamples() {
  return (
    <View className="gap-6">
      {/* Default Link */}
      <ExampleSection
        title="Default Link"
        description="A basic link with styled text."
      >
        <Link>
          <LinkText>Learn more</LinkText>
        </Link>
      </ExampleSection>

      {/* External Link */}
      <ExampleSection
        title="External Link"
        description="A link with an href that navigates to an external URL. The isExternal prop indicates external navigation."
      >
        <Link href="https://example.com" isExternal>
          <LinkText>Visit Example.com</LinkText>
        </Link>
      </ExampleSection>

      {/* Links in Context */}
      <ExampleSection
        title="Inline Usage"
        description="Links can be placed inline with other text content."
      >
        <View className="flex-row flex-wrap items-center gap-1">
          <RNText className="text-sm text-typography-700">
            By continuing, you agree to our
          </RNText>
          <Link href="https://example.com/terms">
            <LinkText>Terms of Service</LinkText>
          </Link>
          <RNText className="text-sm text-typography-700">and</RNText>
          <Link href="https://example.com/privacy">
            <LinkText>Privacy Policy</LinkText>
          </Link>
        </View>
      </ExampleSection>
    </View>
  );
}

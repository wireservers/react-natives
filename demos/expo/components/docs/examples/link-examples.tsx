import React from 'react';
import { View, Text as RNText } from 'react-native';
import { ExampleSection } from '../example-section';
import { Link, LinkText } from '@wireservers-ui/react-natives';
import { useExampleCode } from '../example-code-context';

export default function LinkExamples() {
  useExampleCode(`import { Link, LinkText } from '@wireservers-ui/react-natives';

export default function Example() {
  return (
    <Link href="https://example.com" isExternal>
      <LinkText>Visit Example.com</LinkText>
    </Link>
  );
}`, []);

  return (
    <View style={{ gap: 24 }}>
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
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 4 }}>
          <RNText style={{ fontSize: 14, color: '#525252' }}>
            By continuing, you agree to our
          </RNText>
          <Link href="https://example.com/terms">
            <LinkText>Terms of Service</LinkText>
          </Link>
          <RNText style={{ fontSize: 14, color: '#525252' }}>and</RNText>
          <Link href="https://example.com/privacy">
            <LinkText>Privacy Policy</LinkText>
          </Link>
        </View>
      </ExampleSection>
    </View>
  );
}

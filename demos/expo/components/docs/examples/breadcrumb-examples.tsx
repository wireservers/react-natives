import React from 'react';
import { View, Text as RNText } from 'react-native';
import { ExampleSection } from '../example-section';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbText,
} from '@wireservers-ui/react-natives';
import { useExampleCode } from '../example-code-context';

export default function BreadcrumbExamples() {
  useExampleCode(`import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbText } from '@wireservers-ui/react-natives';

export default function Example() {
  return (
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink href="/home">
          <BreadcrumbText>Home</BreadcrumbText>
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem isCurrent>
        <BreadcrumbLink>
          <BreadcrumbText>Current Page</BreadcrumbText>
        </BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  );
}`, []);

  return (
    <View style={{ gap: 24 }}>
      {/* Basic 3-Level Breadcrumb */}
      <ExampleSection
        title="Basic Breadcrumb"
        description="A standard 3-level breadcrumb path. The last item uses isCurrent to indicate the active page."
        code={`import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbText } from '@wireservers-ui/react-natives';

export default function Example() {
  return (
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink>
          <BreadcrumbText>Home</BreadcrumbText>
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink>
          <BreadcrumbText>Components</BreadcrumbText>
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem isCurrent>
        <BreadcrumbLink>
          <BreadcrumbText>Breadcrumb</BreadcrumbText>
        </BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  );
}`}
      >
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink>
              <BreadcrumbText>Home</BreadcrumbText>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink>
              <BreadcrumbText>Components</BreadcrumbText>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrent>
            <BreadcrumbLink>
              <BreadcrumbText>Breadcrumb</BreadcrumbText>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </ExampleSection>

      {/* With Links */}
      <ExampleSection
        title="With Navigation"
        description="Breadcrumb items can include href for navigation. The current page link is typically non-interactive."
        code={`import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbText } from '@wireservers-ui/react-natives';

export default function Example() {
  return (
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink href="/home">
          <BreadcrumbText>Home</BreadcrumbText>
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href="/settings">
          <BreadcrumbText>Settings</BreadcrumbText>
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem isCurrent>
        <BreadcrumbLink>
          <BreadcrumbText>Profile</BreadcrumbText>
        </BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  );
}`}
      >
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href="/home">
              <BreadcrumbText>Home</BreadcrumbText>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href="/settings">
              <BreadcrumbText>Settings</BreadcrumbText>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrent>
            <BreadcrumbLink>
              <BreadcrumbText>Profile</BreadcrumbText>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </ExampleSection>

      {/* Custom Separator */}
      <ExampleSection
        title="Custom Separator"
        description="Pass a custom separator string or element to change the divider between breadcrumb items."
        code={`import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbText } from '@wireservers-ui/react-natives';

export default function Example() {
  return (
    <Breadcrumb separator=">">
      <BreadcrumbItem>
        <BreadcrumbLink>
          <BreadcrumbText>Dashboard</BreadcrumbText>
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink>
          <BreadcrumbText>Analytics</BreadcrumbText>
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem isCurrent>
        <BreadcrumbLink>
          <BreadcrumbText>Reports</BreadcrumbText>
        </BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  );
}`}
      >
        <View style={{ gap: 16 }}>
          <View style={{ gap: 4 }}>
            <RNText style={{ fontSize: 12, color: '#737373' }}>
              Arrow separator
            </RNText>
            <Breadcrumb separator=">" >
              <BreadcrumbItem>
                <BreadcrumbLink>
                  <BreadcrumbText>Dashboard</BreadcrumbText>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink>
                  <BreadcrumbText>Analytics</BreadcrumbText>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem isCurrent>
                <BreadcrumbLink>
                  <BreadcrumbText>Reports</BreadcrumbText>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
          </View>

          <View style={{ gap: 4 }}>
            <RNText style={{ fontSize: 12, color: '#737373' }}>
              Dot separator
            </RNText>
            <Breadcrumb separator="." >
              <BreadcrumbItem>
                <BreadcrumbLink>
                  <BreadcrumbText>Products</BreadcrumbText>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink>
                  <BreadcrumbText>Electronics</BreadcrumbText>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem isCurrent>
                <BreadcrumbLink>
                  <BreadcrumbText>Phones</BreadcrumbText>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
          </View>
        </View>
      </ExampleSection>
    </View>
  );
}

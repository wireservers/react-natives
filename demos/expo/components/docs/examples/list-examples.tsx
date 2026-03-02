import React, { useState } from 'react';
import { View } from 'react-native';
import { ExampleSection } from '../example-section';
import { VariantPicker } from '../variant-picker';
import { List, ListItem, ListItemText, ListItemDescription, Text } from '@wireservers-ui/react-natives';
import { useExampleCode } from '../example-code-context';

const variants = ['unordered', 'ordered'] as const;

export default function ListExamples() {
  const [variant, setVariant] = useState<string>('unordered');

  useExampleCode(`import { List, ListItem, ListItemText } from '@wireservers-ui/react-natives';

export default function Example() {
  return (
    <List variant="${variant}">
      <ListItem><ListItemText>First item</ListItemText></ListItem>
      <ListItem><ListItemText>Second item</ListItemText></ListItem>
      <ListItem><ListItemText>Third item</ListItemText></ListItem>
    </List>
  );
}`, [variant]);

  return (
    <View style={{ gap: 24 }}>
      <ExampleSection title="Interactive" description="Switch between ordered and unordered list styles.">
        <VariantPicker label="Variant" options={[...variants]} value={variant} onChange={setVariant} />
        <List variant={variant as any} className="mt-2">
          <ListItem><ListItemText>First item</ListItemText></ListItem>
          <ListItem><ListItemText>Second item</ListItemText></ListItem>
          <ListItem><ListItemText>Third item</ListItemText></ListItem>
        </List>
      </ExampleSection>

      <ExampleSection title="With Descriptions" description="List items with secondary text.">
        <List>
          <ListItem>
            <ListItemText>Dashboard</ListItemText>
            <ListItemDescription>Overview of your account</ListItemDescription>
          </ListItem>
          <ListItem>
            <ListItemText>Settings</ListItemText>
            <ListItemDescription>Manage preferences</ListItemDescription>
          </ListItem>
        </List>
      </ExampleSection>
    </View>
  );
}

import React, { useState } from 'react';
import { View } from 'react-native';
import { ExampleSection } from '../example-section';
import { Menu, MenuTrigger, MenuContent, MenuItem, MenuItemText, MenuSeparator, Button, ButtonText, Text } from '@wireservers-ui/react-natives';
import { useExampleCode } from '../example-code-context';

export default function MenuExamples() {
  useExampleCode(`import { Menu, MenuTrigger, MenuContent, MenuItem, MenuItemText, MenuSeparator, Button, ButtonText } from '@wireservers-ui/react-natives';

export default function Example() {
  return (
    <Menu>
      <MenuTrigger>
        <Button><ButtonText>Open Menu</ButtonText></Button>
      </MenuTrigger>
      <MenuContent>
        <MenuItem><MenuItemText>Edit</MenuItemText></MenuItem>
        <MenuItem><MenuItemText>Duplicate</MenuItemText></MenuItem>
        <MenuSeparator />
        <MenuItem><MenuItemText>Delete</MenuItemText></MenuItem>
      </MenuContent>
    </Menu>
  );
}`, []);

  return (
    <View style={{ gap: 24 }}>
      <ExampleSection title="Basic Menu" description="A dropdown menu with items and separators." code={`import { Menu, MenuTrigger, MenuContent, MenuItem, MenuItemText, MenuSeparator, Button, ButtonText } from '@wireservers-ui/react-natives';

export default function Example() {
  return (
    <Menu>
      <MenuTrigger>
        <Button><ButtonText>Open Menu</ButtonText></Button>
      </MenuTrigger>
      <MenuContent>
        <MenuItem><MenuItemText>Edit</MenuItemText></MenuItem>
        <MenuItem><MenuItemText>Duplicate</MenuItemText></MenuItem>
        <MenuSeparator />
        <MenuItem><MenuItemText>Delete</MenuItemText></MenuItem>
      </MenuContent>
    </Menu>
  );
}`}>
        <Menu>
          <MenuTrigger>
            <Button><ButtonText>Open Menu</ButtonText></Button>
          </MenuTrigger>
          <MenuContent>
            <MenuItem onPress={() => {}}><MenuItemText>Edit</MenuItemText></MenuItem>
            <MenuItem onPress={() => {}}><MenuItemText>Duplicate</MenuItemText></MenuItem>
            <MenuSeparator />
            <MenuItem onPress={() => {}}><MenuItemText>Delete</MenuItemText></MenuItem>
          </MenuContent>
        </Menu>
      </ExampleSection>
    </View>
  );
}

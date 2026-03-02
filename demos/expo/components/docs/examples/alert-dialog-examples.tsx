import React, { useState } from 'react';
import { View } from 'react-native';
import { ExampleSection } from '../example-section';
import { AlertDialog, AlertDialogBackdrop, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, AlertDialogCloseButton, Button, ButtonText, Heading, Text } from '@wireservers-ui/react-natives';
import { useExampleCode } from '../example-code-context';

export default function AlertDialogExamples() {
  const [isOpen, setIsOpen] = useState(false);

  useExampleCode(`import { AlertDialog, AlertDialogBackdrop, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, AlertDialogCloseButton, Button, ButtonText, Heading, Text } from '@wireservers-ui/react-natives';

export default function Example() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onPress={() => setIsOpen(true)}>
        <ButtonText>Delete Item</ButtonText>
      </Button>
      <AlertDialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <AlertDialogBackdrop />
        <AlertDialogContent>
          <AlertDialogHeader>
            <Heading size="md">Confirm Delete</Heading>
            <AlertDialogCloseButton />
          </AlertDialogHeader>
          <AlertDialogBody>
            <Text>Are you sure you want to delete this item? This action cannot be undone.</Text>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button variant="outline" onPress={() => setIsOpen(false)}>
              <ButtonText>Cancel</ButtonText>
            </Button>
            <Button action="negative" onPress={() => setIsOpen(false)}>
              <ButtonText>Delete</ButtonText>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}`, []);

  return (
    <View style={{ gap: 24 }}>
      <ExampleSection title="Confirmation Dialog" description="A modal dialog requiring explicit user action.">
        <Button onPress={() => setIsOpen(true)}>
          <ButtonText>Delete Item</ButtonText>
        </Button>
        <AlertDialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <AlertDialogBackdrop />
          <AlertDialogContent>
            <AlertDialogHeader>
              <Heading size="md">Confirm Delete</Heading>
              <AlertDialogCloseButton />
            </AlertDialogHeader>
            <AlertDialogBody>
              <Text>Are you sure you want to delete this item? This action cannot be undone.</Text>
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button variant="outline" onPress={() => setIsOpen(false)}>
                <ButtonText>Cancel</ButtonText>
              </Button>
              <Button action="negative" onPress={() => setIsOpen(false)}>
                <ButtonText>Delete</ButtonText>
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </ExampleSection>
    </View>
  );
}

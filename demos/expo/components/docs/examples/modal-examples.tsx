import React, { useState } from 'react';
import { View, Text as RNText } from 'react-native';
import { ExampleSection } from '../example-section';
import { VariantPicker } from '../variant-picker';
import {
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  ButtonText,
  Heading,
  Text,
} from '@wireservers-ui/react-natives';
import { useExampleCode } from '../example-code-context';

const sizes = ['xs', 'sm', 'md', 'lg', 'full'] as const;

export default function ModalExamples() {
  const [size, setSize] = useState<string>('md');
  const [showModal, setShowModal] = useState(false);

  useExampleCode(`import { Modal, ModalBackdrop, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton } from '@wireservers-ui/react-natives';
import { useState } from 'react';

export default function Example() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="${size}">
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Heading>Title</Heading>
          <ModalCloseButton />
        </ModalHeader>
        <ModalBody>
          <Text>Modal content goes here.</Text>
        </ModalBody>
        <ModalFooter>
          <Button onPress={() => setIsOpen(false)}>
            <ButtonText>Close</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}`, [size]);

  return (
    <View style={{ gap: 24 }}>
      {/* Interactive Example */}
      <ExampleSection
        title="Interactive"
        description="Select a size and open the modal to see it in action."
      >
        <VariantPicker
          label="Size"
          options={[...sizes]}
          value={size}
          onChange={setSize}
        />

        <View style={{ marginTop: 8 }}>
          <Button onPress={() => setShowModal(true)}>
            <ButtonText>Open Modal</ButtonText>
          </Button>
        </View>

        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          size={size as any}
        >
          <ModalBackdrop />
          <ModalContent>
            <ModalHeader>
              <Heading size="md">Confirm Action</Heading>
              <ModalCloseButton />
            </ModalHeader>
            <ModalBody>
              <Text>
                Are you sure you want to proceed? This action cannot be undone.
              </Text>
            </ModalBody>
            <ModalFooter>
              <Button
                variant="outline"
                onPress={() => setShowModal(false)}
              >
                <ButtonText>Cancel</ButtonText>
              </Button>
              <Button onPress={() => setShowModal(false)}>
                <ButtonText>Confirm</ButtonText>
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </ExampleSection>

      {/* Size Reference */}
      <ExampleSection
        title="Available Sizes"
        description="Modals support xs, sm, md, lg, and full sizes. Use the interactive example above to preview each size."
        code={`import { Modal, ModalBackdrop, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton, Button, ButtonText, Heading, Text } from '@wireservers-ui/react-natives';
import { useState } from 'react';

export default function Example() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onPress={() => setIsOpen(true)}>
        <ButtonText>Open Large Modal</ButtonText>
      </Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="lg">
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading>Title</Heading>
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody>
            <Text>Modal content goes here.</Text>
          </ModalBody>
          <ModalFooter>
            <Button onPress={() => setIsOpen(false)}>
              <ButtonText>Close</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}`}
      >
        <View style={{ gap: 8 }}>
          {sizes.map((s) => (
            <View key={s} style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#6366f1' }} />
              <RNText style={{ fontSize: 14, color: '#525252' }}>{s}</RNText>
            </View>
          ))}
        </View>
      </ExampleSection>
    </View>
  );
}

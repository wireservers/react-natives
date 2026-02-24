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
} from '@wireservers-ui/react-native-ui';

const sizes = ['xs', 'sm', 'md', 'lg', 'full'] as const;

export default function ModalExamples() {
  const [size, setSize] = useState<string>('md');
  const [showModal, setShowModal] = useState(false);

  return (
    <View className="gap-6">
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

        <View className="mt-2">
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
      >
        <View className="gap-2">
          {sizes.map((s) => (
            <View key={s} className="flex-row items-center gap-2">
              <View className="w-2 h-2 rounded-full bg-primary-500" />
              <RNText className="text-sm text-typography-700">{s}</RNText>
            </View>
          ))}
        </View>
      </ExampleSection>
    </View>
  );
}

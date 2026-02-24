import React, { useState } from 'react';
import { View, Text as RNText } from 'react-native';
import { ExampleSection } from '../example-section';
import { VariantPicker } from '../variant-picker';
import {
  Drawer,
  DrawerBackdrop,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  DrawerCloseButton,
  Button,
  ButtonText,
  Heading,
  Text,
} from '@wireservers-ui/react-native-ui';

const placements = ['left', 'right', 'top', 'bottom'] as const;

export default function DrawerExamples() {
  const [placement, setPlacement] = useState<string>('right');
  const [showDrawer, setShowDrawer] = useState(false);

  return (
    <View className="gap-6">
      {/* Interactive Example */}
      <ExampleSection
        title="Interactive"
        description="Select a placement and open the drawer to see it slide in from that direction."
      >
        <VariantPicker
          label="Placement"
          options={[...placements]}
          value={placement}
          onChange={setPlacement}
        />

        <View className="mt-2">
          <Button onPress={() => setShowDrawer(true)}>
            <ButtonText>Open Drawer</ButtonText>
          </Button>
        </View>

        <Drawer
          isOpen={showDrawer}
          onClose={() => setShowDrawer(false)}
          placement={placement as any}
        >
          <DrawerBackdrop />
          <DrawerContent>
            <DrawerHeader>
              <Heading size="md">Drawer Title</Heading>
              <DrawerCloseButton />
            </DrawerHeader>
            <DrawerBody>
              <Text>
                This drawer slides in from the {placement} side of the screen.
                You can place navigation menus, filters, or supplementary
                content inside a drawer.
              </Text>
            </DrawerBody>
            <DrawerFooter>
              <Button
                variant="outline"
                onPress={() => setShowDrawer(false)}
              >
                <ButtonText>Cancel</ButtonText>
              </Button>
              <Button onPress={() => setShowDrawer(false)}>
                <ButtonText>Save</ButtonText>
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </ExampleSection>

      {/* Placement Reference */}
      <ExampleSection
        title="Available Placements"
        description="Drawers can slide in from the left, right, top, or bottom."
      >
        <View className="gap-2">
          {placements.map((p) => (
            <View key={p} className="flex-row items-center gap-2">
              <View className="w-2 h-2 rounded-full bg-primary-500" />
              <RNText className="text-sm text-typography-700">{p}</RNText>
            </View>
          ))}
        </View>
      </ExampleSection>
    </View>
  );
}

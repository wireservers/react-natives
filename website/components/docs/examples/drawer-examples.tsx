import React, { useState } from 'react';
import { View } from 'react-native';
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
} from '@wireservers-ui/react-natives';
import { useExampleCode } from '../example-code-context';

const placements = ['left', 'right', 'top', 'bottom'] as const;
const animationTypes = ['slide', 'fade', 'none'] as const;
const slideFromOptions = ['none', 'top', 'left', 'bottom', 'right'] as const;

export default function DrawerExamples() {
  const [placement, setPlacement] = useState<string>('right');
  const [animationType, setAnimationType] = useState<string>('slide');
  const [slideFrom, setSlideFrom] = useState<string>('none');
  const [overlay, setOverlay] = useState<string>('on');
  const [showDrawer, setShowDrawer] = useState(false);
  const [showInlineDrawer, setShowInlineDrawer] = useState(false);

  const resolvedSlideFrom = slideFrom === 'none' ? undefined : slideFrom;

  useExampleCode(`import { Drawer, DrawerBackdrop, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter, DrawerCloseButton } from '@wireservers-ui/react-natives';
import { useState } from 'react';

export default function Example() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Drawer
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      placement="${placement}"
      animationType="${animationType}"${resolvedSlideFrom ? `\n      slideFrom="${resolvedSlideFrom}"` : ''}
    >${overlay === 'on' ? '\n      <DrawerBackdrop />' : ''}
      <DrawerContent>
        <DrawerHeader>
          <Heading>Title</Heading>
          <DrawerCloseButton />
        </DrawerHeader>
        <DrawerBody>
          <Text>Drawer content goes here.</Text>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}`, [placement, animationType, slideFrom, overlay]);

  return (
    <View style={{ gap: 24 }}>
      {/* Interactive Example */}
      <ExampleSection
        title="Interactive"
        description="Select a placement, animation style, and optional slide direction, then open the drawer."
      >
        <VariantPicker
          label="Placement"
          options={[...placements]}
          value={placement}
          onChange={setPlacement}
        />
        <VariantPicker
          label="Animation"
          options={[...animationTypes]}
          value={animationType}
          onChange={setAnimationType}
        />
        <VariantPicker
          label="Slide From"
          options={[...slideFromOptions]}
          value={slideFrom}
          onChange={setSlideFrom}
        />
        <VariantPicker
          label="Overlay"
          options={['on', 'off']}
          value={overlay}
          onChange={setOverlay}
        />

        <View style={{ marginTop: 8 }}>
          <Button onPress={() => setShowDrawer(true)}>
            <ButtonText>Open Drawer</ButtonText>
          </Button>
        </View>

        <Drawer
          isOpen={showDrawer}
          onClose={() => setShowDrawer(false)}
          placement={placement as any}
          animationType={animationType as any}
          slideFrom={resolvedSlideFrom as any}
        >
          {overlay === 'on' && <DrawerBackdrop />}
          <DrawerContent>
            <DrawerHeader>
              <Heading size="md">Drawer Title</Heading>
              <DrawerCloseButton />
            </DrawerHeader>
            <DrawerBody>
              <Text>
                Placement: {placement}
                {resolvedSlideFrom ? ` · Slides from: ${resolvedSlideFrom}` : ` · Animation: ${animationType}`}
              </Text>
            </DrawerBody>
            <DrawerFooter>
              <Button variant="outline" onPress={() => setShowDrawer(false)}>
                <ButtonText>Cancel</ButtonText>
              </Button>
              <Button onPress={() => setShowDrawer(false)}>
                <ButtonText>Save</ButtonText>
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </ExampleSection>

      {/* Non-modal example */}
      <ExampleSection
        title="Non-Modal (isModal={false})"
        description="The drawer renders inline — no RNModal — so content outside the drawer panel stays interactive."
        code={`import { useState } from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerBody, DrawerCloseButton, Button, ButtonText, Heading, Text } from '@wireservers-ui/react-natives';
import { View } from 'react-native';

export default function Example() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={{ height: 220, position: 'relative' }}>
      <Button onPress={() => setIsOpen(true)}>
        <ButtonText>Open Inline Drawer</ButtonText>
      </Button>

      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        placement="right"
        isModal={false}
      >
        <DrawerContent>
          <DrawerHeader>
            <Heading size="sm">Inline Panel</Heading>
            <DrawerCloseButton />
          </DrawerHeader>
          <DrawerBody>
            <Text>Background stays interactive — no modal overlay.</Text>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </View>
  );
}`}
      >
        <View style={{ height: 220, position: 'relative', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, overflow: 'hidden' }}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 }}>
            <Text className="text-typography-500 text-sm">Background content — still interactive</Text>
            <Button
              size="sm"
              variant="outline"
              onPress={() => setShowInlineDrawer((v) => !v)}
            >
              <ButtonText>{showInlineDrawer ? 'Close Drawer' : 'Open Inline Drawer'}</ButtonText>
            </Button>
          </View>

          <Drawer
            isOpen={showInlineDrawer}
            onClose={() => setShowInlineDrawer(false)}
            placement="right"
            isModal={false}
          >
            <DrawerContent>
              <DrawerHeader>
                <Heading size="sm">Inline Panel</Heading>
                <DrawerCloseButton />
              </DrawerHeader>
              <DrawerBody>
                <Text className="text-sm">Background stays interactive — no modal overlay.</Text>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </View>
      </ExampleSection>
    </View>
  );
}

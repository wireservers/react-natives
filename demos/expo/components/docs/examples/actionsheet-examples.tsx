import React, { useState } from 'react';
import { View, Text as RNText } from 'react-native';
import { ExampleSection } from '../example-section';
import { VariantPicker } from '../variant-picker';
import {
  ActionSheet,
  ActionSheetBackdrop,
  ActionSheetContent,
  ActionSheetDragIndicatorWrapper,
  ActionSheetDragIndicator,
  ActionSheetItem,
  ActionSheetItemText,
  Button,
  ButtonText,
} from '@wireservers-ui/react-natives';
import { useExampleCode } from '../example-code-context';

export default function ActionSheetExamples() {
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [showInlineSheet, setShowInlineSheet] = useState(false);
  const [overlay, setOverlay] = useState<string>('on');

  const handleClose = () => setShowActionSheet(false);

  useExampleCode(`import { ActionSheet, ActionSheetBackdrop, ActionSheetContent, ActionSheetDragIndicatorWrapper, ActionSheetDragIndicator, ActionSheetItem, ActionSheetItemText } from '@wireservers-ui/react-natives';
import { useState } from 'react';

export default function Example() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ActionSheet isOpen={isOpen} onClose={() => setIsOpen(false)}>${overlay === 'on' ? '\n      <ActionSheetBackdrop />' : ''}
      <ActionSheetContent>
        <ActionSheetDragIndicatorWrapper>
          <ActionSheetDragIndicator />
        </ActionSheetDragIndicatorWrapper>
        <ActionSheetItem onPress={() => setIsOpen(false)}>
          <ActionSheetItemText>Edit</ActionSheetItemText>
        </ActionSheetItem>
        <ActionSheetItem onPress={() => setIsOpen(false)}>
          <ActionSheetItemText>Duplicate</ActionSheetItemText>
        </ActionSheetItem>
        <ActionSheetItem onPress={() => setIsOpen(false)}>
          <ActionSheetItemText>Share</ActionSheetItemText>
        </ActionSheetItem>
        <ActionSheetItem onPress={() => setIsOpen(false)}>
          <ActionSheetItemText>Delete</ActionSheetItemText>
        </ActionSheetItem>
      </ActionSheetContent>
    </ActionSheet>
  );
}`, [overlay]);

  return (
    <View style={{ gap: 24 }}>
      {/* Basic Example */}
      <ExampleSection
        title="Basic ActionSheet"
        description="Tap the button to open an ActionSheet with selectable options."
      >
        <VariantPicker
          label="Overlay"
          options={['on', 'off']}
          value={overlay}
          onChange={setOverlay}
        />

        <Button onPress={() => setShowActionSheet(true)}>
          <ButtonText>Open ActionSheet</ButtonText>
        </Button>

        <ActionSheet isOpen={showActionSheet} onClose={handleClose}>
          {overlay === 'on' && <ActionSheetBackdrop />}
          <ActionSheetContent>
            <ActionSheetDragIndicatorWrapper>
              <ActionSheetDragIndicator />
            </ActionSheetDragIndicatorWrapper>
            <ActionSheetItem onPress={handleClose}>
              <ActionSheetItemText>Edit</ActionSheetItemText>
            </ActionSheetItem>
            <ActionSheetItem onPress={handleClose}>
              <ActionSheetItemText>Duplicate</ActionSheetItemText>
            </ActionSheetItem>
            <ActionSheetItem onPress={handleClose}>
              <ActionSheetItemText>Share</ActionSheetItemText>
            </ActionSheetItem>
            <ActionSheetItem onPress={handleClose}>
              <ActionSheetItemText>Delete</ActionSheetItemText>
            </ActionSheetItem>
          </ActionSheetContent>
        </ActionSheet>
      </ExampleSection>

      {/* Non-modal example */}
      <ExampleSection
        title="Non-Modal (isModal={false})"
        description="The action sheet renders inline — no RNModal — so content outside the panel stays interactive."
      >
        <View style={{ height: 220, position: 'relative', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, overflow: 'hidden' }}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 }}>
            <RNText style={{ fontSize: 14, color: '#6B7280' }}>Background content — still interactive</RNText>
            <Button
              size="sm"
              variant="outline"
              onPress={() => setShowInlineSheet((v) => !v)}
            >
              <ButtonText>{showInlineSheet ? 'Close Sheet' : 'Open Inline Sheet'}</ButtonText>
            </Button>
          </View>

          <ActionSheet
            isOpen={showInlineSheet}
            onClose={() => setShowInlineSheet(false)}
            isModal={false}
          >
            <ActionSheetContent>
              <ActionSheetDragIndicatorWrapper>
                <ActionSheetDragIndicator />
              </ActionSheetDragIndicatorWrapper>
              <ActionSheetItem onPress={() => setShowInlineSheet(false)}>
                <ActionSheetItemText>Option A</ActionSheetItemText>
              </ActionSheetItem>
              <ActionSheetItem onPress={() => setShowInlineSheet(false)}>
                <ActionSheetItemText>Option B</ActionSheetItemText>
              </ActionSheetItem>
            </ActionSheetContent>
          </ActionSheet>
        </View>
      </ExampleSection>

      {/* Usage Notes */}
      <ExampleSection
        title="Anatomy"
        description="An ActionSheet is composed of a backdrop, content area with a drag indicator, and action items."
      >
        <View style={{ gap: 8 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#6366f1' }} />
            <RNText style={{ fontSize: 14, color: '#525252' }}>
              ActionSheetBackdrop - dims the background
            </RNText>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#6366f1' }} />
            <RNText style={{ fontSize: 14, color: '#525252' }}>
              ActionSheetDragIndicator - visual handle for swiping
            </RNText>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#6366f1' }} />
            <RNText style={{ fontSize: 14, color: '#525252' }}>
              ActionSheetItem - pressable row for each option
            </RNText>
          </View>
        </View>
      </ExampleSection>
    </View>
  );
}

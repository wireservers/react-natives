import React, { useState } from 'react';
import { View, Text as RNText } from 'react-native';
import { ExampleSection } from '../example-section';
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
} from '@wireservers-ui/react-native-ui';

export default function ActionSheetExamples() {
  const [showActionSheet, setShowActionSheet] = useState(false);

  const handleClose = () => setShowActionSheet(false);

  return (
    <View className="gap-6">
      {/* Basic Example */}
      <ExampleSection
        title="Basic ActionSheet"
        description="Tap the button to open an ActionSheet with selectable options."
      >
        <Button onPress={() => setShowActionSheet(true)}>
          <ButtonText>Open ActionSheet</ButtonText>
        </Button>

        <ActionSheet isOpen={showActionSheet} onClose={handleClose}>
          <ActionSheetBackdrop />
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

      {/* Usage Notes */}
      <ExampleSection
        title="Anatomy"
        description="An ActionSheet is composed of a backdrop, content area with a drag indicator, and action items."
      >
        <View className="gap-2">
          <View className="flex-row items-center gap-2">
            <View className="w-2 h-2 rounded-full bg-primary-500" />
            <RNText className="text-sm text-typography-700">
              ActionSheetBackdrop - dims the background
            </RNText>
          </View>
          <View className="flex-row items-center gap-2">
            <View className="w-2 h-2 rounded-full bg-primary-500" />
            <RNText className="text-sm text-typography-700">
              ActionSheetDragIndicator - visual handle for swiping
            </RNText>
          </View>
          <View className="flex-row items-center gap-2">
            <View className="w-2 h-2 rounded-full bg-primary-500" />
            <RNText className="text-sm text-typography-700">
              ActionSheetItem - pressable row for each option
            </RNText>
          </View>
        </View>
      </ExampleSection>
    </View>
  );
}

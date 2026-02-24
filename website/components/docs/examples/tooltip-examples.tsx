import React, { useState } from 'react';
import { View, Text as RNText } from 'react-native';
import { ExampleSection } from '../example-section';
import { VariantPicker } from '../variant-picker';
import {
  Tooltip,
  TooltipContent,
  TooltipText,
  Button,
  ButtonText,
} from '@wireservers-ui/react-native-ui';

const placements = ['top', 'bottom', 'left', 'right'] as const;

export default function TooltipExamples() {
  const [placement, setPlacement] = useState<string>('top');

  return (
    <View className="gap-6">
      {/* Interactive Example */}
      <ExampleSection
        title="Interactive"
        description="Choose a placement and tap the button to see the tooltip."
      >
        <VariantPicker
          label="Placement"
          options={[...placements]}
          value={placement}
          onChange={setPlacement}
        />

        <View className="mt-2 items-center py-8">
          <Tooltip
            placement={placement as any}
            trigger={(triggerProps) => (
              <Button {...triggerProps}>
                <ButtonText>Hover me</ButtonText>
              </Button>
            )}
          >
            <TooltipContent>
              <TooltipText>This is a tooltip</TooltipText>
            </TooltipContent>
          </Tooltip>
        </View>
      </ExampleSection>

      {/* All Placements */}
      <ExampleSection
        title="Placements"
        description="Tooltips can be placed on top, bottom, left, or right of the trigger element."
      >
        <View className="gap-4 items-center py-4">
          {placements.map((p) => (
            <Tooltip
              key={p}
              placement={p}
              trigger={(triggerProps) => (
                <Button variant="outline" {...triggerProps}>
                  <ButtonText>{p}</ButtonText>
                </Button>
              )}
            >
              <TooltipContent>
                <TooltipText>Tooltip on {p}</TooltipText>
              </TooltipContent>
            </Tooltip>
          ))}
        </View>
      </ExampleSection>
    </View>
  );
}

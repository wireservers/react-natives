import React, { useState } from 'react';
import { View } from 'react-native';
import { ExampleSection } from '../example-section';
import { VariantPicker } from '../variant-picker';
import {
  Tooltip,
  TooltipContent,
  TooltipText,
  Button,
  ButtonText,
} from '@wireservers-ui/react-natives';
import { useExampleCode } from '../example-code-context';

const placements = ['top', 'bottom', 'left', 'right'] as const;

export default function TooltipExamples() {
  const [placement, setPlacement] = useState<string>('top');

  useExampleCode(`import { Tooltip, TooltipContent, TooltipText, Button, ButtonText } from '@wireservers-ui/react-natives';

export default function Example() {
  return (
    <Tooltip
      placement="${placement}"
      trigger={(triggerProps) => (
        <Button {...triggerProps}>
          <ButtonText>Hover me</ButtonText>
        </Button>
      )}
    >
      <TooltipContent>
        <TooltipText>Tooltip text</TooltipText>
      </TooltipContent>
    </Tooltip>
  );
}`, [placement]);

  return (
    <View style={{ gap: 24 }}>
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

        <View style={{ marginTop: 8, alignItems: 'center', paddingVertical: 32 }}>
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
        code={`import { Tooltip, TooltipContent, TooltipText, Button, ButtonText } from '@wireservers-ui/react-natives';

export default function Example() {
  return (
    <Tooltip
      placement="top"
      trigger={(triggerProps) => (
        <Button variant="outline" {...triggerProps}>
          <ButtonText>top</ButtonText>
        </Button>
      )}
    >
      <TooltipContent>
        <TooltipText>Tooltip on top</TooltipText>
      </TooltipContent>
    </Tooltip>
  );
}`}
      >
        <View style={{ gap: 16, alignItems: 'center', paddingVertical: 16 }}>
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

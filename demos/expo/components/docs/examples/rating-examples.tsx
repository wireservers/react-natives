import React, { useState } from 'react';
import { View } from 'react-native';
import { ExampleSection } from '../example-section';
import { VariantPicker } from '../variant-picker';
import { Rating, RatingIcon, Text } from '@wireservers-ui/react-natives';
import { useExampleCode } from '../example-code-context';

const sizes = ['sm', 'md', 'lg', 'xl'] as const;

export default function RatingExamples() {
  const [size, setSize] = useState<string>('md');
  const [value, setValue] = useState(3);

  useExampleCode(`import { Rating, RatingIcon } from '@wireservers-ui/react-natives';

export default function Example() {
  const [value, setValue] = useState(3);
  return (
    <Rating value={value} onChange={setValue} max={5} size="${size}">
      {[0, 1, 2, 3, 4].map(i => (
        <RatingIcon key={i} index={i} />
      ))}
    </Rating>
  );
}`, [size]);

  return (
    <View style={{ gap: 24 }}>
      <ExampleSection title="Interactive" description="Select a star rating.">
        <VariantPicker label="Size" options={[...sizes]} value={size} onChange={setSize} />
        <View style={{ marginTop: 8, alignItems: 'flex-start' }}>
          <Rating value={value} onChange={setValue} max={5} size={size as any}>
            {[0, 1, 2, 3, 4].map(i => (
              <RatingIcon key={i} index={i} />
            ))}
          </Rating>
        </View>
        <Text className="text-sm text-typography-500 mt-1">Rating: {value} / 5</Text>
      </ExampleSection>

      <ExampleSection title="Read Only" description="Display a rating without interaction.">
        <Rating value={4} max={5} isReadOnly>
          {[0, 1, 2, 3, 4].map(i => (
            <RatingIcon key={i} index={i} />
          ))}
        </Rating>
      </ExampleSection>
    </View>
  );
}

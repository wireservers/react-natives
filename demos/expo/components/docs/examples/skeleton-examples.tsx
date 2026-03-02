import React, { useState } from 'react';
import { View } from 'react-native';
import { ExampleSection } from '../example-section';
import { VariantPicker } from '../variant-picker';
import { Skeleton, Text } from '@wireservers-ui/react-natives';
import { useExampleCode } from '../example-code-context';

const variants = ['rectangular', 'circular', 'text'] as const;

export default function SkeletonExamples() {
  const [variant, setVariant] = useState<string>('rectangular');

  useExampleCode(`import { Skeleton } from '@wireservers-ui/react-natives';

export default function Example() {
  return <Skeleton variant="${variant}" className="h-12 w-full" />;
}`, [variant]);

  return (
    <View style={{ gap: 24 }}>
      <ExampleSection title="Interactive" description="Select a skeleton shape variant.">
        <VariantPicker label="Variant" options={[...variants]} value={variant} onChange={setVariant} />
        <View style={{ marginTop: 8 }}>
          <Skeleton
            variant={variant as any}
            style={variant === 'circular' ? { width: 64, height: 64 } : { height: 48, alignSelf: 'stretch' }}
          />
        </View>
      </ExampleSection>

      <ExampleSection title="Loading Card" description="Multiple skeletons composing a loading state.">
        <View style={{ gap: 12, padding: 16, backgroundColor: '#f9fafb', borderRadius: 8 }}>
          <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
            <Skeleton variant="circular" className="h-10 w-10" />
            <View style={{ flex: 1, gap: 8 }}>
              <Skeleton variant="text" className="h-4 w-3/4" />
              <Skeleton variant="text" className="h-3 w-1/2" />
            </View>
          </View>
          <Skeleton variant="rectangular" className="h-32 w-full rounded-md" />
          <Skeleton variant="text" className="h-4 w-full" />
          <Skeleton variant="text" className="h-4 w-2/3" />
        </View>
      </ExampleSection>
    </View>
  );
}

import React from 'react';
import { View } from 'react-native';
import { ExampleSection } from '../example-section';
import { FieldReconciler, Text, type ReconcileField } from '@wireservers-ui/react-natives';
import { useExampleCode } from '../example-code-context';

const fields: ReconcileField[] = [
  {
    key: 'name',
    label: 'Name',
    candidates: [
      { value: 'Checking', sources: ['Existing'] },
      { value: 'Everyday Checking', sources: ['Import'] },
    ],
  },
];

export default function FieldReconcilerExamples() {
  const [values, setValues] = React.useState({ name: 'Checking' });

  useExampleCode(`import { FieldReconciler } from '@wireservers-ui/react-natives';

export default function Example() {
  return (
    <FieldReconciler
      fields={[{ key: 'name', label: 'Name', candidates: [] }]}
      values={{ name: 'Checking' }}
      onChange={() => {}}
    />
  );
}`);

  return (
    <View style={{ gap: 24 }}>
      <ExampleSection title="Candidate Values" description="Pick a candidate value or type a custom value.">
        <FieldReconciler
          fields={fields}
          values={values}
          onChange={(key, value) => setValues((current) => ({ ...current, [key]: value }))}
        />
        <Text size="sm" className="text-typography-500">
          Keeping: {values.name}
        </Text>
      </ExampleSection>
    </View>
  );
}

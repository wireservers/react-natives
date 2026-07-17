import React from 'react';
import { Pressable, View } from 'react-native';
import { Input, InputField } from '../input';
import { Text } from '../text';
import type { FieldReconcilerProps, ReconcileCandidate } from './types';

export const FieldReconciler = React.forwardRef<
  React.ElementRef<typeof View>,
  FieldReconcilerProps
>(({ className, fields, values, onChange, ...props }, ref) => {
  return (
    <View ref={ref} className={`gap-3 ${className ?? ''}`} {...props}>
      {fields.map((field) => {
        const current = values[field.key] ?? '';
        const show = (value: string) => (field.format ? field.format(value) : value) || 'Blank';
        const distinct = dedupeCandidates(field.candidates);
        const hasDiscrepancy = distinct.length > 1;
        return (
          <View
            key={field.key}
            className="gap-2 rounded-lg border border-outline-200 bg-background-50 p-3"
          >
            <View className="flex-row flex-wrap items-center justify-between gap-2">
              <Text weight="bold" className="text-typography-900">
                {field.label}
              </Text>
              <Text size="sm" className="text-typography-500">
                Keeping: {show(current)}
              </Text>
            </View>
            {hasDiscrepancy ? (
              <View className="flex-row flex-wrap gap-2">
                {distinct.map((candidate) => {
                  const active = current === candidate.value;
                  return (
                    <Pressable
                      key={`${field.key}-${candidate.value}`}
                      onPress={() => onChange(field.key, candidate.value)}
                      className={`min-w-[160px] flex-1 rounded-lg border px-3 py-2 ${
                        active ? 'border-primary-500 bg-primary-50' : 'border-outline-200 bg-background-0'
                      }`}
                    >
                      <Text
                        weight="semibold"
                        className={active ? 'text-primary-700' : 'text-typography-900'}
                      >
                        {show(candidate.value)}
                      </Text>
                      {candidate.sources && candidate.sources.length > 0 ? (
                        <Text size="xs" className="mt-1 text-typography-500">
                          From {candidate.sources.join(', ')}
                        </Text>
                      ) : null}
                    </Pressable>
                  );
                })}
              </View>
            ) : null}
            <View className="gap-1.5">
              <Text size="sm" weight="semibold" className="text-typography-700">
                {hasDiscrepancy ? 'Or enter a custom value' : 'Value'}
              </Text>
              <Input className="w-full bg-background-0">
                <InputField
                  value={current}
                  onChangeText={(value) => onChange(field.key, value)}
                  keyboardType={field.keyboardType}
                />
              </Input>
            </View>
          </View>
        );
      })}
    </View>
  );
});

FieldReconciler.displayName = 'FieldReconciler';

function dedupeCandidates(candidates: ReconcileCandidate[]): ReconcileCandidate[] {
  const byValue = new Map<string, ReconcileCandidate>();
  for (const candidate of candidates) {
    const existing = byValue.get(candidate.value);
    if (existing) {
      existing.sources = [...(existing.sources ?? []), ...(candidate.sources ?? [])];
    } else {
      byValue.set(candidate.value, {
        value: candidate.value,
        sources: [...(candidate.sources ?? [])],
      });
    }
  }
  return [...byValue.values()];
}

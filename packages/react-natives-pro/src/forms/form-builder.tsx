import React from 'react';
import { Pressable, ScrollView, Switch, Text, TextInput, View } from 'react-native';
import { WithLicenseWatermark } from '../licensing/watermark';
import {
  canAdvance,
  fieldsForStep,
  formSteps,
  initialValues,
  isLastStep,
  nextStep,
  previousStep,
  prunedValues,
  validateForm,
  validateStep,
  type FieldSchema,
  type FormErrors,
  type FormValues,
} from './form-utils';

export interface FormBuilderProps {
  schema: FieldSchema[];
  /** Controlled values. Omit to let the form manage its own state. */
  values?: FormValues;
  onChange?: (values: FormValues) => void;
  /** Receives values with hidden-field data stripped. */
  onSubmit?: (values: FormValues) => void;
  submitLabel?: string;
  /** Render step indicators and Back/Next when the schema declares steps. */
  wizard?: boolean;
  className?: string;
}

function FieldRow({
  field,
  value,
  error,
  touched,
  onChange,
}: {
  field: FieldSchema;
  value: unknown;
  error?: string;
  touched: boolean;
  onChange: (value: unknown) => void;
}) {
  const showError = touched && Boolean(error);

  const input = () => {
    switch (field.type) {
      case 'checkbox':
      case 'switch':
        return (
          <Switch
            value={Boolean(value)}
            onValueChange={onChange}
            accessibilityLabel={field.label}
          />
        );
      case 'select':
        return (
          <View className="flex-row flex-wrap gap-1">
            {(field.options ?? []).map((option) => {
              const active = value === option.value;
              return (
                <Pressable
                  key={option.value}
                  onPress={() => onChange(option.value)}
                  accessibilityRole="radio"
                  accessibilityState={{ selected: active }}
                  accessibilityLabel={option.label}
                  className={`rounded-full border px-3 py-1 ${active ? 'border-primary-500 bg-primary-500' : 'border-outline-300'}`}
                >
                  <Text className={`text-xs ${active ? 'text-typography-0' : 'text-typography-700'}`}>
                    {option.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        );
      case 'multiselect': {
        const list = Array.isArray(value) ? (value as string[]) : [];
        return (
          <View className="flex-row flex-wrap gap-1">
            {(field.options ?? []).map((option) => {
              const active = list.includes(option.value);
              return (
                <Pressable
                  key={option.value}
                  onPress={() =>
                    onChange(active ? list.filter((v) => v !== option.value) : [...list, option.value])
                  }
                  accessibilityRole="checkbox"
                  accessibilityState={{ checked: active }}
                  accessibilityLabel={option.label}
                  className={`rounded-full border px-3 py-1 ${active ? 'border-primary-500 bg-primary-100' : 'border-outline-300'}`}
                >
                  <Text className="text-xs text-typography-700">{option.label}</Text>
                </Pressable>
              );
            })}
          </View>
        );
      }
      case 'textarea':
        return (
          <TextInput
            value={String(value ?? '')}
            onChangeText={onChange}
            placeholder={field.placeholder}
            placeholderTextColor="#94a3b8"
            multiline
            numberOfLines={4}
            accessibilityLabel={field.label}
            className={`rounded-md border px-3 py-2 text-sm text-typography-900 ${showError ? 'border-error-500' : 'border-outline-300'}`}
            style={{ minHeight: 80, textAlignVertical: 'top' }}
          />
        );
      default:
        return (
          <TextInput
            value={String(value ?? '')}
            onChangeText={onChange}
            placeholder={field.placeholder}
            placeholderTextColor="#94a3b8"
            secureTextEntry={field.type === 'password'}
            keyboardType={field.type === 'number' ? 'numeric' : field.type === 'email' ? 'email-address' : 'default'}
            autoCapitalize={field.type === 'email' ? 'none' : 'sentences'}
            accessibilityLabel={field.label}
            className={`rounded-md border px-3 py-2 text-sm text-typography-900 ${showError ? 'border-error-500' : 'border-outline-300'}`}
          />
        );
    }
  };

  return (
    <View className="mb-3">
      <Text className="mb-1 text-xs font-medium text-typography-700">
        {field.label}
        {field.rules?.required ? <Text className="text-error-600"> *</Text> : null}
      </Text>
      {input()}
      {field.help && !showError ? (
        <Text className="mt-1 text-[11px] text-typography-400">{field.help}</Text>
      ) : null}
      {showError ? (
        <Text className="mt-1 text-[11px] text-error-600" accessibilityLiveRegion="polite">
          {error}
        </Text>
      ) : null}
    </View>
  );
}

/**
 * Schema-driven form with validation, conditional fields, and an optional multi-step wizard.
 *
 * All rules live in `form-utils`, which is unit-tested. Errors surface only after a field is
 * touched or a submit/next is attempted, so a pristine form is never a wall of red.
 */
export function FormBuilder({
  schema,
  values: controlledValues,
  onChange,
  onSubmit,
  submitLabel = 'Submit',
  wizard,
  className,
}: FormBuilderProps) {
  const [internalValues, setInternalValues] = React.useState<FormValues>(() => initialValues(schema));
  const [touched, setTouched] = React.useState<Record<string, boolean>>({});
  const [step, setStep] = React.useState(0);

  const values = controlledValues ?? internalValues;
  const steps = React.useMemo(() => formSteps(schema), [schema]);
  const isWizard = Boolean(wizard) && steps.length > 1;

  const errors: FormErrors = React.useMemo(
    () => (isWizard ? validateStep(schema, step, values) : validateForm(schema, values)),
    [isWizard, schema, step, values],
  );

  const setValue = React.useCallback(
    (name: string, value: unknown) => {
      const next = { ...values, [name]: value };
      if (controlledValues === undefined) setInternalValues(next);
      onChange?.(next);
    },
    [controlledValues, onChange, values],
  );

  const touchAll = (fields: FieldSchema[]) =>
    setTouched((prev) => ({ ...prev, ...Object.fromEntries(fields.map((f) => [f.name, true])) }));

  const fields = isWizard ? fieldsForStep(schema, step, values) : schema.filter((f) => {
    // Non-wizard forms still respect conditional visibility.
    return fieldsForStep(schema, f.step ?? 0, values).includes(f);
  });

  const handleSubmit = () => {
    touchAll(schema);
    if (Object.keys(validateForm(schema, values)).length > 0) return;
    onSubmit?.(prunedValues(schema, values));
  };

  const handleNext = () => {
    touchAll(fields);
    if (!canAdvance(schema, step, values)) return;
    if (isLastStep(schema, step, values)) handleSubmit();
    else setStep(nextStep(schema, step, values));
  };

  return (
    <WithLicenseWatermark>
      <View className={className}>
        {isWizard ? (
          <View className="mb-3 flex-row items-center gap-2">
            {steps.map((s, i) => {
              const done = steps.indexOf(step) > i;
              const active = s === step;
              return (
                <View key={s} className="flex-row items-center gap-2">
                  <View
                    className={`h-6 w-6 items-center justify-center rounded-full ${
                      active ? 'bg-primary-500' : done ? 'bg-success-500' : 'bg-background-200'
                    }`}
                  >
                    <Text className={`text-[10px] font-bold ${active || done ? 'text-typography-0' : 'text-typography-500'}`}>
                      {done ? '✓' : i + 1}
                    </Text>
                  </View>
                  {i < steps.length - 1 ? <View className="h-px w-6 bg-outline-200" /> : null}
                </View>
              );
            })}
            <Text className="ml-2 text-[11px] text-typography-500">
              Step {steps.indexOf(step) + 1} of {steps.length}
            </Text>
          </View>
        ) : null}

        <ScrollView keyboardShouldPersistTaps="handled">
          {fields.map((field) => (
            <FieldRow
              key={field.name}
              field={field}
              value={values[field.name]}
              error={errors[field.name]}
              touched={Boolean(touched[field.name])}
              onChange={(value) => {
                setValue(field.name, value);
                setTouched((prev) => ({ ...prev, [field.name]: true }));
              }}
            />
          ))}
        </ScrollView>

        <View className="mt-2 flex-row justify-end gap-2">
          {isWizard && previousStep(schema, step, values) !== step ? (
            <Pressable
              onPress={() => setStep(previousStep(schema, step, values))}
              accessibilityRole="button"
              accessibilityLabel="Back"
              className="rounded-md border border-outline-300 px-4 py-2"
            >
              <Text className="text-sm text-typography-700">Back</Text>
            </Pressable>
          ) : null}
          <Pressable
            onPress={isWizard ? handleNext : handleSubmit}
            accessibilityRole="button"
            accessibilityLabel={isWizard && !isLastStep(schema, step, values) ? 'Next' : submitLabel}
            className="rounded-md bg-primary-500 px-4 py-2"
          >
            <Text className="text-sm font-medium text-typography-0">
              {isWizard && !isLastStep(schema, step, values) ? 'Next' : submitLabel}
            </Text>
          </Pressable>
        </View>
      </View>
    </WithLicenseWatermark>
  );
}

FormBuilder.displayName = 'FormBuilder';

import React from 'react';
import { View } from 'react-native';
import { Button, ButtonText } from '../button';
import { Card } from '../card';
import { Heading } from '../heading';
import { Step, StepIndicator, StepSeparator, StepTitle, Stepper } from '../stepper';
import { Text } from '../text';
import type { FormWizardProps } from './types';

export function useFormWizardState<T>(initial: T) {
  const [value, setValue] = React.useState<T>(initial);
  const [dirty, setDirty] = React.useState(false);

  return {
    value,
    dirty,
    set(updater: (prev: T) => T) {
      setValue((prev) => updater(prev));
      setDirty(true);
    },
    replace(next: T) {
      setValue(next);
      setDirty(false);
    },
    markSaved() {
      setDirty(false);
    },
  };
}

export const FormWizard = React.forwardRef<
  React.ElementRef<typeof View>,
  FormWizardProps
>(
  (
    {
      className,
      title,
      subtitle,
      steps,
      saving = false,
      onSaveExit,
      onComplete,
      onExit,
      closeLabel = 'Close',
      saveExitLabel = 'Save & Exit',
      savingLabel = 'Saving...',
      backLabel = 'Back',
      nextLabel = 'Next',
      completeLabel = 'Mark complete',
      ...props
    },
    ref,
  ) => {
    const applicable = React.useMemo(
      () => steps.filter((step) => (step.isApplicable ? step.isApplicable() : true)),
      [steps],
    );
    const [index, setIndex] = React.useState(0);
    const current = applicable[Math.min(index, applicable.length - 1)];
    const isLast = index >= applicable.length - 1;
    const isFirst = index <= 0;

    React.useEffect(() => {
      if (index > applicable.length - 1) setIndex(Math.max(0, applicable.length - 1));
    }, [applicable.length, index]);

    if (!current) return null;

    return (
      <View ref={ref} className={`gap-4 ${className ?? ''}`} {...props}>
        <View className="gap-1">
          <Heading size="xl" className="text-typography-950">
            {title}
          </Heading>
          {subtitle ? <Text className="text-typography-600">{subtitle}</Text> : null}
        </View>

        <Stepper activeStep={index} className="w-full">
          {applicable.map((step, stepIndex) => (
            <Step key={step.id} index={stepIndex}>
              <StepIndicator />
              <StepTitle numberOfLines={1}>{step.label}</StepTitle>
              {stepIndex < applicable.length - 1 ? <StepSeparator /> : null}
            </Step>
          ))}
        </Stepper>

      <Card variant="outline" className="gap-4 rounded-lg border-outline-200 bg-background-0 p-5 shadow-sm">
          {current.render()}
        </Card>

        <View className="flex-row flex-wrap items-center justify-between gap-2">
          <Button variant="link" action="secondary" size="sm" onPress={onExit} isDisabled={saving}>
            <ButtonText>{closeLabel}</ButtonText>
          </Button>
          <View className="flex-row flex-wrap items-center gap-2">
            <Button
              variant="outline"
              action="default"
              size="sm"
              onPress={() => void onSaveExit()}
              isDisabled={saving}
              className="rounded-xl"
            >
              <ButtonText>{saving ? savingLabel : saveExitLabel}</ButtonText>
            </Button>
            {!isFirst ? (
              <Button
                variant="outline"
                action="default"
                size="sm"
                onPress={() => setIndex((value) => value - 1)}
                isDisabled={saving}
                className="rounded-xl"
              >
                <ButtonText>{backLabel}</ButtonText>
              </Button>
            ) : null}
            {isLast ? (
              <Button size="sm" onPress={() => void onComplete()} isDisabled={saving} className="rounded-xl">
                <ButtonText>{saving ? savingLabel : completeLabel}</ButtonText>
              </Button>
            ) : (
              <Button
                size="sm"
                onPress={() => setIndex((value) => value + 1)}
                isDisabled={saving}
                className="rounded-xl"
              >
                <ButtonText>{nextLabel}</ButtonText>
              </Button>
            )}
          </View>
        </View>
      </View>
    );
  },
);

FormWizard.displayName = 'FormWizard';

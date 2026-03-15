import React from 'react';
import { View, Text } from 'react-native';
import { createComponentContext } from '../utils/create-context';
import type { StepperProps, StepProps, StepIndicatorProps, StepSeparatorProps, StepTitleProps, StepDescriptionProps, StepperContextValue, StepContextValue } from './types';
import { stepperStyle, stepStyle, stepIndicatorStyle, stepIndicatorTextStyle, stepSeparatorStyle, stepTitleStyle, stepDescriptionStyle } from './styles';

export const [StepperProvider, useStepperContext] = createComponentContext<StepperContextValue>('Stepper');
export const [StepProvider, useStepContext] = createComponentContext<StepContextValue>('Step');

export const Stepper = React.forwardRef<React.ElementRef<typeof View>, StepperProps>(
  ({ className, activeStep = 0, orientation = 'horizontal', children, ...props }, ref) => {
    return (
      <StepperProvider value={{ activeStep, orientation }}>
        <View ref={ref} className={stepperStyle({ orientation, class: className })} {...props}>{children}</View>
      </StepperProvider>
    );
  },
);
Stepper.displayName = 'Stepper';

export const Step = React.forwardRef<React.ElementRef<typeof View>, StepProps>(
  ({ className, index, children, ...props }, ref) => {
    const { activeStep, orientation } = useStepperContext();
    const isActive = index === activeStep;
    const isCompleted = index < activeStep;

    if (orientation === 'vertical') {
      const childArray = React.Children.toArray(children);
      const isSep = (c: React.ReactNode) =>
        React.isValidElement(c) && (c.type as any).displayName === 'StepSeparator';
      const separatorChild = childArray.find(isSep);
      const otherChildren = childArray.filter(c => !isSep(c));
      return (
        <StepProvider value={{ index, isActive, isCompleted }}>
          <View ref={ref} className={stepStyle({ orientation, class: className })} {...props}>
            <View className="items-center">
              {otherChildren[0]}
              {separatorChild}
            </View>
            <View className="pt-1.5 gap-0.5">
              {otherChildren.slice(1)}
            </View>
          </View>
        </StepProvider>
      );
    }

    return (
      <StepProvider value={{ index, isActive, isCompleted }}>
        <View ref={ref} className={stepStyle({ orientation, class: className })} {...props}>{children}</View>
      </StepProvider>
    );
  },
);
Step.displayName = 'Step';

export const StepIndicator = React.forwardRef<React.ElementRef<typeof View>, StepIndicatorProps>(
  ({ className, children, ...props }, ref) => {
    const { index, isActive, isCompleted } = useStepContext();
    return (
      <View ref={ref} className={stepIndicatorStyle({ isActive, isCompleted: !isActive && isCompleted, class: className })} {...props}>
        {children ?? (
          <Text className={stepIndicatorTextStyle({ isActive: isActive || isCompleted })}>
            {isCompleted ? '✓' : index + 1}
          </Text>
        )}
      </View>
    );
  },
);
StepIndicator.displayName = 'StepIndicator';

export const StepSeparator = React.forwardRef<React.ElementRef<typeof View>, StepSeparatorProps>(
  ({ className, ...props }, ref) => {
    const { orientation } = useStepperContext();
    const { isCompleted } = useStepContext();
    return <View ref={ref} className={stepSeparatorStyle({ orientation, isCompleted, class: className })} {...props} />;
  },
);
StepSeparator.displayName = 'StepSeparator';

export const StepTitle = React.forwardRef<React.ElementRef<typeof Text>, StepTitleProps>(
  ({ className, ...props }, ref) => {
    const { isActive, isCompleted } = useStepContext();
    return <Text ref={ref} className={stepTitleStyle({ isActive, isCompleted: !isActive && isCompleted, class: className })} {...props} />;
  },
);
StepTitle.displayName = 'StepTitle';

export const StepDescription = React.forwardRef<React.ElementRef<typeof Text>, StepDescriptionProps>(
  ({ className, ...props }, ref) => {
    return <Text ref={ref} className={stepDescriptionStyle({ class: className })} {...props} />;
  },
);
StepDescription.displayName = 'StepDescription';

'use client';
import React, { createContext, useContext } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';

// --- Variant context for compound components ---

type ButtonVariants = {
  action: 'primary' | 'secondary' | 'positive' | 'negative' | 'default';
  variant: 'link' | 'outline' | 'solid';
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
};

const ButtonVariantContext = createContext<ButtonVariants>({
  action: 'primary',
  variant: 'solid',
  size: 'md',
});

// --- Styles ---

const buttonStyle = tv({
  base: 'group/button rounded bg-primary-500 flex-row items-center justify-center data-[focus-visible=true]:web:outline-none data-[focus-visible=true]:web:ring-2 data-[disabled=true]:opacity-40 gap-2',
  variants: {
    action: {
      primary:
        'bg-primary-500 data-[hover=true]:bg-primary-600 data-[active=true]:bg-primary-700 border-primary-300 data-[hover=true]:border-primary-400 data-[active=true]:border-primary-500 data-[focus-visible=true]:web:ring-indicator-info',
      secondary:
        'bg-secondary-500 border-secondary-300 data-[hover=true]:bg-secondary-600 data-[hover=true]:border-secondary-400 data-[active=true]:bg-secondary-700 data-[active=true]:border-secondary-700 data-[focus-visible=true]:web:ring-indicator-info',
      positive:
        'bg-success-500 border-success-300 data-[hover=true]:bg-success-600 data-[hover=true]:border-success-400 data-[active=true]:bg-success-700 data-[active=true]:border-success-500 data-[focus-visible=true]:web:ring-indicator-info',
      negative:
        'bg-error-500 border-error-300 data-[hover=true]:bg-error-600 data-[hover=true]:border-error-400 data-[active=true]:bg-error-700 data-[active=true]:border-error-500 data-[focus-visible=true]:web:ring-indicator-info',
      default:
        'bg-transparent data-[hover=true]:bg-background-50 data-[active=true]:bg-transparent',
    },
    variant: {
      link: 'px-0',
      outline:
        'bg-transparent border data-[hover=true]:bg-background-50 data-[active=true]:bg-transparent',
      solid: '',
    },
    size: {
      xs: 'px-3.5 h-8',
      sm: 'px-4 h-9',
      md: 'px-5 h-10',
      lg: 'px-6 h-11',
      xl: 'px-7 h-12',
    },
  },
  compoundVariants: [
    {
      action: 'primary',
      variant: 'link',
      class:
        'px-0 bg-transparent data-[hover=true]:bg-transparent data-[active=true]:bg-transparent',
    },
    {
      action: 'secondary',
      variant: 'link',
      class:
        'px-0 bg-transparent data-[hover=true]:bg-transparent data-[active=true]:bg-transparent',
    },
    {
      action: 'positive',
      variant: 'link',
      class:
        'px-0 bg-transparent data-[hover=true]:bg-transparent data-[active=true]:bg-transparent',
    },
    {
      action: 'negative',
      variant: 'link',
      class:
        'px-0 bg-transparent data-[hover=true]:bg-transparent data-[active=true]:bg-transparent',
    },
    {
      action: 'primary',
      variant: 'outline',
      class:
        'bg-transparent data-[hover=true]:bg-background-50 data-[active=true]:bg-transparent',
    },
    {
      action: 'secondary',
      variant: 'outline',
      class:
        'bg-transparent data-[hover=true]:bg-background-50 data-[active=true]:bg-transparent',
    },
    {
      action: 'positive',
      variant: 'outline',
      class:
        'bg-transparent data-[hover=true]:bg-background-50 data-[active=true]:bg-transparent',
    },
    {
      action: 'negative',
      variant: 'outline',
      class:
        'bg-transparent data-[hover=true]:bg-background-50 data-[active=true]:bg-transparent',
    },
  ],
});

const buttonTextStyle = tv({
  base: 'text-typography-0 font-semibold web:select-none',
  variants: {
    action: {
      primary:
        'text-primary-600 data-[hover=true]:text-primary-600 data-[active=true]:text-primary-700',
      secondary:
        'text-typography-500 data-[hover=true]:text-typography-600 data-[active=true]:text-typography-700',
      positive:
        'text-success-600 data-[hover=true]:text-success-600 data-[active=true]:text-success-700',
      negative:
        'text-error-600 data-[hover=true]:text-error-600 data-[active=true]:text-error-700',
      default: '',
    },
    variant: {
      link: 'data-[hover=true]:underline data-[active=true]:underline',
      outline: '',
      solid:
        'text-typography-0 data-[hover=true]:text-typography-0 data-[active=true]:text-typography-0',
    },
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
    },
  },
  compoundVariants: [
    {
      variant: 'solid',
      action: 'primary',
      class:
        'text-typography-0 data-[hover=true]:text-typography-0 data-[active=true]:text-typography-0',
    },
    {
      variant: 'solid',
      action: 'secondary',
      class:
        'text-typography-800 data-[hover=true]:text-typography-800 data-[active=true]:text-typography-800',
    },
    {
      variant: 'solid',
      action: 'positive',
      class:
        'text-typography-0 data-[hover=true]:text-typography-0 data-[active=true]:text-typography-0',
    },
    {
      variant: 'solid',
      action: 'negative',
      class:
        'text-typography-0 data-[hover=true]:text-typography-0 data-[active=true]:text-typography-0',
    },
    {
      variant: 'outline',
      action: 'primary',
      class:
        'text-primary-500 data-[hover=true]:text-primary-500 data-[active=true]:text-primary-500',
    },
    {
      variant: 'outline',
      action: 'secondary',
      class:
        'text-typography-500 data-[hover=true]:text-primary-600 data-[active=true]:text-typography-700',
    },
    {
      variant: 'outline',
      action: 'positive',
      class:
        'text-primary-500 data-[hover=true]:text-primary-500 data-[active=true]:text-primary-500',
    },
    {
      variant: 'outline',
      action: 'negative',
      class:
        'text-primary-500 data-[hover=true]:text-primary-500 data-[active=true]:text-primary-500',
    },
  ],
});

const buttonIconStyle = tv({
  base: 'fill-none',
  variants: {
    variant: {
      link: 'data-[hover=true]:underline data-[active=true]:underline',
      outline: '',
      solid:
        'text-typography-0 data-[hover=true]:text-typography-0 data-[active=true]:text-typography-0',
    },
    size: {
      xs: 'h-3.5 w-3.5',
      sm: 'h-4 w-4',
      md: 'h-[18px] w-[18px]',
      lg: 'h-[18px] w-[18px]',
      xl: 'h-5 w-5',
    },
    action: {
      primary:
        'text-primary-600 data-[hover=true]:text-primary-600 data-[active=true]:text-primary-700',
      secondary:
        'text-typography-500 data-[hover=true]:text-typography-600 data-[active=true]:text-typography-700',
      positive:
        'text-success-600 data-[hover=true]:text-success-600 data-[active=true]:text-success-700',
      negative:
        'text-error-600 data-[hover=true]:text-error-600 data-[active=true]:text-error-700',
      default: '',
    },
  },
  compoundVariants: [
    {
      variant: 'solid',
      action: 'primary',
      class:
        'text-typography-0 data-[hover=true]:text-typography-0 data-[active=true]:text-typography-0',
    },
    {
      variant: 'solid',
      action: 'secondary',
      class:
        'text-typography-800 data-[hover=true]:text-typography-800 data-[active=true]:text-typography-800',
    },
    {
      variant: 'solid',
      action: 'positive',
      class:
        'text-typography-0 data-[hover=true]:text-typography-0 data-[active=true]:text-typography-0',
    },
    {
      variant: 'solid',
      action: 'negative',
      class:
        'text-typography-0 data-[hover=true]:text-typography-0 data-[active=true]:text-typography-0',
    },
  ],
});

const buttonGroupStyle = tv({
  base: '',
  variants: {
    space: {
      'xs': 'gap-1',
      'sm': 'gap-2',
      'md': 'gap-3',
      'lg': 'gap-4',
      'xl': 'gap-5',
      '2xl': 'gap-6',
      '3xl': 'gap-7',
      '4xl': 'gap-8',
    },
    isAttached: {
      true: 'gap-0',
    },
    flexDirection: {
      'row': 'flex-row',
      'column': 'flex-col',
      'row-reverse': 'flex-row-reverse',
      'column-reverse': 'flex-col-reverse',
    },
  },
});

// --- Components ---

type IButtonProps = React.ComponentPropsWithoutRef<typeof Pressable> &
  VariantProps<typeof buttonStyle> & {
    className?: string;
    isDisabled?: boolean;
  };

const Button = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  IButtonProps
>(
  (
    {
      className,
      variant = 'solid',
      size = 'md',
      action = 'primary',
      isDisabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <ButtonVariantContext.Provider value={{ variant, size, action }}>
        <Pressable
          ref={ref}
          role="button"
          disabled={isDisabled}
          className={buttonStyle({ variant, size, action, class: className })}
          {...props}
        >
          {children}
        </Pressable>
      </ButtonVariantContext.Provider>
    );
  }
);

type IButtonTextProps = React.ComponentPropsWithoutRef<typeof Text> &
  Partial<VariantProps<typeof buttonTextStyle>> & {
    className?: string;
  };

const ButtonText = React.forwardRef<
  React.ElementRef<typeof Text>,
  IButtonTextProps
>(({ className, variant, size, action, ...props }, ref) => {
  const parent = useContext(ButtonVariantContext);

  return (
    <Text
      ref={ref}
      {...props}
      className={buttonTextStyle({
        action: action ?? parent.action,
        variant: variant ?? parent.variant,
        size: size ?? parent.size,
        class: className,
      })}
    />
  );
});

const ButtonSpinner = React.forwardRef<
  React.ElementRef<typeof ActivityIndicator>,
  React.ComponentPropsWithoutRef<typeof ActivityIndicator>
>((props, ref) => {
  return <ActivityIndicator ref={ref} aria-label="loading" {...props} />;
});

type IButtonIconProps = {
  className?: string;
  as?: React.ElementType;
  size?: VariantProps<typeof buttonIconStyle>['size'] | number;
  height?: number;
  width?: number;
};

const ButtonIcon = React.forwardRef<any, IButtonIconProps>(
  ({ className, as: AsComp, size, height, width, ...props }, ref) => {
    const parent = useContext(ButtonVariantContext);

    const sizeClass =
      typeof size === 'number' ? undefined : (size ?? parent.size);

    const computedClassName = buttonIconStyle({
      size: sizeClass,
      variant: parent.variant,
      action: parent.action,
      class: className,
    });

    if (AsComp) {
      return (
        <AsComp
          ref={ref}
          className={computedClassName}
          size={typeof size === 'number' ? size : undefined}
          height={height}
          width={width}
          {...props}
        />
      );
    }

    return null;
  }
);

type IButtonGroupProps = React.ComponentPropsWithoutRef<typeof View> &
  VariantProps<typeof buttonGroupStyle> & {
    className?: string;
  };

const ButtonGroup = React.forwardRef<
  React.ElementRef<typeof View>,
  IButtonGroupProps
>(
  (
    {
      className,
      space = 'md',
      isAttached = false,
      flexDirection = 'column',
      ...props
    },
    ref
  ) => {
    return (
      <View
        ref={ref}
        className={buttonGroupStyle({
          class: className,
          space,
          isAttached,
          flexDirection,
        })}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
ButtonText.displayName = 'ButtonText';
ButtonSpinner.displayName = 'ButtonSpinner';
ButtonIcon.displayName = 'ButtonIcon';
ButtonGroup.displayName = 'ButtonGroup';

export { Button, ButtonText, ButtonSpinner, ButtonIcon, ButtonGroup };

export interface PropDefinition {
  name: string;
  type: string;
  default?: string;
  required?: boolean;
  description: string;
}

export interface SubComponentDoc {
  name: string;
  props: PropDefinition[];
}

export type ComponentCategory =
  | 'Core Primitives'
  | 'Form Controls'
  | 'Feedback & Overlay'
  | 'Navigation'
  | 'Data Display';

export interface ComponentMeta {
  slug: string;
  name: string;
  description: string;
  whenToUse: string;
  category: ComponentCategory;
  importCode: string;
  props: PropDefinition[];
  subComponents?: SubComponentDoc[];
  bestPractices?: string[];
  accessibility?: string;
  relatedComponents?: string[];
}

export const componentRegistry: ComponentMeta[] = [
  // ──────────────────────────────────────────────────────────────────────────
  // Core Primitives
  // ──────────────────────────────────────────────────────────────────────────

  {
    slug: 'text',
    name: 'Text',
    description:
      'A typographic component for rendering text with built-in size, weight, and decoration variants.',
    whenToUse: 'Use Text for any body copy, labels, or inline text that needs consistent typography.',
    category: 'Core Primitives',
    importCode: "import { Text } from '@wireservers-ui/react-native-ui';",
    props: [
      {
        name: 'className',
        type: 'string',
        description: 'NativeWind utility classes to apply to the text element.',
      },
      {
        name: 'size',
        type: "'2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl'",
        default: "'md'",
        description: 'Controls the font size of the text.',
      },
      {
        name: 'weight',
        type: "'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold'",
        default: "'normal'",
        description: 'Controls the font weight of the text.',
      },
      {
        name: 'isTruncated',
        type: 'boolean',
        default: 'false',
        description: 'When true, truncates text with an ellipsis if it overflows.',
      },
      {
        name: 'bold',
        type: 'boolean',
        default: 'false',
        description: 'Shorthand to apply bold font weight.',
      },
      {
        name: 'italic',
        type: 'boolean',
        default: 'false',
        description: 'Renders the text in italic style.',
      },
      {
        name: 'underline',
        type: 'boolean',
        default: 'false',
        description: 'Applies underline text decoration.',
      },
      {
        name: 'strikeThrough',
        type: 'boolean',
        default: 'false',
        description: 'Applies line-through text decoration.',
      },
      {
        name: 'highlight',
        type: 'boolean',
        default: 'false',
        description: 'Applies a highlight background to the text.',
      },
      {
        name: 'sub',
        type: 'boolean',
        default: 'false',
        description: 'Renders the text as subscript.',
      },
      {
        name: 'sup',
        type: 'boolean',
        default: 'false',
        description: 'Renders the text as superscript.',
      },
    ],
    bestPractices: ['Use semantic size variants instead of custom font sizes for consistency.', 'Prefer the weight prop over NativeWind font-weight classes for better cross-platform support.', 'Use isTruncated with numberOfLines for text that may overflow.'],
    accessibility: 'Text content is automatically accessible to screen readers. Use accessibilityRole="header" for text that serves as section titles.',
    relatedComponents: ['heading', 'link', 'badge'],
  },

  {
    slug: 'heading',
    name: 'Heading',
    description:
      'A semantic heading component for section titles, with size variants that map to appropriate typographic scales.',
    whenToUse: 'Use Heading for page titles, section headers, and any hierarchical text headings.',
    category: 'Core Primitives',
    importCode: "import { Heading } from '@wireservers-ui/react-native-ui';",
    props: [
      {
        name: 'className',
        type: 'string',
        description: 'NativeWind utility classes to apply to the heading element.',
      },
      {
        name: 'size',
        type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl'",
        default: "'lg'",
        description: 'Controls the font size of the heading.',
      },
      {
        name: 'isTruncated',
        type: 'boolean',
        default: 'false',
        description: 'When true, truncates the heading with an ellipsis if it overflows.',
      },
    ],
    bestPractices: ['Use descending size hierarchy (larger sizes for top-level headings).', 'Pair with Text components for body content below headings.', 'Avoid skipping heading levels in the visual hierarchy.'],
    accessibility: 'Heading is rendered with appropriate semantic meaning. Screen readers will announce it as a heading element.',
    relatedComponents: ['text', 'divider', 'card'],
  },

  {
    slug: 'icon',
    name: 'Icon',
    description:
      'A wrapper component for rendering icon elements from any icon library via the `as` prop.',
    whenToUse: 'Use Icon to render SVG or font icons with consistent sizing and color theming.',
    category: 'Core Primitives',
    importCode: "import { Icon } from '@wireservers-ui/react-native-ui';",
    props: [
      {
        name: 'as',
        type: 'React.ElementType',
        required: true,
        description: 'The icon component to render (e.g. a Lucide or MaterialIcon component).',
      },
      {
        name: 'className',
        type: 'string',
        description: 'NativeWind utility classes to apply to the icon wrapper.',
      },
      {
        name: 'size',
        type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | number",
        default: "'md'",
        description: 'Controls the icon size. Accepts a preset or a numeric pixel value.',
      },
      {
        name: 'color',
        type: 'string',
        description: 'Overrides the icon fill/stroke color.',
      },
    ],
    bestPractices: ['Always pass an icon component via the as prop rather than rendering raw SVGs.', 'Use semantic color tokens from your theme for consistent icon coloring.', 'Match icon size to the surrounding text or component size.'],
    accessibility: 'Icons are decorative by default. Add accessibilityLabel when an icon conveys meaning without accompanying text.',
    relatedComponents: ['button', 'badge', 'fab'],
  },

  {
    slug: 'divider',
    name: 'Divider',
    description:
      'A visual separator that divides content into distinct sections, supporting horizontal and vertical orientations.',
    whenToUse: 'Use Divider to separate groups of content within a layout.',
    category: 'Core Primitives',
    importCode: "import { Divider } from '@wireservers-ui/react-native-ui';",
    props: [
      {
        name: 'className',
        type: 'string',
        description: 'NativeWind utility classes to apply to the divider.',
      },
      {
        name: 'orientation',
        type: "'horizontal' | 'vertical'",
        default: "'horizontal'",
        description: 'The axis along which the divider is drawn.',
      },
    ],
    bestPractices: ['Use horizontal dividers between stacked content sections.', 'Use vertical dividers between inline items in a row.', 'Avoid excessive use — whitespace alone often provides sufficient separation.'],
    accessibility: 'Divider is rendered as a decorative element and is hidden from screen readers by default.',
    relatedComponents: ['card', 'accordion', 'text'],
  },

  {
    slug: 'badge',
    name: 'Badge',
    description:
      'A compound component for displaying short status labels, counts, or tags with semantic color and variant options.',
    whenToUse: 'Use Badge to annotate elements with a small status indicator, count, or label.',
    category: 'Core Primitives',
    importCode:
      "import { Badge, BadgeText, BadgeIcon } from '@wireservers-ui/react-native-ui';",
    props: [
      {
        name: 'className',
        type: 'string',
        description: 'NativeWind utility classes to apply to the badge container.',
      },
      {
        name: 'action',
        type: "'primary' | 'secondary' | 'error' | 'success' | 'warning' | 'info' | 'muted'",
        default: "'primary'",
        description: 'The semantic color action of the badge.',
      },
      {
        name: 'variant',
        type: "'solid' | 'outline' | 'subtle'",
        default: "'solid'",
        description: 'The visual variant of the badge.',
      },
      {
        name: 'size',
        type: "'sm' | 'md' | 'lg'",
        default: "'md'",
        description: 'The size of the badge.',
      },
    ],
    subComponents: [
      {
        name: 'BadgeText',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the badge text.',
          },
        ],
      },
      {
        name: 'BadgeIcon',
        props: [
          {
            name: 'as',
            type: 'React.ElementType',
            required: true,
            description: 'The icon component to render inside the badge.',
          },
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the badge icon.',
          },
        ],
      },
    ],
    bestPractices: ['Use semantic action colors (success, error, warning) to convey status meaning.', 'Keep badge text short — ideally 1-2 words or a number.', 'Pair subtle variant with non-critical status indicators.'],
    accessibility: 'Badge text is readable by screen readers. Ensure the badge context is clear when read in isolation.',
    relatedComponents: ['avatar', 'button', 'icon'],
  },

  {
    slug: 'spinner',
    name: 'Spinner',
    description:
      'An animated loading indicator to communicate that an operation is in progress.',
    whenToUse: 'Use Spinner when content is loading or an async action is being processed.',
    category: 'Core Primitives',
    importCode: "import { Spinner } from '@wireservers-ui/react-native-ui';",
    props: [
      {
        name: 'className',
        type: 'string',
        description: 'NativeWind utility classes to apply to the spinner container.',
      },
      {
        name: 'size',
        type: "'sm' | 'md' | 'lg'",
        default: "'md'",
        description: 'Controls the diameter of the spinner.',
      },
      {
        name: 'color',
        type: 'string',
        description: 'Overrides the spinner color.',
      },
    ],
    bestPractices: ['Show a spinner only for operations that take more than 300ms.', 'Pair with descriptive text to explain what is loading.', 'Use the appropriate size relative to the container.'],
    accessibility: 'Spinner includes a built-in accessibility label of "Loading". Customize with accessibilityLabel for specific contexts.',
    relatedComponents: ['button', 'progress', 'image'],
  },

  {
    slug: 'image',
    name: 'Image',
    description:
      'A styled image component with built-in size presets and border-radius options, requiring an accessible alt label.',
    whenToUse: 'Use Image when you need to display raster images with consistent sizing and rounding.',
    category: 'Core Primitives',
    importCode: "import { Image } from '@wireservers-ui/react-native-ui';",
    props: [
      {
        name: 'className',
        type: 'string',
        description: 'NativeWind utility classes to apply to the image element.',
      },
      {
        name: 'size',
        type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'",
        default: "'md'",
        description: 'Preset dimensions for the image.',
      },
      {
        name: 'borderRadius',
        type: "'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'",
        default: "'none'",
        description: 'Preset border radius for the image.',
      },
      {
        name: 'alt',
        type: 'string',
        required: true,
        description: 'Accessible text describing the image content.',
      },
      {
        name: 'source',
        type: 'ImageSourcePropType',
        required: true,
        description: 'The image source (require() or { uri }).',
      },
    ],
    bestPractices: ['Always provide a meaningful alt prop for accessibility.', 'Use size presets for consistent image dimensions across the app.', 'Consider borderRadius="full" for circular profile-style images.'],
    accessibility: 'The alt prop is used as the accessible label. Screen readers will announce the alt text when the image is focused.',
    relatedComponents: ['avatar', 'card', 'badge'],
  },

  {
    slug: 'avatar',
    name: 'Avatar',
    description:
      'A compound component for displaying user profile images, initials fallback, online badges, and grouped avatar stacks.',
    whenToUse:
      'Use Avatar to represent a user or entity with a profile photo or initials fallback.',
    category: 'Core Primitives',
    importCode:
      "import { Avatar, AvatarImage, AvatarFallbackText, AvatarBadge, AvatarGroup } from '@wireservers-ui/react-native-ui';",
    props: [
      {
        name: 'className',
        type: 'string',
        description: 'NativeWind utility classes to apply to the avatar container.',
      },
      {
        name: 'size',
        type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'",
        default: "'md'",
        description: 'Controls the diameter of the avatar.',
      },
    ],
    subComponents: [
      {
        name: 'AvatarImage',
        props: [
          {
            name: 'source',
            type: "ImageSourcePropType | { uri: string }",
            required: true,
            description: 'The image source for the avatar.',
          },
          {
            name: 'alt',
            type: 'string',
            description: 'Accessible text describing the avatar image.',
          },
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the avatar image.',
          },
        ],
      },
      {
        name: 'AvatarFallbackText',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the fallback initials text.',
          },
        ],
      },
      {
        name: 'AvatarBadge',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the status badge overlay.',
          },
        ],
      },
      {
        name: 'AvatarGroup',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the avatar group container.',
          },
          {
            name: 'max',
            type: 'number',
            description: 'Maximum number of avatars to display before showing an overflow indicator.',
          },
        ],
      },
    ],
    bestPractices: ['Provide AvatarFallbackText as a fallback when the image fails to load.', 'Use AvatarGroup with a max prop to prevent overcrowding.', 'Use AvatarBadge to indicate online/offline status.'],
    accessibility: 'Avatar images should include an alt prop on AvatarImage. Fallback text is automatically accessible.',
    relatedComponents: ['image', 'badge', 'card'],
  },

  {
    slug: 'card',
    name: 'Card',
    description:
      'A compound container component with header, body, and footer sections for grouping related content.',
    whenToUse: 'Use Card to present grouped content like articles, product details, or dashboard widgets.',
    category: 'Core Primitives',
    importCode:
      "import { Card, CardHeader, CardBody, CardFooter } from '@wireservers-ui/react-native-ui';",
    props: [
      {
        name: 'className',
        type: 'string',
        description: 'NativeWind utility classes to apply to the card container.',
      },
      {
        name: 'variant',
        type: "'elevated' | 'outline' | 'ghost' | 'filled'",
        default: "'elevated'",
        description: 'The visual style variant of the card.',
      },
      {
        name: 'size',
        type: "'sm' | 'md' | 'lg'",
        default: "'md'",
        description: 'Controls the padding and spacing within the card.',
      },
    ],
    subComponents: [
      {
        name: 'CardHeader',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the card header.',
          },
        ],
      },
      {
        name: 'CardBody',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the card body.',
          },
        ],
      },
      {
        name: 'CardFooter',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the card footer.',
          },
        ],
      },
    ],
    bestPractices: ['Use CardHeader, CardBody, and CardFooter for structured content layout.', 'Choose elevated variant for primary content cards and outline for secondary.', 'Keep card content focused on a single topic or action.'],
    accessibility: 'Card is a container element. Ensure interactive elements within the card have proper accessibility labels.',
    relatedComponents: ['button', 'image', 'divider'],
  },

  {
    slug: 'button',
    name: 'Button',
    description:
      'A compound interactive button component with text, icon, and spinner sub-components, supporting multiple actions, variants, and sizes.',
    whenToUse:
      'Use Button for primary user actions like form submission, navigation triggers, or confirmations.',
    category: 'Core Primitives',
    importCode:
      "import { Button, ButtonText, ButtonSpinner, ButtonIcon, ButtonGroup } from '@wireservers-ui/react-native-ui';",
    props: [
      {
        name: 'className',
        type: 'string',
        description: 'NativeWind utility classes to apply to the button.',
      },
      {
        name: 'action',
        type: "'primary' | 'secondary' | 'positive' | 'negative' | 'default'",
        default: "'primary'",
        description: 'The semantic action color of the button.',
      },
      {
        name: 'variant',
        type: "'link' | 'outline' | 'solid'",
        default: "'solid'",
        description: 'The visual variant of the button.',
      },
      {
        name: 'size',
        type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
        default: "'md'",
        description: 'Controls the height and padding of the button.',
      },
      {
        name: 'isDisabled',
        type: 'boolean',
        default: 'false',
        description: 'When true, disables the button and applies disabled styling.',
      },
    ],
    subComponents: [
      {
        name: 'ButtonText',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the button label text.',
          },
          {
            name: 'action',
            type: "'primary' | 'secondary' | 'positive' | 'negative' | 'default'",
            description: 'Overrides the action color inherited from the Button parent.',
          },
          {
            name: 'variant',
            type: "'link' | 'outline' | 'solid'",
            description: 'Overrides the variant inherited from the Button parent.',
          },
          {
            name: 'size',
            type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
            description: 'Overrides the size inherited from the Button parent.',
          },
        ],
      },
      {
        name: 'ButtonSpinner',
        props: [],
      },
      {
        name: 'ButtonIcon',
        props: [
          {
            name: 'as',
            type: 'React.ElementType',
            description: 'The icon component to render inside the button.',
          },
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the button icon.',
          },
          {
            name: 'size',
            type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | number",
            description: 'Overrides the icon size. Accepts a preset or numeric pixel value.',
          },
          {
            name: 'height',
            type: 'number',
            description: 'Explicit height for the icon in pixels.',
          },
          {
            name: 'width',
            type: 'number',
            description: 'Explicit width for the icon in pixels.',
          },
        ],
      },
      {
        name: 'ButtonGroup',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the button group container.',
          },
          {
            name: 'space',
            type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'",
            default: "'md'",
            description: 'The spacing between buttons in the group.',
          },
          {
            name: 'isAttached',
            type: 'boolean',
            default: 'false',
            description: 'When true, removes spacing and merges button borders.',
          },
          {
            name: 'flexDirection',
            type: "'row' | 'column' | 'row-reverse' | 'column-reverse'",
            default: "'row'",
            description: 'The flex direction of the button group.',
          },
        ],
      },
    ],
    bestPractices: ['Use action="primary" for the main call-to-action on a screen.', 'Limit to one primary action button per view to maintain clear hierarchy.', 'Use ButtonSpinner during async operations to indicate loading.'],
    accessibility: 'Button is automatically focusable and pressable. Use accessibilityLabel when ButtonText alone does not describe the action.',
    relatedComponents: ['link', 'fab', 'icon'],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // Form Controls
  // ──────────────────────────────────────────────────────────────────────────

  {
    slug: 'form-control',
    name: 'FormControl',
    description:
      'A compound wrapper that provides shared state (disabled, invalid, required, read-only) to its label, helper text, and error message children.',
    whenToUse:
      'Use FormControl to wrap any form field that needs a label, validation messages, or helper text.',
    category: 'Form Controls',
    importCode:
      "import { FormControl, FormControlLabel, FormControlLabelText, FormControlHelperText, FormControlErrorMessage, FormControlErrorIcon } from '@wireservers-ui/react-native-ui';",
    props: [
      {
        name: 'className',
        type: 'string',
        description: 'NativeWind utility classes for the form control container.',
      },
      {
        name: 'isDisabled',
        type: 'boolean',
        default: 'false',
        description: 'Disables the form control and all its children.',
      },
      {
        name: 'isInvalid',
        type: 'boolean',
        default: 'false',
        description: 'Marks the form control as invalid, showing error styling.',
      },
      {
        name: 'isRequired',
        type: 'boolean',
        default: 'false',
        description: 'Marks the field as required and adds a required indicator.',
      },
      {
        name: 'isReadOnly',
        type: 'boolean',
        default: 'false',
        description: 'Marks the form control as read-only.',
      },
      {
        name: 'size',
        type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
        default: "'md'",
        description: 'Controls the size of the form control and its children.',
      },
    ],
    subComponents: [
      {
        name: 'FormControlLabel',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the label container.',
          },
        ],
      },
      {
        name: 'FormControlLabelText',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the label text.',
          },
        ],
      },
      {
        name: 'FormControlHelperText',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the helper text.',
          },
        ],
      },
      {
        name: 'FormControlErrorMessage',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the error message container.',
          },
        ],
      },
      {
        name: 'FormControlErrorIcon',
        props: [
          {
            name: 'as',
            type: 'React.ElementType',
            description: 'The icon component to render for the error indicator.',
          },
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the error icon.',
          },
        ],
      },
    ],
    bestPractices: ['Always wrap form fields with FormControl for consistent label and error handling.', 'Use isRequired to automatically show required indicators.', 'Place FormControlHelperText below the input for guidance.'],
    accessibility: 'FormControl automatically associates labels and error messages with the input field for screen readers.',
    relatedComponents: ['input', 'textarea', 'select'],
  },

  {
    slug: 'input',
    name: 'Input',
    description:
      'A compound text input component with support for leading/trailing slots, icons, and multiple visual variants.',
    whenToUse: 'Use Input for single-line text entry fields within forms.',
    category: 'Form Controls',
    importCode:
      "import { Input, InputField, InputSlot, InputIcon } from '@wireservers-ui/react-native-ui';",
    props: [
      {
        name: 'className',
        type: 'string',
        description: 'NativeWind utility classes for the input container.',
      },
      {
        name: 'variant',
        type: "'outline' | 'filled' | 'underlined' | 'rounded'",
        default: "'outline'",
        description: 'The visual variant of the input.',
      },
      {
        name: 'size',
        type: "'sm' | 'md' | 'lg' | 'xl'",
        default: "'md'",
        description: 'Controls the height and font size of the input.',
      },
      {
        name: 'isDisabled',
        type: 'boolean',
        default: 'false',
        description: 'Disables the input field.',
      },
      {
        name: 'isInvalid',
        type: 'boolean',
        default: 'false',
        description: 'Applies invalid/error styling to the input.',
      },
      {
        name: 'isReadOnly',
        type: 'boolean',
        default: 'false',
        description: 'Makes the input read-only.',
      },
    ],
    subComponents: [
      {
        name: 'InputField',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the text input element.',
          },
        ],
      },
      {
        name: 'InputSlot',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the input slot container.',
          },
        ],
      },
      {
        name: 'InputIcon',
        props: [
          {
            name: 'as',
            type: 'React.ElementType',
            required: true,
            description: 'The icon component to render in the input slot.',
          },
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the input icon.',
          },
        ],
      },
    ],
    bestPractices: ['Use InputSlot with InputIcon for leading/trailing icons.', 'Match the variant to your form design system (outline is most common).', 'Always wrap with FormControl for proper label and error support.'],
    accessibility: 'Input fields inherit accessibility state from FormControl. Add placeholder text as a hint, not a replacement for labels.',
    relatedComponents: ['form-control', 'textarea', 'select'],
  },

  {
    slug: 'textarea',
    name: 'Textarea',
    description:
      'A multi-line text input with variant and size options, built on top of React Native TextInput.',
    whenToUse: 'Use Textarea for multi-line text entry such as comments, descriptions, or notes.',
    category: 'Form Controls',
    importCode: "import { Textarea } from '@wireservers-ui/react-native-ui';",
    props: [
      {
        name: 'className',
        type: 'string',
        description: 'NativeWind utility classes for the textarea.',
      },
      {
        name: 'variant',
        type: "'outline' | 'filled' | 'underlined'",
        default: "'outline'",
        description: 'The visual variant of the textarea.',
      },
      {
        name: 'size',
        type: "'sm' | 'md' | 'lg'",
        default: "'md'",
        description: 'Controls the font size and padding of the textarea.',
      },
      {
        name: 'isDisabled',
        type: 'boolean',
        default: 'false',
        description: 'Disables the textarea.',
      },
      {
        name: 'isInvalid',
        type: 'boolean',
        default: 'false',
        description: 'Applies invalid/error styling to the textarea.',
      },
      {
        name: 'isReadOnly',
        type: 'boolean',
        default: 'false',
        description: 'Makes the textarea read-only.',
      },
    ],
    bestPractices: ['Set a reasonable default height with numberOfLines or style.', 'Use the same variant as your Input components for visual consistency.', 'Wrap with FormControl for labels and validation messages.'],
    accessibility: 'Textarea inherits accessibility state from FormControl. Provide clear labels and placeholder text for context.',
    relatedComponents: ['input', 'form-control', 'text'],
  },

  {
    slug: 'switch',
    name: 'Switch',
    description:
      'A toggle switch for boolean on/off states with customizable track and thumb colors.',
    whenToUse:
      'Use Switch for toggling settings or preferences that take immediate effect.',
    category: 'Form Controls',
    importCode: "import { Switch } from '@wireservers-ui/react-native-ui';",
    props: [
      {
        name: 'className',
        type: 'string',
        description: 'NativeWind utility classes for the switch container.',
      },
      {
        name: 'size',
        type: "'sm' | 'md' | 'lg'",
        default: "'md'",
        description: 'Controls the size of the switch.',
      },
      {
        name: 'isDisabled',
        type: 'boolean',
        default: 'false',
        description: 'Disables the switch.',
      },
      {
        name: 'value',
        type: 'boolean',
        description: 'The controlled on/off value of the switch.',
      },
      {
        name: 'defaultValue',
        type: 'boolean',
        description: 'The initial value of the switch when uncontrolled.',
      },
      {
        name: 'onToggle',
        type: '(value: boolean) => void',
        description: 'Callback invoked when the switch value changes.',
      },
      {
        name: 'trackColor',
        type: '{ false?: string; true?: string }',
        description: 'Custom colors for the switch track in each state.',
      },
      {
        name: 'thumbColor',
        type: 'string',
        description: 'Custom color for the switch thumb.',
      },
    ],
    bestPractices: ['Use Switch for settings that take immediate effect (no submit button needed).', 'Always pair with a visible label describing what the switch controls.', 'Use trackColor to visually distinguish on/off states.'],
    accessibility: 'Switch has built-in toggle accessibility. Ensure a visible label is associated for screen reader context.',
    relatedComponents: ['checkbox', 'radio', 'form-control'],
  },

  {
    slug: 'checkbox',
    name: 'Checkbox',
    description:
      'A compound checkbox component supporting individual and grouped selection with indicator, icon, and label sub-components.',
    whenToUse:
      'Use Checkbox when users need to select one or more items from a list of options.',
    category: 'Form Controls',
    importCode:
      "import { Checkbox, CheckboxGroup, CheckboxIndicator, CheckboxIcon, CheckboxLabel } from '@wireservers-ui/react-native-ui';",
    props: [
      {
        name: 'className',
        type: 'string',
        description: 'NativeWind utility classes for the checkbox container.',
      },
      {
        name: 'value',
        type: 'string',
        required: true,
        description: 'The value associated with this checkbox, used by CheckboxGroup.',
      },
      {
        name: 'isChecked',
        type: 'boolean',
        description: 'Controlled checked state of the checkbox.',
      },
      {
        name: 'defaultIsChecked',
        type: 'boolean',
        description: 'Initial checked state when uncontrolled.',
      },
      {
        name: 'onChange',
        type: '(isChecked: boolean) => void',
        description: 'Callback invoked when the checkbox state changes.',
      },
      {
        name: 'isDisabled',
        type: 'boolean',
        default: 'false',
        description: 'Disables the checkbox.',
      },
      {
        name: 'isInvalid',
        type: 'boolean',
        default: 'false',
        description: 'Applies invalid/error styling to the checkbox.',
      },
      {
        name: 'size',
        type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
        default: "'md'",
        description: 'Controls the size of the checkbox.',
      },
    ],
    subComponents: [
      {
        name: 'CheckboxGroup',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the checkbox group container.',
          },
          {
            name: 'value',
            type: 'string[]',
            description: 'The controlled selected values.',
          },
          {
            name: 'defaultValue',
            type: 'string[]',
            description: 'The initial selected values when uncontrolled.',
          },
          {
            name: 'onChange',
            type: '(values: string[]) => void',
            description: 'Callback invoked when the selected values change.',
          },
          {
            name: 'isDisabled',
            type: 'boolean',
            default: 'false',
            description: 'Disables all checkboxes in the group.',
          },
          {
            name: 'isInvalid',
            type: 'boolean',
            default: 'false',
            description: 'Applies invalid styling to all checkboxes in the group.',
          },
          {
            name: 'size',
            type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
            default: "'md'",
            description: 'Controls the size of all checkboxes in the group.',
          },
        ],
      },
      {
        name: 'CheckboxIndicator',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the checkbox indicator box.',
          },
        ],
      },
      {
        name: 'CheckboxIcon',
        props: [
          {
            name: 'as',
            type: 'React.ElementType',
            description: 'The icon component to render when checked.',
          },
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the checkbox icon.',
          },
        ],
      },
      {
        name: 'CheckboxLabel',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the checkbox label text.',
          },
        ],
      },
    ],
    bestPractices: ['Use CheckboxGroup when managing multiple related checkboxes.', 'Provide clear, concise labels via CheckboxLabel.', 'Use isInvalid with FormControl to show validation errors.'],
    accessibility: 'Checkbox includes built-in checked/unchecked state announcements. Labels are automatically associated.',
    relatedComponents: ['radio', 'switch', 'form-control'],
  },

  {
    slug: 'radio',
    name: 'Radio',
    description:
      'A compound radio button component for single-selection within a group, with indicator, icon, and label sub-components.',
    whenToUse:
      'Use Radio when users must select exactly one option from a list of mutually exclusive choices.',
    category: 'Form Controls',
    importCode:
      "import { Radio, RadioGroup, RadioIndicator, RadioIcon, RadioLabel } from '@wireservers-ui/react-native-ui';",
    props: [
      {
        name: 'className',
        type: 'string',
        description: 'NativeWind utility classes for the radio container.',
      },
      {
        name: 'value',
        type: 'string',
        required: true,
        description: 'The value associated with this radio option.',
      },
      {
        name: 'isDisabled',
        type: 'boolean',
        default: 'false',
        description: 'Disables the radio option.',
      },
      {
        name: 'isInvalid',
        type: 'boolean',
        default: 'false',
        description: 'Applies invalid/error styling to the radio option.',
      },
      {
        name: 'size',
        type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
        default: "'md'",
        description: 'Controls the size of the radio.',
      },
    ],
    subComponents: [
      {
        name: 'RadioGroup',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the radio group container.',
          },
          {
            name: 'value',
            type: 'string',
            description: 'The controlled selected value.',
          },
          {
            name: 'defaultValue',
            type: 'string',
            description: 'The initial selected value when uncontrolled.',
          },
          {
            name: 'onChange',
            type: '(value: string) => void',
            description: 'Callback invoked when the selected value changes.',
          },
          {
            name: 'isDisabled',
            type: 'boolean',
            default: 'false',
            description: 'Disables all radio options in the group.',
          },
          {
            name: 'isInvalid',
            type: 'boolean',
            default: 'false',
            description: 'Applies invalid styling to all radios in the group.',
          },
          {
            name: 'size',
            type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
            default: "'md'",
            description: 'Controls the size of all radios in the group.',
          },
        ],
      },
      {
        name: 'RadioIndicator',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the radio indicator circle.',
          },
        ],
      },
      {
        name: 'RadioIcon',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the radio icon.',
          },
        ],
      },
      {
        name: 'RadioLabel',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the radio label text.',
          },
        ],
      },
    ],
    bestPractices: ['Always use RadioGroup to manage mutually exclusive options.', 'Provide clear labels for each Radio option.', 'Use when there are 2-5 options; use Select for longer lists.'],
    accessibility: 'RadioGroup manages focus and selection state. Each Radio option announces its label and selected state.',
    relatedComponents: ['checkbox', 'select', 'form-control'],
  },

  {
    slug: 'slider',
    name: 'Slider',
    description:
      'A compound range slider component with track, filled track, and thumb sub-components for selecting numeric values.',
    whenToUse:
      'Use Slider when users need to select a value from a continuous or stepped numeric range.',
    category: 'Form Controls',
    importCode:
      "import { Slider, SliderTrack, SliderFilledTrack, SliderThumb } from '@wireservers-ui/react-native-ui';",
    props: [
      {
        name: 'className',
        type: 'string',
        description: 'NativeWind utility classes for the slider container.',
      },
      {
        name: 'value',
        type: 'number',
        description: 'The controlled current value of the slider.',
      },
      {
        name: 'defaultValue',
        type: 'number',
        description: 'The initial value when uncontrolled.',
      },
      {
        name: 'min',
        type: 'number',
        default: '0',
        description: 'The minimum value of the slider.',
      },
      {
        name: 'max',
        type: 'number',
        default: '100',
        description: 'The maximum value of the slider.',
      },
      {
        name: 'step',
        type: 'number',
        default: '1',
        description: 'The step increment between values.',
      },
      {
        name: 'orientation',
        type: "'horizontal' | 'vertical'",
        default: "'horizontal'",
        description: 'The axis along which the slider operates.',
      },
      {
        name: 'size',
        type: "'sm' | 'md' | 'lg'",
        default: "'md'",
        description: 'Controls the track thickness and thumb size.',
      },
      {
        name: 'isDisabled',
        type: 'boolean',
        default: 'false',
        description: 'Disables the slider.',
      },
      {
        name: 'onValueChange',
        type: '(value: number) => void',
        description: 'Callback invoked continuously as the slider value changes.',
      },
      {
        name: 'onSlidingComplete',
        type: '(value: number) => void',
        description: 'Callback invoked when the user releases the slider thumb.',
      },
    ],
    subComponents: [
      {
        name: 'SliderTrack',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the slider track.',
          },
        ],
      },
      {
        name: 'SliderFilledTrack',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the filled portion of the track.',
          },
        ],
      },
      {
        name: 'SliderThumb',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the draggable thumb.',
          },
        ],
      },
    ],
    bestPractices: ['Display the current value next to the slider for clarity.', 'Use step values appropriate to the data range.', 'Consider adding min/max labels for context.'],
    accessibility: 'Slider is accessible with keyboard and assistive technology. The current value is announced on change.',
    relatedComponents: ['progress', 'input', 'form-control'],
  },

  {
    slug: 'select',
    name: 'Select',
    description:
      'A compound dropdown select component with trigger, portal-based content, and selectable items for single-value selection.',
    whenToUse:
      'Use Select for picking a single option from a list that is too long for radio buttons.',
    category: 'Form Controls',
    importCode:
      "import { Select, SelectTrigger, SelectInput, SelectIcon, SelectPortal, SelectBackdrop, SelectContent, SelectItem } from '@wireservers-ui/react-native-ui';",
    props: [
      {
        name: 'className',
        type: 'string',
        description: 'NativeWind utility classes for the select container.',
      },
      {
        name: 'selectedValue',
        type: 'string',
        description: 'The controlled selected value.',
      },
      {
        name: 'defaultValue',
        type: 'string',
        description: 'The initial selected value when uncontrolled.',
      },
      {
        name: 'onValueChange',
        type: '(value: string) => void',
        description: 'Callback invoked when the selected value changes.',
      },
      {
        name: 'size',
        type: "'sm' | 'md' | 'lg' | 'xl'",
        default: "'md'",
        description: 'Controls the size of the select trigger.',
      },
      {
        name: 'variant',
        type: "'outline' | 'filled' | 'underlined' | 'rounded'",
        default: "'outline'",
        description: 'The visual variant of the select trigger.',
      },
      {
        name: 'isDisabled',
        type: 'boolean',
        default: 'false',
        description: 'Disables the select.',
      },
      {
        name: 'isInvalid',
        type: 'boolean',
        default: 'false',
        description: 'Applies invalid/error styling to the select.',
      },
      {
        name: 'placeholder',
        type: 'string',
        description: 'Placeholder text shown when no value is selected.',
      },
    ],
    subComponents: [
      {
        name: 'SelectTrigger',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the select trigger button.',
          },
        ],
      },
      {
        name: 'SelectInput',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the select input display.',
          },
          {
            name: 'placeholder',
            type: 'string',
            description: 'Placeholder text for the select input.',
          },
        ],
      },
      {
        name: 'SelectIcon',
        props: [
          {
            name: 'as',
            type: 'React.ElementType',
            description: 'The icon component to render as the dropdown indicator.',
          },
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the select icon.',
          },
        ],
      },
      {
        name: 'SelectPortal',
        props: [],
      },
      {
        name: 'SelectBackdrop',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the select backdrop overlay.',
          },
        ],
      },
      {
        name: 'SelectContent',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the dropdown content container.',
          },
        ],
      },
      {
        name: 'SelectItem',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the select item.',
          },
          {
            name: 'label',
            type: 'string',
            required: true,
            description: 'The display label for the item.',
          },
          {
            name: 'value',
            type: 'string',
            required: true,
            description: 'The value associated with this item.',
          },
          {
            name: 'isDisabled',
            type: 'boolean',
            default: 'false',
            description: 'Disables the select item.',
          },
        ],
      },
    ],
    bestPractices: ['Use placeholder text to describe what should be selected.', 'Keep option lists reasonable in length (under 20 items).', 'Use the same variant as your Input components for consistency.'],
    accessibility: 'Select trigger and items are fully accessible. Selected value is announced by screen readers.',
    relatedComponents: ['radio', 'input', 'form-control'],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // Feedback & Overlay
  // ──────────────────────────────────────────────────────────────────────────

  {
    slug: 'alert',
    name: 'Alert',
    description:
      'A compound feedback component for displaying contextual messages with status-based styling, optional icons, and close buttons.',
    whenToUse:
      'Use Alert to display important messages like success confirmations, warnings, or error notices.',
    category: 'Feedback & Overlay',
    importCode:
      "import { Alert, AlertIcon, AlertBody, AlertText, AlertCloseButton } from '@wireservers-ui/react-native-ui';",
    props: [
      {
        name: 'className',
        type: 'string',
        description: 'NativeWind utility classes for the alert container.',
      },
      {
        name: 'status',
        type: "'info' | 'success' | 'warning' | 'error'",
        default: "'info'",
        description: 'The semantic status that determines the alert color scheme.',
      },
      {
        name: 'variant',
        type: "'solid' | 'subtle' | 'outline'",
        default: "'subtle'",
        description: 'The visual variant of the alert.',
      },
    ],
    subComponents: [
      {
        name: 'AlertIcon',
        props: [
          {
            name: 'as',
            type: 'React.ElementType',
            description: 'The icon component to render for the alert status.',
          },
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the alert icon.',
          },
        ],
      },
      {
        name: 'AlertBody',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the alert body container.',
          },
        ],
      },
      {
        name: 'AlertText',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the alert text.',
          },
        ],
      },
      {
        name: 'AlertCloseButton',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the alert close button.',
          },
        ],
      },
    ],
    bestPractices: ['Use the appropriate status (info, success, warning, error) to match the message severity.', 'Include AlertIcon to reinforce the status visually.', 'Keep alert messages concise and actionable.'],
    accessibility: 'Alert has an implicit alert role. Screen readers will announce the alert content when it appears.',
    relatedComponents: ['toast', 'modal', 'badge'],
  },

  {
    slug: 'progress',
    name: 'Progress',
    description:
      'A compound progress bar component that visually indicates the completion percentage of an operation.',
    whenToUse:
      'Use Progress to show determinate progress for operations like file uploads, form completion, or loading.',
    category: 'Feedback & Overlay',
    importCode:
      "import { Progress, ProgressFilledTrack } from '@wireservers-ui/react-native-ui';",
    props: [
      {
        name: 'className',
        type: 'string',
        description: 'NativeWind utility classes for the progress bar container.',
      },
      {
        name: 'value',
        type: 'number',
        default: '0',
        description: 'The current progress value.',
      },
      {
        name: 'min',
        type: 'number',
        default: '0',
        description: 'The minimum value of the progress range.',
      },
      {
        name: 'max',
        type: 'number',
        default: '100',
        description: 'The maximum value of the progress range.',
      },
      {
        name: 'size',
        type: "'xs' | 'sm' | 'md' | 'lg'",
        default: "'md'",
        description: 'Controls the height of the progress bar.',
      },
      {
        name: 'colorScheme',
        type: "'primary' | 'secondary' | 'tertiary' | 'error' | 'success' | 'warning' | 'info'",
        default: "'primary'",
        description: 'The semantic color scheme for the filled track.',
      },
    ],
    subComponents: [
      {
        name: 'ProgressFilledTrack',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the filled portion of the progress bar.',
          },
        ],
      },
    ],
    bestPractices: ['Use for determinate operations where completion percentage is known.', 'Update the value prop smoothly to avoid jarring jumps.', 'Pair with text showing the percentage for additional clarity.'],
    accessibility: 'Progress bar includes ARIA progressbar role with min, max, and current value attributes.',
    relatedComponents: ['spinner', 'slider', 'badge'],
  },

  {
    slug: 'link',
    name: 'Link',
    description:
      'A pressable link component for in-app and external navigation with accessible text styling.',
    whenToUse:
      'Use Link for navigating to another screen or opening an external URL.',
    category: 'Feedback & Overlay',
    importCode:
      "import { Link, LinkText } from '@wireservers-ui/react-native-ui';",
    props: [
      {
        name: 'className',
        type: 'string',
        description: 'NativeWind utility classes for the link pressable area.',
      },
      {
        name: 'href',
        type: 'string',
        description: 'The URL or route path to navigate to.',
      },
      {
        name: 'isExternal',
        type: 'boolean',
        default: 'false',
        description: 'When true, opens the link in an external browser.',
      },
    ],
    subComponents: [
      {
        name: 'LinkText',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the link text.',
          },
        ],
      },
    ],
    bestPractices: ['Use isExternal for URLs that open in a browser outside the app.', 'Wrap navigational text with Link for consistent styling and behavior.', 'Avoid using Link for actions — use Button instead.'],
    accessibility: 'Link is announced as a link by screen readers. External links should indicate they open in a new context.',
    relatedComponents: ['button', 'text', 'breadcrumb'],
  },

  {
    slug: 'modal',
    name: 'Modal',
    description:
      'A compound overlay dialog component with backdrop, content, header, body, footer, and close button sub-components.',
    whenToUse:
      'Use Modal for focused interactions like confirmations, forms, or detail views that require user attention.',
    category: 'Feedback & Overlay',
    importCode:
      "import { Modal, ModalBackdrop, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton } from '@wireservers-ui/react-native-ui';",
    props: [
      {
        name: 'isOpen',
        type: 'boolean',
        required: true,
        description: 'Controls whether the modal is visible.',
      },
      {
        name: 'onClose',
        type: '() => void',
        required: true,
        description: 'Callback invoked when the modal should close.',
      },
      {
        name: 'size',
        type: "'xs' | 'sm' | 'md' | 'lg' | 'full'",
        default: "'md'",
        description: 'Controls the width of the modal content.',
      },
      {
        name: 'closeOnOverlayClick',
        type: 'boolean',
        default: 'true',
        description: 'Whether clicking the backdrop closes the modal.',
      },
      {
        name: 'avoidKeyboard',
        type: 'boolean',
        default: 'false',
        description: 'When true, the modal shifts to avoid the software keyboard.',
      },
    ],
    subComponents: [
      {
        name: 'ModalBackdrop',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the modal backdrop overlay.',
          },
        ],
      },
      {
        name: 'ModalContent',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the modal content container.',
          },
        ],
      },
      {
        name: 'ModalHeader',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the modal header.',
          },
        ],
      },
      {
        name: 'ModalBody',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the modal body.',
          },
        ],
      },
      {
        name: 'ModalFooter',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the modal footer.',
          },
        ],
      },
      {
        name: 'ModalCloseButton',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the modal close button.',
          },
        ],
      },
    ],
    bestPractices: ['Use for focused tasks that require user attention before proceeding.', 'Always provide a clear close mechanism (ModalCloseButton or backdrop tap).', 'Keep modal content focused and avoid nested modals.'],
    accessibility: 'Modal traps focus and manages the focus cycle. The close button and backdrop are keyboard accessible.',
    relatedComponents: ['drawer', 'actionsheet', 'alert'],
  },

  {
    slug: 'toast',
    name: 'Toast',
    description:
      'A compound notification component for displaying brief, auto-dismissing messages via ToastProvider and the useToast hook.',
    whenToUse:
      'Use Toast for non-blocking success, info, or error notifications that disappear automatically.',
    category: 'Feedback & Overlay',
    importCode:
      "import { Toast, ToastTitle, ToastDescription, ToastProvider, useToast } from '@wireservers-ui/react-native-ui';",
    props: [
      {
        name: 'className',
        type: 'string',
        description: 'NativeWind utility classes for the toast container.',
      },
      {
        name: 'status',
        type: "'info' | 'success' | 'warning' | 'error'",
        default: "'info'",
        description: 'The semantic status that determines the toast color scheme.',
      },
      {
        name: 'variant',
        type: "'solid' | 'subtle' | 'outline'",
        default: "'solid'",
        description: 'The visual variant of the toast.',
      },
    ],
    subComponents: [
      {
        name: 'ToastTitle',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the toast title text.',
          },
        ],
      },
      {
        name: 'ToastDescription',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the toast description text.',
          },
        ],
      },
    ],
    bestPractices: ['Use for brief, non-blocking notifications that auto-dismiss.', 'Match the status to the notification type (success for confirmations, error for failures).', 'Avoid showing multiple toasts simultaneously.'],
    accessibility: 'Toast notifications are announced by screen readers via live regions. Keep messages brief for quick comprehension.',
    relatedComponents: ['alert', 'modal', 'badge'],
  },

  {
    slug: 'tooltip',
    name: 'Tooltip',
    description:
      'A popup component that displays informational text when a trigger element is pressed or long-pressed.',
    whenToUse:
      'Use Tooltip to provide additional context or descriptions for UI elements on hover or press.',
    category: 'Feedback & Overlay',
    importCode:
      "import { Tooltip, TooltipContent, TooltipText } from '@wireservers-ui/react-native-ui';",
    props: [
      {
        name: 'placement',
        type: "'top' | 'bottom' | 'left' | 'right'",
        default: "'bottom'",
        description: 'The preferred placement of the tooltip relative to its trigger.',
      },
      {
        name: 'isOpen',
        type: 'boolean',
        description: 'Controlled open state of the tooltip.',
      },
      {
        name: 'defaultIsOpen',
        type: 'boolean',
        default: 'false',
        description: 'Initial open state when uncontrolled.',
      },
      {
        name: 'onOpen',
        type: '() => void',
        description: 'Callback invoked when the tooltip opens.',
      },
      {
        name: 'onClose',
        type: '() => void',
        description: 'Callback invoked when the tooltip closes.',
      },
      {
        name: 'trigger',
        type: '(props: { ref: React.Ref<any>; onPress: () => void; onLongPress: () => void }) => React.ReactNode',
        required: true,
        description: 'Render function that returns the trigger element, receiving ref and event handlers.',
      },
    ],
    subComponents: [
      {
        name: 'TooltipContent',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the tooltip content container.',
          },
        ],
      },
      {
        name: 'TooltipText',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the tooltip text.',
          },
        ],
      },
    ],
    bestPractices: ['Use for supplementary information that is not essential to the task.', 'Keep tooltip text short — one sentence maximum.', 'Position tooltips to avoid obscuring important content.'],
    accessibility: 'Tooltip content is accessible via long-press on mobile and hover on web. Content is announced by screen readers.',
    relatedComponents: ['toast', 'text', 'icon'],
  },

  {
    slug: 'drawer',
    name: 'Drawer',
    description:
      'A compound slide-in panel component with backdrop, content, header, body, footer, and close button, supporting four placement directions.',
    whenToUse:
      'Use Drawer for supplementary panels like navigation menus, settings, or detail views that slide in from the screen edge.',
    category: 'Feedback & Overlay',
    importCode:
      "import { Drawer, DrawerBackdrop, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter, DrawerCloseButton } from '@wireservers-ui/react-native-ui';",
    props: [
      {
        name: 'isOpen',
        type: 'boolean',
        required: true,
        description: 'Controls whether the drawer is visible.',
      },
      {
        name: 'onClose',
        type: '() => void',
        required: true,
        description: 'Callback invoked when the drawer should close.',
      },
      {
        name: 'placement',
        type: "'left' | 'right' | 'top' | 'bottom'",
        default: "'left'",
        description: 'The edge of the screen from which the drawer slides in.',
      },
      {
        name: 'size',
        type: "'sm' | 'md' | 'lg' | 'full'",
        default: "'md'",
        description: 'Controls the width (or height for top/bottom) of the drawer.',
      },
    ],
    subComponents: [
      {
        name: 'DrawerBackdrop',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the drawer backdrop overlay.',
          },
        ],
      },
      {
        name: 'DrawerContent',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the drawer content panel.',
          },
        ],
      },
      {
        name: 'DrawerHeader',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the drawer header.',
          },
        ],
      },
      {
        name: 'DrawerBody',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the drawer body.',
          },
        ],
      },
      {
        name: 'DrawerFooter',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the drawer footer.',
          },
        ],
      },
      {
        name: 'DrawerCloseButton',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the drawer close button.',
          },
        ],
      },
    ],
    bestPractices: ['Use left placement for navigation menus and right for detail panels.', 'Include DrawerCloseButton for explicit dismissal.', 'Avoid putting critical content in drawers that users might miss.'],
    accessibility: 'Drawer traps focus when open and returns focus to the trigger on close. Backdrop and close button are accessible.',
    relatedComponents: ['modal', 'actionsheet', 'tabs'],
  },

  {
    slug: 'actionsheet',
    name: 'ActionSheet',
    description:
      'A compound bottom-sheet component that slides up from the bottom of the screen with a drag indicator, selectable items, and backdrop.',
    whenToUse:
      'Use ActionSheet for presenting a set of actions or options from the bottom of the screen on mobile.',
    category: 'Feedback & Overlay',
    importCode:
      "import { ActionSheet, ActionSheetBackdrop, ActionSheetContent, ActionSheetDragIndicatorWrapper, ActionSheetDragIndicator, ActionSheetItem, ActionSheetItemText } from '@wireservers-ui/react-native-ui';",
    props: [
      {
        name: 'isOpen',
        type: 'boolean',
        required: true,
        description: 'Controls whether the action sheet is visible.',
      },
      {
        name: 'onClose',
        type: '() => void',
        required: true,
        description: 'Callback invoked when the action sheet should close.',
      },
    ],
    subComponents: [
      {
        name: 'ActionSheetBackdrop',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the action sheet backdrop.',
          },
        ],
      },
      {
        name: 'ActionSheetContent',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the action sheet content container.',
          },
        ],
      },
      {
        name: 'ActionSheetDragIndicatorWrapper',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the drag indicator wrapper.',
          },
        ],
      },
      {
        name: 'ActionSheetDragIndicator',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the drag indicator bar.',
          },
        ],
      },
      {
        name: 'ActionSheetItem',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the action sheet item.',
          },
        ],
      },
      {
        name: 'ActionSheetItemText',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the action sheet item text.',
          },
        ],
      },
    ],
    bestPractices: ['Use for presenting a set of 2-6 actions from the bottom of the screen.', 'Include a drag indicator for intuitive dismissal.', 'Place destructive actions last with warning styling.'],
    accessibility: 'ActionSheet manages focus and is dismissible via the backdrop. Each item is individually focusable.',
    relatedComponents: ['drawer', 'modal', 'select'],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // Navigation
  // ──────────────────────────────────────────────────────────────────────────

  {
    slug: 'tabs',
    name: 'Tabs',
    description:
      'A compound tabbed interface component with tab list, individual tabs, and content panels for organizing content into switchable views.',
    whenToUse:
      'Use Tabs to organize related content into separate views that users can switch between.',
    category: 'Navigation',
    importCode:
      "import { Tabs, TabList, Tab, TabText, TabPanels, TabPanel } from '@wireservers-ui/react-native-ui';",
    props: [
      {
        name: 'className',
        type: 'string',
        description: 'NativeWind utility classes for the tabs container.',
      },
      {
        name: 'defaultIndex',
        type: 'number',
        default: '0',
        description: 'The initial active tab index when uncontrolled.',
      },
      {
        name: 'index',
        type: 'number',
        description: 'The controlled active tab index.',
      },
      {
        name: 'onChange',
        type: '(index: number) => void',
        description: 'Callback invoked when the active tab changes.',
      },
      {
        name: 'variant',
        type: "'underlined' | 'outline' | 'rounded'",
        default: "'underlined'",
        description: 'The visual variant of the tabs.',
      },
      {
        name: 'size',
        type: "'sm' | 'md' | 'lg'",
        default: "'md'",
        description: 'Controls the height and font size of the tabs.',
      },
      {
        name: 'orientation',
        type: "'horizontal' | 'vertical'",
        default: "'horizontal'",
        description: 'The layout orientation of the tab list.',
      },
      {
        name: 'isFitted',
        type: 'boolean',
        default: 'false',
        description: 'When true, tabs stretch to fill the available width equally.',
      },
    ],
    subComponents: [
      {
        name: 'TabList',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the tab list container.',
          },
        ],
      },
      {
        name: 'Tab',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the individual tab.',
          },
        ],
      },
      {
        name: 'TabText',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the tab label text.',
          },
        ],
      },
      {
        name: 'TabPanels',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the tab panels container.',
          },
        ],
      },
      {
        name: 'TabPanel',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the individual tab panel.',
          },
          {
            name: 'index',
            type: 'number',
            required: true,
            description: 'The index of the tab this panel corresponds to.',
          },
        ],
      },
    ],
    bestPractices: ['Use for organizing related content into 2-5 switchable views.', 'Keep tab labels short (1-2 words).', 'Use isFitted when all tabs should have equal width.'],
    accessibility: 'Tabs implement the WAI-ARIA tabs pattern. Arrow keys navigate between tabs, and content is associated with its tab.',
    relatedComponents: ['accordion', 'breadcrumb', 'divider'],
  },

  {
    slug: 'accordion',
    name: 'Accordion',
    description:
      'A compound collapsible content component supporting single or multiple expanded items, with trigger, title, icon, and content sub-components.',
    whenToUse:
      'Use Accordion to show and hide sections of content, such as FAQs or collapsible settings groups.',
    category: 'Navigation',
    importCode:
      "import { Accordion, AccordionItem, AccordionTrigger, AccordionTitleText, AccordionIcon, AccordionContent } from '@wireservers-ui/react-native-ui';",
    props: [
      {
        name: 'className',
        type: 'string',
        description: 'NativeWind utility classes for the accordion container.',
      },
      {
        name: 'type',
        type: "'single' | 'multiple'",
        default: "'single'",
        description: 'Whether one or multiple items can be expanded at once.',
      },
      {
        name: 'defaultValue',
        type: 'string[]',
        description: 'The initial expanded item values when uncontrolled.',
      },
      {
        name: 'value',
        type: 'string[]',
        description: 'The controlled expanded item values.',
      },
      {
        name: 'onValueChange',
        type: '(value: string[]) => void',
        description: 'Callback invoked when the expanded items change.',
      },
      {
        name: 'isCollapsible',
        type: 'boolean',
        default: 'true',
        description: 'Whether the last remaining expanded item can be collapsed.',
      },
      {
        name: 'variant',
        type: "'filled' | 'unfilled'",
        default: "'filled'",
        description: 'The visual variant of the accordion.',
      },
      {
        name: 'size',
        type: "'sm' | 'md' | 'lg'",
        default: "'md'",
        description: 'Controls the padding and font size of the accordion.',
      },
    ],
    subComponents: [
      {
        name: 'AccordionItem',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the accordion item.',
          },
          {
            name: 'value',
            type: 'string',
            required: true,
            description: 'Unique identifier for the accordion item.',
          },
        ],
      },
      {
        name: 'AccordionTrigger',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the accordion trigger button.',
          },
        ],
      },
      {
        name: 'AccordionTitleText',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the accordion title text.',
          },
        ],
      },
      {
        name: 'AccordionIcon',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the accordion expand/collapse icon.',
          },
        ],
      },
      {
        name: 'AccordionContent',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the accordion collapsible content.',
          },
        ],
      },
    ],
    bestPractices: ['Use single type for FAQs where one answer at a time is typical.', 'Use multiple type when users need to compare sections.', 'Include AccordionIcon to indicate expand/collapse state.'],
    accessibility: 'Accordion implements the WAI-ARIA accordion pattern. Trigger buttons are keyboard accessible with proper expanded state.',
    relatedComponents: ['tabs', 'card', 'divider'],
  },

  {
    slug: 'breadcrumb',
    name: 'Breadcrumb',
    description:
      'A compound navigation component that displays the current page location within a hierarchy using linked trail items.',
    whenToUse:
      'Use Breadcrumb to show hierarchical navigation context and allow users to navigate back to parent pages.',
    category: 'Navigation',
    importCode:
      "import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbText } from '@wireservers-ui/react-native-ui';",
    props: [
      {
        name: 'className',
        type: 'string',
        description: 'NativeWind utility classes for the breadcrumb container.',
      },
      {
        name: 'separator',
        type: 'string | React.ReactNode',
        default: "'/'",
        description: 'The separator character or element between breadcrumb items.',
      },
    ],
    subComponents: [
      {
        name: 'BreadcrumbItem',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the breadcrumb item.',
          },
          {
            name: 'isCurrent',
            type: 'boolean',
            default: 'false',
            description: 'Marks this item as the current page (typically renders as non-interactive).',
          },
        ],
      },
      {
        name: 'BreadcrumbLink',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the breadcrumb link.',
          },
          {
            name: 'href',
            type: 'string',
            description: 'The URL or route path to navigate to.',
          },
        ],
      },
      {
        name: 'BreadcrumbText',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the breadcrumb text.',
          },
        ],
      },
    ],
    bestPractices: ['Use for hierarchical navigation that is 2-4 levels deep.', 'Mark the current page with isCurrent on the last BreadcrumbItem.', 'Keep breadcrumb labels concise.'],
    accessibility: 'Breadcrumb renders a nav landmark with ordered list structure. Current item uses aria-current for screen readers.',
    relatedComponents: ['link', 'tabs', 'text'],
  },

  {
    slug: 'fab',
    name: 'Fab',
    description:
      'A floating action button component that stays fixed at a screen corner with icon and optional label sub-components.',
    whenToUse:
      'Use Fab for the primary or most common action on a screen, like creating a new item.',
    category: 'Navigation',
    importCode:
      "import { Fab, FabIcon, FabLabel } from '@wireservers-ui/react-native-ui';",
    props: [
      {
        name: 'className',
        type: 'string',
        description: 'NativeWind utility classes for the fab button.',
      },
      {
        name: 'placement',
        type: "'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center'",
        default: "'bottom-right'",
        description: 'The screen corner where the fab is positioned.',
      },
      {
        name: 'size',
        type: "'sm' | 'md' | 'lg'",
        default: "'md'",
        description: 'Controls the diameter of the fab.',
      },
      {
        name: 'isExtended',
        type: 'boolean',
        default: 'false',
        description: 'When true, renders the fab in an extended pill shape with a label.',
      },
    ],
    subComponents: [
      {
        name: 'FabIcon',
        props: [
          {
            name: 'as',
            type: 'React.ElementType',
            required: true,
            description: 'The icon component to render inside the fab.',
          },
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the fab icon.',
          },
        ],
      },
      {
        name: 'FabLabel',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the fab label text.',
          },
        ],
      },
    ],
    bestPractices: ['Use for the single most important action on a screen.', 'Place in bottom-right for right-handed ergonomics.', 'Use isExtended with FabLabel for clarity when the icon alone is ambiguous.'],
    accessibility: 'Fab is a button with built-in accessibility. Add accessibilityLabel to describe the action when using icon-only.',
    relatedComponents: ['button', 'icon', 'actionsheet'],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // Data Display
  // ──────────────────────────────────────────────────────────────────────────

  {
    slug: 'calendar',
    name: 'Calendar',
    description:
      'A full-featured calendar component supporting day, week, and month time ranges with horizontal and vertical layouts, team member columns, and event rendering.',
    whenToUse:
      'Use Calendar to display schedules, appointments, or time-based events. It supports multiple views (day/week/month), horizontal timeline and vertical list layouts, and team member grouping.',
    category: 'Data Display',
    importCode:
      "import { Calendar, CalendarHeader, CalendarViewSwitcher, CalendarHorizontalView, CalendarVerticalView, CalendarMonthView, CalendarWeekView, CalendarDayView, CalendarLegend, CalendarDayCell, CalendarEvent } from '@wireservers-ui/react-native-ui';",
    props: [
      {
        name: 'events',
        type: 'CalendarEventType[]',
        description: 'Array of calendar events to display. Each event has id, title, start, end, optional color and memberId.',
      },
      {
        name: 'members',
        type: 'CalendarTeamMember[]',
        description: 'Array of team members for horizontal column layout. Each member has id, name, initials, and optional role/avatarColor.',
      },
      {
        name: 'initialDate',
        type: 'Date',
        description: 'The initial date the calendar focuses on.',
      },
      {
        name: 'initialLayout',
        type: "'horizontal' | 'vertical'",
        default: "'horizontal'",
        description: 'The initial layout mode. Horizontal shows a timeline grid; vertical shows a list.',
      },
      {
        name: 'initialTimeRange',
        type: "'day' | 'week' | 'month'",
        default: "'day'",
        description: 'The initial time range to display.',
      },
      {
        name: 'horizontalConfig',
        type: 'CalendarHorizontalConfig',
        description: 'Configuration for the horizontal timeline: startHour, endHour, slotMinutes, slotWidth, slotHeight, timeColumnWidth, memberColumnWidth.',
      },
      {
        name: 'onDateSelect',
        type: '(date: Date) => void',
        description: 'Callback when a date is selected.',
      },
      {
        name: 'onEventPress',
        type: '(event: CalendarEventType) => void',
        description: 'Callback when an event is pressed.',
      },
      {
        name: 'onMonthChange',
        type: '(year: number, month: number) => void',
        description: 'Callback when the displayed month changes.',
      },
      {
        name: 'onViewChange',
        type: '(layout: CalendarLayout) => void',
        description: 'Callback when the layout mode changes.',
      },
      {
        name: 'onTimeRangeChange',
        type: '(timeRange: CalendarTimeRange) => void',
        description: 'Callback when the time range changes.',
      },
      {
        name: 'renderEvent',
        type: '(event: CalendarEventType) => React.ReactNode',
        description: 'Custom render function for events.',
      },
      {
        name: 'className',
        type: 'string',
        description: 'NativeWind utility classes for the calendar container.',
      },
      {
        name: 'children',
        type: 'React.ReactNode',
        description: 'Compose the calendar UI using sub-components like CalendarHeader, CalendarViewSwitcher, and layout views.',
      },
    ],
    subComponents: [
      {
        name: 'CalendarHeader',
        props: [
          { name: 'className', type: 'string', description: 'NativeWind utility classes for the header.' },
        ],
      },
      {
        name: 'CalendarViewSwitcher',
        props: [
          { name: 'target', type: "'timeRange' | 'layout'", required: true, description: 'Which dimension the switcher toggles — time range (day/week/month) or layout (horizontal/vertical).' },
          { name: 'className', type: 'string', description: 'NativeWind utility classes for the switcher.' },
        ],
      },
      {
        name: 'CalendarHorizontalView',
        props: [
          { name: 'className', type: 'string', description: 'NativeWind utility classes for the horizontal timeline.' },
        ],
      },
      {
        name: 'CalendarVerticalView',
        props: [
          { name: 'className', type: 'string', description: 'NativeWind utility classes for the vertical list view.' },
        ],
      },
      {
        name: 'CalendarMonthView',
        props: [
          { name: 'className', type: 'string', description: 'NativeWind utility classes for the month grid.' },
        ],
      },
      {
        name: 'CalendarLegend',
        props: [
          { name: 'items', type: 'CalendarLegendItem[]', required: true, description: 'Array of { color, label } items to render in the legend.' },
          { name: 'className', type: 'string', description: 'NativeWind utility classes for the legend container.' },
        ],
      },
    ],
    bestPractices: [
      'Use the compound component pattern — compose CalendarHeader, CalendarViewSwitcher, and view components as children of Calendar.',
      'Provide a CalendarLegend when using multiple event colors so users understand the color coding.',
      'Use the horizontal layout for timeline views and vertical for list-style agendas.',
    ],
    accessibility: 'Calendar supports accessibility roles and labels on event items. Events are pressable with appropriate labels. Use onEventPress to handle selection.',
    relatedComponents: ['tabs', 'badge', 'avatar'],
  },
];

// ────────────────────────────────────────────────────────────────────────────
// Helper functions
// ────────────────────────────────────────────────────────────────────────────

export function getComponentBySlug(slug: string): ComponentMeta | undefined {
  return componentRegistry.find((c) => c.slug === slug);
}

export function getComponentsByCategory(
  category: ComponentCategory,
): ComponentMeta[] {
  return componentRegistry.filter((c) => c.category === category);
}

export const categories: ComponentCategory[] = [
  'Core Primitives',
  'Form Controls',
  'Feedback & Overlay',
  'Navigation',
  'Data Display',
];

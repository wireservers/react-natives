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
  | 'Layout'
  | 'Form Controls'
  | 'Feedback & Overlay'
  | 'Navigation'
  | 'Data Display'
  | 'Disclosure'
  | 'Utility';

export interface ComponentMeta {
  slug: string;
  name: string;
  description: string;
  whenToUse: string;
  category: ComponentCategory;
  importCode: string;
  exampleCode?: string;
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
    importCode: "import { Text } from '@wireservers-ui/react-natives';",
    exampleCode: `import { Text } from '@wireservers-ui/react-natives';
import { View } from 'react-native';

export default function TextExample() {
  return (
    <View style={{ gap: 12 }}>
      <Text size="2xl" weight="bold">
        Large Bold Text
      </Text>
      <Text size="md">
        Default body text for paragraphs and content.
      </Text>
      <Text size="sm" italic>
        Small italic text for captions.
      </Text>
      <Text size="md" underline>
        Underlined text for emphasis.
      </Text>
      <Text size="xs" highlight>
        Highlighted text for callouts.
      </Text>
    </View>
  );
}`,
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
    importCode: "import { Heading } from '@wireservers-ui/react-natives';",
    exampleCode: `import { Heading } from '@wireservers-ui/react-natives';
import { View } from 'react-native';

export default function HeadingExample() {
  return (
    <View style={{ gap: 16 }}>
      <Heading size="4xl">Page Title</Heading>
      <Heading size="2xl">Section Heading</Heading>
      <Heading size="lg">Subsection Heading</Heading>
      <Heading size="md">Card Title</Heading>
      <Heading size="sm">Small Heading</Heading>
    </View>
  );
}`,
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
    importCode: "import { Icon } from '@wireservers-ui/react-natives';",
    exampleCode: `import { Icon } from '@wireservers-ui/react-natives';
import { View } from 'react-native';
import { Star, Heart, Settings } from 'lucide-react-native';

export default function IconExample() {
  return (
    <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
      <Icon as={Star} size="sm" color="#F59E0B" />
      <Icon as={Heart} size="md" color="#EF4444" />
      <Icon as={Settings} size="lg" color="#6B7280" />
      <Icon as={Star} size="2xl" color="#61DBFB" />
    </View>
  );
}`,
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
        description: 'Controls the icon size. Accepts a preset or a numeric pixel value (e.g. size={24}).',
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
    importCode: "import { Divider } from '@wireservers-ui/react-natives';",
    exampleCode: `import { Divider } from '@wireservers-ui/react-natives';
import { View, Text } from 'react-native';

export default function DividerExample() {
  return (
    <View style={{ gap: 16 }}>
      <Text>Section One</Text>
      <Divider orientation="horizontal" />
      <Text>Section Two</Text>
      <Divider orientation="horizontal" />
      <Text>Section Three</Text>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, height: 24 }}>
        <Text>Left</Text>
        <Divider orientation="vertical" />
        <Text>Right</Text>
      </View>
    </View>
  );
}`,
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
      "import { Badge, BadgeText, BadgeIcon } from '@wireservers-ui/react-natives';",
    exampleCode: `import { Badge, BadgeText } from '@wireservers-ui/react-natives';
import { View } from 'react-native';

export default function BadgeExample() {
  return (
    <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
      <Badge action="success" variant="solid">
        <BadgeText>Active</BadgeText>
      </Badge>
      <Badge action="error" variant="solid">
        <BadgeText>Error</BadgeText>
      </Badge>
      <Badge action="warning" variant="outline">
        <BadgeText>Pending</BadgeText>
      </Badge>
      <Badge action="info" variant="subtle">
        <BadgeText>Info</BadgeText>
      </Badge>
      <Badge action="muted" variant="solid" size="sm">
        <BadgeText>Draft</BadgeText>
      </Badge>
    </View>
  );
}`,
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
    importCode: "import { Spinner } from '@wireservers-ui/react-natives';",
    exampleCode: `import { Spinner } from '@wireservers-ui/react-natives';
import { View, Text } from 'react-native';

export default function SpinnerExample() {
  return (
    <View style={{ gap: 16, alignItems: 'center' }}>
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" color="#61DBFB" />
      <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
        <Spinner size="sm" />
        <Text>Loading content...</Text>
      </View>
    </View>
  );
}`,
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
    importCode: "import { Image } from '@wireservers-ui/react-natives';",
    exampleCode: `import { Image } from '@wireservers-ui/react-natives';
import { View } from 'react-native';

export default function ImageExample() {
  return (
    <View style={{ gap: 16 }}>
      <Image
        source={{ uri: 'https://picsum.photos/200' }}
        alt="Sample landscape"
        size="lg"
        borderRadius="md"
      />
      <Image
        source={{ uri: 'https://picsum.photos/100' }}
        alt="Profile photo"
        size="md"
        borderRadius="full"
      />
      <Image
        source={{ uri: 'https://picsum.photos/300/150' }}
        alt="Wide banner"
        size="xl"
        borderRadius="lg"
      />
    </View>
  );
}`,
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
      "import { Avatar, AvatarImage, AvatarFallbackText, AvatarBadge, AvatarGroup } from '@wireservers-ui/react-natives';",
    exampleCode: `import { Avatar, AvatarImage, AvatarFallbackText, AvatarBadge, AvatarGroup } from '@wireservers-ui/react-natives';
import { View } from 'react-native';

export default function AvatarExample() {
  return (
    <View style={{ gap: 16 }}>
      <Avatar size="lg">
        <AvatarImage
          source={{ uri: 'https://i.pravatar.cc/150?u=john' }}
          alt="John Doe"
        />
        <AvatarFallbackText>John Doe</AvatarFallbackText>
        <AvatarBadge />
      </Avatar>

      <Avatar size="md">
        <AvatarFallbackText>Jane Smith</AvatarFallbackText>
      </Avatar>

      <AvatarGroup max={3}>
        <Avatar size="sm">
          <AvatarFallbackText>AB</AvatarFallbackText>
        </Avatar>
        <Avatar size="sm">
          <AvatarFallbackText>CD</AvatarFallbackText>
        </Avatar>
        <Avatar size="sm">
          <AvatarFallbackText>EF</AvatarFallbackText>
        </Avatar>
        <Avatar size="sm">
          <AvatarFallbackText>GH</AvatarFallbackText>
        </Avatar>
      </AvatarGroup>
    </View>
  );
}`,
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
      "import { Card, CardHeader, CardBody, CardFooter } from '@wireservers-ui/react-natives';",
    exampleCode: `import { Card, CardHeader, CardBody, CardFooter } from '@wireservers-ui/react-natives';
import { Text, View } from 'react-native';

export default function CardExample() {
  return (
    <Card variant="elevated" size="md">
      <CardHeader>
        <Text style={{ fontSize: 18, fontWeight: '600' }}>
          Card Title
        </Text>
      </CardHeader>
      <CardBody>
        <Text style={{ color: '#6B7280' }}>
          This is the card body content. Use cards to group
          related information together.
        </Text>
      </CardBody>
      <CardFooter>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Text style={{ color: '#61DBFB' }}>Learn More</Text>
        </View>
      </CardFooter>
    </Card>
  );
}`,
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
      "import { Button, ButtonText, ButtonSpinner, ButtonIcon, ButtonGroup } from '@wireservers-ui/react-natives';",
    exampleCode: `import { Button, ButtonText, ButtonIcon, ButtonGroup } from '@wireservers-ui/react-natives';
import { View } from 'react-native';
import { Plus } from 'lucide-react-native';

export default function ButtonExample() {
  return (
    <View style={{ gap: 16 }}>
      <Button action="primary" variant="solid" size="md">
        <ButtonText>Primary Action</ButtonText>
      </Button>

      <Button action="secondary" variant="outline" size="md">
        <ButtonText>Secondary</ButtonText>
      </Button>

      <Button action="positive" variant="solid" size="sm">
        <ButtonIcon as={Plus} />
        <ButtonText>Add Item</ButtonText>
      </Button>

      <Button action="negative" variant="solid" size="md">
        <ButtonText>Delete</ButtonText>
      </Button>

      <ButtonGroup space="md">
        <Button variant="outline"><ButtonText>Cancel</ButtonText></Button>
        <Button variant="solid"><ButtonText>Save</ButtonText></Button>
      </ButtonGroup>
    </View>
  );
}`,
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
      "import { FormControl, FormControlLabel, FormControlLabelText, FormControlHelperText, FormControlErrorMessage, FormControlErrorIcon } from '@wireservers-ui/react-natives';",
    exampleCode: `import { FormControl, FormControlLabel, FormControlLabelText, FormControlHelperText, FormControlErrorMessage } from '@wireservers-ui/react-natives';
import { Input, InputField } from '@wireservers-ui/react-natives';
import { useState } from 'react';
import { View } from 'react-native';

export default function FormControlExample() {
  const [email, setEmail] = useState('');
  const isInvalid = email.length > 0 && !email.includes('@');

  return (
    <View style={{ gap: 16 }}>
      <FormControl isRequired>
        <FormControlLabel>
          <FormControlLabelText>Email</FormControlLabelText>
        </FormControlLabel>
        <Input>
          <InputField
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
          />
        </Input>
        <FormControlHelperText>
          We will never share your email.
        </FormControlHelperText>
      </FormControl>

      <FormControl isInvalid={isInvalid}>
        <FormControlLabel>
          <FormControlLabelText>Validated Field</FormControlLabelText>
        </FormControlLabel>
        <Input isInvalid={isInvalid}>
          <InputField placeholder="Must contain @" />
        </Input>
        {isInvalid && (
          <FormControlErrorMessage>
            Please enter a valid email address.
          </FormControlErrorMessage>
        )}
      </FormControl>
    </View>
  );
}`,
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
      "import { Input, InputField, InputSlot, InputIcon } from '@wireservers-ui/react-natives';",
    exampleCode: `import { Input, InputField, InputSlot, InputIcon } from '@wireservers-ui/react-natives';
import { useState } from 'react';
import { View } from 'react-native';
import { Search, Eye, EyeOff } from 'lucide-react-native';

export default function InputExample() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={{ gap: 16 }}>
      <Input variant="outline" size="md">
        <InputField placeholder="Enter text..." />
      </Input>

      <Input variant="outline" size="md">
        <InputSlot>
          <InputIcon as={Search} />
        </InputSlot>
        <InputField placeholder="Search..." />
      </Input>

      <Input variant="rounded" size="md">
        <InputField
          placeholder="Password"
          secureTextEntry={!showPassword}
        />
        <InputSlot onPress={() => setShowPassword(!showPassword)}>
          <InputIcon as={showPassword ? EyeOff : Eye} />
        </InputSlot>
      </Input>

      <Input variant="outline" isDisabled>
        <InputField placeholder="Disabled input" />
      </Input>
    </View>
  );
}`,
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
    importCode: "import { Textarea } from '@wireservers-ui/react-natives';",
    exampleCode: `import { Textarea } from '@wireservers-ui/react-natives';
import { useState } from 'react';
import { View, Text } from 'react-native';

export default function TextareaExample() {
  const [value, setValue] = useState('');

  return (
    <View style={{ gap: 16 }}>
      <Textarea variant="outline" size="md">
        <TextareaInput
          placeholder="Write your message here..."
          value={value}
          onChangeText={setValue}
          numberOfLines={4}
        />
      </Textarea>
      <Text style={{ fontSize: 12, color: '#9CA3AF' }}>
        {value.length}/500 characters
      </Text>
    </View>
  );
}`,
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
    importCode: "import { Switch } from '@wireservers-ui/react-natives';",
    exampleCode: `import { Switch } from '@wireservers-ui/react-natives';
import { useState } from 'react';
import { View, Text } from 'react-native';

export default function SwitchExample() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <View style={{ gap: 16 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text>Push Notifications</Text>
        <Switch
          value={notifications}
          onToggle={setNotifications}
          size="md"
        />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text>Dark Mode</Text>
        <Switch
          value={darkMode}
          onToggle={setDarkMode}
          size="md"
        />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text>Disabled Setting</Text>
        <Switch value={false} isDisabled size="md" />
      </View>
    </View>
  );
}`,
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
      "import { Checkbox, CheckboxGroup, CheckboxIndicator, CheckboxIcon, CheckboxLabel } from '@wireservers-ui/react-natives';",
    exampleCode: `import { Checkbox, CheckboxGroup, CheckboxIndicator, CheckboxIcon, CheckboxLabel } from '@wireservers-ui/react-natives';
import { useState } from 'react';
import { View, Text } from 'react-native';

export default function CheckboxExample() {
  const [selected, setSelected] = useState(['email']);

  return (
    <View style={{ gap: 12 }}>
      <Text style={{ fontWeight: '600' }}>Notification Preferences</Text>
      <CheckboxGroup value={selected} onChange={setSelected}>
        <View style={{ gap: 10 }}>
          <Checkbox value="email">
            <CheckboxIndicator>
              <CheckboxIcon />
            </CheckboxIndicator>
            <CheckboxLabel>Email Notifications</CheckboxLabel>
          </Checkbox>
          <Checkbox value="sms">
            <CheckboxIndicator>
              <CheckboxIcon />
            </CheckboxIndicator>
            <CheckboxLabel>SMS Notifications</CheckboxLabel>
          </Checkbox>
          <Checkbox value="push">
            <CheckboxIndicator>
              <CheckboxIcon />
            </CheckboxIndicator>
            <CheckboxLabel>Push Notifications</CheckboxLabel>
          </Checkbox>
          <Checkbox value="disabled" isDisabled>
            <CheckboxIndicator>
              <CheckboxIcon />
            </CheckboxIndicator>
            <CheckboxLabel>Disabled Option</CheckboxLabel>
          </Checkbox>
        </View>
      </CheckboxGroup>
      <Text style={{ fontSize: 12, color: '#9CA3AF' }}>
        Selected: {selected.join(', ')}
      </Text>
    </View>
  );
}`,
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
      "import { Radio, RadioGroup, RadioIndicator, RadioIcon, RadioLabel } from '@wireservers-ui/react-natives';",
    exampleCode: `import { Radio, RadioGroup } from '@wireservers-ui/react-natives';
import { useState } from 'react';

export default function RadioExample() {
  const [selected, setSelected] = useState('option1');

  return (
    <View style={styles.container}>
      <RadioGroup value={selected} onValueChange={setSelected}>
        <Radio
          value="option1"
          label="Option 1"
        />
        <Radio
          value="option2"
          label="Option 2"
        />
        <Radio
          value="option3"
          label="Option 3"
        />
        <Radio
          value="disabled"
          label="Disabled Option"
          disabled
        />
      </RadioGroup>
    </View>
  );
}`,
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
      "import { Slider, SliderTrack, SliderFilledTrack, SliderThumb } from '@wireservers-ui/react-natives';",
    exampleCode: `import { Slider, SliderTrack, SliderFilledTrack, SliderThumb } from '@wireservers-ui/react-natives';
import { useState } from 'react';
import { View, Text } from 'react-native';

export default function SliderExample() {
  const [volume, setVolume] = useState(50);
  const [brightness, setBrightness] = useState(75);

  return (
    <View style={{ gap: 24 }}>
      <View style={{ gap: 8 }}>
        <Text>Volume: {volume}%</Text>
        <Slider
          value={volume}
          onValueChange={setVolume}
          min={0}
          max={100}
          step={1}
          size="md"
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </View>

      <View style={{ gap: 8 }}>
        <Text>Brightness: {brightness}%</Text>
        <Slider
          value={brightness}
          onValueChange={setBrightness}
          min={0}
          max={100}
          size="lg"
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </View>
    </View>
  );
}`,
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
      "import { Select, SelectTrigger, SelectInput, SelectIcon, SelectPortal, SelectBackdrop, SelectContent, SelectItem } from '@wireservers-ui/react-natives';",
    exampleCode: `import { Select, SelectTrigger, SelectInput, SelectIcon, SelectPortal, SelectBackdrop, SelectContent, SelectItem } from '@wireservers-ui/react-natives';
import { useState } from 'react';
import { View, Text } from 'react-native';
import { ChevronDown } from 'lucide-react-native';

export default function SelectExample() {
  const [country, setCountry] = useState('');

  return (
    <View style={{ gap: 8 }}>
      <Text style={{ fontWeight: '600' }}>Country</Text>
      <Select
        selectedValue={country}
        onValueChange={setCountry}
        placeholder="Select a country"
      >
        <SelectTrigger variant="outline" size="md">
          <SelectInput placeholder="Select a country" />
          <SelectIcon as={ChevronDown} />
        </SelectTrigger>
        <SelectPortal>
          <SelectBackdrop />
          <SelectContent>
            <SelectItem label="United States" value="us" />
            <SelectItem label="United Kingdom" value="uk" />
            <SelectItem label="Canada" value="ca" />
            <SelectItem label="Australia" value="au" />
            <SelectItem label="Germany" value="de" />
          </SelectContent>
        </SelectPortal>
      </Select>
    </View>
  );
}`,
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
      "import { Alert, AlertIcon, AlertBody, AlertText, AlertCloseButton } from '@wireservers-ui/react-natives';",
    exampleCode: `import { Alert, AlertIcon, AlertBody, AlertText } from '@wireservers-ui/react-natives';
import { View } from 'react-native';
import { Info, CheckCircle, AlertTriangle, XCircle } from 'lucide-react-native';

export default function AlertExample() {
  return (
    <View style={{ gap: 12 }}>
      <Alert status="info" variant="subtle">
        <AlertIcon as={Info} />
        <AlertBody>
          <AlertText>A new software update is available.</AlertText>
        </AlertBody>
      </Alert>

      <Alert status="success" variant="subtle">
        <AlertIcon as={CheckCircle} />
        <AlertBody>
          <AlertText>Your changes have been saved.</AlertText>
        </AlertBody>
      </Alert>

      <Alert status="warning" variant="outline">
        <AlertIcon as={AlertTriangle} />
        <AlertBody>
          <AlertText>Your trial expires in 3 days.</AlertText>
        </AlertBody>
      </Alert>

      <Alert status="error" variant="solid">
        <AlertIcon as={XCircle} />
        <AlertBody>
          <AlertText>Failed to process your request.</AlertText>
        </AlertBody>
      </Alert>
    </View>
  );
}`,
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
      "import { Progress, ProgressFilledTrack } from '@wireservers-ui/react-natives';",
    exampleCode: `import { Progress, ProgressFilledTrack } from '@wireservers-ui/react-natives';
import { View, Text } from 'react-native';

export default function ProgressExample() {
  return (
    <View style={{ gap: 20 }}>
      <View style={{ gap: 4 }}>
        <Text style={{ fontSize: 14 }}>Upload Progress</Text>
        <Progress value={65} size="md">
          <ProgressFilledTrack />
        </Progress>
        <Text style={{ fontSize: 12, color: '#9CA3AF' }}>65%</Text>
      </View>

      <View style={{ gap: 4 }}>
        <Text style={{ fontSize: 14 }}>Profile Complete</Text>
        <Progress value={30} size="sm" colorScheme="warning">
          <ProgressFilledTrack />
        </Progress>
        <Text style={{ fontSize: 12, color: '#9CA3AF' }}>30%</Text>
      </View>

      <View style={{ gap: 4 }}>
        <Text style={{ fontSize: 14 }}>Download Complete</Text>
        <Progress value={100} size="lg" colorScheme="success">
          <ProgressFilledTrack />
        </Progress>
      </View>
    </View>
  );
}`,
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
      "import { Link, LinkText } from '@wireservers-ui/react-natives';",
    exampleCode: `import { Link, LinkText } from '@wireservers-ui/react-natives';
import { View, Text } from 'react-native';

export default function LinkExample() {
  return (
    <View style={{ gap: 12 }}>
      <Link href="/settings">
        <LinkText>Go to Settings</LinkText>
      </Link>

      <Link href="https://example.com" isExternal>
        <LinkText>Visit Website</LinkText>
      </Link>

      <Text style={{ fontSize: 14, color: '#6B7280' }}>
        Read our{' '}
        <Link href="/terms">
          <LinkText>Terms of Service</LinkText>
        </Link>
        {' '}and{' '}
        <Link href="/privacy">
          <LinkText>Privacy Policy</LinkText>
        </Link>
      </Text>
    </View>
  );
}`,
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
      "import { Modal, ModalBackdrop, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton } from '@wireservers-ui/react-natives';",
    exampleCode: `import { Modal, ModalBackdrop, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton } from '@wireservers-ui/react-natives';
import { Button, ButtonText } from '@wireservers-ui/react-natives';
import { useState } from 'react';
import { Text, View } from 'react-native';

export default function ModalExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View>
      <Button onPress={() => setIsOpen(true)}>
        <ButtonText>Open Modal</ButtonText>
      </Button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="md">
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Text style={{ fontSize: 18, fontWeight: '600' }}>
              Confirm Action
            </Text>
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody>
            <Text style={{ color: '#6B7280' }}>
              Are you sure you want to proceed? This action
              cannot be undone.
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" onPress={() => setIsOpen(false)}>
              <ButtonText>Cancel</ButtonText>
            </Button>
            <Button onPress={() => setIsOpen(false)}>
              <ButtonText>Confirm</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </View>
  );
}`,
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
      "import { Toast, ToastTitle, ToastDescription, ToastProvider, useToast } from '@wireservers-ui/react-natives';",
    exampleCode: `import { Toast, ToastTitle, ToastDescription, useToast } from '@wireservers-ui/react-natives';
import { Button, ButtonText } from '@wireservers-ui/react-natives';
import { View } from 'react-native';

export default function ToastExample() {
  const toast = useToast();

  const showToast = (status) => {
    toast.show({
      render: () => (
        <Toast status={status} variant="solid">
          <ToastTitle>
            {status === 'success' ? 'Saved!' : 'Error'}
          </ToastTitle>
          <ToastDescription>
            {status === 'success'
              ? 'Your changes have been saved.'
              : 'Something went wrong. Please try again.'}
          </ToastDescription>
        </Toast>
      ),
    });
  };

  return (
    <View style={{ flexDirection: 'row', gap: 8 }}>
      <Button onPress={() => showToast('success')}>
        <ButtonText>Success Toast</ButtonText>
      </Button>
      <Button action="negative" onPress={() => showToast('error')}>
        <ButtonText>Error Toast</ButtonText>
      </Button>
    </View>
  );
}`,
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
      "import { Tooltip, TooltipContent, TooltipText } from '@wireservers-ui/react-natives';",
    exampleCode: `import { Tooltip, TooltipContent, TooltipText } from '@wireservers-ui/react-natives';
import { Button, ButtonText } from '@wireservers-ui/react-natives';
import { View } from 'react-native';

export default function TooltipExample() {
  return (
    <View style={{ flexDirection: 'row', gap: 16 }}>
      <Tooltip
        placement="top"
        trigger={(triggerProps) => (
          <Button {...triggerProps}>
            <ButtonText>Hover Me</ButtonText>
          </Button>
        )}
      >
        <TooltipContent>
          <TooltipText>This is a helpful tooltip!</TooltipText>
        </TooltipContent>
      </Tooltip>

      <Tooltip
        placement="bottom"
        trigger={(triggerProps) => (
          <Button variant="outline" {...triggerProps}>
            <ButtonText>Bottom Tip</ButtonText>
          </Button>
        )}
      >
        <TooltipContent>
          <TooltipText>Tooltip below the trigger.</TooltipText>
        </TooltipContent>
      </Tooltip>
    </View>
  );
}`,
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
      "import { Drawer, DrawerBackdrop, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter, DrawerCloseButton } from '@wireservers-ui/react-natives';",
    exampleCode: `import { Drawer, DrawerBackdrop, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter, DrawerCloseButton } from '@wireservers-ui/react-natives';
import { Button, ButtonText } from '@wireservers-ui/react-natives';
import { useState } from 'react';
import { Text, View } from 'react-native';

export default function DrawerExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View>
      <Button onPress={() => setIsOpen(true)}>
        <ButtonText>Open Drawer</ButtonText>
      </Button>

      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        placement="left"
        size="md"
      >
        <DrawerBackdrop />
        <DrawerContent>
          <DrawerHeader>
            <Text style={{ fontSize: 18, fontWeight: '600' }}>
              Navigation
            </Text>
            <DrawerCloseButton />
          </DrawerHeader>
          <DrawerBody>
            <Text>Dashboard</Text>
            <Text>Settings</Text>
            <Text>Profile</Text>
          </DrawerBody>
          <DrawerFooter>
            <Button
              variant="outline"
              onPress={() => setIsOpen(false)}
            >
              <ButtonText>Close</ButtonText>
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </View>
  );
}`,
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
      "import { ActionSheet, ActionSheetBackdrop, ActionSheetContent, ActionSheetDragIndicatorWrapper, ActionSheetDragIndicator, ActionSheetItem, ActionSheetItemText } from '@wireservers-ui/react-natives';",
    exampleCode: `import { ActionSheet, ActionSheetBackdrop, ActionSheetContent, ActionSheetDragIndicatorWrapper, ActionSheetDragIndicator, ActionSheetItem, ActionSheetItemText } from '@wireservers-ui/react-natives';
import { Button, ButtonText } from '@wireservers-ui/react-natives';
import { useState } from 'react';
import { View } from 'react-native';

export default function ActionSheetExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View>
      <Button onPress={() => setIsOpen(true)}>
        <ButtonText>Show Actions</ButtonText>
      </Button>

      <ActionSheet isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ActionSheetBackdrop />
        <ActionSheetContent>
          <ActionSheetDragIndicatorWrapper>
            <ActionSheetDragIndicator />
          </ActionSheetDragIndicatorWrapper>
          <ActionSheetItem onPress={() => setIsOpen(false)}>
            <ActionSheetItemText>Edit</ActionSheetItemText>
          </ActionSheetItem>
          <ActionSheetItem onPress={() => setIsOpen(false)}>
            <ActionSheetItemText>Share</ActionSheetItemText>
          </ActionSheetItem>
          <ActionSheetItem onPress={() => setIsOpen(false)}>
            <ActionSheetItemText>Duplicate</ActionSheetItemText>
          </ActionSheetItem>
          <ActionSheetItem onPress={() => setIsOpen(false)}>
            <ActionSheetItemText>Delete</ActionSheetItemText>
          </ActionSheetItem>
        </ActionSheetContent>
      </ActionSheet>
    </View>
  );
}`,
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
      "import { Tabs, TabList, Tab, TabText, TabPanels, TabPanel } from '@wireservers-ui/react-natives';",
    exampleCode: `import { Tabs, TabList, Tab, TabText, TabPanels, TabPanel } from '@wireservers-ui/react-natives';
import { Text, View } from 'react-native';

export default function TabsExample() {
  return (
    <Tabs defaultIndex={0} variant="underlined">
      <TabList>
        <Tab>
          <TabText>Overview</TabText>
        </Tab>
        <Tab>
          <TabText>Features</TabText>
        </Tab>
        <Tab>
          <TabText>Pricing</TabText>
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel index={0}>
          <View style={{ padding: 16 }}>
            <Text>Overview content goes here.</Text>
          </View>
        </TabPanel>
        <TabPanel index={1}>
          <View style={{ padding: 16 }}>
            <Text>Features content goes here.</Text>
          </View>
        </TabPanel>
        <TabPanel index={2}>
          <View style={{ padding: 16 }}>
            <Text>Pricing content goes here.</Text>
          </View>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}`,
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
      "import { Accordion, AccordionItem, AccordionTrigger, AccordionTitleText, AccordionIcon, AccordionContent } from '@wireservers-ui/react-natives';",
    exampleCode: `import { Accordion, AccordionItem, AccordionTrigger, AccordionTitleText, AccordionIcon, AccordionContent } from '@wireservers-ui/react-natives';
import { Text } from 'react-native';

export default function AccordionExample() {
  return (
    <Accordion type="single" defaultValue={['item-1']}>
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <AccordionTitleText>
            What is this component library?
          </AccordionTitleText>
          <AccordionIcon />
        </AccordionTrigger>
        <AccordionContent>
          <Text>
            A cross-platform UI library built with React Native
            and NativeWind for consistent styling on iOS,
            Android, and web.
          </Text>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger>
          <AccordionTitleText>
            How do I install it?
          </AccordionTitleText>
          <AccordionIcon />
        </AccordionTrigger>
        <AccordionContent>
          <Text>
            Run npm install @wireservers-ui/react-natives
            and follow the setup guide.
          </Text>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3">
        <AccordionTrigger>
          <AccordionTitleText>
            Does it support dark mode?
          </AccordionTitleText>
          <AccordionIcon />
        </AccordionTrigger>
        <AccordionContent>
          <Text>
            Yes! All components support light and dark themes
            via CSS variables.
          </Text>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}`,
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
      "import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbText } from '@wireservers-ui/react-natives';",
    exampleCode: `import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbText } from '@wireservers-ui/react-natives';

export default function BreadcrumbExample() {
  return (
    <Breadcrumb separator="/">
      <BreadcrumbItem>
        <BreadcrumbLink href="/">
          <BreadcrumbText>Home</BreadcrumbText>
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href="/products">
          <BreadcrumbText>Products</BreadcrumbText>
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href="/products/electronics">
          <BreadcrumbText>Electronics</BreadcrumbText>
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem isCurrent>
        <BreadcrumbText>Headphones</BreadcrumbText>
      </BreadcrumbItem>
    </Breadcrumb>
  );
}`,
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
      "import { Fab, FabIcon, FabLabel } from '@wireservers-ui/react-natives';",
    exampleCode: `import { Fab, FabIcon, FabLabel } from '@wireservers-ui/react-natives';
import { View } from 'react-native';
import { Plus, Edit } from 'lucide-react-native';

export default function FabExample() {
  return (
    <View style={{ height: 200, position: 'relative' }}>
      <Fab
        placement="bottom-right"
        size="md"
        onPress={() => console.log('FAB pressed')}
      >
        <FabIcon as={Plus} />
      </Fab>

      <Fab
        placement="bottom-left"
        size="md"
        isExtended
        onPress={() => console.log('Extended FAB pressed')}
      >
        <FabIcon as={Edit} />
        <FabLabel>New Post</FabLabel>
      </Fab>
    </View>
  );
}`,
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
      "import { Calendar, CalendarHeader, CalendarViewSwitcher, CalendarHorizontalView, CalendarVerticalView, CalendarMonthView, CalendarWeekView, CalendarDayView, CalendarLegend, CalendarDayCell, CalendarEvent } from '@wireservers-ui/react-natives';",
    exampleCode: `import { Calendar, CalendarHeader, CalendarViewSwitcher, CalendarHorizontalView, CalendarLegend } from '@wireservers-ui/react-natives';

export default function CalendarExample() {
  const events = [
    {
      id: '1',
      title: 'Team Meeting',
      start: new Date(2025, 0, 15, 10, 0),
      end: new Date(2025, 0, 15, 11, 0),
      color: '#61DBFB',
      memberId: 'alice',
    },
    {
      id: '2',
      title: 'Lunch Break',
      start: new Date(2025, 0, 15, 12, 0),
      end: new Date(2025, 0, 15, 13, 0),
      color: '#059669',
      memberId: 'bob',
    },
  ];

  const members = [
    { id: 'alice', name: 'Alice', initials: 'AL' },
    { id: 'bob', name: 'Bob', initials: 'BO' },
  ];

  return (
    <Calendar
      events={events}
      members={members}
      initialDate={new Date(2025, 0, 15)}
      initialTimeRange="day"
      initialLayout="horizontal"
      onEventPress={(event) => console.log(event.title)}
    >
      <CalendarHeader />
      <CalendarViewSwitcher target="timeRange" />
      <CalendarHorizontalView />
      <CalendarLegend
        items={[
          { color: '#61DBFB', label: 'Meetings' },
          { color: '#059669', label: 'Personal' },
        ]}
      />
    </Calendar>
  );
}`,
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

  // ──────────────────────────────────────────────────────────────────────────
  // Layout
  // ──────────────────────────────────────────────────────────────────────────

  {
    slug: 'box',
    name: 'Box',
    description:
      'A styled View wrapper that accepts className for NativeWind utility classes.',
    whenToUse: 'Use Box as a generic layout primitive when you need a styled container with NativeWind classes.',
    category: 'Layout',
    importCode: "import { Box } from '@wireservers-ui/react-natives';",
    props: [
      {
        name: 'className',
        type: 'string',
        description: 'NativeWind utility classes to apply to the box.',
      },
    ],
    bestPractices: [
      'Use Box instead of raw View when you need NativeWind className support.',
      'Compose Box with Stack and Center for complex layouts.',
      'Keep nesting shallow — prefer flex utilities over deeply nested Boxes.',
    ],
    accessibility: 'Box renders as a View and inherits all accessibility props. Add accessibilityRole when the box has semantic meaning.',
    relatedComponents: ['stack', 'center', 'container'],
  },

  {
    slug: 'stack',
    name: 'Stack / VStack / HStack',
    description:
      'Flex layout components for arranging children vertically (VStack), horizontally (HStack), or in a configurable direction (Stack).',
    whenToUse: 'Use Stack, VStack, or HStack to arrange children with consistent spacing along a single axis.',
    category: 'Layout',
    importCode: "import { Stack, VStack, HStack } from '@wireservers-ui/react-natives';",
    props: [
      {
        name: 'className',
        type: 'string',
        description: 'NativeWind utility classes to apply to the stack container.',
      },
      {
        name: 'direction',
        type: "'row' | 'column' | 'row-reverse' | 'column-reverse'",
        default: "'column'",
        description: 'The flex direction of the stack (Stack only).',
      },
      {
        name: 'space',
        type: "'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'",
        default: "'none'",
        description: 'The gap between children.',
      },
      {
        name: 'reversed',
        type: 'boolean',
        default: 'false',
        description: 'When true, reverses the order of children.',
      },
    ],
    subComponents: [
      {
        name: 'VStack',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the vertical stack.',
          },
          {
            name: 'space',
            type: "'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'",
            default: "'none'",
            description: 'The gap between children.',
          },
          {
            name: 'reversed',
            type: 'boolean',
            default: 'false',
            description: 'When true, reverses the order of children.',
          },
        ],
      },
      {
        name: 'HStack',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the horizontal stack.',
          },
          {
            name: 'space',
            type: "'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'",
            default: "'none'",
            description: 'The gap between children.',
          },
          {
            name: 'reversed',
            type: 'boolean',
            default: 'false',
            description: 'When true, reverses the order of children.',
          },
        ],
      },
    ],
    bestPractices: [
      'Prefer VStack and HStack over Stack when the direction is fixed for better readability.',
      'Use the space prop for consistent gaps instead of manual margin classes.',
      'Combine with Divider to visually separate stacked items.',
    ],
    accessibility: 'Stack components render as Views. Screen readers will traverse children in DOM order regardless of reversed prop.',
    relatedComponents: ['box', 'center', 'divider'],
  },

  {
    slug: 'center',
    name: 'Center',
    description:
      'A layout component that centers its children both horizontally and vertically.',
    whenToUse: 'Use Center when you need to center content within a container along both axes.',
    category: 'Layout',
    importCode: "import { Center } from '@wireservers-ui/react-natives';",
    props: [
      {
        name: 'className',
        type: 'string',
        description: 'NativeWind utility classes to apply to the center container.',
      },
    ],
    bestPractices: [
      'Use Center for empty states, loading indicators, and hero content.',
      'Set an explicit height or flex when Center is not within a flex parent.',
      'Combine with Box for additional padding and background styling.',
    ],
    accessibility: 'Center renders as a View and is transparent to screen readers. Content within is read in DOM order.',
    relatedComponents: ['box', 'stack'],
  },

  {
    slug: 'aspect-ratio',
    name: 'AspectRatio',
    description:
      'Maintains a consistent width-to-height ratio for its child content.',
    whenToUse: 'Use AspectRatio to enforce a fixed aspect ratio on images, videos, or card previews.',
    category: 'Layout',
    importCode: "import { AspectRatio } from '@wireservers-ui/react-natives';",
    props: [
      {
        name: 'className',
        type: 'string',
        description: 'NativeWind utility classes to apply to the aspect ratio container.',
      },
      {
        name: 'ratio',
        type: 'number',
        default: '1',
        description: 'The width-to-height ratio (e.g. 16/9 for widescreen).',
      },
    ],
    bestPractices: [
      'Use common ratios like 16/9, 4/3, or 1 for consistency across your app.',
      'Wrap images inside AspectRatio to prevent layout shifts during loading.',
      'Ensure the child fills the container with width and height set to 100%.',
    ],
    accessibility: 'AspectRatio is a layout utility and is transparent to screen readers. Ensure child content has appropriate labels.',
    relatedComponents: ['box', 'image'],
  },

  {
    slug: 'pressable',
    name: 'Pressable',
    description:
      'A styled pressable wrapper with built-in press and hover state styles.',
    whenToUse: 'Use Pressable for custom interactive areas that need press feedback but are not standard buttons.',
    category: 'Layout',
    importCode: "import { Pressable } from '@wireservers-ui/react-natives';",
    props: [
      {
        name: 'className',
        type: 'string',
        description: 'NativeWind utility classes to apply to the pressable area.',
      },
      {
        name: 'onPress',
        type: '() => void',
        description: 'Callback invoked when the pressable is pressed.',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'When true, disables the pressable and dims its appearance.',
      },
    ],
    bestPractices: [
      'Use Pressable for custom interactive areas; prefer Button for standard actions.',
      'Provide visual press feedback via NativeWind active/hover classes.',
      'Always include an onPress handler or use accessibilityRole to communicate interactivity.',
    ],
    accessibility: 'Pressable supports accessibilityRole and accessibilityState. Set role="button" for pressable areas that behave like buttons.',
    relatedComponents: ['button', 'icon-button'],
  },

  {
    slug: 'container',
    name: 'Container',
    description:
      'A centered, max-width constrained container for page-level content.',
    whenToUse: 'Use Container to constrain page content to a maximum width and center it horizontally.',
    category: 'Layout',
    importCode: "import { Container } from '@wireservers-ui/react-natives';",
    props: [
      {
        name: 'className',
        type: 'string',
        description: 'NativeWind utility classes to apply to the container.',
      },
      {
        name: 'size',
        type: "'sm' | 'md' | 'lg' | 'xl' | 'full'",
        default: "'lg'",
        description: 'The max-width breakpoint of the container.',
      },
    ],
    bestPractices: [
      'Use Container at the page level to constrain content width on large screens.',
      'Pair with Stack or Box for inner layout composition.',
      'Use the full size variant for full-bleed sections within a constrained page.',
    ],
    accessibility: 'Container is a layout utility and is transparent to screen readers.',
    relatedComponents: ['box', 'stack'],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // Utility
  // ──────────────────────────────────────────────────────────────────────────

  {
    slug: 'portal',
    name: 'Portal',
    description:
      'Renders children into a separate native view outside the parent component tree.',
    whenToUse: 'Use Portal to render modals, tooltips, or overlays that need to escape parent clipping or z-index stacking.',
    category: 'Utility',
    importCode: "import { Portal } from '@wireservers-ui/react-natives';",
    props: [
      {
        name: 'className',
        type: 'string',
        description: 'NativeWind utility classes to apply to the portal wrapper.',
      },
    ],
    bestPractices: [
      'Use Portal for content that must visually escape its parent container.',
      'Avoid using Portal directly — prefer higher-level components like Modal or Popover that use it internally.',
      'Ensure portaled content is properly cleaned up on unmount.',
    ],
    accessibility: 'Portal moves content in the native view hierarchy. Ensure focus management is handled so screen readers can reach portaled content.',
    relatedComponents: ['modal', 'popover', 'menu'],
  },

  {
    slug: 'visually-hidden',
    name: 'VisuallyHidden',
    description:
      'Hides content visually while keeping it accessible to screen readers.',
    whenToUse: 'Use VisuallyHidden to provide screen-reader-only labels, descriptions, or context.',
    category: 'Utility',
    importCode: "import { VisuallyHidden } from '@wireservers-ui/react-natives';",
    props: [
      {
        name: 'className',
        type: 'string',
        description: 'NativeWind utility classes to apply to the hidden wrapper.',
      },
    ],
    bestPractices: [
      'Use VisuallyHidden for labels that provide context only to screen readers.',
      'Prefer accessibilityLabel on interactive elements over wrapping text in VisuallyHidden.',
      'Test with a screen reader to verify the hidden content is announced correctly.',
    ],
    accessibility: 'VisuallyHidden content is hidden from sighted users but fully accessible to screen readers and assistive technologies.',
    relatedComponents: ['text'],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // Data Display (additional)
  // ──────────────────────────────────────────────────────────────────────────

  {
    slug: 'tag',
    name: 'Tag',
    description: 'A compound component for displaying categorized labels with optional icons and close buttons.',
    whenToUse: 'Use Tag to categorize, label, or filter content with small interactive chips.',
    category: 'Data Display',
    importCode: "import { Tag, TagText, TagIcon, TagCloseButton } from '@wireservers-ui/react-natives';",
    props: [
      { name: 'className', type: 'string', description: 'NativeWind utility classes for the tag container.' },
      { name: 'action', type: "'info' | 'success' | 'warning' | 'error'", default: "'info'", description: 'Semantic color action of the tag.' },
      { name: 'variant', type: "'solid' | 'outline' | 'subtle'", default: "'subtle'", description: 'Visual variant of the tag.' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Controls the size of the tag.' },
    ],
    subComponents: [
      { name: 'TagText', props: [{ name: 'className', type: 'string', description: 'NativeWind utility classes for the tag text.' }] },
      { name: 'TagIcon', props: [{ name: 'as', type: 'React.ElementType', required: true, description: 'The icon component to render.' }, { name: 'className', type: 'string', description: 'NativeWind utility classes for the tag icon.' }] },
      { name: 'TagCloseButton', props: [{ name: 'className', type: 'string', description: 'NativeWind utility classes for the close button.' }, { name: 'onPress', type: '() => void', description: 'Callback when close is pressed.' }] },
    ],
    bestPractices: ['Keep tag text short — one or two words.', 'Use semantic action colors to convey meaning.', 'Provide an onPress handler for TagCloseButton when tags are removable.'],
    accessibility: 'Tag text is readable by screen readers. TagCloseButton should have an appropriate accessibility label.',
    relatedComponents: ['badge', 'tags-input'],
  },

  {
    slug: 'skeleton',
    name: 'Skeleton',
    description: 'An animated placeholder that mimics the shape of content while it loads.',
    whenToUse: 'Use Skeleton as a loading placeholder to improve perceived performance while content is being fetched.',
    category: 'Data Display',
    importCode: "import { Skeleton } from '@wireservers-ui/react-natives';",
    props: [
      { name: 'className', type: 'string', description: 'NativeWind utility classes for the skeleton.' },
      { name: 'variant', type: "'text' | 'circular' | 'rectangular'", default: "'rectangular'", description: 'Shape variant of the skeleton.' },
    ],
    bestPractices: ['Match skeleton shapes to the actual content layout.', 'Use multiple skeletons together to create realistic loading states.'],
    accessibility: 'Skeleton is decorative and hidden from screen readers. Use aria-busy on parent containers to indicate loading.',
    relatedComponents: ['spinner', 'progress'],
  },

  {
    slug: 'empty',
    name: 'Empty',
    description: 'A compound component for displaying empty state messages with optional icon, title, description, and action.',
    whenToUse: 'Use Empty when a list, table, or view has no data to display.',
    category: 'Data Display',
    importCode: "import { Empty, EmptyIcon, EmptyTitle, EmptyDescription, EmptyAction } from '@wireservers-ui/react-natives';",
    props: [
      { name: 'className', type: 'string', description: 'NativeWind utility classes for the empty container.' },
    ],
    subComponents: [
      { name: 'EmptyIcon', props: [{ name: 'as', type: 'React.ElementType', description: 'The icon component to render.' }, { name: 'className', type: 'string', description: 'NativeWind utility classes.' }] },
      { name: 'EmptyTitle', props: [{ name: 'className', type: 'string', description: 'NativeWind utility classes.' }] },
      { name: 'EmptyDescription', props: [{ name: 'className', type: 'string', description: 'NativeWind utility classes.' }] },
      { name: 'EmptyAction', props: [{ name: 'className', type: 'string', description: 'NativeWind utility classes.' }] },
    ],
    bestPractices: ['Provide a clear call-to-action to guide users when content is empty.', 'Use an illustrative icon to make empty states feel intentional.'],
    accessibility: 'Empty state content is accessible to screen readers. Ensure action buttons have descriptive labels.',
    relatedComponents: ['text', 'button', 'icon'],
  },

  {
    slug: 'stat',
    name: 'Stat',
    description: 'A compound component for displaying statistics with a label, number, help text, and trend arrow.',
    whenToUse: 'Use Stat to display key metrics, KPIs, or summary numbers in dashboards.',
    category: 'Data Display',
    importCode: "import { Stat, StatLabel, StatNumber, StatHelpText, StatArrow } from '@wireservers-ui/react-natives';",
    props: [
      { name: 'className', type: 'string', description: 'NativeWind utility classes for the stat container.' },
    ],
    subComponents: [
      { name: 'StatLabel', props: [{ name: 'className', type: 'string', description: 'NativeWind utility classes.' }] },
      { name: 'StatNumber', props: [{ name: 'className', type: 'string', description: 'NativeWind utility classes.' }] },
      { name: 'StatHelpText', props: [{ name: 'className', type: 'string', description: 'NativeWind utility classes.' }] },
      { name: 'StatArrow', props: [{ name: 'type', type: "'increase' | 'decrease'", required: true, description: 'Direction of the trend arrow.' }, { name: 'className', type: 'string', description: 'NativeWind utility classes.' }] },
    ],
    bestPractices: ['Pair StatArrow with StatHelpText to show trend context.', 'Use consistent formatting for StatNumber across dashboard cards.'],
    accessibility: 'Stat components are accessible to screen readers. StatArrow includes appropriate labels for trend direction.',
    relatedComponents: ['card', 'text', 'badge'],
  },

  {
    slug: 'kbd',
    name: 'Kbd',
    description:
      'Displays a keyboard shortcut or key combination.',
    whenToUse: 'Use Kbd to render keyboard shortcuts, hotkeys, or key combinations in documentation or help text.',
    category: 'Data Display',
    importCode: "import { Kbd } from '@wireservers-ui/react-natives';",
    props: [
      {
        name: 'className',
        type: 'string',
        description: 'NativeWind utility classes to apply to the keyboard key element.',
      },
    ],
    bestPractices: [
      'Wrap individual keys in separate Kbd elements for multi-key shortcuts (e.g. Kbd+Kbd).',
      'Use Kbd only for actual keyboard keys — not for general inline code.',
      'Combine with Text to provide context around the shortcut.',
    ],
    accessibility: 'Kbd renders with a semantic keyboard role. Screen readers will announce the key text content.',
    relatedComponents: ['code', 'text'],
  },

  {
    slug: 'code',
    name: 'Code / CodeBlock',
    description:
      'Displays inline code snippets or multi-line code blocks.',
    whenToUse: 'Use Code for inline code references and CodeBlock for multi-line code examples.',
    category: 'Data Display',
    importCode: "import { Code, CodeBlock } from '@wireservers-ui/react-natives';",
    props: [
      {
        name: 'className',
        type: 'string',
        description: 'NativeWind utility classes to apply to the code element.',
      },
      {
        name: 'variant',
        type: "'subtle' | 'outline' | 'solid'",
        default: "'subtle'",
        description: 'The visual style variant of the code element.',
      },
    ],
    subComponents: [
      {
        name: 'CodeBlock',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the code block container.',
          },
          {
            name: 'variant',
            type: "'subtle' | 'outline' | 'solid'",
            default: "'subtle'",
            description: 'The visual style variant of the code block.',
          },
        ],
      },
    ],
    bestPractices: [
      'Use Code for inline snippets within text and CodeBlock for multi-line examples.',
      'Use the subtle variant for documentation and solid for emphasis.',
      'Provide a monospace font stack in your theme for consistent code rendering.',
    ],
    accessibility: 'Code content is readable by screen readers. Use accessibilityRole="text" for inline code references.',
    relatedComponents: ['kbd', 'text'],
  },

  {
    slug: 'blockquote',
    name: 'Blockquote',
    description:
      'A styled quotation block with a left border accent.',
    whenToUse: 'Use Blockquote to highlight quoted text, testimonials, or callout content.',
    category: 'Data Display',
    importCode: "import { Blockquote } from '@wireservers-ui/react-natives';",
    props: [
      {
        name: 'className',
        type: 'string',
        description: 'NativeWind utility classes to apply to the blockquote container.',
      },
    ],
    bestPractices: [
      'Use Blockquote for attributed quotes and testimonials.',
      'Pair with Text components for the quote content and attribution.',
      'Keep blockquote content concise for better visual impact.',
    ],
    accessibility: 'Blockquote is rendered with appropriate semantic meaning. Screen readers will announce it as quoted content.',
    relatedComponents: ['text', 'code'],
  },

  {
    slug: 'circular-progress',
    name: 'CircularProgress',
    description:
      'A circular progress indicator showing completion percentage.',
    whenToUse: 'Use CircularProgress to display a visual percentage or completion state in a compact circular form.',
    category: 'Data Display',
    importCode: "import { CircularProgress, CircularProgressLabel } from '@wireservers-ui/react-natives';",
    props: [
      {
        name: 'className',
        type: 'string',
        description: 'NativeWind utility classes to apply to the circular progress container.',
      },
      {
        name: 'value',
        type: 'number',
        required: true,
        description: 'The progress value from 0 to 100.',
      },
      {
        name: 'size',
        type: "'sm' | 'md' | 'lg' | 'xl'",
        default: "'md'",
        description: 'Controls the diameter of the circular progress.',
      },
    ],
    subComponents: [
      {
        name: 'CircularProgressLabel',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the label inside the circle.',
          },
        ],
      },
    ],
    bestPractices: [
      'Always pair with CircularProgressLabel to show the numeric value.',
      'Use semantic colors to indicate positive (green) or warning (yellow) states.',
      'Consider Progress (linear) for space-constrained layouts.',
    ],
    accessibility: 'CircularProgress exposes its value to screen readers via accessibilityValue. Announce progress changes for dynamic updates.',
    relatedComponents: ['progress', 'spinner'],
  },

  {
    slug: 'timeline',
    name: 'Timeline',
    description:
      'Displays a chronological sequence of events with dots and connectors.',
    whenToUse: 'Use Timeline to show a chronological or sequential list of events, activities, or steps.',
    category: 'Data Display',
    importCode: "import { Timeline, TimelineItem, TimelineDot, TimelineConnector, TimelineContent } from '@wireservers-ui/react-natives';",
    props: [
      {
        name: 'className',
        type: 'string',
        description: 'NativeWind utility classes to apply to the timeline container.',
      },
      {
        name: 'variant',
        type: "'solid' | 'outline'",
        default: "'solid'",
        description: 'The visual style of timeline dots.',
      },
    ],
    subComponents: [
      {
        name: 'TimelineItem',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for an individual timeline entry.',
          },
        ],
      },
      {
        name: 'TimelineDot',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the timeline dot indicator.',
          },
        ],
      },
      {
        name: 'TimelineConnector',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the connector line between dots.',
          },
        ],
      },
      {
        name: 'TimelineContent',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the content area of a timeline entry.',
          },
        ],
      },
    ],
    bestPractices: [
      'Order timeline items chronologically — most recent first or last depending on context.',
      'Use TimelineDot color to differentiate event types or statuses.',
      'Keep TimelineContent concise — link to detail views for lengthy content.',
    ],
    accessibility: 'Timeline renders as a list. Screen readers traverse items in DOM order. Provide descriptive text in TimelineContent for each event.',
    relatedComponents: ['stepper', 'list'],
  },

  {
    slug: 'table',
    name: 'Table',
    description:
      'A compound table component for displaying structured tabular data.',
    whenToUse: 'Use Table to present structured data in rows and columns, such as reports, comparisons, or data grids.',
    category: 'Data Display',
    importCode: "import { Table, TableHead, TableBody, TableRow, TableCell, TableHeaderCell, TableCaption } from '@wireservers-ui/react-natives';",
    props: [
      {
        name: 'className',
        type: 'string',
        description: 'NativeWind utility classes to apply to the table container.',
      },
    ],
    subComponents: [
      {
        name: 'TableHead',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the table header section.',
          },
        ],
      },
      {
        name: 'TableBody',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the table body section.',
          },
        ],
      },
      {
        name: 'TableFooter',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the table footer section.',
          },
        ],
      },
      {
        name: 'TableRow',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for a table row.',
          },
        ],
      },
      {
        name: 'TableCell',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for a table data cell.',
          },
        ],
      },
      {
        name: 'TableHeaderCell',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for a table header cell.',
          },
        ],
      },
      {
        name: 'TableCaption',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the table caption.',
          },
        ],
      },
    ],
    bestPractices: [
      'Always include TableHead with TableHeaderCell elements for column labels.',
      'Use TableCaption to provide a summary of the table data for accessibility.',
      'Keep tables responsive — consider Card-based layouts for narrow screens.',
    ],
    accessibility: 'Table uses semantic table roles. Screen readers announce header cells in relation to data cells. Always provide TableCaption for context.',
    relatedComponents: ['list', 'card'],
  },

  {
    slug: 'list',
    name: 'List',
    description:
      'A compound list component for displaying ordered or unordered items.',
    whenToUse: 'Use List to display a series of related items in a structured vertical format.',
    category: 'Data Display',
    importCode: "import { List, ListItem, ListItemText, ListItemDescription, ListItemIcon } from '@wireservers-ui/react-natives';",
    props: [
      {
        name: 'className',
        type: 'string',
        description: 'NativeWind utility classes to apply to the list container.',
      },
      {
        name: 'variant',
        type: "'ordered' | 'unordered'",
        default: "'unordered'",
        description: 'Whether to render numbered (ordered) or bulleted (unordered) items.',
      },
    ],
    subComponents: [
      {
        name: 'ListItem',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for a list item.',
          },
        ],
      },
      {
        name: 'ListItemText',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the list item primary text.',
          },
        ],
      },
      {
        name: 'ListItemDescription',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the list item secondary text.',
          },
        ],
      },
      {
        name: 'ListItemIcon',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the list item icon.',
          },
          {
            name: 'as',
            type: 'React.ElementType',
            required: true,
            description: 'The icon component to render in the list item.',
          },
        ],
      },
    ],
    bestPractices: [
      'Use ordered lists for sequential steps and unordered for general collections.',
      'Include ListItemIcon for visual interest and quick scanning.',
      'Add ListItemDescription for secondary context below the primary text.',
    ],
    accessibility: 'List renders with list semantics. Screen readers announce item count and position. Use meaningful text content for each item.',
    relatedComponents: ['table', 'menu', 'timeline'],
  },

  {
    slug: 'carousel',
    name: 'Carousel',
    description:
      'A swipeable content carousel with navigation controls and indicator dots.',
    whenToUse: 'Use Carousel to showcase multiple pieces of content in a horizontally swipeable container.',
    category: 'Data Display',
    importCode: "import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, CarouselDots } from '@wireservers-ui/react-natives';",
    props: [
      {
        name: 'className',
        type: 'string',
        description: 'NativeWind utility classes to apply to the carousel container.',
      },
      {
        name: 'defaultIndex',
        type: 'number',
        default: '0',
        description: 'The initial slide index to display.',
      },
      {
        name: 'loop',
        type: 'boolean',
        default: 'false',
        description: 'Enable infinite looping. Seamlessly wraps from last to first and vice versa.',
      },
      {
        name: 'itemWidth',
        type: 'number',
        description: 'Fixed width for each item. When set, multiple items are visible at once.',
      },
      {
        name: 'gap',
        type: 'number',
        default: '0',
        description: 'Gap in pixels between carousel items.',
      },
      {
        name: 'autoPlay',
        type: 'boolean',
        default: 'false',
        description: 'Automatically advance slides on an interval.',
      },
      {
        name: 'autoPlayInterval',
        type: 'number',
        default: '3000',
        description: 'Interval in milliseconds between auto-advances.',
      },
      {
        name: 'onIndexChange',
        type: '(index: number) => void',
        description: 'Callback fired when the active slide changes.',
      },
    ],
    subComponents: [
      {
        name: 'CarouselContent',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the scrollable content area.',
          },
        ],
      },
      {
        name: 'CarouselItem',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for an individual carousel slide.',
          },
        ],
      },
      {
        name: 'CarouselPrevious',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the previous navigation button.',
          },
        ],
      },
      {
        name: 'CarouselNext',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the next navigation button.',
          },
        ],
      },
      {
        name: 'CarouselDots',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the dot indicators.',
          },
        ],
      },
    ],
    bestPractices: [
      'Provide CarouselPrevious and CarouselNext buttons for non-touch users.',
      'Use CarouselDots to indicate the total number of slides and current position.',
      'Keep the number of carousel items manageable — consider pagination for large sets.',
    ],
    accessibility: 'Carousel items are navigable via swipe gestures and button controls. Announce slide changes to screen readers with live region updates.',
    relatedComponents: ['tabs', 'pagination'],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // Core Primitives (additional)
  // ──────────────────────────────────────────────────────────────────────────

  {
    slug: 'icon-button',
    name: 'IconButton',
    description:
      'A button designed for icon-only actions without text.',
    whenToUse: 'Use IconButton for toolbar actions, close buttons, or any icon-only interactive element.',
    category: 'Core Primitives',
    importCode: "import { IconButton } from '@wireservers-ui/react-natives';",
    props: [
      {
        name: 'className',
        type: 'string',
        description: 'NativeWind utility classes to apply to the icon button.',
      },
      {
        name: 'icon',
        type: 'React.ComponentType',
        required: true,
        description: 'The icon component to render inside the button.',
      },
      {
        name: 'action',
        type: "'primary' | 'secondary' | 'positive' | 'negative'",
        default: "'primary'",
        description: 'The semantic action color of the button.',
      },
      {
        name: 'variant',
        type: "'solid' | 'outline' | 'link'",
        default: "'solid'",
        description: 'The visual style variant of the button.',
      },
      {
        name: 'size',
        type: "'xs' | 'sm' | 'md' | 'lg'",
        default: "'md'",
        description: 'Controls the size of the icon button.',
      },
      {
        name: 'isDisabled',
        type: 'boolean',
        default: 'false',
        description: 'When true, disables the button and dims its appearance.',
      },
      {
        name: 'onPress',
        type: '() => void',
        description: 'Callback invoked when the button is pressed.',
      },
    ],
    bestPractices: [
      'Always provide an accessibilityLabel since there is no visible text.',
      'Use the outline or link variant for less prominent actions.',
      'Match IconButton size to surrounding components for visual harmony.',
    ],
    accessibility: 'IconButton must have an accessibilityLabel to describe its action since it has no visible text. Supports disabled state announcement.',
    relatedComponents: ['button', 'icon', 'fab'],
  },

  {
    slug: 'toggle',
    name: 'Toggle',
    description:
      'A pressable button that toggles between on and off states.',
    whenToUse: 'Use Toggle for binary state controls like bold/italic formatting, mute/unmute, or any on/off action.',
    category: 'Core Primitives',
    importCode: "import { Toggle } from '@wireservers-ui/react-natives';",
    props: [
      {
        name: 'className',
        type: 'string',
        description: 'NativeWind utility classes to apply to the toggle button.',
      },
      {
        name: 'isPressed',
        type: 'boolean',
        description: 'Controlled pressed state of the toggle.',
      },
      {
        name: 'onPressedChange',
        type: '(pressed: boolean) => void',
        description: 'Callback invoked when the pressed state changes.',
      },
      {
        name: 'variant',
        type: "'outline' | 'solid'",
        default: "'outline'",
        description: 'The visual style variant of the toggle.',
      },
      {
        name: 'size',
        type: "'sm' | 'md' | 'lg'",
        default: "'md'",
        description: 'Controls the size of the toggle button.',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'When true, disables the toggle.',
      },
    ],
    bestPractices: [
      'Use Toggle for binary state actions — prefer Switch for settings-style toggles.',
      'Provide clear visual feedback between pressed and unpressed states.',
      'Group related toggles together with ToggleGroup for mutual exclusion.',
    ],
    accessibility: 'Toggle announces its pressed state to screen readers. Use accessibilityLabel to describe the toggle action.',
    relatedComponents: ['toggle-group', 'switch', 'button'],
  },

  {
    slug: 'toggle-group',
    name: 'ToggleGroup',
    description:
      'A group of toggle buttons where one or multiple can be selected.',
    whenToUse: 'Use ToggleGroup for mutually exclusive or multi-select toggle options like text alignment or view modes.',
    category: 'Core Primitives',
    importCode: "import { ToggleGroup, ToggleGroupItem } from '@wireservers-ui/react-natives';",
    props: [
      {
        name: 'className',
        type: 'string',
        description: 'NativeWind utility classes to apply to the toggle group container.',
      },
      {
        name: 'type',
        type: "'single' | 'multiple'",
        default: "'single'",
        description: 'Whether one or multiple items can be selected.',
      },
      {
        name: 'value',
        type: 'string | string[]',
        description: 'The currently selected value(s).',
      },
      {
        name: 'onValueChange',
        type: '(value: string | string[]) => void',
        description: 'Callback invoked when the selection changes.',
      },
      {
        name: 'variant',
        type: "'outline' | 'solid'",
        default: "'outline'",
        description: 'The visual style variant of the toggle group items.',
      },
      {
        name: 'size',
        type: "'sm' | 'md' | 'lg'",
        default: "'md'",
        description: 'Controls the size of all toggle items in the group.',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'When true, disables all toggle items in the group.',
      },
    ],
    subComponents: [
      {
        name: 'ToggleGroupItem',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for an individual toggle group item.',
          },
          {
            name: 'value',
            type: 'string',
            required: true,
            description: 'The unique value of this toggle item.',
          },
        ],
      },
    ],
    bestPractices: [
      'Use single type for mutually exclusive selections and multiple for multi-select.',
      'Provide a minimum of 2 items for meaningful toggle group usage.',
      'Label each ToggleGroupItem clearly — use icons with accessibilityLabel for icon-only items.',
    ],
    accessibility: 'ToggleGroup uses group semantics. Each item announces its selected state. Use accessibilityLabel on items for icon-only content.',
    relatedComponents: ['toggle', 'segmented-control', 'radio'],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // Disclosure
  // ──────────────────────────────────────────────────────────────────────────

  {
    slug: 'collapsible',
    name: 'Collapsible',
    description:
      'A disclosure component that shows/hides content with a trigger.',
    whenToUse: 'Use Collapsible for toggling visibility of a single section of content, like FAQ answers or expandable details.',
    category: 'Disclosure',
    importCode: "import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@wireservers-ui/react-natives';",
    props: [
      {
        name: 'className',
        type: 'string',
        description: 'NativeWind utility classes to apply to the collapsible container.',
      },
      {
        name: 'isOpen',
        type: 'boolean',
        description: 'Controlled open state of the collapsible.',
      },
      {
        name: 'onOpenChange',
        type: '(open: boolean) => void',
        description: 'Callback invoked when the open state changes.',
      },
      {
        name: 'defaultOpen',
        type: 'boolean',
        default: 'false',
        description: 'The initial open state for uncontrolled usage.',
      },
    ],
    subComponents: [
      {
        name: 'CollapsibleTrigger',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the trigger element.',
          },
        ],
      },
      {
        name: 'CollapsibleContent',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the collapsible content area.',
          },
        ],
      },
    ],
    bestPractices: [
      'Use Collapsible for single expand/collapse sections — prefer Accordion for multiple related sections.',
      'Include a visual indicator (chevron icon) in the trigger to signal expandability.',
      'Animate the content height transition for a polished user experience.',
    ],
    accessibility: 'CollapsibleTrigger sets aria-expanded to communicate state. CollapsibleContent is hidden from screen readers when collapsed.',
    relatedComponents: ['accordion'],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // Feedback & Overlay (additional)
  // ──────────────────────────────────────────────────────────────────────────

  {
    slug: 'overlay',
    name: 'Overlay',
    description:
      'A full-screen semi-transparent backdrop for overlaying content.',
    whenToUse: 'Use Overlay as a backdrop behind modals, drawers, or action sheets to focus user attention.',
    category: 'Feedback & Overlay',
    importCode: "import { Overlay } from '@wireservers-ui/react-natives';",
    props: [
      {
        name: 'className',
        type: 'string',
        description: 'NativeWind utility classes to apply to the overlay backdrop.',
      },
      {
        name: 'isVisible',
        type: 'boolean',
        default: 'false',
        description: 'Controls whether the overlay is displayed.',
      },
      {
        name: 'onPress',
        type: '() => void',
        description: 'Callback invoked when the overlay backdrop is pressed.',
      },
    ],
    bestPractices: [
      'Use Overlay as a building block for custom modal-like components.',
      'Prefer Modal, Drawer, or ActionSheet which include Overlay behavior automatically.',
      'Ensure overlay press dismisses the overlaid content for good UX.',
    ],
    accessibility: 'Overlay traps focus within the overlaid content. The backdrop is hidden from screen readers to avoid confusion.',
    relatedComponents: ['modal', 'drawer', 'actionsheet'],
  },

  {
    slug: 'alert-dialog',
    name: 'AlertDialog',
    description:
      'A modal dialog for important confirmations that requires explicit user action.',
    whenToUse: 'Use AlertDialog for destructive action confirmations, important decisions, or critical information that must be acknowledged.',
    category: 'Feedback & Overlay',
    importCode: "import { AlertDialog, AlertDialogBackdrop, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, AlertDialogCloseButton } from '@wireservers-ui/react-natives';",
    props: [
      {
        name: 'isOpen',
        type: 'boolean',
        required: true,
        description: 'Controls whether the alert dialog is displayed.',
      },
      {
        name: 'onClose',
        type: '() => void',
        required: true,
        description: 'Callback invoked when the dialog is dismissed.',
      },
      {
        name: 'size',
        type: "'xs' | 'sm' | 'md' | 'lg' | 'full'",
        default: "'md'",
        description: 'The width of the alert dialog.',
      },
    ],
    subComponents: [
      {
        name: 'AlertDialogBackdrop',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the backdrop.',
          },
        ],
      },
      {
        name: 'AlertDialogContent',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the dialog content container.',
          },
        ],
      },
      {
        name: 'AlertDialogHeader',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the dialog header.',
          },
        ],
      },
      {
        name: 'AlertDialogBody',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the dialog body.',
          },
        ],
      },
      {
        name: 'AlertDialogFooter',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the dialog footer.',
          },
        ],
      },
      {
        name: 'AlertDialogCloseButton',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the close button.',
          },
        ],
      },
    ],
    bestPractices: [
      'Reserve AlertDialog for destructive or irreversible actions — use Modal for general content.',
      'Always provide a clear cancel action alongside the confirm action.',
      'Use concise, action-oriented text for the dialog title and buttons.',
    ],
    accessibility: 'AlertDialog traps focus and requires explicit dismissal. Screen readers announce the dialog title and content. Escape key dismisses the dialog.',
    relatedComponents: ['modal', 'popover'],
  },

  {
    slug: 'popover',
    name: 'Popover',
    description:
      'A positioned overlay that appears relative to a trigger element.',
    whenToUse: 'Use Popover for contextual information, mini-forms, or secondary actions that appear near a trigger element.',
    category: 'Feedback & Overlay',
    importCode: "import { Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverHeader, PopoverBody, PopoverFooter, PopoverCloseButton } from '@wireservers-ui/react-natives';",
    props: [
      {
        name: 'isOpen',
        type: 'boolean',
        description: 'Controlled open state of the popover.',
      },
      {
        name: 'onOpenChange',
        type: '(open: boolean) => void',
        description: 'Callback invoked when the open state changes.',
      },
      {
        name: 'placement',
        type: "'top' | 'bottom' | 'left' | 'right'",
        default: "'bottom'",
        description: 'The preferred placement of the popover relative to the trigger.',
      },
    ],
    subComponents: [
      {
        name: 'PopoverTrigger',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the trigger wrapper.',
          },
        ],
      },
      {
        name: 'PopoverContent',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the popover content container.',
          },
        ],
      },
      {
        name: 'PopoverArrow',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the arrow element.',
          },
        ],
      },
      {
        name: 'PopoverHeader',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the popover header.',
          },
        ],
      },
      {
        name: 'PopoverBody',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the popover body.',
          },
        ],
      },
      {
        name: 'PopoverFooter',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the popover footer.',
          },
        ],
      },
      {
        name: 'PopoverCloseButton',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the close button.',
          },
        ],
      },
    ],
    bestPractices: [
      'Use Popover for contextual content near a trigger — use Modal for larger or more complex content.',
      'Include PopoverArrow to visually connect the popover to its trigger.',
      'Dismiss on outside click for non-critical popovers.',
    ],
    accessibility: 'Popover manages focus on open and returns focus to the trigger on close. Screen readers announce the popover content when opened.',
    relatedComponents: ['tooltip', 'menu', 'modal'],
  },

  {
    slug: 'snackbar',
    name: 'Snackbar',
    description:
      'A brief notification bar with an optional action button.',
    whenToUse: 'Use Snackbar for brief, non-intrusive messages with an optional undo or retry action.',
    category: 'Feedback & Overlay',
    importCode: "import { Snackbar, SnackbarText, SnackbarActionButton } from '@wireservers-ui/react-natives';",
    props: [
      {
        name: 'className',
        type: 'string',
        description: 'NativeWind utility classes to apply to the snackbar container.',
      },
      {
        name: 'action',
        type: "'info' | 'success' | 'warning' | 'error'",
        default: "'info'",
        description: 'The semantic action color of the snackbar.',
      },
      {
        name: 'isVisible',
        type: 'boolean',
        default: 'false',
        description: 'Controls whether the snackbar is displayed.',
      },
    ],
    subComponents: [
      {
        name: 'SnackbarText',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the snackbar message text.',
          },
        ],
      },
      {
        name: 'SnackbarActionButton',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the snackbar action button.',
          },
          {
            name: 'onPress',
            type: '() => void',
            description: 'Callback invoked when the action button is pressed.',
          },
        ],
      },
    ],
    bestPractices: [
      'Keep snackbar messages short and actionable.',
      'Auto-dismiss after 4-6 seconds unless the snackbar has an action button.',
      'Use Toast for messages that do not require an action; use Snackbar when an action is needed.',
    ],
    accessibility: 'Snackbar is announced as a live region. Screen readers will announce the message text when it appears.',
    relatedComponents: ['toast', 'alert'],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // Navigation (additional)
  // ──────────────────────────────────────────────────────────────────────────

  {
    slug: 'menu',
    name: 'Menu',
    description:
      'A dropdown menu triggered by a button or other element.',
    whenToUse: 'Use Menu for contextual actions, navigation options, or command lists triggered by a button or icon.',
    category: 'Navigation',
    importCode: "import { Menu, MenuTrigger, MenuContent, MenuItem, MenuItemText, MenuSeparator } from '@wireservers-ui/react-natives';",
    props: [
      {
        name: 'className',
        type: 'string',
        description: 'NativeWind utility classes to apply to the menu container.',
      },
      {
        name: 'isOpen',
        type: 'boolean',
        description: 'Controlled open state of the menu.',
      },
      {
        name: 'onOpenChange',
        type: '(open: boolean) => void',
        description: 'Callback invoked when the open state changes.',
      },
    ],
    subComponents: [
      {
        name: 'MenuTrigger',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the menu trigger.',
          },
        ],
      },
      {
        name: 'MenuContent',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the menu content container.',
          },
        ],
      },
      {
        name: 'MenuItem',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for a menu item.',
          },
          {
            name: 'onPress',
            type: '() => void',
            description: 'Callback invoked when the menu item is pressed.',
          },
          {
            name: 'isDisabled',
            type: 'boolean',
            default: 'false',
            description: 'When true, disables the menu item.',
          },
        ],
      },
      {
        name: 'MenuItemText',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the menu item text.',
          },
        ],
      },
      {
        name: 'MenuItemIcon',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the menu item icon.',
          },
          {
            name: 'as',
            type: 'React.ElementType',
            required: true,
            description: 'The icon component to render in the menu item.',
          },
        ],
      },
      {
        name: 'MenuSeparator',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the menu separator.',
          },
        ],
      },
      {
        name: 'MenuGroup',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for a menu group.',
          },
        ],
      },
      {
        name: 'MenuGroupTitle',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the menu group title.',
          },
        ],
      },
    ],
    bestPractices: [
      'Group related menu items with MenuGroup and MenuGroupTitle for scannability.',
      'Use MenuSeparator to visually divide menu sections.',
      'Limit menu items to 7-10 for usability — use nested menus or navigation for larger sets.',
    ],
    accessibility: 'Menu supports keyboard navigation with arrow keys. Items are announced by screen readers. Escape closes the menu and returns focus to the trigger.',
    relatedComponents: ['popover', 'select', 'actionsheet'],
  },

  {
    slug: 'pagination',
    name: 'Pagination',
    description:
      'Navigation controls for paging through content.',
    whenToUse: 'Use Pagination for navigating between pages of content such as search results, tables, or lists.',
    category: 'Navigation',
    importCode: "import { Pagination, PaginationItem, PaginationPrevious, PaginationNext, PaginationEllipsis } from '@wireservers-ui/react-natives';",
    props: [
      {
        name: 'className',
        type: 'string',
        description: 'NativeWind utility classes to apply to the pagination container.',
      },
      {
        name: 'totalPages',
        type: 'number',
        required: true,
        description: 'The total number of pages.',
      },
      {
        name: 'currentPage',
        type: 'number',
        required: true,
        description: 'The currently active page number.',
      },
      {
        name: 'onPageChange',
        type: '(page: number) => void',
        description: 'Callback invoked when a page is selected.',
      },
      {
        name: 'size',
        type: "'sm' | 'md' | 'lg'",
        default: "'md'",
        description: 'Controls the size of pagination controls.',
      },
    ],
    subComponents: [
      {
        name: 'PaginationItem',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for a page number item.',
          },
          {
            name: 'page',
            type: 'number',
            required: true,
            description: 'The page number this item represents.',
          },
        ],
      },
      {
        name: 'PaginationPrevious',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the previous page button.',
          },
          {
            name: 'onPress',
            type: '() => void',
            description: 'Callback invoked when the previous button is pressed.',
          },
        ],
      },
      {
        name: 'PaginationNext',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the next page button.',
          },
          {
            name: 'onPress',
            type: '() => void',
            description: 'Callback invoked when the next button is pressed.',
          },
        ],
      },
      {
        name: 'PaginationEllipsis',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the ellipsis indicator.',
          },
        ],
      },
    ],
    bestPractices: [
      'Use PaginationEllipsis to truncate large page ranges for cleaner display.',
      'Disable PaginationPrevious on the first page and PaginationNext on the last.',
      'Show the current page number clearly with an active visual state.',
    ],
    accessibility: 'Pagination uses nav landmark semantics. Each item has an accessible label indicating its page number. Current page is announced as active.',
    relatedComponents: ['tabs', 'button'],
  },

  {
    slug: 'stepper',
    name: 'Stepper',
    description:
      'A multi-step progress indicator showing completion through sequential steps.',
    whenToUse: 'Use Stepper for multi-step workflows like forms, onboarding wizards, or checkout flows.',
    category: 'Navigation',
    importCode: "import { Stepper, Step, StepIndicator, StepSeparator, StepTitle, StepDescription } from '@wireservers-ui/react-natives';",
    props: [
      {
        name: 'className',
        type: 'string',
        description: 'NativeWind utility classes to apply to the stepper container.',
      },
      {
        name: 'activeStep',
        type: 'number',
        required: true,
        description: 'The index of the currently active step (zero-based).',
      },
      {
        name: 'orientation',
        type: "'horizontal' | 'vertical'",
        default: "'horizontal'",
        description: 'The layout orientation of the stepper.',
      },
    ],
    subComponents: [
      {
        name: 'Step',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for an individual step.',
          },
        ],
      },
      {
        name: 'StepIndicator',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the step number/icon indicator.',
          },
        ],
      },
      {
        name: 'StepSeparator',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the line between steps.',
          },
        ],
      },
      {
        name: 'StepTitle',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the step title text.',
          },
        ],
      },
      {
        name: 'StepDescription',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the step description text.',
          },
        ],
      },
    ],
    bestPractices: [
      'Limit steps to 3-5 for usability — break complex flows into sub-steps.',
      'Show completed steps with a checkmark icon in the StepIndicator.',
      'Use vertical orientation for mobile layouts and horizontal for wider screens.',
    ],
    accessibility: 'Stepper announces the total number of steps and current step position. Each step is labeled with its title and completion status.',
    relatedComponents: ['timeline', 'progress', 'tabs'],
  },

  {
    slug: 'segmented-control',
    name: 'SegmentedControl',
    description:
      'A horizontal set of two or more segments for switching between views.',
    whenToUse: 'Use SegmentedControl for switching between related views or filtering content within the same context.',
    category: 'Navigation',
    importCode: "import { SegmentedControl, SegmentedControlItem } from '@wireservers-ui/react-natives';",
    props: [
      {
        name: 'className',
        type: 'string',
        description: 'NativeWind utility classes to apply to the segmented control container.',
      },
      {
        name: 'value',
        type: 'string',
        required: true,
        description: 'The currently selected segment value.',
      },
      {
        name: 'onValueChange',
        type: '(value: string) => void',
        description: 'Callback invoked when the selected segment changes.',
      },
      {
        name: 'size',
        type: "'sm' | 'md' | 'lg'",
        default: "'md'",
        description: 'Controls the size of the segmented control.',
      },
    ],
    subComponents: [
      {
        name: 'SegmentedControlItem',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for a segment item.',
          },
          {
            name: 'value',
            type: 'string',
            required: true,
            description: 'The unique value of this segment.',
          },
        ],
      },
    ],
    bestPractices: [
      'Limit segments to 2-5 items — use Tabs for more options.',
      'Keep segment labels short (1-2 words) for a clean appearance.',
      'Use SegmentedControl for view switching — use ToggleGroup for multi-select actions.',
    ],
    accessibility: 'SegmentedControl uses tablist semantics. Each segment is a tab with selected/unselected state announced to screen readers.',
    relatedComponents: ['tabs', 'toggle-group', 'radio'],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // Form Controls (additional)
  // ──────────────────────────────────────────────────────────────────────────

  {
    slug: 'number-input',
    name: 'NumberInput',
    description:
      'A numeric input with increment and decrement buttons.',
    whenToUse: 'Use NumberInput for numeric values that benefit from step buttons, like quantities, prices, or settings.',
    category: 'Form Controls',
    importCode: "import { NumberInput, NumberInputField, NumberInputStepper, NumberInputIncrementButton, NumberInputDecrementButton } from '@wireservers-ui/react-natives';",
    props: [
      {
        name: 'className',
        type: 'string',
        description: 'NativeWind utility classes to apply to the number input container.',
      },
      {
        name: 'value',
        type: 'number',
        description: 'The current numeric value.',
      },
      {
        name: 'onChange',
        type: '(value: number) => void',
        description: 'Callback invoked when the value changes.',
      },
      {
        name: 'min',
        type: 'number',
        description: 'The minimum allowed value.',
      },
      {
        name: 'max',
        type: 'number',
        description: 'The maximum allowed value.',
      },
      {
        name: 'step',
        type: 'number',
        default: '1',
        description: 'The increment/decrement step amount.',
      },
      {
        name: 'size',
        type: "'sm' | 'md' | 'lg'",
        default: "'md'",
        description: 'Controls the size of the input and stepper buttons.',
      },
      {
        name: 'isDisabled',
        type: 'boolean',
        default: 'false',
        description: 'When true, disables the input and stepper buttons.',
      },
    ],
    subComponents: [
      {
        name: 'NumberInputField',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the numeric text field.',
          },
          {
            name: 'placeholder',
            type: 'string',
            description: 'Placeholder text for the input field.',
          },
        ],
      },
      {
        name: 'NumberInputStepper',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the stepper container.',
          },
        ],
      },
      {
        name: 'NumberInputIncrementButton',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the increment button.',
          },
        ],
      },
      {
        name: 'NumberInputDecrementButton',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the decrement button.',
          },
        ],
      },
    ],
    bestPractices: [
      'Set min and max bounds to prevent invalid values.',
      'Use an appropriate step value — 1 for integers, 0.1 for decimals.',
      'Wrap with FormControl for label and validation support.',
    ],
    accessibility: 'NumberInput supports keyboard increment/decrement with arrow keys. The value is announced to screen readers on change.',
    relatedComponents: ['input', 'slider'],
  },

  {
    slug: 'password-input',
    name: 'PasswordInput',
    description:
      'A text input with a visibility toggle for password entry.',
    whenToUse: 'Use PasswordInput for password fields where users need the option to reveal what they typed.',
    category: 'Form Controls',
    importCode: "import { PasswordInput, PasswordInputField, PasswordInputToggle } from '@wireservers-ui/react-natives';",
    props: [
      {
        name: 'className',
        type: 'string',
        description: 'NativeWind utility classes to apply to the password input container.',
      },
      {
        name: 'size',
        type: "'sm' | 'md' | 'lg'",
        default: "'md'",
        description: 'Controls the size of the input.',
      },
      {
        name: 'isDisabled',
        type: 'boolean',
        default: 'false',
        description: 'When true, disables the input.',
      },
    ],
    subComponents: [
      {
        name: 'PasswordInputField',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the password text field.',
          },
          {
            name: 'placeholder',
            type: 'string',
            description: 'Placeholder text for the input field.',
          },
        ],
      },
      {
        name: 'PasswordInputToggle',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the visibility toggle button.',
          },
        ],
      },
    ],
    bestPractices: [
      'Always include PasswordInputToggle for usability on mobile devices.',
      'Wrap with FormControl for label and validation messaging.',
      'Use secureTextEntry internally — do not rely solely on masking characters.',
    ],
    accessibility: 'PasswordInputToggle announces whether the password is visible or hidden. The field uses secureTextEntry for privacy.',
    relatedComponents: ['input', 'form-control'],
  },

  {
    slug: 'search-input',
    name: 'SearchInput',
    description:
      'A text input with a search icon and clear button for search functionality.',
    whenToUse: 'Use SearchInput for search fields where users need a clear visual indicator of the search action.',
    category: 'Form Controls',
    importCode: "import { SearchInput, SearchInputField, SearchInputIcon, SearchInputClearButton } from '@wireservers-ui/react-natives';",
    props: [
      {
        name: 'className',
        type: 'string',
        description: 'NativeWind utility classes to apply to the search input container.',
      },
      {
        name: 'value',
        type: 'string',
        description: 'The current search text value.',
      },
      {
        name: 'onChangeText',
        type: '(text: string) => void',
        description: 'Callback invoked when the text changes.',
      },
      {
        name: 'size',
        type: "'sm' | 'md' | 'lg'",
        default: "'md'",
        description: 'Controls the size of the search input.',
      },
      {
        name: 'isDisabled',
        type: 'boolean',
        default: 'false',
        description: 'When true, disables the search input.',
      },
    ],
    subComponents: [
      {
        name: 'SearchInputField',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the search text field.',
          },
          {
            name: 'placeholder',
            type: 'string',
            description: 'Placeholder text for the search field.',
          },
        ],
      },
      {
        name: 'SearchInputIcon',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the search icon.',
          },
          {
            name: 'as',
            type: 'React.ElementType',
            description: 'The icon component to render as the search icon.',
          },
        ],
      },
      {
        name: 'SearchInputClearButton',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the clear button.',
          },
          {
            name: 'onPress',
            type: '() => void',
            description: 'Callback invoked when the clear button is pressed.',
          },
        ],
      },
    ],
    bestPractices: [
      'Show SearchInputClearButton only when the input has a value.',
      'Debounce onChangeText for search-as-you-type to avoid excessive queries.',
      'Use a descriptive placeholder like "Search products..." for context.',
    ],
    accessibility: 'SearchInput uses the search role for screen readers. The clear button announces "Clear search" when focused.',
    relatedComponents: ['input', 'select'],
  },

  {
    slug: 'rating',
    name: 'Rating',
    description:
      'An interactive star rating component for collecting user feedback.',
    whenToUse: 'Use Rating for collecting user reviews, feedback scores, or satisfaction ratings.',
    category: 'Form Controls',
    importCode: "import { Rating, RatingIcon } from '@wireservers-ui/react-natives';",
    props: [
      {
        name: 'className',
        type: 'string',
        description: 'NativeWind utility classes to apply to the rating container.',
      },
      {
        name: 'value',
        type: 'number',
        description: 'The current rating value.',
      },
      {
        name: 'onChange',
        type: '(value: number) => void',
        description: 'Callback invoked when the rating value changes.',
      },
      {
        name: 'max',
        type: 'number',
        default: '5',
        description: 'The maximum number of rating icons.',
      },
      {
        name: 'size',
        type: "'sm' | 'md' | 'lg' | 'xl'",
        default: "'md'",
        description: 'Controls the size of the rating icons.',
      },
      {
        name: 'isReadOnly',
        type: 'boolean',
        default: 'false',
        description: 'When true, the rating is display-only and not interactive.',
      },
    ],
    subComponents: [
      {
        name: 'RatingIcon',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for a rating icon.',
          },
          {
            name: 'filledIcon',
            type: 'React.ElementType',
            description: 'The icon component to render when the rating position is filled.',
          },
          {
            name: 'emptyIcon',
            type: 'React.ElementType',
            description: 'The icon component to render when the rating position is empty.',
          },
        ],
      },
    ],
    bestPractices: [
      'Use isReadOnly for display-only ratings in product listings or reviews.',
      'Provide visual distinction between filled and empty icons for clarity.',
      'Use a 5-star scale for familiarity unless domain conventions differ.',
    ],
    accessibility: 'Rating announces the current value and maximum to screen readers (e.g., "3 out of 5 stars"). Interactive mode supports touch and keyboard selection.',
    relatedComponents: ['slider', 'icon'],
  },

  {
    slug: 'tags-input',
    name: 'TagsInput',
    description:
      'A text input that produces tag chips, useful for entering multiple values.',
    whenToUse: 'Use TagsInput for entering multiple values like tags, categories, or email addresses.',
    category: 'Form Controls',
    importCode: "import { TagsInput, TagsInputField, TagsInputTag, TagsInputTagText, TagsInputTagCloseButton } from '@wireservers-ui/react-natives';",
    props: [
      {
        name: 'className',
        type: 'string',
        description: 'NativeWind utility classes to apply to the tags input container.',
      },
      {
        name: 'value',
        type: 'string[]',
        description: 'The current array of tag values.',
      },
      {
        name: 'onValueChange',
        type: '(values: string[]) => void',
        description: 'Callback invoked when the tag array changes.',
      },
      {
        name: 'size',
        type: "'sm' | 'md' | 'lg'",
        default: "'md'",
        description: 'Controls the size of the input and tags.',
      },
      {
        name: 'isDisabled',
        type: 'boolean',
        default: 'false',
        description: 'When true, disables the input and tag removal.',
      },
    ],
    subComponents: [
      {
        name: 'TagsInputField',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the text input field.',
          },
          {
            name: 'placeholder',
            type: 'string',
            description: 'Placeholder text for the input field.',
          },
        ],
      },
      {
        name: 'TagsInputTag',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for an individual tag chip.',
          },
        ],
      },
      {
        name: 'TagsInputTagText',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the tag text.',
          },
        ],
      },
      {
        name: 'TagsInputTagCloseButton',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the tag close button.',
          },
          {
            name: 'onPress',
            type: '() => void',
            description: 'Callback invoked when the tag close button is pressed.',
          },
        ],
      },
    ],
    bestPractices: [
      'Validate tag input to prevent duplicates and enforce formatting rules.',
      'Support backspace to delete the last tag for keyboard users.',
      'Show a maximum tag count or character limit when applicable.',
    ],
    accessibility: 'Tags are announced individually with their text and a "remove" action. The input announces the current tag count.',
    relatedComponents: ['tag', 'input', 'badge'],
  },


  {
    slug: 'date-picker',
    name: 'DatePicker',
    description:
      'A date selection component with a trigger input and calendar content.',
    whenToUse: 'Use DatePicker for selecting specific dates in forms, filters, or scheduling interfaces.',
    category: 'Form Controls',
    importCode: "import { DatePicker, DatePickerTrigger, DatePickerInput, DatePickerContent } from '@wireservers-ui/react-natives';",
    props: [
      {
        name: 'className',
        type: 'string',
        description: 'NativeWind utility classes to apply to the date picker container.',
      },
      {
        name: 'value',
        type: 'Date',
        description: 'The currently selected date.',
      },
      {
        name: 'onChange',
        type: '(date: Date) => void',
        description: 'Callback invoked when a date is selected.',
      },
      {
        name: 'isOpen',
        type: 'boolean',
        description: 'Controlled open state of the date picker.',
      },
      {
        name: 'onOpenChange',
        type: '(open: boolean) => void',
        description: 'Callback invoked when the open state changes.',
      },
    ],
    subComponents: [
      {
        name: 'DatePickerTrigger',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the trigger wrapper.',
          },
        ],
      },
      {
        name: 'DatePickerInput',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the date input field.',
          },
          {
            name: 'placeholder',
            type: 'string',
            description: 'Placeholder text for the date input.',
          },
          {
            name: 'format',
            type: 'string',
            description: 'The date format string (e.g. "MM/dd/yyyy").',
          },
        ],
      },
      {
        name: 'DatePickerContent',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the calendar content area.',
          },
        ],
      },
    ],
    bestPractices: [
      'Provide a clear date format hint in the placeholder or label.',
      'Allow manual text entry in addition to calendar selection for accessibility.',
      'Set sensible min/max date bounds to prevent invalid selections.',
    ],
    accessibility: 'DatePicker supports keyboard navigation through the calendar grid. The selected date is announced to screen readers. Arrow keys navigate between days.',
    relatedComponents: ['calendar', 'input', 'popover'],
  },

  {
    slug: 'pin-input',
    name: 'PinInput',
    description:
      'A multi-field input for entering PIN codes or OTP verification codes.',
    whenToUse: 'Use PinInput for OTP verification, PIN entry, or any fixed-length code input.',
    category: 'Form Controls',
    importCode: "import { PinInput, PinInputField } from '@wireservers-ui/react-natives';",
    props: [
      {
        name: 'className',
        type: 'string',
        description: 'NativeWind utility classes to apply to the pin input container.',
      },
      {
        name: 'length',
        type: 'number',
        default: '4',
        description: 'The number of input fields to render.',
      },
      {
        name: 'value',
        type: 'string',
        description: 'The current pin value.',
      },
      {
        name: 'onChange',
        type: '(value: string) => void',
        description: 'Callback invoked when the pin value changes.',
      },
      {
        name: 'size',
        type: "'sm' | 'md' | 'lg'",
        default: "'md'",
        description: 'Controls the size of the pin input fields.',
      },
      {
        name: 'isDisabled',
        type: 'boolean',
        default: 'false',
        description: 'When true, disables all pin input fields.',
      },
    ],
    subComponents: [
      {
        name: 'PinInputField',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for an individual pin field.',
          },
          {
            name: 'index',
            type: 'number',
            required: true,
            description: 'The zero-based index of this pin field.',
          },
        ],
      },
    ],
    bestPractices: [
      'Auto-focus the next field as the user types each character.',
      'Support paste to fill all fields at once from clipboard.',
      'Use secureTextEntry for sensitive codes like banking PINs.',
    ],
    accessibility: 'PinInput announces field position (e.g., "digit 1 of 4"). Focus automatically moves between fields. Backspace moves to the previous field.',
    relatedComponents: ['input', 'form-control'],
  },

  {
    slug: 'color-picker',
    name: 'ColorPicker',
    description:
      'A color selection component with swatches, preview, and hex input.',
    whenToUse: 'Use ColorPicker for selecting colors in theme editors, design tools, or customization interfaces.',
    category: 'Form Controls',
    importCode: "import { ColorPicker, ColorPickerTrigger, ColorPickerContent, ColorPickerBox, ColorPickerSlider, ColorPickerSwatch, ColorPickerInput } from '@wireservers-ui/react-natives';",
    props: [
      {
        name: 'className',
        type: 'string',
        description: 'NativeWind utility classes to apply to the color picker container.',
      },
      {
        name: 'value',
        type: 'string',
        description: 'The currently selected color value (hex string).',
      },
      {
        name: 'onChange',
        type: '(color: string) => void',
        description: 'Callback invoked when a color is selected.',
      },
      {
        name: 'defaultValue',
        type: 'string',
        description: 'The initial color value for uncontrolled usage.',
      },
    ],
    subComponents: [
      {
        name: 'ColorPickerTrigger',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the trigger button.',
          },
        ],
      },
      {
        name: 'ColorPickerContent',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the color picker content area.',
          },
        ],
      },
      {
        name: 'ColorPickerSwatch',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for a color swatch.',
          },
          {
            name: 'color',
            type: 'string',
            required: true,
            description: 'The hex color value this swatch represents.',
          },
        ],
      },
      {
        name: 'ColorPickerBox',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the color box.',
          },
          {
            name: 'size',
            type: 'number',
            description: 'Size of the saturation-value square in pixels. Default: 200.',
          },
        ],
      },
      {
        name: 'ColorPickerSlider',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the hue slider.',
          },
          {
            name: 'height',
            type: 'number',
            description: 'Height of the hue slider in pixels. Default: 200.',
          },
          {
            name: 'width',
            type: 'number',
            description: 'Width of the hue slider in pixels. Default: 24.',
          },
        ],
      },
      {
        name: 'ColorPickerInput',
        props: [
          {
            name: 'className',
            type: 'string',
            description: 'NativeWind utility classes for the hex input field.',
          },
        ],
      },
    ],
    bestPractices: [
      'Provide preset swatches for commonly used colors in your design system.',
      'Validate hex input to prevent invalid color values.',
      'Show a live preview of the selected color in the trigger.',
    ],
    accessibility: 'ColorPicker swatches announce their color name. The hex input accepts typed values. The trigger displays the current color with an accessible label.',
    relatedComponents: ['input', 'popover'],
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
  'Layout',
  'Form Controls',
  'Feedback & Overlay',
  'Navigation',
  'Data Display',
  'Disclosure',
  'Utility',
];

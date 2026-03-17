# @wireservers-ui/react-natives

70+ production-ready React Native components — TypeScript-first, themeable, accessible.

Built with [NativeWind](https://www.nativewind.dev/) and [Tailwind Variants](https://www.tailwind-variants.org/).

## Installation

```bash
npm install @wireservers-ui/react-natives
```

### Peer Dependencies

Make sure you have the following installed in your project:

```bash
npm install nativewind tailwind-variants react-native-reanimated react-native-gesture-handler react-native-svg
```

`react-native-reanimated`, `react-native-gesture-handler`, and `react-native-svg` are optional — only needed if you use components that depend on them.

## Setup

Add the preset to your `tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    // ...your other content paths
  ],
  presets: [require("@wireservers-ui/react-natives/tailwind-preset")],
};
```

The preset includes the NativeWind preset, the full color/theme system, and automatic content scanning of the component library — no additional configuration needed.

### Theme Variables

Components use CSS variables for theming. Define them in your global CSS to customize colors:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --color-primary-500: 80 70 230;
  --color-background-0: 255 255 255;
  --color-typography-900: 23 23 23;
  /* ... */
}

.dark {
  --color-primary-500: 120 110 255;
  --color-background-0: 24 23 25;
  --color-typography-900: 245 245 245;
  /* ... */
}
```

## Usage

```tsx
import { Button, ButtonText } from "@wireservers-ui/react-natives";

export function MyComponent() {
  return (
    <Button action="primary" variant="solid" size="md">
      <ButtonText>Get Started</ButtonText>
    </Button>
  );
}
```

## Components

Includes 70+ components across these categories:

**Core** — Text, Heading, Icon, Divider, Badge, Spinner, Image, Avatar, Card, Button, Kbd, Code, Blockquote

**Form Controls** — Input, Textarea, Switch, Checkbox, Radio, Slider, Select, FormControl, NumberInput, PasswordInput, SearchInput, Rating, TagsInput, DatePicker, PinInput, ColorPicker

**Feedback & Overlay** — Alert, Progress, CircularProgress, Modal, Toast, Tooltip, Drawer, ActionSheet, AlertDialog, Popover, Snackbar, Overlay

**Navigation** — Tabs, Accordion, Breadcrumb, Menu, Pagination, Stepper, SegmentedControl, Fab, Link

**Data Display** — Tag, Skeleton, Empty, Stat, Table, List, Timeline, Carousel

**Layout** — Box, Stack (VStack, HStack), Center, AspectRatio, Container, Pressable, Portal, VisuallyHidden

**Interactive** — Toggle, ToggleGroup, Collapsible, Calendar

## License

MIT

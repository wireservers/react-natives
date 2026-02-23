import React from "react";
import { ScrollView, Text as RNText, View } from "react-native";
import {
  Text,
  Heading,
  Icon,
  Divider,
  Badge,
  BadgeText,
  BadgeIcon,
  Spinner,
  Image,
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  AvatarBadge,
  AvatarGroup,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  ButtonText,
} from "@wireservers-ui/components";

function SectionTitle({ children }: { children: string }) {
  return (
    <RNText className="text-xl font-bold text-typography-900 mb-1">
      {children}
    </RNText>
  );
}

export default function PrimitivesScreen() {
  return (
    <ScrollView
      className="flex-1 bg-background-0"
      contentContainerClassName="p-6 gap-8 pb-24"
    >
      {/* ── Text ── */}
      <View className="gap-3">
        <SectionTitle>Text</SectionTitle>

        <Text size="sm">Small text (sm)</Text>
        <Text size="md">Medium text (md)</Text>
        <Text size="lg">Large text (lg)</Text>
        <Text size="xl">Extra-large text (xl)</Text>
        <Text size="2xl">2XL text</Text>

        <Text bold>Bold text</Text>
        <Text italic>Italic text</Text>
        <Text isTruncated className="w-48">
          This is a very long piece of text that should be truncated when it
          exceeds the available width of its container.
        </Text>
      </View>

      {/* ── Heading ── */}
      <View className="gap-3">
        <SectionTitle>Heading</SectionTitle>

        <Heading size="xs">Heading xs</Heading>
        <Heading size="sm">Heading sm</Heading>
        <Heading size="md">Heading md</Heading>
        <Heading size="lg">Heading lg</Heading>
        <Heading size="xl">Heading xl</Heading>
      </View>

      {/* ── Icon ── */}
      <View className="gap-3">
        <SectionTitle>Icon</SectionTitle>

        <View className="flex-row items-center gap-4">
          <Icon
            as={() => (
              <View className="w-4 h-4 rounded bg-primary-500" />
            )}
            size="sm"
          />
          <Icon
            as={() => (
              <View className="w-6 h-6 rounded bg-secondary-500" />
            )}
            size="md"
          />
          <Icon
            as={() => (
              <View className="w-8 h-8 rounded bg-error-500" />
            )}
            size="lg"
          />
        </View>
        <RNText className="text-sm text-typography-500">
          Placeholder boxes shown — swap with real icon components via the `as`
          prop.
        </RNText>
      </View>

      {/* ── Divider ── */}
      <View className="gap-3">
        <SectionTitle>Divider</SectionTitle>

        <RNText className="text-sm text-typography-600">Horizontal</RNText>
        <Divider orientation="horizontal" />

        <RNText className="text-sm text-typography-600">Vertical</RNText>
        <View className="flex-row items-center gap-3 h-10">
          <RNText className="text-typography-700">Left</RNText>
          <Divider orientation="vertical" />
          <RNText className="text-typography-700">Right</RNText>
        </View>
      </View>

      {/* ── Badge ── */}
      <View className="gap-3">
        <SectionTitle>Badge</SectionTitle>

        <RNText className="text-sm text-typography-600">Actions</RNText>
        <View className="flex-row flex-wrap gap-2">
          <Badge action="primary">
            <BadgeText>Primary</BadgeText>
          </Badge>
          <Badge action="secondary">
            <BadgeText>Secondary</BadgeText>
          </Badge>
          <Badge action="error">
            <BadgeText>Error</BadgeText>
          </Badge>
          <Badge action="success">
            <BadgeText>Success</BadgeText>
          </Badge>
          <Badge action="warning">
            <BadgeText>Warning</BadgeText>
          </Badge>
        </View>

        <RNText className="text-sm text-typography-600">Variants</RNText>
        <View className="flex-row flex-wrap gap-2">
          <Badge variant="solid" action="primary">
            <BadgeText>Solid</BadgeText>
          </Badge>
          <Badge variant="outline" action="primary">
            <BadgeText>Outline</BadgeText>
          </Badge>
          <Badge variant="subtle" action="primary">
            <BadgeText>Subtle</BadgeText>
          </Badge>
        </View>

        <RNText className="text-sm text-typography-600">Sizes</RNText>
        <View className="flex-row flex-wrap items-center gap-2">
          <Badge size="sm" action="success">
            <BadgeText>Small</BadgeText>
          </Badge>
          <Badge size="md" action="success">
            <BadgeText>Medium</BadgeText>
          </Badge>
          <Badge size="lg" action="success">
            <BadgeText>Large</BadgeText>
          </Badge>
        </View>
      </View>

      {/* ── Spinner ── */}
      <View className="gap-3">
        <SectionTitle>Spinner</SectionTitle>

        <View className="flex-row items-center gap-6">
          <View className="items-center gap-1">
            <Spinner size="small" />
            <RNText className="text-xs text-typography-500">Small</RNText>
          </View>
          <View className="items-center gap-1">
            <Spinner size="large" />
            <RNText className="text-xs text-typography-500">Large</RNText>
          </View>
        </View>
      </View>

      {/* ── Image ── */}
      <View className="gap-3">
        <SectionTitle>Image</SectionTitle>

        <View className="flex-row items-end gap-4">
          <Image
            source={{ uri: "https://picsum.photos/200" }}
            alt="Placeholder small"
            size="xs"
          />
          <Image
            source={{ uri: "https://picsum.photos/200" }}
            alt="Placeholder medium"
            size="sm"
          />
          <Image
            source={{ uri: "https://picsum.photos/200" }}
            alt="Placeholder large"
            size="md"
          />
        </View>
      </View>

      {/* ── Avatar ── */}
      <View className="gap-3">
        <SectionTitle>Avatar</SectionTitle>

        <RNText className="text-sm text-typography-600">
          With fallback text
        </RNText>
        <View className="flex-row items-center gap-3">
          <Avatar size="sm">
            <AvatarFallbackText>Jane Doe</AvatarFallbackText>
          </Avatar>
          <Avatar size="md">
            <AvatarFallbackText>John Smith</AvatarFallbackText>
          </Avatar>
          <Avatar size="lg">
            <AvatarFallbackText>Alice B</AvatarFallbackText>
          </Avatar>
        </View>

        <RNText className="text-sm text-typography-600">With image</RNText>
        <Avatar size="lg">
          <AvatarFallbackText>TC</AvatarFallbackText>
          <AvatarImage source={{ uri: "https://picsum.photos/200" }} />
          <AvatarBadge />
        </Avatar>

        <RNText className="text-sm text-typography-600">Avatar group</RNText>
        <AvatarGroup max={3}>
          <Avatar size="md">
            <AvatarFallbackText>AB</AvatarFallbackText>
          </Avatar>
          <Avatar size="md">
            <AvatarFallbackText>CD</AvatarFallbackText>
          </Avatar>
          <Avatar size="md">
            <AvatarFallbackText>EF</AvatarFallbackText>
          </Avatar>
          <Avatar size="md">
            <AvatarFallbackText>GH</AvatarFallbackText>
          </Avatar>
          <Avatar size="md">
            <AvatarFallbackText>IJ</AvatarFallbackText>
          </Avatar>
        </AvatarGroup>
      </View>

      {/* ── Card ── */}
      <View className="gap-3">
        <SectionTitle>Card</SectionTitle>

        <Card variant="elevated">
          <CardHeader>
            <Heading size="sm">Elevated Card</Heading>
          </CardHeader>
          <CardBody>
            <Text size="sm">
              This card uses the elevated variant with a subtle shadow.
            </Text>
          </CardBody>
          <CardFooter>
            <Text size="xs">Footer content</Text>
          </CardFooter>
        </Card>

        <Card variant="outline">
          <CardHeader>
            <Heading size="sm">Outline Card</Heading>
          </CardHeader>
          <CardBody>
            <Text size="sm">
              This card uses the outline variant with a visible border.
            </Text>
          </CardBody>
        </Card>

        <Card variant="ghost">
          <CardHeader>
            <Heading size="sm">Ghost Card</Heading>
          </CardHeader>
          <CardBody>
            <Text size="sm">
              This card uses the ghost variant with no border or shadow.
            </Text>
          </CardBody>
        </Card>

        <Card variant="filled">
          <CardHeader>
            <Heading size="sm">Filled Card</Heading>
          </CardHeader>
          <CardBody>
            <Text size="sm">
              This card uses the filled variant with a background color.
            </Text>
          </CardBody>
        </Card>
      </View>

      {/* ── Button ── */}
      <View className="gap-3">
        <SectionTitle>Button</SectionTitle>

        <RNText className="text-sm text-typography-600">Actions</RNText>
        <View className="flex-row flex-wrap gap-2">
          <Button action="primary">
            <ButtonText>Primary</ButtonText>
          </Button>
          <Button action="secondary">
            <ButtonText>Secondary</ButtonText>
          </Button>
          <Button action="positive">
            <ButtonText>Positive</ButtonText>
          </Button>
          <Button action="negative">
            <ButtonText>Negative</ButtonText>
          </Button>
        </View>

        <RNText className="text-sm text-typography-600">Variants</RNText>
        <View className="flex-row flex-wrap gap-2">
          <Button variant="solid" action="primary">
            <ButtonText>Solid</ButtonText>
          </Button>
          <Button variant="outline" action="primary">
            <ButtonText>Outline</ButtonText>
          </Button>
          <Button variant="link" action="primary">
            <ButtonText>Link</ButtonText>
          </Button>
        </View>

        <RNText className="text-sm text-typography-600">Sizes</RNText>
        <View className="flex-row flex-wrap items-center gap-2">
          <Button size="xs">
            <ButtonText>XS</ButtonText>
          </Button>
          <Button size="sm">
            <ButtonText>SM</ButtonText>
          </Button>
          <Button size="md">
            <ButtonText>MD</ButtonText>
          </Button>
          <Button size="lg">
            <ButtonText>LG</ButtonText>
          </Button>
          <Button size="xl">
            <ButtonText>XL</ButtonText>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}

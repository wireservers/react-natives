import { View, Text, ScrollView } from 'react-native';
import { Button, ButtonText } from '@wireservers-ui/components';
import { Card, FAB } from 'react-native-paper';
import { useState } from 'react';

export default function HomeScreen() {
  const [count, setCount] = useState(0);

  return (
    <View className="flex-1 bg-background-0">
      <ScrollView contentContainerClassName="p-6 gap-8 pb-24">
        {/* NativeWind Section */}
        <View className="gap-3">
          <Text className="text-2xl font-bold text-typography-900">
            NativeWind (Tailwind CSS)
          </Text>
          <View className="rounded-xl bg-primary-100 p-4 gap-2">
            <Text className="text-lg font-semibold text-primary-800">
              Styled with Tailwind utilities
            </Text>
            <Text className="text-sm text-primary-600">
              This card uses NativeWind className props for styling: rounded
              corners, padding, colors, and spacing — all from Tailwind.
            </Text>
          </View>
        </View>

        {/* Button Section */}
        <View className="gap-3">
          <Text className="text-2xl font-bold text-typography-900">
            Button
          </Text>
          <View className="gap-3">
            <Button action="primary" size="lg" onPress={() => setCount((c) => c + 1)}>
              <ButtonText>Count: {count}</ButtonText>
            </Button>
            <View className="flex-row gap-3">
              <Button action="secondary" variant="outline" className="flex-1">
                <ButtonText>Secondary</ButtonText>
              </Button>
              <Button action="positive" className="flex-1">
                <ButtonText>Positive</ButtonText>
              </Button>
              <Button action="negative" variant="outline" className="flex-1">
                <ButtonText>Negative</ButtonText>
              </Button>
            </View>
          </View>
        </View>

        {/* React Native Paper Section */}
        <View className="gap-3">
          <Text className="text-2xl font-bold text-typography-900">
            React Native Paper
          </Text>
          <Card>
            <Card.Title title="Paper Card" subtitle="Material Design 3" />
            <Card.Content>
              <Text className="text-sm text-typography-700">
                This card is rendered by React Native Paper, following Material
                Design 3 guidelines. Paper provides ready-made MD3 components.
              </Text>
            </Card.Content>
            <Card.Actions>
              <Button action="primary" variant="link" size="sm">
                <ButtonText>Learn More</ButtonText>
              </Button>
            </Card.Actions>
          </Card>
        </View>
      </ScrollView>

      <FAB
        icon="plus"
        className="absolute bottom-6 right-6"
        onPress={() => setCount((c) => c + 1)}
      />
    </View>
  );
}

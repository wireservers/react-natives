import { View, Text, ScrollView } from 'react-native';
import { List, Divider } from 'react-native-paper';

export default function ExploreScreen() {
  return (
    <View className="flex-1 bg-background-0">
      <ScrollView contentContainerClassName="p-6 gap-6">
        <Text className="text-2xl font-bold text-typography-900">
          Tech Stack
        </Text>
        <Text className="text-sm text-typography-600">
          This app is built with the following libraries working together:
        </Text>

        <View className="rounded-xl bg-background-50 overflow-hidden">
          <List.Item
            title="Expo Router"
            description="File-based routing for React Native"
            left={(props) => <List.Icon {...props} icon="routes" />}
          />
          <Divider />
          <List.Item
            title="NativeWind"
            description="Tailwind CSS utility classes for React Native"
            left={(props) => <List.Icon {...props} icon="palette" />}
          />
          <Divider />
          <List.Item
            title="Tailwind Variants"
            description="Component styling with variant-based composition"
            left={(props) => <List.Icon {...props} icon="puzzle" />}
          />
          <Divider />
          <List.Item
            title="React Native Paper"
            description="Material Design 3 component library"
            left={(props) => <List.Icon {...props} icon="google" />}
          />
          <Divider />
          <List.Item
            title="React Native Web"
            description="Run this app in the browser"
            left={(props) => <List.Icon {...props} icon="web" />}
          />
        </View>
      </ScrollView>
    </View>
  );
}

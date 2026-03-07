import React from 'react';
import { View } from 'react-native';
import { ExampleSection } from '../example-section';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, CarouselDots, Box, Text } from '@wireservers-ui/react-natives';
import { useExampleCode } from '../example-code-context';

const colors = ['bg-primary-100', 'bg-success-100', 'bg-warning-100', 'bg-error-100'];

const categories = [
  { name: 'Diabetic', count: 156, color: '#10B981', icon: '💉' },
  { name: 'Heart Healthy', count: 134, color: '#EF4444', icon: '❤️' },
  { name: 'DASH', count: 82, color: '#8B5CF6', icon: '🍽️' },
  { name: 'Renal', count: 45, color: '#F97316', icon: '🫘' },
  { name: 'Low Sodium', count: 98, color: '#3B82F6', icon: 'ℹ️' },
  { name: 'Anti-Inflammatory', count: 48, color: '#EAB308', icon: '🧬' },
  { name: 'Low FODMAP', count: 67, color: '#14B8A6', icon: '🥗' },
  { name: 'Celiac', count: 89, color: '#22C55E', icon: '🌾' },
  { name: 'Cardiac Rehab', count: 56, color: '#F43F5E', icon: '🫀' },
];

export default function CarouselExamples() {
  useExampleCode(`import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, Box, Text } from '@wireservers-ui/react-natives';
import { View } from 'react-native';

export default function Example() {
  return (
    <Carousel loop itemWidth={120} gap={12} autoPlay autoPlayInterval={3000}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <CarouselPrevious />
        <View style={{ flex: 1, marginHorizontal: 8 }}>
          <CarouselContent>
            <CarouselItem>
              <Box className="items-center p-3 rounded-xl bg-background-800">
                <Text className="text-2xl">💉</Text>
                <Text className="text-sm font-semibold text-typography-0 mt-1">Diabetic</Text>
                <Text className="text-xs text-typography-400">156 recipes</Text>
              </Box>
            </CarouselItem>
            {/* ...more items */}
          </CarouselContent>
        </View>
        <CarouselNext />
      </View>
    </Carousel>
  );
}`, []);

  return (
    <View style={{ gap: 24 }}>
      {/* Basic full-width carousel */}
      <ExampleSection
        title="Basic Carousel"
        description="Full-width slides with navigation and indicator dots."
        code={`import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, CarouselDots, Box, Text } from '@wireservers-ui/react-natives';
import { View } from 'react-native';

export default function Example() {
  return (
    <Carousel loop>
      <CarouselContent>
        <CarouselItem>
          <Box className="h-40 bg-primary-100 rounded-lg items-center justify-center">
            <Text className="text-lg font-semibold">Slide 1</Text>
          </Box>
        </CarouselItem>
        <CarouselItem>
          <Box className="h-40 bg-success-100 rounded-lg items-center justify-center">
            <Text className="text-lg font-semibold">Slide 2</Text>
          </Box>
        </CarouselItem>
      </CarouselContent>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
        <CarouselPrevious />
        <CarouselDots />
        <CarouselNext />
      </View>
    </Carousel>
  );
}`}
      >
        <Carousel loop>
          <CarouselContent>
            {colors.map((color, i) => (
              <CarouselItem key={i}>
                <Box className={`h-40 ${color} rounded-lg items-center justify-center`}>
                  <Text className="text-lg font-semibold">Slide {i + 1}</Text>
                </Box>
              </CarouselItem>
            ))}
          </CarouselContent>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
            <CarouselPrevious />
            <CarouselDots />
            <CarouselNext />
          </View>
        </Carousel>
      </ExampleSection>

      {/* Multi-item infinite scroll carousel */}
      <ExampleSection
        title="Multi-Item Infinite Scroll"
        description="Use itemWidth and gap for a multi-item view. Combined with loop and autoPlay for seamless endless scrolling."
        code={`import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, Box, Text } from '@wireservers-ui/react-natives';
import { View } from 'react-native';

export default function Example() {
  const categories = [
    { name: 'Diabetic', count: 156, icon: '💉' },
    { name: 'Heart Healthy', count: 134, icon: '❤️' },
    { name: 'DASH', count: 82, icon: '🍽️' },
  ];

  return (
    <Carousel loop itemWidth={120} gap={12} autoPlay autoPlayInterval={3000}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <CarouselPrevious />
        <View style={{ flex: 1, marginHorizontal: 8 }}>
          <CarouselContent>
            {categories.map((cat) => (
              <CarouselItem key={cat.name}>
                <Box className="items-center p-3 rounded-xl bg-background-800">
                  <Text className="text-2xl">{cat.icon}</Text>
                  <Text className="text-sm font-semibold text-typography-0 mt-1">
                    {cat.name}
                  </Text>
                  <Text className="text-xs text-typography-400">
                    {cat.count} recipes
                  </Text>
                </Box>
              </CarouselItem>
            ))}
          </CarouselContent>
        </View>
        <CarouselNext />
      </View>
    </Carousel>
  );
}`}
      >
        <Carousel loop itemWidth={120} gap={12} autoPlay autoPlayInterval={3000}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <CarouselPrevious />
            <View style={{ flex: 1, marginHorizontal: 8 }}>
              <CarouselContent>
                {categories.map((cat) => (
                  <CarouselItem key={cat.name}>
                    <Box className="items-center p-3 rounded-xl bg-background-800">
                      <Text style={{ fontSize: 24 }}>{cat.icon}</Text>
                      <Text className="text-sm font-semibold text-typography-0 mt-1">{cat.name}</Text>
                      <Text className="text-xs text-typography-400">{cat.count} recipes</Text>
                    </Box>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </View>
            <CarouselNext />
          </View>
        </Carousel>
      </ExampleSection>

      {/* Auto-play */}
      <ExampleSection
        title="Auto-Play"
        description="Slides advance automatically every 2 seconds."
        code={`import { Carousel, CarouselContent, CarouselItem, CarouselDots, Box, Text } from '@wireservers-ui/react-natives';

export default function Example() {
  return (
    <Carousel loop autoPlay autoPlayInterval={2000}>
      <CarouselContent>
        <CarouselItem>
          <Box className="h-32 bg-info-100 rounded-lg items-center justify-center">
            <Text>Auto Slide 1</Text>
          </Box>
        </CarouselItem>
        <CarouselItem>
          <Box className="h-32 bg-warning-100 rounded-lg items-center justify-center">
            <Text>Auto Slide 2</Text>
          </Box>
        </CarouselItem>
      </CarouselContent>
      <CarouselDots />
    </Carousel>
  );
}`}
      >
        <Carousel loop autoPlay autoPlayInterval={2000}>
          <CarouselContent>
            {['bg-info-100', 'bg-warning-100', 'bg-success-100', 'bg-error-100'].map((color, i) => (
              <CarouselItem key={i}>
                <Box className={`h-32 ${color} rounded-lg items-center justify-center`}>
                  <Text className="font-semibold">Auto Slide {i + 1}</Text>
                </Box>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselDots />
        </Carousel>
      </ExampleSection>
    </View>
  );
}

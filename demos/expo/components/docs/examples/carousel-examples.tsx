import React from 'react';
import { View } from 'react-native';
import { ExampleSection } from '../example-section';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, CarouselDots, Box, Text } from '@wireservers-ui/react-natives';
import { useExampleCode } from '../example-code-context';

const colors = ['bg-primary-100', 'bg-success-100', 'bg-warning-100', 'bg-error-100'];

export default function CarouselExamples() {
  useExampleCode(`import { View } from 'react-native';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, CarouselDots, Text } from '@wireservers-ui/react-natives';

export default function Example() {
  return (
    <Carousel loop>
      <CarouselContent>
        <CarouselItem><Text>Slide 1</Text></CarouselItem>
        <CarouselItem><Text>Slide 2</Text></CarouselItem>
        <CarouselItem><Text>Slide 3</Text></CarouselItem>
      </CarouselContent>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
        <CarouselPrevious />
        <CarouselDots />
        <CarouselNext />
      </View>
    </Carousel>
  );
}`, []);

  return (
    <View style={{ gap: 24 }}>
      <ExampleSection title="Basic Carousel" description="Swipeable content with navigation and indicator dots.">
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
    </View>
  );
}

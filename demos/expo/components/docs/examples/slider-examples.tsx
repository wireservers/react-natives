import React, { useState } from 'react';
import { View, Text as RNText } from 'react-native';
import { ExampleSection } from '../example-section';
import { VariantPicker } from '../variant-picker';
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from '@wireservers-ui/react-natives';
import type { SliderSize } from '@wireservers-ui/react-natives';
import { useExampleCode } from '../example-code-context';

export default function SliderExamples() {
  const [size, setSize] = useState<SliderSize>('md');
  const [volume, setVolume] = useState(50);
  const [brightness, setBrightness] = useState(75);
  const [price, setPrice] = useState(25);

  useExampleCode(`import { Slider, SliderTrack, SliderFilledTrack, SliderThumb } from '@wireservers-ui/react-natives';
import { useState } from 'react';

export default function Example() {
  const [value, setValue] = useState(50);

  return (
    <Slider value={value} onValueChange={setValue} min={0} max={100} size="${size}">
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <SliderThumb />
    </Slider>
  );
}`, [size]);

  return (
    <View style={{ gap: 24 }}>
      <ExampleSection
        title="Basic Slider"
        description="A simple slider with value display."
      >
        <VariantPicker
          label="Size"
          options={['sm', 'md', 'lg']}
          value={size}
          onChange={(v) => setSize(v as SliderSize)}
        />
        <View style={{ gap: 12, marginTop: 8 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <RNText style={{ fontSize: 14, color: '#374151' }}>Volume</RNText>
            <RNText style={{ fontSize: 14, fontWeight: '500', color: '#111827' }}>
              {volume}
            </RNText>
          </View>
          <Slider
            value={volume}
            onValueChange={setVolume}
            min={0}
            max={100}
            size={size}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </View>
      </ExampleSection>

      <ExampleSection
        title="Slider with Steps"
        description="Slider with step increments of 5."
      >
        <View style={{ gap: 12 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <RNText style={{ fontSize: 14, color: '#374151' }}>Brightness</RNText>
            <RNText style={{ fontSize: 14, fontWeight: '500', color: '#111827' }}>
              {brightness}%
            </RNText>
          </View>
          <Slider
            value={brightness}
            onValueChange={setBrightness}
            min={0}
            max={100}
            step={5}
            size={size}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </View>
      </ExampleSection>

      <ExampleSection
        title="Custom Range"
        description="Slider with a custom min/max range for price filtering."
      >
        <View style={{ gap: 12 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <RNText style={{ fontSize: 14, color: '#374151' }}>
              Max Price
            </RNText>
            <RNText style={{ fontSize: 14, fontWeight: '500', color: '#111827' }}>
              ${price}
            </RNText>
          </View>
          <Slider
            value={price}
            onValueChange={setPrice}
            min={5}
            max={200}
            step={5}
            size={size}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <RNText style={{ fontSize: 12, color: '#999' }}>$5</RNText>
            <RNText style={{ fontSize: 12, color: '#999' }}>$200</RNText>
          </View>
        </View>
      </ExampleSection>

      <ExampleSection
        title="Disabled Slider"
        description="Slider with isDisabled prevents user interaction."
      >
        <View style={{ gap: 12 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <RNText style={{ fontSize: 14, color: '#999' }}>Locked</RNText>
            <RNText style={{ fontSize: 14, color: '#999' }}>60</RNText>
          </View>
          <Slider
            value={60}
            min={0}
            max={100}
            size={size}
            isDisabled
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </View>
      </ExampleSection>
    </View>
  );
}

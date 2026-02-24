import React, { useState } from 'react';
import { View, Text as RNText } from 'react-native';
import { ExampleSection } from '../example-section';
import { VariantPicker } from '../variant-picker';
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from '@wireservers-ui/react-native-ui';
import type { SliderSize } from '@wireservers-ui/react-native-ui';

export default function SliderExamples() {
  const [size, setSize] = useState<SliderSize>('md');
  const [volume, setVolume] = useState(50);
  const [brightness, setBrightness] = useState(75);
  const [price, setPrice] = useState(25);

  return (
    <View className="gap-6">
      <RNText className="text-xl font-bold text-typography-900">Slider</RNText>
      <RNText className="text-sm text-typography-500">
        Slider allows users to select a value from a range by dragging a thumb
        along a track.
      </RNText>

      <View className="gap-2">
        <VariantPicker
          label="Size"
          options={['sm', 'md', 'lg']}
          value={size}
          onChange={(v) => setSize(v as SliderSize)}
        />
      </View>

      <ExampleSection
        title="Basic Slider"
        description="A simple slider with value display."
      >
        <View className="gap-3">
          <View className="flex-row justify-between">
            <RNText className="text-sm text-typography-700">Volume</RNText>
            <RNText className="text-sm font-medium text-typography-900">
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
        <View className="gap-3">
          <View className="flex-row justify-between">
            <RNText className="text-sm text-typography-700">Brightness</RNText>
            <RNText className="text-sm font-medium text-typography-900">
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
        <View className="gap-3">
          <View className="flex-row justify-between">
            <RNText className="text-sm text-typography-700">
              Max Price
            </RNText>
            <RNText className="text-sm font-medium text-typography-900">
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
          <View className="flex-row justify-between">
            <RNText className="text-xs text-typography-400">$5</RNText>
            <RNText className="text-xs text-typography-400">$200</RNText>
          </View>
        </View>
      </ExampleSection>

      <ExampleSection
        title="Disabled Slider"
        description="Slider with isDisabled prevents user interaction."
      >
        <View className="gap-3">
          <View className="flex-row justify-between">
            <RNText className="text-sm text-typography-400">Locked</RNText>
            <RNText className="text-sm text-typography-400">60</RNText>
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

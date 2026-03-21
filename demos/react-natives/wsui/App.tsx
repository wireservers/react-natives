import "./global.css";
import React, { useState } from "react";
import { View, Text } from "react-native";
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@wireservers-ui/react-natives";

export default function App() {
  const [volume, setVolume] = useState(50);

  return (
    <View className="flex-1 items-center justify-center bg-background-0 px-8">
      <Text className="text-2xl font-bold text-typography-900 mb-2">
        Volume Control
      </Text>
      <Text className="text-lg text-typography-500 mb-8">
        {volume}%
      </Text>
      <View className="w-full max-w-xs">
        <Slider
          value={volume}
          onValueChange={setVolume}
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
      <Text className="text-sm text-typography-400 mt-6">
        Drag the slider to adjust volume
      </Text>
    </View>
  );
}

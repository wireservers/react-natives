import React, { useCallback, useRef } from 'react';
import { View, Platform } from 'react-native';
import { useColorPickerContext } from './color-picker';
import type { ColorPickerSliderProps } from './types';
import { colorPickerSliderStyle } from './styles';
import { hexToHsv, hsvToHex, clamp } from './color-utils';
import { usePointerDrag } from './use-pointer-drag';

/* eslint-disable @typescript-eslint/no-var-requires */
const rnSvg = require('react-native-svg');
const Svg: React.ComponentType<any> = rnSvg.default || rnSvg.Svg;
const Rect: React.ComponentType<any> = rnSvg.Rect;
const Defs: React.ComponentType<any> = rnSvg.Defs;
const SvgLinearGradient: React.ComponentType<any> = rnSvg.LinearGradient;
const Stop: React.ComponentType<any> = rnSvg.Stop;
/* eslint-enable @typescript-eslint/no-var-requires */

const DEFAULT_HEIGHT = 200;
const DEFAULT_WIDTH = 24;
const HIT_SLOP = 14;
const isWeb = Platform.OS === 'web';

export const ColorPickerSlider = React.forwardRef<
  React.ElementRef<typeof View>,
  ColorPickerSliderProps
>(({ className, height = DEFAULT_HEIGHT, width = DEFAULT_WIDTH, ...props }, ref) => {
  const { color, onColorChange } = useColorPickerContext();

  const { h, s, v } = hexToHsv(color);

  const sRef = useRef(s);
  const vRef = useRef(v);
  sRef.current = s;
  vRef.current = v;

  const onColorChangeRef = useRef(onColorChange);
  onColorChangeRef.current = onColorChange;

  const heightRef = useRef(height);
  heightRef.current = height;

  const hueSelectorY = (h / 360) * height;

  const hueSelYRef = useRef(hueSelectorY);
  hueSelYRef.current = hueSelectorY;

  const drag = usePointerDrag(
    useCallback((_relX: number, relY: number) => {
      const ht = heightRef.current;
      const newH = clamp(relY / ht, 0, 1) * 360;
      onColorChangeRef.current(hsvToHex(Math.round(newH), sRef.current, vRef.current));
    }, []),
    useCallback((_relX: number, relY: number) => {
      return Math.abs(relY - hueSelYRef.current) <= HIT_SLOP;
    }, []),
  );

  const webStyle = isWeb
    ? { touchAction: 'none' as any, userSelect: 'none' as any }
    : {};

  return (
    <View
      ref={ref}
      className={colorPickerSliderStyle({ class: className })}
      style={{ width, height, borderRadius: 4, overflow: 'hidden', ...webStyle }}
      {...drag.handlers}
      {...props}
    >
      <Svg width={width} height={height} style={{ pointerEvents: 'none' as any }}>
        <Defs>
          <SvgLinearGradient id="cps-hueGrad" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#FF0000" />
            <Stop offset="0.167" stopColor="#FFFF00" />
            <Stop offset="0.333" stopColor="#00FF00" />
            <Stop offset="0.5" stopColor="#00FFFF" />
            <Stop offset="0.667" stopColor="#0000FF" />
            <Stop offset="0.833" stopColor="#FF00FF" />
            <Stop offset="1" stopColor="#FF0000" />
          </SvgLinearGradient>
        </Defs>
        <Rect x={0} y={0} width={width} height={height} fill="url(#cps-hueGrad)" />
        <Rect
          x={0}
          y={hueSelectorY - 2}
          width={width}
          height={4}
          fill="none"
          stroke="#FFFFFF"
          strokeWidth={2}
          rx={2}
        />
      </Svg>
    </View>
  );
});

ColorPickerSlider.displayName = 'ColorPickerSlider';

import React, { useCallback, useRef } from 'react';
import { View, Platform } from 'react-native';
import { useColorPickerContext } from './color-picker';
import type { ColorPickerBoxProps } from './types';
import { colorPickerBoxStyle } from './styles';
import { hexToHsv, hsvToHex, hueToHex, clamp } from './color-utils';
import { usePointerDrag } from './use-pointer-drag';

/* eslint-disable @typescript-eslint/no-var-requires */
const rnSvg = require('react-native-svg');
const Svg: React.ComponentType<any> = rnSvg.default || rnSvg.Svg;
const Rect: React.ComponentType<any> = rnSvg.Rect;
const Defs: React.ComponentType<any> = rnSvg.Defs;
const SvgLinearGradient: React.ComponentType<any> = rnSvg.LinearGradient;
const Stop: React.ComponentType<any> = rnSvg.Stop;
const SvgCircle: React.ComponentType<any> = rnSvg.Circle;
/* eslint-enable @typescript-eslint/no-var-requires */

const DEFAULT_SIZE = 200;
const SELECTOR_RADIUS = 7;
const HIT_SLOP = 14;
const isWeb = Platform.OS === 'web';

export const ColorPickerBox = React.forwardRef<
  React.ElementRef<typeof View>,
  ColorPickerBoxProps
>(({ className, size = DEFAULT_SIZE, ...props }, ref) => {
  const { color, onColorChange } = useColorPickerContext();

  const { h, s, v } = hexToHsv(color);
  const hueColor = hueToHex(h);

  const hRef = useRef(h);
  const sRef = useRef(s);
  const vRef = useRef(v);
  hRef.current = h;
  sRef.current = s;
  vRef.current = v;

  const onColorChangeRef = useRef(onColorChange);
  onColorChangeRef.current = onColorChange;

  const sizeRef = useRef(size);
  sizeRef.current = size;

  const svSelectorX = (s / 100) * size;
  const svSelectorY = (1 - v / 100) * size;

  const svSelRef = useRef({ x: svSelectorX, y: svSelectorY });
  svSelRef.current = { x: svSelectorX, y: svSelectorY };

  const drag = usePointerDrag(
    useCallback((relX: number, relY: number) => {
      const sz = sizeRef.current;
      const newS = clamp(relX / sz, 0, 1) * 100;
      const newV = (1 - clamp(relY / sz, 0, 1)) * 100;
      onColorChangeRef.current(hsvToHex(hRef.current, Math.round(newS), Math.round(newV)));
    }, []),
    useCallback((relX: number, relY: number) => {
      const { x, y } = svSelRef.current;
      const dx = relX - x;
      const dy = relY - y;
      return Math.sqrt(dx * dx + dy * dy) <= HIT_SLOP;
    }, []),
    'crosshair',
  );

  const webStyle = isWeb
    ? { touchAction: 'none' as any, userSelect: 'none' as any }
    : {};

  return (
    <View
      ref={ref}
      className={colorPickerBoxStyle({ class: className })}
      style={{ width: size, height: size, borderRadius: 4, overflow: 'hidden', ...webStyle }}
      {...drag.handlers}
      {...props}
    >
      <Svg width={size} height={size} style={{ pointerEvents: 'none' as any }}>
        <Defs>
          <SvgLinearGradient id="cpb-satGrad" x1="0" y1="0" x2="1" y2="0">
            <Stop offset="0" stopColor="#FFFFFF" stopOpacity={1} />
            <Stop offset="1" stopColor="#FFFFFF" stopOpacity={0} />
          </SvgLinearGradient>
          <SvgLinearGradient id="cpb-valGrad" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#000000" stopOpacity={0} />
            <Stop offset="1" stopColor="#000000" stopOpacity={1} />
          </SvgLinearGradient>
        </Defs>
        <Rect x={0} y={0} width={size} height={size} fill={hueColor} />
        <Rect x={0} y={0} width={size} height={size} fill="url(#cpb-satGrad)" />
        <Rect x={0} y={0} width={size} height={size} fill="url(#cpb-valGrad)" />
        <SvgCircle
          cx={svSelectorX}
          cy={svSelectorY}
          r={SELECTOR_RADIUS}
          fill="none"
          stroke="#FFFFFF"
          strokeWidth={2.5}
        />
        <SvgCircle
          cx={svSelectorX}
          cy={svSelectorY}
          r={SELECTOR_RADIUS + 1.5}
          fill="none"
          stroke="rgba(0,0,0,0.3)"
          strokeWidth={1}
        />
      </Svg>
    </View>
  );
});

ColorPickerBox.displayName = 'ColorPickerBox';

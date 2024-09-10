'use client';
import chroma from 'chroma-js';

function generateTheme({
  theme,
  radius,
  saturationRange,
  lightnessRange,
}: any) {
  const baseColor = chroma(theme);
  const lightnessRangeAdjusted = lightnessRange.map((l: number) => l + 50); // Ajustando o intervalo de luz
  const saturationRangeAdjusted = saturationRange.map((s: number) => s + 50); // Ajustando o intervalo de saturação

  const generateColor = (lightness: number, saturation: number) => ({
    h: baseColor.get('hsl.h'),
    s: (saturation / 100) * baseColor.get('hsl.s'),
    l: (lightness / 100) * baseColor.get('hsl.l'),
  });

  return {
    theme,
    radius,
    saturationRange,
    lightnessRange,
    colors: {
      light: {
        background: generateColor(95, 100),
        foreground: generateColor(0, 5),
        primary: generateColor(57.8, 88.3),
        secondary: generateColor(70, 30),
        border: generateColor(50, 30),
        input: generateColor(18, 30),
        card: generateColor(90, 50),
        cardForeground: generateColor(10, 5),
        muted: generateColor(85, 30),
        mutedForeground: generateColor(35, 5),
        accent: generateColor(80, 30),
        accentForeground: generateColor(10, 5),
        ring: generateColor(57.8, 88.3),
        popover: generateColor(95, 100),
        popoverForeground: generateColor(0, 100),
        destructive: generateColor(30, 100),
        destructiveForeground: generateColor(90, 5),
      },
      dark: {
        background: generateColor(5, 50),
        foreground: generateColor(90, 5),
        primary: generateColor(57.8, 88.3),
        secondary: generateColor(10, 30),
        border: generateColor(18, 30),
        input: generateColor(18, 30),
        card: generateColor(0, 50),
        cardForeground: generateColor(90, 5),
        muted: generateColor(15, 30),
        mutedForeground: generateColor(60, 5),
        accent: generateColor(15, 30),
        accentForeground: generateColor(90, 5),
        ring: generateColor(57.8, 88.3),
        popover: generateColor(5, 50),
        popoverForeground: generateColor(90, 5),
        destructive: generateColor(30, 100),
        destructiveForeground: generateColor(90, 5),
      },
    },
  };
}

export default generateTheme;

'use client';
import React, {
  useContext,
  useState,
  createContext,
  useEffect,
  ReactNode,
} from 'react';
import { Button } from '../ui/button';
import chroma from 'chroma-js';
import { HexColorPicker } from 'react-colorful';

// Tipagens
interface HSLColor {
  h: number;
  s: number;
  l: number;
}

interface ThemeColors {
  background: HSLColor;
  foreground: HSLColor;
  card: HSLColor;
  cardForeground: HSLColor;
  popover: HSLColor;
  popoverForeground: HSLColor;
  primary: HSLColor;
  primaryForeground: HSLColor;
  secondary: HSLColor;
  secondaryForeground: HSLColor;
  muted: HSLColor;
  mutedForeground: HSLColor;
  accent: HSLColor;
  accentForeground: HSLColor;
  destructive: HSLColor;
  destructiveForeground: HSLColor;
  border: HSLColor;
  input: HSLColor;
  ring: HSLColor;
}

interface ThemeStyle {
  colors: {
    dark: ThemeColors;
    light: ThemeColors;
  };
  lightnessRange: number[];
  radius: number;
  saturationRange: number[];
  theme: string;
}

// Definição inicial do estado
const initialStyle: ThemeStyle = {
  colors: {
    dark: {
      background: { h: 357, s: 50, l: 10 },
      foreground: { h: 357, s: 5, l: 90 },
      card: { h: 357, s: 50, l: 10 },
      cardForeground: { h: 357, s: 5, l: 90 },
      popover: { h: 357, s: 50, l: 5 },
      popoverForeground: { h: 357, s: 5, l: 90 },
      primary: { h: 357, s: 74, l: 54 },
      primaryForeground: { h: 0, s: 0, l: 100 },
      secondary: { h: 357, s: 30, l: 20 },
      secondaryForeground: { h: 0, s: 0, l: 100 },
      muted: { h: 319, s: 30, l: 25 },
      mutedForeground: { h: 357, s: 5, l: 60 },
      accent: { h: 319, s: 30, l: 25 },
      accentForeground: { h: 357, s: 5, l: 90 },
      destructive: { h: 0, s: 75, l: 50 },
      destructiveForeground: { h: 357, s: 5, l: 90 },
      border: { h: 357, s: 30, l: 50 },
      input: { h: 357, s: 30, l: 50 },
      ring: { h: 357, s: 74, l: 54 },
    },
    light: {
      background: { h: 357, s: 75, l: 95 },
      foreground: { h: 357, s: 5, l: 10 },
      card: { h: 357, s: 50, l: 90 },
      cardForeground: { h: 357, s: 5, l: 15 },
      popover: { h: 357, s: 75, l: 95 },
      popoverForeground: { h: 357, s: 95, l: 10 },
      primary: { h: 357, s: 74, l: 54 },
      primaryForeground: { h: 0, s: 0, l: 100 },
      secondary: { h: 357, s: 30, l: 70 },
      secondaryForeground: { h: 0, s: 0, l: 0 },
      muted: { h: 319, s: 30, l: 85 },
      mutedForeground: { h: 357, s: 5, l: 40 },
      accent: { h: 319, s: 30, l: 80 },
      accentForeground: { h: 357, s: 5, l: 15 },
      destructive: { h: 0, s: 75, l: 50 },
      destructiveForeground: { h: 357, s: 5, l: 90 },
      border: { h: 357, s: 30, l: 50 },
      input: { h: 357, s: 30, l: 50 },
      ring: { h: 357, s: 74, l: 54 },
    },
  },
  lightnessRange: [0],
  radius: 0.5,
  saturationRange: [100],
  theme: '',
};

// Criação do contexto
interface StyleContextProps {
  style: ThemeStyle;
  setStyle: React.Dispatch<React.SetStateAction<ThemeStyle>>;
  globalStyle: ThemeStyle;
  setGlobalStyle: React.Dispatch<React.SetStateAction<ThemeStyle>>;
}

export const StyleContext = createContext<StyleContextProps | undefined>(
  undefined,
);

export const StyleProvider = ({ children }: { children: ReactNode }) => {
  const [style, setStyle] = useState<ThemeStyle>(initialStyle);
  const [globalStyle, setGlobalStyle] = useState<ThemeStyle>(initialStyle);

  return (
    <StyleContext.Provider
      value={{ style, setStyle, globalStyle, setGlobalStyle }}
    >
      <StyleCustomTheme />
      {children}
    </StyleContext.Provider>
  );
};

export const PickColor = () => {
  const styleContext = useContext(StyleContext);

  if (!styleContext) {
    throw new Error('PickColor must be used within a StyleProvider');
  }

  const { setStyle } = styleContext;

  const Edit = (color) => {
    const newStyle = generateTheme({
      theme: color,
      radius: 0.5,
      saturationRange: [10],
      lightnessRange: [0],
    });

    setStyle(newStyle);
  };

  return <HexColorPicker onChange={(e) => Edit(e)} />;
};

const StyleCustomTheme = () => {
  const styleContext = useContext(StyleContext);

  if (!styleContext) {
    throw new Error('StyleCustomTheme must be used within a StyleProvider');
  }

  const { style } = styleContext;

  const transformObjHsl = (color: HSLColor) =>
    `${color.h}, ${color.s}%, ${color.l}%`;

  const [styleContent, setStyleContent] = useState<string>('');

  useEffect(() => {
    const css = `
      :root .theme-custom {
        --background: ${transformObjHsl(style.colors.light.background)};
        --foreground: ${transformObjHsl(style.colors.light.foreground)};
        --card: ${transformObjHsl(style.colors.light.card)};
        --card-foreground: ${transformObjHsl(
          style.colors.light.cardForeground,
        )};
        --popover: ${transformObjHsl(style.colors.light.popover)};
        --popover-foreground: ${transformObjHsl(
          style.colors.light.popoverForeground,
        )};
        --primary: ${transformObjHsl(style.colors.light.primary)};
        --primary-foreground: ${transformObjHsl(
          style.colors.light.primaryForeground,
        )};
        --secondary: ${transformObjHsl(style.colors.light.secondary)};
        --secondary-foreground: ${transformObjHsl(
          style.colors.light.secondaryForeground,
        )};
        --muted: ${transformObjHsl(style.colors.light.muted)};
        --muted-foreground: ${transformObjHsl(
          style.colors.light.mutedForeground,
        )};
        --accent: ${transformObjHsl(style.colors.light.accent)};
        --accent-foreground: ${transformObjHsl(
          style.colors.light.accentForeground,
        )};
        --destructive: ${transformObjHsl(style.colors.light.destructive)};
        --destructive-foreground: ${transformObjHsl(
          style.colors.light.destructiveForeground,
        )};
        --border: ${transformObjHsl(style.colors.light.border)};
        --input: ${transformObjHsl(style.colors.light.input)};
        --ring: ${transformObjHsl(style.colors.light.ring)};
        --radius: ${style.radius}rem;
      }
      .dark .theme-custom {
        --background: ${transformObjHsl(style.colors.dark.background)};
        --foreground: ${transformObjHsl(style.colors.dark.foreground)};
        --card: ${transformObjHsl(style.colors.dark.card)};
        --card-foreground: ${transformObjHsl(style.colors.dark.cardForeground)};
        --popover: ${transformObjHsl(style.colors.dark.popover)};
        --popover-foreground: ${transformObjHsl(
          style.colors.dark.popoverForeground,
        )};
        --primary: ${transformObjHsl(style.colors.dark.primary)};
        --primary-foreground: ${transformObjHsl(
          style.colors.dark.primaryForeground,
        )};
        --secondary: ${transformObjHsl(style.colors.dark.secondary)};
        --secondary-foreground: ${transformObjHsl(
          style.colors.dark.secondaryForeground,
        )};
        --muted: ${transformObjHsl(style.colors.dark.muted)};
        --muted-foreground: ${transformObjHsl(
          style.colors.dark.mutedForeground,
        )};
        --accent: ${transformObjHsl(style.colors.dark.accent)};
        --accent-foreground: ${transformObjHsl(
          style.colors.dark.accentForeground,
        )};
        --destructive: ${transformObjHsl(style.colors.dark.destructive)};
        --destructive-foreground: ${transformObjHsl(
          style.colors.dark.destructiveForeground,
        )};
        --border: ${transformObjHsl(style.colors.dark.border)};
        --input: ${transformObjHsl(style.colors.dark.input)};
        --ring: ${transformObjHsl(style.colors.dark.ring)};
        --radius: ${style.radius}rem;
      }
    `;
    setStyleContent(css);
  }, [style]);

  return <style>{styleContent}</style>;
};

// Função de geração de tema
function generateTheme({
  theme,
  radius,
  saturationRange,
  lightnessRange,
}: {
  theme: string;
  radius: number;
  saturationRange: number[];
  lightnessRange: number[];
}): ThemeStyle {
  const baseColor = chroma(theme);
  const lightnessRangeAdjusted: number[] = lightnessRange.map((l) => l + 50); // Ajustando o intervalo de luz
  const saturationRangeAdjusted: number[] = saturationRange.map((s) => s + 50); // Ajustando o intervalo de saturação

  const generateColor = (lightness: number, saturation: number): HSLColor => {
    const [h] = baseColor.hsl();
    return {
      h,
      s: (saturation / 100) * (100 * baseColor.get('hsl.s') + 20),
      l: (lightness / 100) * (100 * baseColor.get('hsl.l') + 20),
    };
  };

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
        primaryForeground: generateColor(0, 100),
        secondary: generateColor(70, 30),
        secondaryForeground: generateColor(0, 0),
        muted: generateColor(85, 30),
        mutedForeground: generateColor(35, 5),
        accent: generateColor(80, 30),
        accentForeground: generateColor(10, 5),
        destructive: generateColor(30, 100),
        destructiveForeground: generateColor(90, 5),
        card: generateColor(90, 50),
        cardForeground: generateColor(10, 5),
        popover: generateColor(95, 100),
        popoverForeground: generateColor(0, 100),
        border: generateColor(50, 30),
        input: generateColor(18, 30),
        ring: generateColor(57.8, 88.3),
      },
      dark: {
        background: generateColor(5, 50),
        foreground: generateColor(90, 5),
        primary: generateColor(57.8, 88.3),
        primaryForeground: generateColor(0, 100),
        secondary: generateColor(10, 30),
        secondaryForeground: generateColor(0, 100),
        muted: generateColor(15, 30),
        mutedForeground: generateColor(60, 5),
        accent: generateColor(15, 30),
        accentForeground: generateColor(90, 5),
        destructive: generateColor(30, 100),
        destructiveForeground: generateColor(90, 5),
        card: generateColor(0, 50),
        cardForeground: generateColor(90, 5),
        popover: generateColor(5, 50),
        popoverForeground: generateColor(90, 5),
        border: generateColor(18, 30),
        input: generateColor(18, 30),
        ring: generateColor(57.8, 88.3),
      },
    },
  };
}

'use client';
import React, { useContext, useState, createContext, useEffect } from 'react';
import { Button } from '../ui/button';
import chroma from 'chroma-js';

// Definição inicial do estado
const initialStyle = {
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
export const StyleContext = createContext();

export const StyleProvider = ({ children }) => {
  const [style, setStyle] = useState(initialStyle);
  const [globalStyle, setGlobalStyle] = useState(initialStyle);

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
  const { style, setStyle } = useContext(StyleContext);

  const Edit = () => {
    const nesStyle = generateTheme({
      theme: 'violet',
      radius: 0.5,
      saturationRange: [100],
      lightnessRange: [0],
    });

    // Atualizando o estado
    setStyle(nesStyle);
  };

  // UseEffect para monitorar o estado
  useEffect(() => {
    console.log('O estilo foi atualizado:', style);
  }, [style]); // Esse useEffect será disparado sempre que `style` for atualizado

  return <Button onClick={Edit}>Editar Tema</Button>;
};

const StyleCustomTheme = () => {
  const { style } = useContext(StyleContext);

  const transformObjHsl = (color) => `${color.h} ${color.s}%, ${color.l}%`;

  const [styleContent, setStyleContent] = useState('');
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
            --card-foreground: ${transformObjHsl(
              style.colors.dark.cardForeground,
            )};
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

export default StyleCustomTheme;

// Função de geração de tema
function generateTheme({ theme, radius, saturationRange, lightnessRange }) {
  const baseColor = chroma(theme);
  const lightnessRangeAdjusted = lightnessRange.map((l) => l + 50); // Ajustando o intervalo de luz
  const saturationRangeAdjusted = saturationRange.map((s) => s + 50); // Ajustando o intervalo de saturação

  const generateColor = (lightness, saturation) => {
    const [h] = baseColor.hsl();
    return {
      h,
      s: saturation,
      l: lightness,
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

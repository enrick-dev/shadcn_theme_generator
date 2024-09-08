type ColorObj = {
  h: number;
  s: number;
  l: number;
};

type ThemeColors = {
  background: ColorObj;
  foreground: ColorObj;
  card: ColorObj;
  cardForeground: ColorObj;
  popover: ColorObj;
  popoverForeground: ColorObj;
  primary: ColorObj;
  primaryForeground: ColorObj;
  secondary: ColorObj;
  secondaryForeground: ColorObj;
  muted: ColorObj;
  mutedForeground: ColorObj;
  accent: ColorObj;
  accentForeground: ColorObj;
  destructive: ColorObj;
  destructiveForeground: ColorObj;
  border: ColorObj;
  input: ColorObj;
  ring: ColorObj;
};

type StyleState = {
  colors: {
    dark: ThemeColors;
    light: ThemeColors;
  };
  lightnessRange: number[];
  radius: number;
  saturationRange: number[];
  theme: string;
};

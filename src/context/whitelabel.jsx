import { useWhitelabel } from '@/hooks/whitelabel/useWhitelabel';
import localStorageManager from '@/services/localStorageManager';
import chroma from 'chroma-js';
import { createContext, useEffect, useState } from 'react';

export const WhitelabelContext = createContext();

const WhitelabelProvider = ({ children }) => {
  const hostnameParts = window.location.hostname.split('.');
  const subdomain =
    hostnameParts[0] == 'localhost'
      ? import.meta.env.VITE_SUBDOMAIN
      : hostnameParts[0];
  const sheets = document.styleSheets;
  let rootStyles = null;
  let darkStyles = null;

  // Busca as classes :root e .dark no styleSheets
  Array.from(sheets).forEach((sheet) => {
    Array.from(sheet.cssRules || sheet.rules).forEach((rule) => {
      if (rule.selectorText === ':root') {
        rootStyles = rule.style;
      } else if (rule.selectorText === '.dark') {
        darkStyles = rule.style;
      }
    });
  });

  const [primaryColor, setPrimaryColor] = useState(
    (localStorageManager.getItem('@Whitelabel:colors') &&
      localStorageManager.getItem('@Whitelabel:colors').primaryColor) ||
      '#94948d',
  );
  const [secondaryColor, setSecondaryColor] = useState(
    (localStorageManager.getItem('@Whitelabel:colors') &&
      localStorageManager.getItem('@Whitelabel:colors').secondaryColor) ||
      '',
  );
  const [saturation, setSaturation] = useState(
    (localStorageManager.getItem('@Whitelabel:colors') &&
      localStorageManager.getItem('@Whitelabel:colors').saturation) ||
      0,
  );
  const [lightness, setLightness] = useState(
    (localStorageManager.getItem('@Whitelabel:colors') &&
      localStorageManager.getItem('@Whitelabel:colors').lightness) ||
      22,
  );

  // pega dados do whitelabal no banco de dados
  const { data: getWhitelabelData } = useWhitelabel();
  useEffect(() => {
    getWhitelabelData &&
      getWhitelabelData.style &&
      localStorageManager.setItem(
        '@Whitelabel:colors',
        getWhitelabelData.style,
      );
    getWhitelabelData &&
      getWhitelabelData.style &&
      setPrimaryColor(getWhitelabelData.style.primaryColor);
    getWhitelabelData &&
      getWhitelabelData.style &&
      setSecondaryColor(getWhitelabelData.style.secondaryColor);
    getWhitelabelData &&
      getWhitelabelData.style &&
      setSaturation(getWhitelabelData.style.saturation);
    getWhitelabelData &&
      getWhitelabelData.style &&
      setLightness(getWhitelabelData.style.lightness);
  }, [getWhitelabelData]);

  const defaultThemeColors = {
    root: {
      background: ['0', '0%', '100%'],
      foreground: ['20', '14.3%', '4.1%'],
      card: ['0', '0%', '100%'],
      cardFore: ['20', '14.3%', '4.1%'],
      popover: ['0', '0%', '100%'],
      popoverFore: ['20', '14.3%', '4.1%'],
      primary: ['24.6', '95%', '53.1%'],
      primaryFore: ['60', '9.1%', '97.8%'],
      secondary: ['60', '4.8%', '95.9%'],
      secondaryFore: ['24', '9.8%', '10%'],
      muted: ['60', '4.8%', '95.9%'],
      mutedFore: ['25', '5.3%', '44.7%'],
      accent: ['60', '4.8%', '95.9%'],
      accentFore: ['24', '9.8%', '10%'],
      border: ['20', '5.9%', '90%'],
      input: ['20', '5.9%', '90%'],
      ring: ['24.6', '95%', '53.1%'],
    },
    dark: {
      background: ['20', '14.3%', '4.1%'],
      foreground: ['60', '9.1%', '97.8%'],
      card: ['20', '14.3%', '4.1%'],
      cardFore: ['60', '9.1%', '97.8%'],
      popover: ['20', '14.3%', '4.1%'],
      popoverFore: ['60', '9.1%', '97.8%'],
      primary: ['20.5', '90.2%', '48.2%'],
      primaryFore: ['60', '9.1%', '97.8%'],
      secondary: ['12', '6.5%', '15.1%'],
      secondaryFore: ['60', '9.1%', '97.8%'],
      muted: ['12', '6.5%', '15.1%'],
      mutedFore: ['24', '5.4%', '63.9%'],
      accent: ['12', '6.5%', '15.1%'],
      accentFore: ['60', '9.1%', '97.8%'],
      border: ['12', '6.5%', '15.1%'],
      input: ['12', '6.5%', '15.1%'],
      ring: ['20.5', '90.2%', '48.2%'],
    },
  };

  const UpdateColorTheme = ({
    primaryColor,
    secondaryColor,
    saturation,
    lightness,
  }) => {
    lightness += 100;
    const baseColor = chroma(primaryColor);
    let baseSecondColor;

    if (secondaryColor) {
      const secondColor = chroma(secondaryColor);
      const scaleToSecondary = chroma.scale([baseColor, secondColor]);
      baseSecondColor = scaleToSecondary(0.9);
    }

    const hueBase =
      (!secondaryColor && (Math.round(baseColor.get('hsl.h')) || 1)) ||
      Math.round(baseSecondColor.get('hsl.h')) ||
      1;

    const lighBase =
      (!secondaryColor && Math.round(baseColor.get('hsl.l') * 100)) ||
      Math.round(baseSecondColor.get('hsl.l') * 100);

    let {
      background: backgroundDark,
      foreground: foregroundDark,
      card: cardDark,
      cardFore: cardForeDark,
      popover: popoverDark,
      popoverFore: popoverForeDark,
      primaryFore: primaryForeDark,
      secondary: secondaryDark,
      secondaryFore: secondaryForeDark,
      muted: mutedDark,
      mutedFore: mutedForeDark,
      accent: accentDark,
      accentFore: accentForeDark,
      border: borderDark,
      input: inputDark,
      ring: ringDark,
    } = defaultThemeColors.dark;

    let {
      background: backgroundRoot,
      foreground: foregroundRoot,
      card: cardRoot,
      cardFore: cardForeRoot,
      popover: popoverRoot,
      popoverFore: popoverForeRoot,
      primaryFore: primaryForeRoot,
      secondary: secondaryRoot,
      secondaryFore: secondaryForeRoot,
      muted: mutedRoot,
      mutedFore: mutedForeRoot,
      accent: accentRoot,
      accentFore: accentForeRoot,
      border: borderRoot,
      input: inputRoot,
      ring: ringRoot,
    } = defaultThemeColors.root;

    let primaryRoot = `${(Math.round(baseColor.get('hsl.h')) || 1).toFixed(2)} ${(baseColor.get('hsl.s') * 100).toFixed(2) + '%'} ${(baseColor.get('hsl.l') * 100).toFixed(2) + '%'}`;
    let primaryDark = `${(Math.round(baseColor.get('hsl.h')) || 1).toFixed(2) - 4.1} ${(baseColor.get('hsl.s') * 100).toFixed(2) - 4.8 + '%'} ${(baseColor.get('hsl.l') * 100).toFixed(2) - 4.9 + '%'}`;
    darkStyles.setProperty('--primary', primaryDark);
    rootStyles.setProperty('--primary', primaryRoot);

    primaryForeDark[0] = hueBase + 39;
    primaryForeRoot[0] = hueBase + 35;

    darkStyles.setProperty('--primary-foreground', primaryForeDark.join(' '));
    rootStyles.setProperty('--primary-foreground', primaryForeRoot.join(' '));

    // ----------------------------------------------------

    backgroundDark[0] = hueBase - 1;
    backgroundDark[1] = 14.3 * 10 * (saturation / 100).toFixed(2) + '%';
    backgroundDark[2] =
      (4.1 * 0.7 * (lightness / 75) + (18 - (lighBase / 50) * 20)).toFixed(2) +
      '%';

    backgroundRoot[0] = 0;
    backgroundRoot[1] = 0 + '%';
    backgroundRoot[2] =
      (100 * 0.7 * (lightness / 75) + (18 - (lighBase / 50) * 20)).toFixed(2) +
      '%';

    foregroundDark[0] = hueBase + 39;
    foregroundRoot[0] = hueBase - 5;

    darkStyles.setProperty('--background', backgroundDark.join(' '));
    darkStyles.setProperty('--foreground', foregroundDark.join(' '));
    rootStyles.setProperty('--background', backgroundRoot.join(' '));
    rootStyles.setProperty('--foreground', foregroundRoot.join(' '));

    // ----------------------------------------------------

    cardDark[0] = hueBase - 1;
    cardDark[1] = 14.3 * 10 * (saturation / 100).toFixed(2) + '%';
    cardDark[2] =
      (4.1 * 0.7 * (lightness / 75) + (18 - (lighBase / 50) * 20)).toFixed(2) +
      '%';

    cardRoot[0] = 0;
    cardRoot[1] = 0 + '%';
    cardRoot[2] =
      (100 * 0.7 * (lightness / 75) + (18 - (lighBase / 50) * 20)).toFixed(2) +
      '%';

    cardForeDark[0] = hueBase + 39;
    cardForeRoot[0] = hueBase - 5;

    darkStyles.setProperty('--card', cardDark.join(' '));
    darkStyles.setProperty('--card-foreground', cardForeDark.join(' '));
    rootStyles.setProperty('--card', cardRoot.join(' '));
    rootStyles.setProperty('--card-foreground', cardForeRoot.join(' '));

    // ----------------------------------------------------

    popoverDark[0] = hueBase - 1;
    popoverDark[1] = 14.3 * 10 * (saturation / 100).toFixed(2) + '%';
    popoverDark[2] =
      (4.1 * 0.7 * (lightness / 75) + (18 - (lighBase / 50) * 20)).toFixed(2) +
      '%';

    popoverRoot[0] = hueBase - 5;
    popoverRoot[2] =
      (100 * 0.7 * (lightness / 75) + (18 - (lighBase / 50) * 20)).toFixed(2) +
      '%';

    popoverForeDark[0] = hueBase + 39;

    popoverForeRoot[0] = hueBase - 1;
    popoverForeRoot[1] = 14.3 * 10 * (saturation / 100).toFixed(2) + '%';
    popoverForeRoot[2] =
      (4.1 * 0.7 * (lightness / 75) + (18 - (lighBase / 50) * 20)).toFixed(2) +
      '%';

    darkStyles.setProperty('--popover', popoverDark.join(' '));
    darkStyles.setProperty('--popover-foreground', popoverForeDark.join(' '));
    rootStyles.setProperty('--popover', popoverRoot.join(' '));
    rootStyles.setProperty('--popover-foreground', popoverForeRoot.join(' '));

    // ----------------------------------------------------

    secondaryDark[0] = hueBase;
    secondaryDark[1] = 6.5 * 4.6 * (saturation / 100).toFixed(2) + '%';
    secondaryDark[2] =
      (
        80 * 0.03 * ((lightness + 65) / 100) +
        (18 - (lighBase / 50) * (18 - 4.1))
      ).toFixed(2) + '%';

    secondaryRoot[0] = hueBase + 35;

    secondaryForeDark[0] = hueBase + 39;

    secondaryForeRoot[0] = hueBase;
    secondaryForeRoot[1] = 6.5 * 4.6 * (saturation / 100).toFixed(2) + '%';
    secondaryForeRoot[2] =
      (
        80 * 0.03 * ((lightness + 65) / 100) +
        (lighBase / 50) * (18 - 4.1)
      ).toFixed(2) + '%';

    darkStyles.setProperty('--secondary', secondaryDark.join(' '));
    darkStyles.setProperty(
      '--secondary-foreground',
      secondaryForeDark.join(' '),
    );
    rootStyles.setProperty('--secondary', secondaryRoot.join(' '));
    rootStyles.setProperty(
      '--secondary-foreground',
      secondaryForeRoot.join(' '),
    );

    // ----------------------------------------------------

    mutedDark[0] = hueBase - 9;
    mutedDark[1] = 6.5 * 10 * (saturation / 100).toFixed(2) + '%';
    mutedDark[2] =
      (
        80 * 0.03 * ((lightness + 65) / 100) +
        (18 - (lighBase / 50) * (18 - 4.1))
      ).toFixed(2) + '%';

    mutedRoot[0] = hueBase + 3;
    mutedRoot[1] = 5.4 * 2 * (saturation / 100).toFixed(2) + '%';

    mutedForeDark[0] = hueBase + 3;
    mutedForeDark[1] = 5.4 * 2 * (saturation / 100).toFixed(2) + '%';

    mutedForeRoot[0] = hueBase;
    mutedForeRoot[1] = 5.3 * 10 * (saturation / 100).toFixed(2) + '%';
    mutedForeRoot[2] =
      (
        44.7 * 0.3 * ((lightness + 65) / 100) +
        (lighBase / 50) * (18 - 4.1)
      ).toFixed(2) + '%';

    darkStyles.setProperty('--muted', mutedDark.join(' '));
    darkStyles.setProperty('--muted-foreground', mutedForeDark.join(' '));
    rootStyles.setProperty('--muted', mutedRoot.join(' '));
    rootStyles.setProperty('--muted-foreground', mutedForeRoot.join(' '));

    // ----------------------------------------------------

    accentDark[0] = hueBase - 9;
    accentDark[1] = 6.5 * 10 * (saturation / 100).toFixed(2) + '%';
    accentDark[2] =
      (
        80 * 0.1 * ((lightness + 65) / 100) +
        (18 - (lighBase / 50) * (18 - 4.1))
      ).toFixed(2) + '%';

    accentRoot[0] = hueBase + 3;
    accentRoot[1] = 5.4 * 2 * (saturation / 100).toFixed(2) + '%';

    accentForeDark[0] = hueBase + 39;

    accentForeRoot[0] = hueBase;
    accentForeRoot[1] = 6.5 * 4.6 * (saturation / 100).toFixed(2) + '%';
    accentForeRoot[2] =
      (
        80 * 0.03 * ((lightness + 65) / 100) +
        (lighBase / 50) * (18 - 4.1)
      ).toFixed(2) + '%';

    darkStyles.setProperty('--accent', accentDark.join(' '));
    darkStyles.setProperty('--accent-foreground', accentForeDark.join(' '));
    rootStyles.setProperty('--accent', accentRoot.join(' '));
    rootStyles.setProperty('--accent-foreground', accentForeRoot.join(' '));

    // ----------------------------------------------------

    borderDark[0] = hueBase - 9;
    borderDark[1] = 6.5 * 10 * (saturation / 100).toFixed(2) + '%';
    borderDark[2] =
      (
        80 * 0.07 * ((lightness + 65) / 100) +
        (18 - (lighBase / 50) * (18 - 4.1))
      ).toFixed(2) + '%';

    borderRoot[0] = hueBase - 5;

    darkStyles.setProperty('--border', borderDark.join(' '));
    rootStyles.setProperty('--border', borderRoot.join(' '));

    // ----------------------------------------------------

    inputDark[0] = hueBase - 9;
    inputDark[1] = 6.5 * 10 * (saturation / 100).toFixed(2) + '%';
    inputDark[2] =
      (
        80 * 0.07 * ((lightness + 65) / 100) +
        (18 - (lighBase / 50) * (18 - 4.1))
      ).toFixed(2) + '%';

    inputRoot[0] = hueBase - 5;

    darkStyles.setProperty('--input', inputDark.join(' '));
    rootStyles.setProperty('--input', inputRoot.join(' '));

    // ----------------------------------------------------

    ringDark = primaryDark;
    ringRoot = primaryRoot;
    darkStyles.setProperty('--ring', ringDark);
    rootStyles.setProperty('--ring', ringRoot);
  };

  const resetThemeCustom = () => {
    setPrimaryColor('#f97316');
    setSecondaryColor('');
    setSaturation(15);
    setLightness(22);
  };

  UpdateColorTheme({
    primaryColor,
    secondaryColor,
    saturation,
    lightness,
  });

  return (
    <WhitelabelContext.Provider
      value={{
        subdomain,
        UpdateColorTheme,
        primaryColor,
        setPrimaryColor,
        secondaryColor,
        setSecondaryColor,
        saturation,
        setSaturation,
        lightness,
        setLightness,
        resetThemeCustom,
      }}
    >
      {children}
    </WhitelabelContext.Provider>
  );
};

export default WhitelabelProvider;

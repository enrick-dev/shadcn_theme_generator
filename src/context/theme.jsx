import { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const ThemeProviderContext = createContext({
  theme: 'system',
  setTheme: () => null,
});
ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
  defaultTheme: PropTypes.oneOf(['dark', 'light', 'system']),
  storageKey: PropTypes.string, // Add validation for storageKey
};
export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = '@Whitelabel:theme',
  ...props
}) {
  const [theme, setTheme] = useState(() => {
    // Retrieve theme from localStorage or use default
    const storedTheme = localStorage.getItem(storageKey);
    return storedTheme ? storedTheme : defaultTheme;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: light)')
        .matches
        ? 'dark'
        : 'light';
      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (newTheme) => {
      localStorage.setItem(storageKey, newTheme);
      setTheme(newTheme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};

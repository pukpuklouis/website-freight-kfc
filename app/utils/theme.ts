import { createContext, useContext } from 'react';

export const themes = {
  light: {
    accent: 'tomato',
    gray: 'mauve'
  },
  dark: {
    accent: 'tomato',
    gray: 'mauve'
  }
} as const;

export type Theme = keyof typeof themes;
export type ThemeColors = typeof themes[Theme];

export const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (theme: Theme) => void;
}>({
  theme: 'light',
  setTheme: () => null,
});

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const getSystemTheme = (): Theme => {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

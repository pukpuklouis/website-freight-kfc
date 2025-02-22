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
  // During SSR or when window is not available, return default theme
  if (typeof window === 'undefined') return 'light';
  
  // On client-side, check system preference
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const getThemeFromCookie = async (request: Request): Promise<Theme> => {
  const cookieHeader = request.headers.get('Cookie');
  const cookies = new URLSearchParams(cookieHeader?.replace(/;\s*/g, '&') ?? '');
  const theme = cookies.get('theme') as Theme | undefined;
  return theme ?? 'light';
};

export const setThemeCookie = (theme: Theme): string => {
  return `theme=${theme}; Path=/; Max-Age=31536000; SameSite=Lax; Secure`;
};

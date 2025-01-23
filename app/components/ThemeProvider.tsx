import { useState, useEffect } from 'react';
import { Theme as RadixTheme } from '@radix-ui/themes';
import { Theme, ThemeContext, getSystemTheme, themes } from '~/utils/theme';
import '@radix-ui/themes/styles.css';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'light';
    return (localStorage.getItem('theme') as Theme) || getSystemTheme();
  });

  useEffect(() => {
    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleThemeChange }}>
      <RadixTheme
        appearance={theme}
        accentColor={themes[theme].accent}
        radius="large"
        hasBackground
      >
        {children}
      </RadixTheme>
    </ThemeContext.Provider>
  );
}

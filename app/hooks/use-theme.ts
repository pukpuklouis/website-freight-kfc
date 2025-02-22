import { useEffect, useState } from 'react';
import { useHydrated } from './use-hydrated';

type Theme = 'light' | 'dark';

export function useTheme() {
  const isHydrated = useHydrated();
  const [theme, setTheme] = useState<Theme>('light');

  // Only run on client-side after hydration
  useEffect(() => {
    if (isHydrated) {
      const savedTheme = localStorage.getItem('theme') as Theme;
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      setTheme(savedTheme || systemTheme);
    }
  }, [isHydrated]);

  // Only update DOM and localStorage after hydration
  useEffect(() => {
    if (isHydrated) {
      const root = document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(theme);
      localStorage.setItem('theme', theme);
    }
  }, [theme, isHydrated]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return { theme, toggleTheme };
}

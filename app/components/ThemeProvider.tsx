import { useState, useEffect } from "react";
import { Theme as RadixTheme } from "@radix-ui/themes";
import {
  Theme,
  ThemeContext,
  getSystemTheme,
  themes,
  setThemeCookie,
} from "~/utils/theme";
import { useHydrated } from "~/hooks/use-hydrated";

export function ThemeProvider({
  children,
  initialTheme = "light",
}: {
  children: React.ReactNode;
  initialTheme?: Theme;
}) {
  const [theme, setTheme] = useState<Theme>(initialTheme);
  const isHydrated = useHydrated();

  useEffect(() => {
    if (isHydrated) {
      const savedTheme = localStorage.getItem("theme") as Theme;
      if (savedTheme) {
        setTheme(savedTheme);
      } else {
        const systemTheme = getSystemTheme();
        setTheme(systemTheme);
      }

      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = (e: MediaQueryListEvent) => {
        if (!localStorage.getItem("theme")) {
          setTheme(e.matches ? "dark" : "light");
        }
      };

      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [isHydrated]);

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    if (isHydrated) {
      localStorage.setItem("theme", newTheme);
      document.cookie = setThemeCookie(newTheme);
    }
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

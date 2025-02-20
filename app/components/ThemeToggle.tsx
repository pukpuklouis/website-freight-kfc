import { IconButton } from "@radix-ui/themes";
import { useTheme } from "~/utils/theme";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { RiMoonFoggyLine, RiSunFoggyLine } from "react-icons/ri";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const ICON_SIZE = 24;

  return (
    <IconButton
      variant="ghost"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label={
        theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
      }
      data-oid="370z-99"
    >
      {theme === "dark" ? (
        <RiMoonFoggyLine size={ICON_SIZE} data-oid=".-wl9hc" />
      ) : (
        <RiSunFoggyLine size={ICON_SIZE} data-oid="ce1u7nw" />
      )}
    </IconButton>
  );
}

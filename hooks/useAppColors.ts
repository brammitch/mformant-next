import { useTheme } from "next-themes";

export function useAppColors() {
  const { theme } = useTheme();

  const isDark = theme === "dark";
  const darkColor = "#222831";
  const lightColor = "#ffffff";

  return {
    isDark,
    backgroundColor: isDark ? darkColor : lightColor,
    color: isDark ? lightColor : darkColor,
  };
}

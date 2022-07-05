import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { useColorScheme } from "@mantine/hooks";
import { ThemeProvider, useTheme } from "next-themes";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import "../styles/globals.css"; // Can only import global stylesheets here

function MyApp({ Component, pageProps }: AppProps) {
  const preferredColorScheme = useColorScheme();
  const { theme } = useTheme();

  const [colorScheme, setColorScheme] =
    useState<ColorScheme>(preferredColorScheme);

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  // next-themes provides colorScheme to Mantine
  useEffect(() => {
    setColorScheme(theme as ColorScheme);
  }, [theme]);

  return (
    <ThemeProvider defaultTheme="system">
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          theme={{ colorScheme }}
          withGlobalStyles
          withNormalizeCSS
        >
          <Component {...pageProps} />
        </MantineProvider>
      </ColorSchemeProvider>
    </ThemeProvider>
  );
}

export default MyApp;

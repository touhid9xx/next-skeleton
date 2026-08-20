"use client";

import { ThemeProvider as NextThemeProvider } from "next-themes";
import { useEffect, useState } from "react";
import { colorPalettes, type ColorPalette } from "./ThemeToggle";

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: string;
  enableSystem?: boolean;
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  enableSystem = true,
}: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timeoutId);

    // Load and apply saved color palette
    const savedPalette = localStorage.getItem("color-palette") as ColorPalette;
    if (savedPalette && savedPalette in colorPalettes) {
      applyPalette(savedPalette);
    }

    // Listen for palette changes
    const handlePaletteChange = (event: StorageEvent) => {
      if (event.key === "color-palette" && event.newValue) {
        applyPalette(event.newValue as ColorPalette);
      }
    };

    window.addEventListener("storage", handlePaletteChange);
    return () => window.removeEventListener("storage", handlePaletteChange);
  }, []);

  const applyPalette = (paletteKey: ColorPalette) => {
    const root = document.documentElement;
    const palette = colorPalettes[paletteKey];

    if (palette) {
      // Update primary color
      root.style.setProperty("--primary", palette.primary);
      root.style.setProperty("--primary-foreground", "hsl(0 0% 100%)");

      // Update chart colors to match palette
      root.style.setProperty("--chart-1", palette.primary);

      // Also update accent colors for consistency
      root.style.setProperty(
        "--accent",
        palette.primaryLight || palette.primary,
      );

      // Update ring color
      root.style.setProperty("--ring", palette.primary);

      // Update sidebar colors
      root.style.setProperty("--sidebar-primary", palette.primary);
      root.style.setProperty("--sidebar-primary-foreground", "hsl(0 0% 100%)");

      // Update gradient
      const gradient = `linear-gradient(135deg, ${palette.primary}, ${palette.primaryLight || palette.primary})`;
      root.style.setProperty("--gradient-primary", gradient);
    }
  };

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <NextThemeProvider
      attribute="data-theme"
      defaultTheme={defaultTheme}
      enableSystem={enableSystem}
      storageKey="theme-preference"
    >
      {children}
    </NextThemeProvider>
  );
}

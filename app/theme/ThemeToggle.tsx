"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sun, Moon, Laptop, Palette } from "lucide-react";
import { cn } from "@/lib/utils";

// Define the palette type
export interface PaletteColors {
  name: string;
  primary: string;
  primaryLight: string;
  primaryDark: string;
  darkPrimary: string;
  darkPrimaryLight: string;
  darkPrimaryDark: string;
}

// Define the palettes object with explicit type
export const colorPalettes: Record<string, PaletteColors> = {
  default: {
    name: "Default",
    primary: "hsl(222.2 47.4% 11.2%)",
    primaryLight: "hsl(222.2 47.4% 80%)",
    primaryDark: "hsl(222.2 47.4% 5%)",
    darkPrimary: "hsl(217.2 91.2% 59.8%)",
    darkPrimaryLight: "hsl(217.2 91.2% 80%)",
    darkPrimaryDark: "hsl(217.2 91.2% 30%)",
  },
  blue: {
    name: "Ocean Blue",
    primary: "hsl(210 100% 50%)",
    primaryLight: "hsl(210 100% 80%)",
    primaryDark: "hsl(210 100% 25%)",
    darkPrimary: "hsl(210 100% 60%)",
    darkPrimaryLight: "hsl(210 100% 85%)",
    darkPrimaryDark: "hsl(210 100% 35%)",
  },
  purple: {
    name: "Royal Purple",
    primary: "hsl(270 100% 50%)",
    primaryLight: "hsl(270 100% 80%)",
    primaryDark: "hsl(270 100% 25%)",
    darkPrimary: "hsl(270 100% 60%)",
    darkPrimaryLight: "hsl(270 100% 85%)",
    darkPrimaryDark: "hsl(270 100% 35%)",
  },
  green: {
    name: "Forest Green",
    primary: "hsl(150 100% 40%)",
    primaryLight: "hsl(150 100% 75%)",
    primaryDark: "hsl(150 100% 20%)",
    darkPrimary: "hsl(150 100% 50%)",
    darkPrimaryLight: "hsl(150 100% 80%)",
    darkPrimaryDark: "hsl(150 100% 30%)",
  },
  orange: {
    name: "Sunset Orange",
    primary: "hsl(25 95% 53%)",
    primaryLight: "hsl(25 95% 80%)",
    primaryDark: "hsl(25 95% 30%)",
    darkPrimary: "hsl(25 95% 60%)",
    darkPrimaryLight: "hsl(25 95% 85%)",
    darkPrimaryDark: "hsl(25 95% 40%)",
  },
  pink: {
    name: "Rose Pink",
    primary: "hsl(340 100% 50%)",
    primaryLight: "hsl(340 100% 80%)",
    primaryDark: "hsl(340 100% 25%)",
    darkPrimary: "hsl(340 100% 60%)",
    darkPrimaryLight: "hsl(340 100% 85%)",
    darkPrimaryDark: "hsl(340 100% 35%)",
  },
} as const;

export type ColorPalette = keyof typeof colorPalettes;

interface ThemeToggleProps {
  className?: string;
  showPalettePicker?: boolean;
}

export function ThemeToggle({
  className,
  showPalettePicker = true,
}: ThemeToggleProps) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [colorPalette, setColorPalette] = useState<ColorPalette>("default");

  // Function to apply palette
  const applyPalette = (paletteKey: ColorPalette) => {
    const root = document.documentElement;
    const palette = colorPalettes[paletteKey];
    const isDark =
      document.documentElement.getAttribute("data-theme") === "dark";

    if (palette) {
      // Apply colors based on theme
      if (isDark) {
        root.style.setProperty("--primary", palette.darkPrimary);
        root.style.setProperty("--primary-light", palette.darkPrimaryLight);
        root.style.setProperty("--primary-dark", palette.darkPrimaryDark);
        root.style.setProperty("--ring", palette.darkPrimary);
        root.style.setProperty("--chart-1", palette.darkPrimary);
        root.style.setProperty("--sidebar-primary", palette.darkPrimary);
        root.style.setProperty(
          "--gradient-primary",
          `linear-gradient(135deg, ${palette.darkPrimary}, ${palette.darkPrimaryDark})`,
        );
      } else {
        root.style.setProperty("--primary", palette.primary);
        root.style.setProperty("--primary-light", palette.primaryLight);
        root.style.setProperty("--primary-dark", palette.primaryDark);
        root.style.setProperty("--ring", palette.primary);
        root.style.setProperty("--chart-1", palette.primary);
        root.style.setProperty("--sidebar-primary", palette.primary);
        root.style.setProperty(
          "--gradient-primary",
          `linear-gradient(135deg, ${palette.primary}, ${palette.primaryLight})`,
        );
      }

      root.style.setProperty("--primary-foreground", "hsl(0 0% 100%)");
      root.style.setProperty("--sidebar-primary-foreground", "hsl(0 0% 100%)");

      // Also update accent colors
      root.style.setProperty(
        "--accent",
        isDark ? palette.darkPrimaryLight : palette.primaryLight,
      );
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timeoutId);

    // Load saved color palette from localStorage
    const savedPalette = localStorage.getItem("color-palette") as ColorPalette;
    if (savedPalette && savedPalette in colorPalettes) {
      setColorPalette(savedPalette);
      applyPalette(savedPalette);
    }
  }, []);

  // Watch for theme changes to update palette colors
  useEffect(() => {
    if (mounted) {
      const observer = new MutationObserver(() => {
        if (colorPalette) {
          applyPalette(colorPalette);
        }
      });

      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["data-theme"],
      });

      return () => observer.disconnect();
    }
  }, [mounted, colorPalette]);

  if (!mounted) {
    return null;
  }

  const handlePaletteChange = (palette: ColorPalette) => {
    setColorPalette(palette);
    applyPalette(palette);
    localStorage.setItem("color-palette", palette);
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="h-10 w-10 relative">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem onClick={() => setTheme("light")}>
            <Sun className="mr-2 h-4 w-4" />
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            <Moon className="mr-2 h-4 w-4" />
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            <Laptop className="mr-2 h-4 w-4" />
            System
          </DropdownMenuItem>

          {showPalettePicker && (
            <>
              <div className="h-px my-1 bg-border" />
              <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground flex items-center gap-2">
                <Palette className="h-3 w-3" />
                Color Palette
              </div>
              <div className="grid grid-cols-3 gap-1 px-2 pb-2">
                {(Object.keys(colorPalettes) as ColorPalette[]).map((key) => {
                  const palette = colorPalettes[key];
                  const isActive = colorPalette === key;
                  const isDark =
                    document.documentElement.getAttribute("data-theme") ===
                    "dark";
                  const color = isDark ? palette.darkPrimary : palette.primary;

                  return (
                    <button
                      key={key}
                      onClick={() => handlePaletteChange(key)}
                      className={cn(
                        "flex flex-col items-center gap-1 p-1 rounded-md hover:bg-accent transition-colors",
                        isActive && "ring-2 ring-primary ring-offset-2",
                      )}
                    >
                      <div
                        className="w-8 h-8 rounded-full border border-border"
                        style={{ backgroundColor: color }}
                      />
                      <span className="text-[10px] text-muted-foreground">
                        {palette.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

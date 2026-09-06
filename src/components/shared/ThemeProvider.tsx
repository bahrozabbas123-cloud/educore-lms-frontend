"use client";

import { createContext, useEffect, useState, type ReactNode } from "react";

export type Theme = "light" | "dark" | "system";

interface ThemeContextValue {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextValue | undefined>(
  undefined
);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("dark");
  const [mounted, setMounted] = useState(false);

  // On first mount, read any previously saved preference from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("educore-theme") as Theme | null;
    if (saved === "light" || saved === "dark" || saved === "system") setTheme(saved);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const applyTheme = () => {
      const nextTheme = theme === "system" ? (media.matches ? "dark" : "light") : theme;
      setResolvedTheme(nextTheme);
      root.classList.toggle("dark", nextTheme === "dark");
    };

    applyTheme();
    if (theme === "system") media.addEventListener("change", applyTheme);
    localStorage.setItem("educore-theme", theme);

    return () => media.removeEventListener("change", applyTheme);
  }, [theme, mounted]);

  const updateTheme = (nextTheme: Theme) => setTheme(nextTheme);

  const toggleTheme = () => {
    setTheme((prev) => {
      if (prev === "system") return resolvedTheme === "dark" ? "light" : "dark";
      return prev === "dark" ? "light" : "dark";
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme: updateTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

"use client";

import { useContext } from "react";
import { ThemeContext } from "@/components/shared/ThemeProvider";

/**
 * Access the current theme ("light" | "dark") and a toggleTheme() function.
 * Must be used inside <ThemeProvider>, which wraps the app in src/app/layout.tsx.
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

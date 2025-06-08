"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme | null;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setThemeState] = useState<Theme | null>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    if (savedTheme) {
      setThemeState(savedTheme);
    } else {
      setThemeState(prefersDark ? "dark" : "light");
    }
  }, []);
  const setTheme = (newTheme: Theme) => {
    const root = window.document.documentElement;

    root.classList.remove(newTheme === "dark" ? "light" : "dark");
    root.classList.add(newTheme);

    localStorage.setItem("theme", newTheme);
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

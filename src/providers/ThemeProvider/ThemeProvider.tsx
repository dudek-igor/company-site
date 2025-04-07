'use client';
import { defaultTheme, themeLocalStorageKey, supportedThemes } from '@/config';
import React, { createContext, useCallback, use, useEffect, useState } from 'react';

type SupportedThemesType = (typeof supportedThemes)[number];

type ThemeContextType = {
  theme: SupportedThemesType | '';
  setThemeState: (theme: SupportedThemesType) => void;
};

const initialContext: ThemeContextType = {
  theme: '',
  setThemeState: () => null,
};
/**
 * Theme Context for persisted state
 */
const ThemeContext = createContext(initialContext);
/**
 * Type Guard
 */
function isSupportedTheme(theme: unknown): theme is SupportedThemesType {
  return typeof theme === 'string' && supportedThemes.some((supportedTheme) => supportedTheme === theme);
}
/**
 * Create theme provider
 */
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<SupportedThemesType | ''>('');

  const setThemeState = useCallback((themeToSet: SupportedThemesType) => {
    setTheme(themeToSet);
  }, []);

  useEffect(() => {
    const themeFromLocalStorage = localStorage.getItem(themeLocalStorageKey);
    if (isSupportedTheme(themeFromLocalStorage)) return setTheme(themeFromLocalStorage);
    return setTheme(defaultTheme);
  }, []);

  useEffect(() => {
    if (isSupportedTheme(theme)) {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem(themeLocalStorageKey, theme);
    }
  }, [theme]);

  return <ThemeContext value={{ theme, setThemeState }}>{children}</ThemeContext>;
};
/**
 * Export context as a hook
 */
export const useTheme = (): ThemeContextType => use(ThemeContext);

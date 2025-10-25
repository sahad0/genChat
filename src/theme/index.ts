import {lightTheme, darkTheme, Theme} from './colors';
import {typography} from './typography';
import {spacing} from './spacing';
import {shadows} from './shadows';

export {lightTheme, darkTheme, typography, spacing, shadows};
export type {Theme};

// Default theme (dark for modern look)
export const defaultTheme = darkTheme;

// Theme context type
export interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
}

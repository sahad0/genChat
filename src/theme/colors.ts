export const lightTheme = {
  // Primary colors - Based on SVG design
  primary: '#4F4D4C',
  primaryDark: '#2E2E2C',
  primaryLight: '#5D5C5B',

  // Background colors - Cream palette from SVG
  background: '#FBFAF0',
  surface: '#FAF9EF',
  surfaceElevated: '#F8F7EE',

  // Text colors - Dark tones from SVG
  text: '#121111',
  textSecondary: '#4F4D4C',
  textTertiary: '#5D5C5B',

  // Border colors - Subtle cream tones
  border: '#E2E2DA',
  borderLight: '#F0EFE8',

  // Status colors - Vibrant accents from SVG
  success: '#73B879',
  warning: '#EFCA28',
  error: '#D1ACC6',
  info: '#4F4D4C',

  // Chat specific - Clean messaging
  userBubble: '#FAF9EF',
  aiBubble: '#4F4D4C',
  userText: '#121111',
  aiText: '#FBFAF0',

  // Memory tags - Subtle accent
  memoryTag: '#F0EFE8',
  memoryTagText: '#4F4D4C',
  memoryTagBorder: '#E2E2DA',

  // Premium accents - From SVG design
  accent: '#EFCA28',
  accentLight: '#F0EFE8',
  accentDark: '#4F4D4C',

  // Brand colors from the SVG design
  yellow: '#EFCA28',
  pink: '#D1ACC6',
  green: '#73B879',
  purple: '#4F4D4C',
};

export const darkTheme = {
  // Primary colors - Clean and modern
  primary: '#000000',
  primaryDark: '#1a1a1a',
  primaryLight: '#333333',

  // Background colors - Light cream with subtle grid
  background: '#faf9f6',
  surface: '#ffffff',
  surfaceElevated: '#f8f7f4',

  // Text colors - High contrast for readability
  text: '#000000',
  textSecondary: '#666666',
  textTertiary: '#999999',

  // Border colors - Subtle but defined
  border: '#e5e5e5',
  borderLight: '#f0f0f0',

  // Status colors - Vibrant accents
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',

  // Chat specific - Clean messaging
  userBubble: '#ffffff',
  aiBubble: '#374151',
  userText: '#000000',
  aiText: '#ffffff',

  // Memory tags - Subtle accent
  memoryTag: '#f3f4f6',
  memoryTagText: '#374151',
  memoryTagBorder: '#d1d5db',

  // Premium accents - Colorful highlights
  accent: '#fbbf24',
  accentLight: '#fcd34d',
  accentDark: '#f59e0b',

  // Brand colors from the design
  yellow: '#fbbf24',
  pink: '#ec4899',
  green: '#10b981',
  purple: '#8b5cf6',
};

export type Theme = typeof lightTheme;

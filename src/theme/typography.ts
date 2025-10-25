import {TextStyle} from 'react-native';

export const typography = {
  // Headers - Premium business typography
  h1: {
    fontSize: 32,
    fontWeight: '700' as TextStyle['fontWeight'],
    lineHeight: 40,
    letterSpacing: -0.8,
  },
  h2: {
    fontSize: 28,
    fontWeight: '600' as TextStyle['fontWeight'],
    lineHeight: 36,
    letterSpacing: -0.6,
  },
  h3: {
    fontSize: 24,
    fontWeight: '600' as TextStyle['fontWeight'],
    lineHeight: 32,
    letterSpacing: -0.4,
  },
  h4: {
    fontSize: 20,
    fontWeight: '600' as TextStyle['fontWeight'],
    lineHeight: 28,
    letterSpacing: -0.2,
  },

  // Body text
  bodyLarge: {
    fontSize: 18,
    fontWeight: '400' as TextStyle['fontWeight'],
    lineHeight: 28,
    letterSpacing: 0,
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as TextStyle['fontWeight'],
    lineHeight: 24,
    letterSpacing: 0,
  },
  bodySmall: {
    fontSize: 14,
    fontWeight: '400' as TextStyle['fontWeight'],
    lineHeight: 20,
    letterSpacing: 0,
  },

  // Labels
  label: {
    fontSize: 14,
    fontWeight: '500' as TextStyle['fontWeight'],
    lineHeight: 20,
    letterSpacing: 0.1,
  },
  labelSmall: {
    fontSize: 12,
    fontWeight: '500' as TextStyle['fontWeight'],
    lineHeight: 16,
    letterSpacing: 0.1,
  },

  // Captions
  caption: {
    fontSize: 12,
    fontWeight: '400' as TextStyle['fontWeight'],
    lineHeight: 16,
    letterSpacing: 0.25,
  },
  captionSmall: {
    fontSize: 10,
    fontWeight: '400' as TextStyle['fontWeight'],
    lineHeight: 14,
    letterSpacing: 0.4,
  },

  // Buttons
  button: {
    fontSize: 16,
    fontWeight: '600' as TextStyle['fontWeight'],
    lineHeight: 24,
    letterSpacing: 0,
  },
  buttonSmall: {
    fontSize: 14,
    fontWeight: '600' as TextStyle['fontWeight'],
    lineHeight: 20,
    letterSpacing: 0,
  },
};

// src/theme/colors.js
// Central color palette + typography scale used across the whole app.
// Keeping this in one file makes it trivial to re-theme the app later
// (e.g. for the "dark mode toggle" bonus feature).

export const colors = {
  primaryDark: '#101828',
  primaryGreen: '#26C281',
  accentOrange: '#FF8A3D',
  lightBackground: '#F6F8FA',
  cardBackground: '#FFFFFF',
  mutedText: '#667085',
  white: '#FFFFFF',
  black: '#000000',
  border: '#E4E7EC',
  danger: '#F04438',

  // Subtle tints, derived from the base palette, used for icon chips etc.
  greenTint: '#E4F9F0',
  orangeTint: '#FFEEE1',
  darkTint: 'rgba(16, 24, 40, 0.06)',
};

export const typography = {
  h1: { fontSize: 28, fontWeight: '700' },
  h2: { fontSize: 22, fontWeight: '700' },
  h3: { fontSize: 18, fontWeight: '600' },
  body: { fontSize: 15, fontWeight: '400' },
  bodyBold: { fontSize: 15, fontWeight: '600' },
  small: { fontSize: 13, fontWeight: '400' },
  caption: { fontSize: 11, fontWeight: '500' },
};

export const radius = {
  sm: 10,
  md: 16,
  lg: 22,
  pill: 999,
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export default colors;

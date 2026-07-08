import { TextStyle } from 'react-native';
import { ThemeColors } from '../types';

export const lightColors: ThemeColors = {
  primaryDark: '#101828',
  primaryGreen: '#26C281',
  accentOrange: '#FF8A3D',
  background: '#F6F8FA',
  cardBackground: '#FFFFFF',
  mutedText: '#667085',
  text: '#101828',
  white: '#FFFFFF',
  black: '#000000',
  border: '#E4E7EC',
  danger: '#F04438',
  greenTint: '#E4F9F0',
  orangeTint: '#FFEEE1',
  darkTint: 'rgba(16, 24, 40, 0.06)',
  overlay: 'rgba(16,24,40,0.45)',
};

export const darkColors: ThemeColors = {
  primaryDark: '#0B0F17',
  primaryGreen: '#2FE0A0',
  accentOrange: '#FF9D5C',
  background: '#0B0F17',
  cardBackground: '#171C26',
  mutedText: '#98A2B3',
  text: '#F2F4F7',
  white: '#FFFFFF',
  black: '#000000',
  border: '#2A303C',
  danger: '#F97066',
  greenTint: 'rgba(47, 224, 160, 0.14)',
  orangeTint: 'rgba(255, 157, 92, 0.14)',
  darkTint: 'rgba(255, 255, 255, 0.06)',
  overlay: 'rgba(0,0,0,0.55)',
};

export const colors = lightColors;

export const typography: Record<string, TextStyle> = {
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
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

export default colors;

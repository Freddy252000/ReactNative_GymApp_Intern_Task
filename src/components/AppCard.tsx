import React, { ReactNode, useMemo } from 'react';
import { View, Pressable, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { radius } from '../theme/colors';
import { useTheme } from '../theme/ThemeContext';
import { ThemeColors } from '../types';

interface AppCardProps {
  children: ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  dark?: boolean;
}

export default function AppCard({ children, onPress, style, dark = false }: AppCardProps) {
  const { colors, isDark } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const cardStyle: StyleProp<ViewStyle>[] = [styles.card, dark && styles.dark, style];

  if (onPress) {
    return (
      <Pressable onPress={onPress} style={({ pressed }) => [...cardStyle, pressed && styles.pressed]}>
        {children}
      </Pressable>
    );
  }

  return <View style={cardStyle}>{children}</View>;
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    card: {
      backgroundColor: colors.cardBackground,
      borderRadius: radius.md,
      padding: 16,
      shadowColor: '#101828',
      shadowOpacity: 0.06,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 4 },
      elevation: 2,
    },
    dark: {
      backgroundColor: colors.primaryDark,
    },
    pressed: {
      opacity: 0.9,
    },
  });

import React, { ReactNode } from 'react';
import { View, Pressable, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { colors, radius } from '../theme/colors';

interface AppCardProps {
  children: ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  dark?: boolean;
}

/**
 * Generic card container. Pass onPress to make it tappable,
 * otherwise it renders as a plain static card.
 */
export default function AppCard({ children, onPress, style, dark = false }: AppCardProps) {
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

const styles = StyleSheet.create({
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

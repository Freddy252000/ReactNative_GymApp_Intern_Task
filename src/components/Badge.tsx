import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { radius, typography } from '../theme/colors';
import { useTheme } from '../theme/ThemeContext';
import { ThemeColors } from '../types';

type BadgeTone = 'green' | 'orange' | 'dark' | 'light';

interface BadgeProps {
  label: string;
  tone?: BadgeTone;
}

export default function Badge({ label, tone = 'green' }: BadgeProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const toneStyles: Record<BadgeTone, { backgroundColor: string; color: string }> = {
    green: { backgroundColor: colors.greenTint, color: colors.primaryGreen },
    orange: { backgroundColor: colors.orangeTint, color: colors.accentOrange },
    dark: { backgroundColor: 'rgba(255,255,255,0.15)', color: colors.white },
    light: { backgroundColor: colors.darkTint, color: colors.text },
  };
  const t = toneStyles[tone] ?? toneStyles.green;

  return (
    <View style={[styles.badge, { backgroundColor: t.backgroundColor }]}>
      <Text style={[styles.text, { color: t.color }]}>{label}</Text>
    </View>
  );
}

const createStyles = (_colors: ThemeColors) =>
  StyleSheet.create({
    badge: {
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: radius.pill,
      alignSelf: 'flex-start',
    },
    text: {
      ...typography.caption,
    },
  });

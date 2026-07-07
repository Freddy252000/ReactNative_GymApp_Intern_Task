// src/components/Badge.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, radius, typography } from '../theme/colors';

/**
 * Small pill badge used for workout level, category tags, etc.
 * tone: 'green' | 'orange' | 'dark' | 'light'
 */
export default function Badge({ label, tone = 'green' }) {
  const toneStyles = {
    green: { backgroundColor: colors.greenTint, color: '#0F8A5F' },
    orange: { backgroundColor: colors.orangeTint, color: '#C15A15' },
    dark: { backgroundColor: 'rgba(255,255,255,0.15)', color: colors.white },
    light: { backgroundColor: colors.darkTint, color: colors.primaryDark },
  };

  const t = toneStyles[tone] || toneStyles.green;

  return (
    <View style={[styles.badge, { backgroundColor: t.backgroundColor }]}>
      <Text style={[styles.text, { color: t.color }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
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

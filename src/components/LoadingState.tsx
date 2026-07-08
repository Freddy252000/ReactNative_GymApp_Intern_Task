import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { typography } from '../theme/colors';

interface LoadingStateProps {
  message?: string;
  inline?: boolean;
}

export default function LoadingState({ message = 'Loading…', inline = false }: LoadingStateProps) {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, inline ? styles.inline : styles.fullscreen]}>
      <ActivityIndicator size="small" color={colors.primaryGreen} />
      <Text style={[styles.message, { color: colors.mutedText }]}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center' },
  fullscreen: { flex: 1, paddingVertical: 60 },
  inline: { paddingVertical: 24 },
  message: { ...typography.small, marginTop: 10 },
});

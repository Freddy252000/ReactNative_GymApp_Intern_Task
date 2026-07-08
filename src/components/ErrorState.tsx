import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useTheme } from '../theme/ThemeContext';
import { typography } from '../theme/colors';
import AppButton from './AppButton';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}
export default function ErrorState({ title = 'Something went wrong', message, onRetry }: ErrorStateProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <View style={[styles.iconWrap, { backgroundColor: 'rgba(240,68,56,0.1)' }]}>
        <Ionicons name="alert-circle-outline" size={30} color={colors.danger} />
      </View>
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      {message ? <Text style={[styles.message, { color: colors.mutedText }]}>{message}</Text> : null}
      {onRetry ? <AppButton title="Try again" variant="outline" onPress={onRetry} style={styles.action} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center', paddingVertical: 48, paddingHorizontal: 24 },
  iconWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  title: { ...typography.bodyBold, textAlign: 'center' },
  message: { ...typography.small, textAlign: 'center', marginTop: 6, lineHeight: 18 },
  action: { marginTop: 18, height: 44, paddingHorizontal: 24 },
});

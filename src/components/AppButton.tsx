import React from 'react';
import { Pressable, Text, StyleSheet, ActivityIndicator, View, StyleProp, ViewStyle, TextStyle } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { colors, radius, typography } from '../theme/colors';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';

interface AppButtonProps {
  title: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  icon?: string;
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * Reusable button used across the whole app.
 */
export default function AppButton({
  title,
  onPress,
  variant = 'primary',
  icon,
  loading = false,
  disabled = false,
  style,
}: AppButtonProps) {
  const containerStyle: StyleProp<ViewStyle>[] = [
    styles.base,
    variant === 'primary' && styles.primary,
    variant === 'secondary' && styles.secondary,
    variant === 'outline' && styles.outline,
    variant === 'ghost' && styles.ghost,
    disabled && styles.disabled,
    style,
  ];

  const textStyle: TextStyle[] = [
    styles.text,
    variant === 'outline' ? { color: colors.white } : undefined,
    variant === 'ghost' ? { color: colors.primaryDark } : undefined,
  ].filter(Boolean) as TextStyle[];

  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      style={({ pressed }) => [...containerStyle, pressed && !disabled && styles.pressed]}
      android_ripple={{ color: 'rgba(255,255,255,0.15)' }}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'ghost' ? colors.primaryDark : colors.white} />
      ) : (
        <View style={styles.content}>
          <Text style={textStyle}>{title}</Text>
          {icon ? (
            <Ionicons name={icon} size={18} color={textStyle[1]?.color ?? colors.white} style={{ marginLeft: 8 }} />
          ) : null}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 54,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: colors.primaryGreen,
  },
  secondary: {
    backgroundColor: colors.accentOrange,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  ghost: {
    backgroundColor: colors.darkTint,
  },
  disabled: {
    opacity: 0.5,
  },
  pressed: {
    opacity: 0.85,
  },
  text: {
    ...typography.bodyBold,
    color: colors.white,
  },
});

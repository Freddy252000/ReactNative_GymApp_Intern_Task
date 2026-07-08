import React, { useMemo } from 'react';
import { Pressable, Text, StyleSheet, ActivityIndicator, View, StyleProp, ViewStyle, TextStyle } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { radius, typography } from '../theme/colors';
import { useTheme } from '../theme/ThemeContext';
import { ThemeColors } from '../types';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

interface AppButtonProps {
  title: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  icon?: IoniconName;
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

export default function AppButton({
  title,
  onPress,
  variant = 'primary',
  icon,
  loading = false,
  disabled = false,
  style,
}: AppButtonProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
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
    variant === 'ghost' ? { color: colors.primaryGreen } : undefined,
  ].filter(Boolean) as TextStyle[];
  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      style={({ pressed }) => [...containerStyle, pressed && !disabled && styles.pressed]}
      android_ripple={{ color: 'rgba(255,255,255,0.15)' }}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'ghost' || variant === 'outline' ? colors.primaryDark : colors.white} />
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

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
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
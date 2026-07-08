import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { typography } from '../theme/colors';
import { useTheme } from '../theme/ThemeContext';

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

interface ScreenHeaderProps {
  title: string;
  onBack?: () => void;
  rightIcon?: IoniconName;
  onRightPress?: () => void;
  dark?: boolean;
}
export default function ScreenHeader({ title, onBack, rightIcon, onRightPress, dark = false }: ScreenHeaderProps) {
  const { colors } = useTheme();
  const textColor = dark ? colors.white : colors.text;
  return (
    <View style={styles.row}>
      {onBack ? (
        <Pressable onPress={onBack} hitSlop={12} style={styles.iconBtn}>
          <Ionicons name="arrow-back" size={22} color={textColor} />
        </Pressable>
      ) : (
        <View style={styles.iconBtn} />
      )}
      <Text style={[styles.title, { color: textColor }]} numberOfLines={1}>
        {title}
      </Text>
      {rightIcon ? (
        <Pressable onPress={onRightPress} hitSlop={12} style={styles.iconBtn}>
          <Ionicons name={rightIcon} size={22} color={textColor} />
        </Pressable>
      ) : (
        <View style={styles.iconBtn} />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  title: {
    ...typography.h2,
    flex: 1,
    textAlign: 'left',
    marginLeft: 4,
  },
  iconBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
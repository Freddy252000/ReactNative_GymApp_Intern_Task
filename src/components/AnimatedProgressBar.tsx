import React, { useEffect, useRef } from 'react';
import { Animated, View, StyleSheet, Easing } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { radius } from '../theme/colors';

interface AnimatedProgressBarProps {
  percent: number;
  height?: number;
  color?: string;
  trackColor?: string;
  vertical?: boolean;
  duration?: number;
}

export default function AnimatedProgressBar({
  percent,
  height = 8,
  color,
  trackColor,
  vertical = false,
  duration = 700,
}: AnimatedProgressBarProps) {
  const { colors } = useTheme();
  const clamped = Math.max(0, Math.min(100, percent));
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: clamped,
      duration,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [clamped, duration, anim]);

  const fillColor = color ?? colors.primaryGreen;
  const track = trackColor ?? colors.darkTint;

  if (vertical) {
    return (
      <View style={[styles.verticalTrack, { backgroundColor: track }]}>
        <Animated.View
          style={[
            styles.verticalFill,
            {
              backgroundColor: fillColor,
              height: anim.interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'] }),
            },
          ]}
        />
      </View>
    );
  }

  return (
    <View style={[styles.track, { height, backgroundColor: track }]}>
      <Animated.View
        style={[
          styles.fill,
          {
            height,
            backgroundColor: fillColor,
            width: anim.interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'] }),
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    width: '100%',
    borderRadius: radius.pill,
    overflow: 'hidden',
  },
  fill: {
    borderRadius: radius.pill,
  },
  verticalTrack: {
    width: 14,
    height: 110,
    borderRadius: 7,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  verticalFill: {
    width: '100%',
    borderRadius: 7,
  },
});

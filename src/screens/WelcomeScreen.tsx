import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AppButton from '../components/AppButton';
import { typography } from '../theme/colors';
import { useTheme } from '../theme/ThemeContext';
import { RootStackParamList, ThemeColors } from '../types';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

const HERO_IMAGE = 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=1200';

export default function WelcomeScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.container}>
      <ImageBackground source={{ uri: HERO_IMAGE }} style={styles.hero} resizeMode="cover">
        <View style={styles.heroOverlay} />
      </ImageBackground>

      <SafeAreaView style={styles.content}>
        <View style={styles.logoRow}>
          <View style={styles.logoDumbbell} />
          <Text style={styles.logoText}>
            GYM<Text style={{ color: colors.primaryGreen }}>FLOW</Text>
          </Text>
        </View>

        <Text style={styles.headline}>
          Train smarter,{'\n'}feel <Text style={{ color: colors.primaryGreen }}>stronger.</Text>
        </Text>
        <Text style={styles.subtitle}>
          A modern fitness app for workouts, progress tracking, and daily gym motivation.
        </Text>

        <View style={{ marginTop: 24 }}>
          <AppButton title="Get Started" icon="arrow-forward" onPress={() => navigation.navigate('Login')} />
          <View style={{ height: 12 }} />
          <AppButton title="I already have an account" variant="outline" onPress={() => navigation.navigate('Login')} />
        </View>

        <View style={styles.dots}>
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
      </SafeAreaView>
    </View>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.primaryDark,
    },
    hero: {
      height: '45%',
      width: '100%',
    },
    heroOverlay: {
      ...(StyleSheet as any).absoluteFillObject,
      backgroundColor: colors.overlay,
    },
    content: {
      flex: 1,
      paddingHorizontal: 24,
      marginTop: -40,
    },
    logoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'center',
      marginBottom: 24,
    },
    logoDumbbell: {
      width: 10,
      height: 26,
      borderRadius: 4,
      backgroundColor: colors.primaryGreen,
      marginRight: 8,
    },
    logoText: {
      fontSize: 26,
      fontWeight: '800',
      color: colors.white,
      letterSpacing: 1,
    },
    headline: {
      ...typography.h1,
      fontSize: 32,
      color: colors.white,
      lineHeight: 40,
    },
    subtitle: {
      ...typography.body,
      color: colors.mutedText,
      marginTop: 12,
      lineHeight: 22,
    },
    dots: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 'auto',
      marginBottom: 16,
    },
    dot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: '#344054',
      marginHorizontal: 4,
    },
    dotActive: {
      backgroundColor: colors.primaryGreen,
      width: 18,
    },
  });

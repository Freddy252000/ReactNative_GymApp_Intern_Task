import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ImageBackground } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AppButton from '../components/AppButton';
import { colors, typography } from '../theme/colors';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

export default function WelcomeScreen({ navigation }: Props) {
  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200' }}
      style={styles.background}
    >
      <View style={styles.overlay} />
      <SafeAreaView style={styles.safe}>
        <View style={styles.content}>
          <Text style={styles.title}>GymFlow</Text>
          <Text style={styles.subtitle}>Track workouts. Build habits. See real progress.</Text>
          <AppButton title="Get Started" onPress={() => navigation.navigate('Login')} style={styles.button} />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(16,24,40,0.55)',
  },
  safe: { flex: 1, justifyContent: 'flex-end' },
  content: { padding: 24, paddingBottom: 40 },
  title: { ...typography.h1, color: colors.white, fontSize: 34 },
  subtitle: { ...typography.body, color: '#E4E7EC', marginTop: 8, marginBottom: 24 },
  button: { alignSelf: 'stretch' },
});

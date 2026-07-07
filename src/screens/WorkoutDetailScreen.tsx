import React from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, SafeAreaView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AppButton from '../components/AppButton';
import AppCard from '../components/AppCard';
import ScreenHeader from '../components/ScreenHeader';
import { colors, typography, radius } from '../theme/colors';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'WorkoutDetail'>;

export default function WorkoutDetailScreen({ route, navigation }: Props) {
  const { workout } = route.params;

  return (
    <View style={styles.flex}>
      <ImageBackground source={{ uri: workout.image }} style={styles.hero}>
        <View style={styles.heroOverlay} />
        <SafeAreaView>
          <View style={styles.headerPad}>
            <ScreenHeader title="" onBack={() => navigation.goBack()} dark />
          </View>
        </SafeAreaView>
        <View style={styles.heroText}>
          <Text style={styles.heroTitle}>{workout.title}</Text>
          <Text style={styles.heroMeta}>
            {workout.duration} min • {workout.level} • {workout.calories} kcal
          </Text>
        </View>
      </ImageBackground>

      <ScrollView contentContainerStyle={styles.body}>
        <Text style={styles.sectionTitle}>Overview</Text>
        <Text style={styles.description}>{workout.description}</Text>

        <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Exercises</Text>
        {workout.exercises.map((exercise, index) => (
          <AppCard key={exercise.id} style={styles.exerciseCard}>
            <View style={styles.exerciseRow}>
              <View style={styles.exerciseIndex}>
                <Text style={styles.exerciseIndexText}>{index + 1}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.exerciseName}>{exercise.name}</Text>
                <Text style={styles.exerciseDetail}>{exercise.duration ?? exercise.detail}</Text>
              </View>
            </View>
          </AppCard>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <AppButton title="Start Workout" icon="play" onPress={() => {}} style={styles.startButton} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.lightBackground },
  hero: { height: 280, justifyContent: 'flex-end' },
  heroOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(16,24,40,0.45)' },
  headerPad: { paddingHorizontal: 20, paddingTop: 8 },
  heroText: { padding: 20 },
  heroTitle: { ...typography.h1, color: colors.white },
  heroMeta: { ...typography.small, color: '#E4E7EC', marginTop: 6 },
  body: { padding: 20, paddingBottom: 100 },
  sectionTitle: { ...typography.h3, color: colors.primaryDark, marginBottom: 8 },
  description: { ...typography.body, color: colors.mutedText, lineHeight: 22 },
  exerciseCard: { marginBottom: 10 },
  exerciseRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  exerciseIndex: {
    width: 32,
    height: 32,
    borderRadius: radius.sm,
    backgroundColor: colors.greenTint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  exerciseIndexText: { ...typography.bodyBold, color: '#0F8A5F' },
  exerciseName: { ...typography.bodyBold, color: colors.primaryDark },
  exerciseDetail: { ...typography.small, color: colors.mutedText, marginTop: 2 },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: colors.lightBackground,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  startButton: { alignSelf: 'stretch' },
});

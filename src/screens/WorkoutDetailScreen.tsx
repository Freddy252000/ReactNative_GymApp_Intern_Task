import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Pressable } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AppButton from '../components/AppButton';
import Badge from '../components/Badge';
import AnimatedProgressBar from '../components/AnimatedProgressBar';
import { typography, radius } from '../theme/colors';
import { useTheme } from '../theme/ThemeContext';
import { useAppData } from '../context/AppDataContext';
import { RootStackParamList, ThemeColors } from '../types';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = NativeStackScreenProps<RootStackParamList, 'WorkoutDetail'>;
type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

export default function WorkoutDetailScreen({ route, navigation }: Props) {
  const { workout } = route.params;
  const { colors } = useTheme();
  const { isFavorite, toggleFavorite, addCompletion } = useAppData();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const [isCompleted, setIsCompleted] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const favorite = isFavorite(workout.id);
  const progressPercent = isCompleted ? 100 : isStarted ? 60 : 0;

  const handleComplete = () => {
    setIsCompleted(true);
    addCompletion(workout);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        <View style={styles.imageWrap}>
          <Image source={{ uri: workout.image }} style={styles.image} />
          <View style={styles.imageOverlay} />

          <SafeAreaView style={styles.topBar}>
            <Pressable onPress={() => navigation.goBack()} style={styles.circleBtn}>
              <Ionicons name="arrow-back" size={20} color={colors.white} />
            </Pressable>
            <Pressable onPress={() => toggleFavorite(workout.id)} style={styles.circleBtn}>
              <Ionicons name={favorite ? 'heart' : 'heart-outline'} size={20} color={favorite ? colors.danger : colors.white} />
            </Pressable>
          </SafeAreaView>

          <View style={styles.imageBottom}>
            <Text style={styles.workoutTitle}>{workout.title}</Text>
            <View style={styles.metaRow}>
              <MetaChip icon="time-outline" label={`${workout.duration} min`} />
              <MetaChip icon="speedometer-outline" label={workout.level} />
              <MetaChip icon="flame-outline" label={`${workout.calories} kcal`} />
            </View>
          </View>

          {!isCompleted && (
            <Pressable style={styles.playBtn} onPress={() => setIsStarted(true)}>
              <Ionicons name="play" size={26} color={colors.white} />
            </Pressable>
          )}
        </View>

        <View style={styles.body}>
          {(isStarted || isCompleted) && (
            <View style={styles.progressWrap}>
              <View style={styles.progressLabelRow}>
                <Text style={styles.progressLabel}>{isCompleted ? 'Workout complete' : 'In progress'}</Text>
                <Text style={styles.progressPercent}>{progressPercent}%</Text>
              </View>
              <AnimatedProgressBar percent={progressPercent} color={isCompleted ? colors.primaryGreen : colors.accentOrange} />
            </View>
          )}

          {workout.description ? <Text style={styles.description}>{workout.description}</Text> : null}

          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>Exercises</Text>
            <Badge label={`${workout.exercises.length} moves`} tone="light" />
          </View>

          {workout.exercises.map((exercise, index) => (
            <View key={exercise.id} style={styles.exerciseRow}>
              <View style={styles.exerciseIndex}>
                <Text style={styles.exerciseIndexText}>{index + 1}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.exerciseName}>{exercise.name}</Text>
                <Text style={styles.exerciseDetail}>{exercise.detail}</Text>
              </View>
              <Ionicons name="reorder-three-outline" size={20} color={colors.mutedText} />
            </View>
          ))}

          {isStarted && !isCompleted && (
            <View style={styles.inProgressBanner}>
              <Ionicons name="timer-outline" size={16} color={colors.primaryGreen} />
              <Text style={styles.inProgressText}>Workout in progress — you've got this!</Text>
            </View>
          )}

          {isCompleted && (
            <View style={styles.completedBanner}>
              <Ionicons name="checkmark-circle" size={16} color={colors.primaryGreen} />
              <Text style={styles.inProgressText}>Saved to your workout history.</Text>
            </View>
          )}

          <View style={{ marginTop: 24 }}>
            <AppButton
              title={isCompleted ? 'Completed ✓' : 'Mark as Completed'}
              icon={isCompleted ? undefined : 'checkmark'}
              onPress={handleComplete}
              disabled={isCompleted}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

interface MetaChipProps {
  icon: IoniconName;
  label: string;
}

function MetaChip({ icon, label }: MetaChipProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  return (
    <View style={styles.metaChip}>
      <Ionicons name={icon} size={13} color={colors.white} />
      <Text style={styles.metaChipText}>{label}</Text>
    </View>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    safe: { flex: 1, backgroundColor: colors.background },
    imageWrap: { height: 340, position: 'relative' },
    image: { width: '100%', height: '100%' },
    imageOverlay: {
      ...(StyleSheet as any).absoluteFillObject,
      backgroundColor: colors.overlay,
    },
    topBar: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingTop: 8,
    },
    circleBtn: {
      width: 38,
      height: 38,
      borderRadius: 19,
      backgroundColor: 'rgba(16,24,40,0.4)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    imageBottom: { position: 'absolute', bottom: 20, left: 20, right: 90 },
    workoutTitle: { ...typography.h1, color: colors.white },
    metaRow: { flexDirection: 'row', gap: 8, marginTop: 10, flexWrap: 'wrap' },
    metaChip: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'rgba(255,255,255,0.15)',
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: radius.pill,
      gap: 5,
    },
    metaChipText: { color: colors.white, fontSize: 12, fontWeight: '600' },
    playBtn: {
      position: 'absolute',
      bottom: 16,
      right: 20,
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: colors.primaryGreen,
      alignItems: 'center',
      justifyContent: 'center',
    },
    body: { padding: 20 },
    progressWrap: { marginBottom: 20 },
    progressLabelRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
    progressLabel: { ...typography.small, color: colors.mutedText, fontWeight: '600' },
    progressPercent: { ...typography.small, color: colors.text, fontWeight: '700' },
    description: { ...typography.body, color: colors.mutedText, lineHeight: 22, marginBottom: 20 },
    sectionRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 14,
    },
    sectionTitle: { ...typography.h3, color: colors.text },
    exerciseRow: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.cardBackground,
      borderRadius: radius.md,
      padding: 14,
      marginBottom: 10,
    },
    exerciseIndex: {
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: colors.greenTint,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
    },
    exerciseIndexText: { color: colors.primaryGreen, fontWeight: '700', fontSize: 13 },
    exerciseName: { ...typography.bodyBold, color: colors.text },
    exerciseDetail: { ...typography.small, color: colors.mutedText, marginTop: 2 },
    inProgressBanner: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.greenTint,
      padding: 12,
      borderRadius: radius.sm,
      marginTop: 16,
      gap: 8,
    },
    completedBanner: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.greenTint,
      padding: 12,
      borderRadius: radius.sm,
      marginTop: 16,
      gap: 8,
    },
    inProgressText: { color: colors.primaryGreen, fontSize: 13, fontWeight: '600' },
  });
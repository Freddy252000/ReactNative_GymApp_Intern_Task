import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import AppCard from '../components/AppCard';
import ScreenHeader from '../components/ScreenHeader';
import AnimatedProgressBar from '../components/AnimatedProgressBar';
import EmptyState from '../components/EmptyState';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import { weeklySummary, weeklyActivity } from '../data/workouts';
import { typography, radius } from '../theme/colors';
import { useTheme } from '../theme/ThemeContext';
import { useAppData } from '../context/AppDataContext';
import { CompletionEntry, ThemeColors } from '../types';
import { SafeAreaView } from 'react-native-safe-area-context';

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

const DAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

function formatDate(iso: string) {
  const date = new Date(iso);
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

export default function ProgressScreen() {
  const { colors } = useTheme();
  const { history, isLoading, error, retry, clearHistory } = useAppData();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const hasHistory = history.length > 0;
  const stats = useMemo(() => {
    if (!hasHistory) {
      return {
        workouts: weeklySummary.workouts,
        minutes: weeklySummary.minutes,
        calories: weeklySummary.calories,
        goalPercent: Math.round((weeklySummary.goalCompleted / weeklySummary.goalTarget) * 100),
        goalCompleted: weeklySummary.goalCompleted,
        goalTarget: weeklySummary.goalTarget,
        dayStreak: weeklySummary.dayStreak,
        activity: weeklyActivity.map((d) => ({ day: d.day, percent: d.percent, type: d.type })),
      };
    }

    const now = Date.now();
    const oneWeekAgo = now - 7 * 24 * 60 * 60 * 1000;
    const thisWeek = history.filter((h) => new Date(h.completedAt).getTime() >= oneWeekAgo);

    const minutes = thisWeek.reduce((sum, h) => sum + h.duration, 0);
    const calories = thisWeek.reduce((sum, h) => sum + h.calories, 0);
    const goalTarget = weeklySummary.goalTarget;
    const goalCompleted = Math.min(thisWeek.length, goalTarget);
    const goalPercent = Math.round((goalCompleted / goalTarget) * 100);

    // Minutes trained per day-of-week, normalized against a 60-minute cap.
    const perDayMinutes = [0, 0, 0, 0, 0, 0, 0];
    thisWeek.forEach((h) => {
      const dow = new Date(h.completedAt).getDay();
      perDayMinutes[dow] += h.duration;
    });
    const activity = DAY_LABELS.map((day, i) => ({
      day,
      percent: Math.min(100, Math.round((perDayMinutes[i] / 60) * 100)),
      type: 'workout' as const,
    }));

    // Day streak: consecutive days (including today) with at least one entry.
    const daysWithEntries = new Set(history.map((h) => new Date(h.completedAt).toDateString()));
    let streak = 0;
    for (let i = 0; i < 365; i += 1) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      if (daysWithEntries.has(d.toDateString())) {
        streak += 1;
      } else {
        break;
      }
    }

    return { workouts: thisWeek.length, minutes, calories, goalPercent, goalCompleted, goalTarget, dayStreak: streak, activity };
  }, [history, hasHistory]);

  const handleClearHistory = () => {
    Alert.alert('Clear history', 'This removes all logged workout completions. This cannot be undone.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Clear', style: 'destructive', onPress: clearHistory },
    ]);
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.container}>
          <ScreenHeader title="Progress" />
          <LoadingState message="Loading your progress…" />
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.container}>
          <ScreenHeader title="Progress" />
          <ErrorState message={error} onRetry={retry} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <ScreenHeader title="Progress" />

        {/* Weekly goal card */}
        <AppCard dark style={styles.goalCard}>
          <View style={styles.goalRow}>
            <View>
              <Text style={styles.goalLabel}>Weekly Goal</Text>
              <Text style={styles.goalValue}>
                {stats.goalCompleted} of {stats.goalTarget} workouts completed
              </Text>
            </View>
            <View style={styles.shieldWrap}>
              <Ionicons name="shield-checkmark" size={22} color={colors.accentOrange} />
            </View>
          </View>

          <View style={{ marginTop: 16 }}>
            <AnimatedProgressBar percent={stats.goalPercent} color={colors.primaryGreen} trackColor="rgba(255,255,255,0.15)" />
          </View>
          <Text style={styles.goalPercent}>{stats.goalPercent}%</Text>
        </AppCard>

        {/* Stats grid */}
        <Text style={styles.sectionTitle}>Stats</Text>
        <View style={styles.statsGrid}>
          <StatCard icon="trending-up" iconColor={colors.primaryGreen} value={`${stats.goalPercent}%`} label="Goal" />
          <StatCard icon="flame" iconColor={colors.accentOrange} value={stats.dayStreak} label="Day Streak" />
          <StatCard icon="time" iconColor={colors.primaryGreen} value={stats.minutes} label="Minutes" />
          <StatCard icon="flame" iconColor={colors.accentOrange} value={stats.calories} label="Calories" />
        </View>

        {/* Activity chart */}
        <Text style={styles.sectionTitle}>Activity</Text>
        <AppCard>
          <View style={styles.chartRow}>
            {stats.activity.map((entry, index) => (
              <View key={`${entry.day}-${index}`} style={styles.barColumn}>
                <AnimatedProgressBar
                  percent={entry.percent}
                  vertical
                  color={entry.type === 'rest' ? colors.accentOrange : colors.primaryGreen}
                  trackColor={colors.background}
                />
                <Text style={styles.barLabel}>{entry.day}</Text>
              </View>
            ))}
          </View>
          <View style={styles.chartAxis}>
            <Text style={styles.axisText}>0%</Text>
            <Text style={styles.axisText}>50%</Text>
            <Text style={styles.axisText}>100%</Text>
          </View>
        </AppCard>

        {/* Completion history */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Workout History</Text>
          {hasHistory ? (
            <Text style={styles.clearText} onPress={handleClearHistory}>
              Clear
            </Text>
          ) : null}
        </View>

        {hasHistory ? (
          history.slice(0, 20).map((entry: CompletionEntry) => (
            <AppCard key={entry.id} style={styles.historyRow}>
              <View style={styles.historyIcon}>
                <Ionicons name="checkmark-circle" size={20} color={colors.primaryGreen} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.historyTitle}>{entry.workoutTitle}</Text>
                <Text style={styles.historyMeta}>
                  {formatDate(entry.completedAt)} • {entry.duration} min • {entry.calories} kcal
                </Text>
              </View>
            </AppCard>
          ))
        ) : (
          <EmptyState
            icon="time-outline"
            title="No completed workouts yet"
            message="Finish a workout and mark it complete to see it show up here."
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

interface StatCardProps {
  icon: IoniconName;
  iconColor: string;
  value: string | number;
  label: string;
}

function StatCard({ icon, iconColor, value, label }: StatCardProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  return (
    <AppCard style={styles.statCard}>
      <View style={styles.statRow}>
        <Text style={styles.statValue}>{value}</Text>
        <Ionicons name={icon} size={18} color={iconColor} />
      </View>
      <Text style={styles.statLabel}>{label}</Text>
    </AppCard>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    safe: { flex: 1, backgroundColor: colors.background },
    container: { padding: 20, paddingBottom: 40 },
    goalCard: { marginBottom: 24 },
    goalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
    goalLabel: { ...typography.h3, color: colors.white },
    goalValue: { ...typography.small, color: colors.mutedText, marginTop: 4, maxWidth: 220 },
    shieldWrap: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: 'rgba(255,255,255,0.1)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    goalPercent: { color: colors.white, alignSelf: 'flex-end', marginTop: 6, fontWeight: '700' },
    sectionTitle: { ...typography.h3, color: colors.text, marginBottom: 12 },
    sectionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    clearText: { ...typography.small, color: colors.danger, fontWeight: '600', marginBottom: 12 },
    statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 24 },
    statCard: { width: '47%' },
    statRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    statValue: { ...typography.h2, color: colors.text },
    statLabel: { ...typography.small, color: colors.mutedText, marginTop: 4 },
    chartRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      height: 140,
    },
    barColumn: { alignItems: 'center', flex: 1 },
    barLabel: { ...typography.caption, color: colors.mutedText, marginTop: 8 },
    chartAxis: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
    axisText: { ...typography.caption, color: colors.mutedText },
    historyRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
    historyIcon: {
      width: 38,
      height: 38,
      borderRadius: 19,
      backgroundColor: colors.greenTint,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
    },
    historyTitle: { ...typography.bodyBold, color: colors.text },
    historyMeta: { ...typography.small, color: colors.mutedText, marginTop: 2 },
  });
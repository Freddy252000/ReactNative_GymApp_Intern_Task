import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import AppCard from '../components/AppCard';
import { weeklyActivity, weeklySummary } from '../data/workouts';
import { colors, typography, radius } from '../theme/colors';

export default function ProgressScreen() {
  const maxBarHeight = 120;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Progress</Text>

        <View style={styles.summaryRow}>
          <AppCard style={styles.summaryCard}>
            <Text style={styles.summaryValue}>{weeklySummary.workouts}</Text>
            <Text style={styles.summaryLabel}>Workouts</Text>
          </AppCard>
          <AppCard style={styles.summaryCard}>
            <Text style={styles.summaryValue}>{weeklySummary.dayStreak}</Text>
            <Text style={styles.summaryLabel}>Day Streak</Text>
          </AppCard>
          <AppCard style={styles.summaryCard}>
            <Text style={styles.summaryValue}>{weeklySummary.calories}</Text>
            <Text style={styles.summaryLabel}>Kcal</Text>
          </AppCard>
        </View>

        <AppCard style={styles.chartCard}>
          <Text style={styles.sectionTitle}>This Week</Text>
          <View style={styles.chartRow}>
            {weeklyActivity.map((entry, index) => (
              <View key={`${entry.day}-${index}`} style={styles.barColumn}>
                <View
                  style={[
                    styles.bar,
                    {
                      height: Math.max(8, (entry.percent / 100) * maxBarHeight),
                      backgroundColor: entry.type === 'rest' ? colors.accentOrange : colors.primaryGreen,
                    },
                  ]}
                />
                <Text style={styles.barLabel}>{entry.day}</Text>
              </View>
            ))}
          </View>
        </AppCard>

        <AppCard style={styles.goalCard}>
          <Text style={styles.sectionTitle}>Weekly Goal</Text>
          <Text style={styles.goalText}>
            {weeklySummary.goalCompleted} / {weeklySummary.goalTarget} workouts completed
          </Text>
          <View style={styles.goalBarTrack}>
            <View
              style={[
                styles.goalBarFill,
                { width: `${Math.min(100, (weeklySummary.goalCompleted / weeklySummary.goalTarget) * 100)}%` },
              ]}
            />
          </View>
        </AppCard>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.lightBackground },
  container: { padding: 20, paddingBottom: 40 },
  title: { ...typography.h1, color: colors.primaryDark, marginBottom: 20 },
  summaryRow: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  summaryCard: { flex: 1, alignItems: 'center', paddingVertical: 18 },
  summaryValue: { ...typography.h2, color: colors.primaryDark },
  summaryLabel: { ...typography.caption, color: colors.mutedText, marginTop: 4 },
  chartCard: { marginBottom: 16 },
  sectionTitle: { ...typography.h3, color: colors.primaryDark, marginBottom: 16 },
  chartRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', height: 150 },
  barColumn: { alignItems: 'center', flex: 1 },
  bar: { width: 14, borderRadius: radius.sm },
  barLabel: { ...typography.caption, color: colors.mutedText, marginTop: 8 },
  goalCard: {},
  goalText: { ...typography.body, color: colors.mutedText, marginBottom: 12 },
  goalBarTrack: { height: 10, borderRadius: radius.pill, backgroundColor: colors.darkTint, overflow: 'hidden' },
  goalBarFill: { height: '100%', backgroundColor: colors.primaryGreen, borderRadius: radius.pill },
});

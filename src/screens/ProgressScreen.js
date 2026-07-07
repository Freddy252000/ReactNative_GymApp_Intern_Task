// src/screens/ProgressScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppCard from '../components/AppCard';
import ScreenHeader from '../components/ScreenHeader';
import { weeklySummary, weeklyActivity } from '../data/workouts';
import { colors, typography, radius } from '../theme/colors';

export default function ProgressScreen() {
  const goalPercent = Math.round((weeklySummary.goalCompleted / weeklySummary.goalTarget) * 100);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <ScreenHeader title="Progress" rightIcon="calendar-outline" />

        {/* Weekly goal card */}
        <AppCard dark style={styles.goalCard}>
          <View style={styles.goalRow}>
            <View>
              <Text style={styles.goalLabel}>Weekly Goal</Text>
              <Text style={styles.goalValue}>
                {weeklySummary.goalCompleted} of {weeklySummary.goalTarget} workouts completed
              </Text>
            </View>
            <View style={styles.shieldWrap}>
              <Ionicons name="shield-checkmark" size={22} color={colors.accentOrange} />
            </View>
          </View>

          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${goalPercent}%` }]} />
          </View>
          <Text style={styles.goalPercent}>{goalPercent}%</Text>
        </AppCard>

        {/* Stats grid */}
        <Text style={styles.sectionTitle}>Stats</Text>
        <View style={styles.statsGrid}>
          <StatCard icon="trending-up" iconColor={colors.primaryGreen} value={`${goalPercent}%`} label="Goal" />
          <StatCard icon="flame" iconColor={colors.accentOrange} value={weeklySummary.dayStreak} label="Day Streak" />
          <StatCard icon="time" iconColor={colors.primaryGreen} value={weeklySummary.minutes} label="Minutes" />
          <StatCard icon="flame" iconColor={colors.accentOrange} value={weeklySummary.calories} label="Calories" />
        </View>

        {/* Activity chart */}
        <Text style={styles.sectionTitle}>Activity</Text>
        <AppCard>
          <View style={styles.chartRow}>
            {weeklyActivity.map((entry, index) => (
              <View key={`${entry.day}-${index}`} style={styles.barColumn}>
                <View style={styles.barTrack}>
                  <View
                    style={[
                      styles.barFill,
                      {
                        height: `${entry.percent}%`,
                        backgroundColor: entry.type === 'rest' ? colors.accentOrange : colors.primaryGreen,
                      },
                    ]}
                  />
                </View>
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
      </ScrollView>
    </SafeAreaView>
  );
}

function StatCard({ icon, iconColor, value, label }) {
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

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.lightBackground },
  container: { padding: 20, paddingBottom: 40 },
  goalCard: { marginBottom: 24 },
  goalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  goalLabel: { ...typography.h3, color: colors.white },
  goalValue: { ...typography.small, color: '#98A2B3', marginTop: 4, maxWidth: 220 },
  shieldWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.15)',
    marginTop: 16,
    overflow: 'hidden',
  },
  progressFill: { height: '100%', backgroundColor: colors.primaryGreen, borderRadius: 4 },
  goalPercent: { color: colors.white, alignSelf: 'flex-end', marginTop: 6, fontWeight: '700' },
  sectionTitle: { ...typography.h3, color: colors.primaryDark, marginBottom: 12 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 24 },
  statCard: { width: '47%' },
  statRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  statValue: { ...typography.h2, color: colors.primaryDark },
  statLabel: { ...typography.small, color: colors.mutedText, marginTop: 4 },
  chartRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 140,
  },
  barColumn: { alignItems: 'center', flex: 1 },
  barTrack: {
    width: 14,
    height: 110,
    backgroundColor: colors.lightBackground,
    borderRadius: 7,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  barFill: { width: '100%', borderRadius: 7 },
  barLabel: { ...typography.caption, color: colors.mutedText, marginTop: 8 },
  chartAxis: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  axisText: { ...typography.caption, color: colors.mutedText },
});

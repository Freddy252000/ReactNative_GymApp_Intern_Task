// src/screens/HomeScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, Pressable } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AppCard from '../components/AppCard';
import AppButton from '../components/AppButton';
import { workouts, weeklySummary, mockUser } from '../data/workouts';
import { colors, typography, radius } from '../theme/colors';
import { MainTabParamList, RootStackParamList } from '../types';
import { SafeAreaView } from 'react-native-safe-area-context';

type HomeScreenProps = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Home'>,
  NativeStackScreenProps<RootStackParamList>
>;

const todaysWorkout = workouts[0];

export default function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.greetingMuted}>Hello, {mockUser.name.split(' ')[0]} 👋</Text>
            <Text style={styles.greetingTitle}>Today's Plan</Text>
          </View>
          <View style={styles.bellWrap}>
            <Ionicons name="notifications-outline" size={22} color={colors.primaryDark} />
            <View style={styles.bellDot} />
          </View>
        </View>

        {/* Today's workout */}
        <Pressable onPress={() => navigation.navigate('WorkoutDetail', { workout: todaysWorkout })}>
          <ImageBackground
            source={{ uri: todaysWorkout.image }}
            style={styles.todayCard}
            imageStyle={{ borderRadius: radius.lg }}
          >
            <View style={styles.todayOverlay} />
            <Text style={styles.todayTitle}>{todaysWorkout.title}</Text>
            <Text style={styles.todayMeta}>
              {todaysWorkout.duration} min • {todaysWorkout.level} • {todaysWorkout.calories} kcal
            </Text>
            <AppButton
              title="Start Workout"
              icon="play"
              style={{ marginTop: 16, alignSelf: 'flex-start', paddingHorizontal: 24, height: 46 }}
              onPress={() => navigation.navigate('WorkoutDetail', { workout: todaysWorkout })}
            />
          </ImageBackground>
        </Pressable>

        {/* Weekly summary */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Weekly Summary</Text>
          <Pressable onPress={() => navigation.navigate('Progress')}>
            <Text style={styles.seeAll}>See all</Text>
          </Pressable>
        </View>

        <View style={styles.summaryRow}>
          <AppCard style={styles.summaryCard}>
            <Ionicons name="barbell-outline" size={18} color={colors.primaryGreen} />
            <Text style={styles.summaryValue}>{weeklySummary.workouts}</Text>
            <Text style={styles.summaryLabel}>Workouts</Text>
          </AppCard>
          <AppCard style={styles.summaryCard}>
            <Ionicons name="time-outline" size={18} color={colors.primaryGreen} />
            <Text style={styles.summaryValue}>{weeklySummary.minutes}</Text>
            <Text style={styles.summaryLabel}>Minutes</Text>
          </AppCard>
          <AppCard style={styles.summaryCard}>
            <Ionicons name="flame-outline" size={18} color={colors.accentOrange} />
            <Text style={styles.summaryValue}>{weeklySummary.calories}</Text>
            <Text style={styles.summaryLabel}>Kcal</Text>
          </AppCard>
        </View>

        {/* Quick actions */}
        <Text style={[styles.sectionTitle, { marginTop: 24, marginBottom: 12 }]}>Quick Actions</Text>

        <QuickAction
          icon="barbell-outline"
          iconBg={colors.greenTint}
          iconColor="#0F8A5F"
          title="Workouts"
          subtitle="Browse plans"
          onPress={() => navigation.navigate('Workouts')}
        />
        <QuickAction
          icon="stats-chart-outline"
          iconBg={colors.orangeTint}
          iconColor="#C15A15"
          title="Progress"
          subtitle="View stats"
          onPress={() => navigation.navigate('Progress')}
        />
        <QuickAction
          icon="person-outline"
          iconBg="#EDEBFB"
          iconColor="#6941C6"
          title="Profile"
          subtitle="Manage account"
          onPress={() => navigation.navigate('Profile')}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

interface QuickActionProps {
  icon: string;
  iconBg: string;
  iconColor: string;
  title: string;
  subtitle: string;
  onPress: () => void;
}

function QuickAction({ icon, iconBg, iconColor, title, subtitle, onPress }: QuickActionProps) {
  return (
    <AppCard onPress={onPress} style={styles.quickAction}>
      <View style={styles.quickActionRow}>
        <View style={[styles.quickIcon, { backgroundColor: iconBg }]}>
          <Ionicons name={icon} size={20} color={iconColor} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.quickTitle}>{title}</Text>
          <Text style={styles.quickSubtitle}>{subtitle}</Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color={colors.mutedText} />
      </View>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.lightBackground },
  container: { padding: 20, paddingBottom: 40 },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  greetingMuted: { ...typography.body, color: colors.mutedText },
  greetingTitle: { ...typography.h1, color: colors.primaryDark, marginTop: 2 },
  bellWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.cardBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bellDot: {
    position: 'absolute',
    top: 9,
    right: 10,
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.primaryGreen,
  },
  todayCard: {
    height: 220,
    borderRadius: radius.lg,
    padding: 20,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  todayOverlay: {
    ...(StyleSheet as any).absoluteFillObject,
    backgroundColor: 'rgba(16,24,40,0.45)',
    borderRadius: radius.lg,
  },
  todayTitle: { ...typography.h2, color: colors.white },
  todayMeta: { ...typography.small, color: '#E4E7EC', marginTop: 4 },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 12,
  },
  sectionTitle: { ...typography.h3, color: colors.primaryDark },
  seeAll: { ...typography.small, color: colors.primaryGreen, fontWeight: '600' },
  summaryRow: { flexDirection: 'row', gap: 12 },
  summaryCard: { flex: 1, alignItems: 'center', paddingVertical: 18 },
  summaryValue: { ...typography.h2, color: colors.primaryDark, marginTop: 8 },
  summaryLabel: { ...typography.caption, color: colors.mutedText, marginTop: 2 },
  quickAction: { marginBottom: 12 },
  quickActionRow: { flexDirection: 'row', alignItems: 'center' },
  quickIcon: {
    width: 44,
    height: 44,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  quickTitle: { ...typography.bodyBold, color: colors.primaryDark },
  quickSubtitle: { ...typography.small, color: colors.mutedText, marginTop: 2 },
});

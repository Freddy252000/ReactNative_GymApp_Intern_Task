import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppCard from '../components/AppCard';
import AppButton from '../components/AppButton';
import { mockUser } from '../data/workouts';
import { colors, typography, radius } from '../theme/colors';

const STATS: { label: string; value: string }[] = [
  { label: 'Goal', value: mockUser.goal },
  { label: 'Level', value: mockUser.level },
  { label: 'Height', value: mockUser.height },
  { label: 'Weight', value: mockUser.weight },
  { label: 'Age', value: String(mockUser.age) },
];

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Profile</Text>

        <AppCard style={styles.profileCard}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={32} color={colors.white} />
          </View>
          <Text style={styles.name}>{mockUser.name}</Text>
          <Text style={styles.email}>{mockUser.email}</Text>
        </AppCard>

        <AppCard style={styles.statsCard}>
          {STATS.map((stat, index) => (
            <View key={stat.label} style={[styles.statRow, index === STATS.length - 1 && styles.statRowLast]}>
              <Text style={styles.statLabel}>{stat.label}</Text>
              <Text style={styles.statValue}>{stat.value}</Text>
            </View>
          ))}
        </AppCard>

        <AppButton title="Log Out" variant="outline" onPress={() => {}} style={styles.logoutButton} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.lightBackground },
  container: { padding: 20, paddingBottom: 40 },
  title: { ...typography.h1, color: colors.primaryDark, marginBottom: 20 },
  profileCard: { alignItems: 'center', paddingVertical: 24, marginBottom: 16 },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.primaryGreen,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  name: { ...typography.h2, color: colors.primaryDark },
  email: { ...typography.small, color: colors.mutedText, marginTop: 4 },
  statsCard: { marginBottom: 20 },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  statRowLast: { borderBottomWidth: 0 },
  statLabel: { ...typography.body, color: colors.mutedText },
  statValue: { ...typography.bodyBold, color: colors.primaryDark },
  logoutButton: { borderColor: colors.danger },
});

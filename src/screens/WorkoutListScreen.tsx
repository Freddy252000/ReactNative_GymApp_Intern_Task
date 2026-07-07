// src/screens/WorkoutListScreen.tsx
import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, Image, Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AppCard from '../components/AppCard';
import { workouts, categories } from '../data/workouts';
import { colors, typography, radius } from '../theme/colors';
import { MainTabParamList, RootStackParamList, Workout, WorkoutCategory } from '../types';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Workouts'>,
  NativeStackScreenProps<RootStackParamList>
>;

export default function WorkoutListScreen({ navigation }: Props) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<WorkoutCategory>('All');

  const filteredWorkouts = useMemo(() => {
    return workouts.filter((w) => {
      const matchesCategory = activeCategory === 'All' || w.category === activeCategory;
      const matchesSearch = w.title.toLowerCase().includes(search.trim().toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Workouts</Text>

        <View style={styles.searchRow}>
          <Ionicons name="search" size={18} color={colors.mutedText} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search workouts"
            placeholderTextColor={colors.mutedText}
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <FlatList
          horizontal
          data={categories}
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 14, gap: 8 }}
          renderItem={({ item }) => {
            const active = item === activeCategory;
            return (
              <Pressable onPress={() => setActiveCategory(item)} style={[styles.chip, active && styles.chipActive]}>
                <Text style={[styles.chipText, active && styles.chipTextActive]}>{item}</Text>
              </Pressable>
            );
          }}
        />

        <FlatList
          data={filteredWorkouts}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Ionicons name="search-outline" size={32} color={colors.mutedText} />
              <Text style={styles.emptyText}>No workouts match your search.</Text>
            </View>
          }
          renderItem={({ item }: { item: Workout }) => (
            <AppCard style={styles.workoutCard} onPress={() => navigation.navigate('WorkoutDetail', { workout: item })}>
              <View style={styles.workoutRow}>
                <Image source={{ uri: item.image }} style={styles.thumb} />
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={styles.workoutTitle}>{item.title}</Text>
                  <Text style={styles.workoutMeta}>
                    {item.duration} min • {item.level}
                  </Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={styles.kcal}>{item.calories} kcal</Text>
                  <Ionicons name="chevron-forward" size={16} color={colors.mutedText} style={{ marginTop: 8 }} />
                </View>
              </View>
            </AppCard>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.lightBackground },
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 12 },
  title: { ...typography.h1, color: colors.primaryDark },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 14,
    height: 48,
    marginTop: 16,
  },
  searchInput: { flex: 1, marginLeft: 10, color: colors.primaryDark, fontSize: 15 },
  chip: {
    paddingHorizontal: 16,
    height: 36,
    borderRadius: radius.pill,
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipActive: { backgroundColor: colors.primaryGreen, borderColor: colors.primaryGreen },
  chipText: { ...typography.small, color: colors.mutedText, fontWeight: '600' },
  chipTextActive: { color: colors.white },
  workoutCard: { marginBottom: 12 },
  workoutRow: { flexDirection: 'row', alignItems: 'center' },
  thumb: { width: 56, height: 56, borderRadius: radius.sm, backgroundColor: colors.border },
  workoutTitle: { ...typography.bodyBold, color: colors.primaryDark },
  workoutMeta: { ...typography.small, color: colors.mutedText, marginTop: 4 },
  kcal: { ...typography.small, color: colors.accentOrange, fontWeight: '700' },
  emptyState: { alignItems: 'center', marginTop: 60 },
  emptyText: { ...typography.body, color: colors.mutedText, marginTop: 10 },
});

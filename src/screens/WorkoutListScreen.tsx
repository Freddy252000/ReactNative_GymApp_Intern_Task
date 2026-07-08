import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, Image, Pressable } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AppCard from '../components/AppCard';
import EmptyState from '../components/EmptyState';
import LoadingState from '../components/LoadingState';
import { workouts, categories } from '../data/workouts';
import { typography, radius } from '../theme/colors';
import { useTheme } from '../theme/ThemeContext';
import { useAppData } from '../context/AppDataContext';
import { MainTabParamList, RootStackParamList, ThemeColors, Workout, WorkoutCategory } from '../types';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Workouts'>,
  NativeStackScreenProps<RootStackParamList>
>;

export default function WorkoutListScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const { isFavorite, toggleFavorite, isLoading } = useAppData();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<WorkoutCategory>('All');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const filteredWorkouts = useMemo(() => {
    return workouts.filter((w) => {
      const matchesCategory = activeCategory === 'All' || w.category === activeCategory;
      const matchesSearch = w.title.toLowerCase().includes(search.trim().toLowerCase());
      const matchesFavorite = !showFavoritesOnly || isFavorite(w.id);
      return matchesCategory && matchesSearch && matchesFavorite;
    });
  }, [search, activeCategory, showFavoritesOnly, isFavorite]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>Workouts</Text>
          <Pressable
            onPress={() => setShowFavoritesOnly((f) => !f)}
            style={[styles.favToggle, showFavoritesOnly && styles.favToggleActive]}
          >
            <Ionicons
              name={showFavoritesOnly ? 'heart' : 'heart-outline'}
              size={18}
              color={showFavoritesOnly ? colors.white : colors.mutedText}
            />
          </Pressable>
        </View>

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

        {isLoading ? (
          <LoadingState message="Loading your favorites…" inline />
        ) : (
          <FlatList
            data={filteredWorkouts}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
            ListEmptyComponent={
              showFavoritesOnly ? (
                <EmptyState
                  icon="heart-outline"
                  title="No favorites yet"
                  message="Tap the heart on any workout to save it here."
                  actionLabel="Browse all workouts"
                  onAction={() => setShowFavoritesOnly(false)}
                />
              ) : (
                <EmptyState icon="search-outline" title="No workouts match your search" message="Try a different keyword or category." />
              )
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
                    <Pressable hitSlop={8} onPress={() => toggleFavorite(item.id)}>
                      <Ionicons
                        name={isFavorite(item.id) ? 'heart' : 'heart-outline'}
                        size={18}
                        color={isFavorite(item.id) ? colors.danger : colors.mutedText}
                      />
                    </Pressable>
                    <Text style={styles.kcal}>{item.calories} kcal</Text>
                  </View>
                </View>
              </AppCard>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    safe: { flex: 1, backgroundColor: colors.background },
    container: { flex: 1, paddingHorizontal: 20, paddingTop: 12 },
    titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    title: { ...typography.h1, color: colors.text },
    favToggle: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.cardBackground,
      borderWidth: 1,
      borderColor: colors.border,
    },
    favToggleActive: { backgroundColor: colors.danger, borderColor: colors.danger },
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
    searchInput: { flex: 1, marginLeft: 10, color: colors.text, fontSize: 15 },
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
    workoutTitle: { ...typography.bodyBold, color: colors.text },
    workoutMeta: { ...typography.small, color: colors.mutedText, marginTop: 4 },
    kcal: { ...typography.small, color: colors.accentOrange, fontWeight: '700', marginTop: 8 },
  });

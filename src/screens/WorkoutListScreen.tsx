import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, Image, Pressable } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AppCard from '../components/AppCard';
import Badge from '../components/Badge';
import { categories, workouts } from '../data/workouts';
import { colors, typography, radius } from '../theme/colors';
import { MainTabParamList, RootStackParamList, Workout, WorkoutCategory } from '../types';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Workouts'>,
  NativeStackScreenProps<RootStackParamList>
>;

export default function WorkoutListScreen({ navigation }: Props) {
  const [activeCategory, setActiveCategory] = useState<WorkoutCategory>('All');

  const filtered = workouts.filter((w) => activeCategory === 'All' || w.category === activeCategory);

  return (
    <SafeAreaView style={styles.safe}>
      <Text style={styles.title}>Workouts</Text>

      <FlatList
        horizontal
        data={categories}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        style={styles.categoryList}
        contentContainerStyle={styles.categoryListContent}
        renderItem={({ item }) => (
          <Pressable onPress={() => setActiveCategory(item)}>
            <View style={[styles.categoryChip, activeCategory === item && styles.categoryChipActive]}>
              <Text style={[styles.categoryText, activeCategory === item && styles.categoryTextActive]}>{item}</Text>
            </View>
          </Pressable>
        )}
      />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }: { item: Workout }) => (
          <AppCard onPress={() => navigation.navigate('WorkoutDetail', { workout: item })} style={styles.card}>
            <View style={styles.cardRow}>
              <Image source={{ uri: item.image }} style={styles.thumb} />
              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardMeta}>
                  {item.duration} min • {item.calories} kcal
                </Text>
                <Badge label={item.level} tone="green" />
              </View>
            </View>
          </AppCard>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.lightBackground, paddingTop: 12 },
  title: { ...typography.h1, color: colors.primaryDark, paddingHorizontal: 20, marginBottom: 12 },
  categoryList: { flexGrow: 0, marginBottom: 16 },
  categoryListContent: { paddingHorizontal: 20, gap: 8 },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: radius.pill,
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: 8,
  },
  categoryChipActive: {
    backgroundColor: colors.primaryGreen,
    borderColor: colors.primaryGreen,
  },
  categoryText: { ...typography.small, color: colors.mutedText },
  categoryTextActive: { color: colors.white, fontWeight: '600' },
  list: { paddingHorizontal: 20, paddingBottom: 40 },
  card: { marginBottom: 12 },
  cardRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  thumb: { width: 64, height: 64, borderRadius: radius.md },
  cardTitle: { ...typography.bodyBold, color: colors.primaryDark },
  cardMeta: { ...typography.small, color: colors.mutedText, marginTop: 2, marginBottom: 6 },
});

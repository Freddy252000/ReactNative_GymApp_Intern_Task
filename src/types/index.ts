export type WorkoutCategory = 'All' | 'Strength' | 'Cardio' | 'Yoga' | 'HIIT' | 'Full Body';

export type WorkoutLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface Exercise {
  id: string;
  name: string;
  detail: string;
  duration?: string;
}

export interface Workout {
  id: string;
  title: string;
  category: WorkoutCategory;
  duration: number;
  level: WorkoutLevel;
  calories: number;
  image: string;
  description: string;
  exercises: Exercise[];
}

export interface WeeklyActivityDay {
  day: string;
  percent: number;
  type: 'workout' | 'rest';
}

export interface WeeklySummary {
  workouts: number;
  minutes: number;
  calories: number;
  goalTarget: number;
  goalCompleted: number;
  dayStreak: number;
}

export interface MockUser {
  name: string;
  email: string;
  goal: string;
  level: WorkoutLevel;
  height: string;
  weight: string;
  age: number;
}
export interface CompletionEntry {
  id: string;
  workoutId: string;
  workoutTitle: string;
  category: WorkoutCategory;
  duration: number;
  calories: number;
  completedAt: string;
}

export type FavoriteIds = string[];

export type ThemeMode = 'light' | 'dark';

export interface ThemeColors {
  primaryDark: string;
  primaryGreen: string;
  accentOrange: string;
  background: string;
  cardBackground: string;
  mutedText: string;
  text: string;
  white: string;
  black: string;
  border: string;
  danger: string;
  greenTint: string;
  orangeTint: string;
  darkTint: string;
  overlay: string;
}

export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  MainTabs: undefined;
  WorkoutDetail: { workout: Workout };
};

export type MainTabParamList = {
  Home: undefined;
  Workouts: undefined;
  Progress: undefined;
  Profile: undefined;
};

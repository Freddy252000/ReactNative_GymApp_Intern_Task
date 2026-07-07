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

// Root stack: onboarding + auth, then the tab navigator, then modals/detail
// screens pushed on top of it.
export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  MainTabs: undefined;
  WorkoutDetail: { workout: Workout };
};

// Bottom tab navigator shown after login.
export type MainTabParamList = {
  Home: undefined;
  Workouts: undefined;
  Progress: undefined;
  Profile: undefined;
};

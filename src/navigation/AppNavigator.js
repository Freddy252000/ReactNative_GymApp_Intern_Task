// src/navigation/AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import WorkoutListScreen from '../screens/WorkoutListScreen';
import WorkoutDetailScreen from '../screens/WorkoutDetailScreen';
import ProgressScreen from '../screens/ProgressScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { colors } from '../theme/colors';

const RootStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TAB_ICONS = {
  Home: 'home',
  Workouts: 'barbell',
  Progress: 'stats-chart',
  Profile: 'person',
};

// Bottom tab bar shown after login: Home, Workouts, Progress, Profile.
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primaryGreen,
        tabBarInactiveTintColor: colors.mutedText,
        tabBarStyle: {
          height: 64,
          paddingBottom: 10,
          paddingTop: 8,
          borderTopColor: colors.border,
        },
        tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
        tabBarIcon: ({ color, size, focused }) => (
          <Ionicons
            name={focused ? TAB_ICONS[route.name] : `${TAB_ICONS[route.name]}-outline`}
            size={size - 2}
            color={color}
          />
        ),
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Workouts" component={WorkoutListScreen} />
      <Tab.Screen name="Progress" component={ProgressScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// Root stack: onboarding + auth screens, then the main tab experience,
// with Workout Detail pushed on top of the tabs.
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="Welcome" component={WelcomeScreen} />
        <RootStack.Screen name="Login" component={LoginScreen} />
        <RootStack.Screen name="MainTabs" component={MainTabs} />
        <RootStack.Screen
          name="WorkoutDetail"
          component={WorkoutDetailScreen}
          options={{ animation: 'slide_from_right' }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

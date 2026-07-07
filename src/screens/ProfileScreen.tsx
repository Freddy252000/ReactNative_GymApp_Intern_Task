// src/screens/ProfileScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Pressable, Alert } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import ScreenHeader from '../components/ScreenHeader';
import Badge from '../components/Badge';
import { mockUser } from '../data/workouts';
import { colors, typography, radius } from '../theme/colors';
import { MainTabParamList, RootStackParamList } from '../types';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Profile'>,
  NativeStackScreenProps<RootStackParamList>
>;

const AVATAR = 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300';

interface MenuItem {
  icon: string;
  iconBg: string;
  iconColor: string;
  title: string;
  subtitle: string;
  danger?: boolean;
}

const MENU_ITEMS: MenuItem[] = [
  {
    icon: 'flag-outline',
    iconBg: '#E4F9F0',
    iconColor: '#0F8A5F',
    title: 'Fitness Goal',
    subtitle: 'Build muscle and stamina',
  },
  {
    icon: 'body-outline',
    iconBg: '#E6F0FF',
    iconColor: '#1D4ED8',
    title: 'Body Details',
    subtitle: 'Height, weight, age',
  },
  {
    icon: 'notifications-outline',
    iconBg: '#EDEBFB',
    iconColor: '#6941C6',
    title: 'Notifications',
    subtitle: 'Workout reminders',
  },
  {
    icon: 'help-buoy-outline',
    iconBg: '#E6F4FF',
    iconColor: '#0284C7',
    title: 'Help & Support',
    subtitle: 'Contact support',
  },
  {
    icon: 'log-out-outline',
    iconBg: '#FEE4E2',
    iconColor: '#D92D20',
    title: 'Logout',
    subtitle: 'Sign out safely',
    danger: true,
  },
];

export default function ProfileScreen({ navigation }: Props) {
  const handleMenuPress = (item: MenuItem) => {
    if (item.title === 'Logout') {
      Alert.alert('Log out', 'Are you sure you want to sign out?', [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => navigation.reset({ index: 0, routes: [{ name: 'Welcome' }] }),
        },
      ]);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <ScreenHeader title="Profile" rightIcon="settings-outline" />

        <LinearGradient
          colors={[colors.primaryGreen, '#0F8A5F'] as [string, string]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.profileCard}
        >
          <Image source={{ uri: AVATAR }} style={styles.avatar} />
          <View style={{ flex: 1 }}>
            <Text style={styles.userName}>{mockUser.name}</Text>
            <Text style={styles.userGoal}>Goal: {mockUser.goal}</Text>
            <View style={{ marginTop: 8 }}>
              <Badge label={mockUser.level} tone="dark" />
            </View>
          </View>
        </LinearGradient>

        <View style={{ marginTop: 20 }}>
          {MENU_ITEMS.map((item) => (
            <Pressable key={item.title} style={styles.menuRow} onPress={() => handleMenuPress(item)}>
              <View style={[styles.menuIcon, { backgroundColor: item.iconBg }]}>
                <Ionicons name={item.icon} size={20} color={item.iconColor} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.menuTitle, item.danger && { color: colors.danger }]}>{item.title}</Text>
                <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={colors.mutedText} />
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.lightBackground },
  container: { padding: 20, paddingBottom: 40 },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: radius.lg,
    padding: 18,
  },
  avatar: { width: 64, height: 64, borderRadius: 32, marginRight: 16, borderWidth: 2, borderColor: colors.white },
  userName: { ...typography.h3, color: colors.white },
  userGoal: { ...typography.small, color: 'rgba(255,255,255,0.85)', marginTop: 2 },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    borderRadius: radius.md,
    padding: 14,
    marginBottom: 10,
  },
  menuIcon: {
    width: 42,
    height: 42,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  menuTitle: { ...typography.bodyBold, color: colors.primaryDark },
  menuSubtitle: { ...typography.small, color: colors.mutedText, marginTop: 2 },
});

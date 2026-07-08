import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Pressable, Alert, Switch } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import ScreenHeader from '../components/ScreenHeader';
import Badge from '../components/Badge';
import { mockUser } from '../data/workouts';
import { typography, radius } from '../theme/colors';
import { useTheme } from '../theme/ThemeContext';
import { useAppData } from '../context/AppDataContext';
import { MainTabParamList, RootStackParamList, ThemeColors } from '../types';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Profile'>,
  NativeStackScreenProps<RootStackParamList>
>;

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

interface MenuItem {
  icon: IoniconName;
  iconBg: string;
  iconColor: string;
  title: string;
  subtitle: string;
  danger?: boolean;
  onPress: () => void;
}

const AVATAR = 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300';

export default function ProfileScreen({ navigation }: Props) {
  const { colors, isDark, toggleTheme } = useTheme();
  const { favorites, history } = useAppData();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const handleLogout = () => {
    Alert.alert('Log out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () =>
          navigation.getParent<NativeStackNavigationProp<RootStackParamList>>()?.reset({
            index: 0,
            routes: [{ name: 'Welcome' }],
          }),
      },
    ]);
  };

  const menuItems: MenuItem[] = [
    {
      icon: 'flag-outline',
      iconBg: colors.greenTint,
      iconColor: colors.primaryGreen,
      title: 'Fitness Goal',
      subtitle: 'Build muscle and stamina',
      onPress: () => Alert.alert('Fitness Goal', `Current goal: ${mockUser.goal}`),
    },
    {
      icon: 'body-outline',
      iconBg: colors.darkTint,
      iconColor: colors.text,
      title: 'Body Details',
      subtitle: `${mockUser.height} • ${mockUser.weight} • ${mockUser.age} yrs`,
      onPress: () => Alert.alert('Body Details', `${mockUser.height}, ${mockUser.weight}, age ${mockUser.age}`),
    },
    {
      icon: 'heart-outline',
      iconBg: colors.orangeTint,
      iconColor: colors.accentOrange,
      title: 'Favorite Workouts',
      subtitle: `${favorites.length} saved`,
      onPress: () => navigation.navigate('Workouts'),
    },
    {
      icon: 'time-outline',
      iconBg: colors.greenTint,
      iconColor: colors.primaryGreen,
      title: 'Completion History',
      subtitle: `${history.length} workouts logged`,
      onPress: () => navigation.navigate('Progress'),
    },
    {
      icon: 'notifications-outline',
      iconBg: colors.darkTint,
      iconColor: colors.text,
      title: 'Notifications',
      subtitle: 'Workout reminders',
      onPress: () => Alert.alert('Notifications', 'Reminder settings coming soon.'),
    },
    {
      icon: 'help-buoy-outline',
      iconBg: colors.darkTint,
      iconColor: colors.text,
      title: 'Help & Support',
      subtitle: 'Contact support',
      onPress: () => Alert.alert('Help & Support', 'Reach us at support@gymflow.app'),
    },
    {
      icon: 'log-out-outline',
      iconBg: 'rgba(240,68,56,0.12)',
      iconColor: colors.danger,
      title: 'Logout',
      subtitle: 'Sign out safely',
      danger: true,
      onPress: handleLogout,
    },
  ];

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

        {/* Dark mode toggle */}
        <Pressable style={styles.menuRow} onPress={toggleTheme}>
          <View style={[styles.menuIcon, { backgroundColor: colors.darkTint }]}>
            <Ionicons name={isDark ? 'moon' : 'sunny-outline'} size={20} color={colors.text} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.menuTitle}>Dark Mode</Text>
            <Text style={styles.menuSubtitle}>{isDark ? 'Currently on' : 'Currently off'}</Text>
          </View>
          <Switch
            value={isDark}
            onValueChange={toggleTheme}
            trackColor={{ false: colors.border, true: colors.primaryGreen }}
            thumbColor={colors.white}
          />
        </Pressable>

        <View style={{ marginTop: 4 }}>
          {menuItems.map((item) => (
            <Pressable key={item.title} style={styles.menuRow} onPress={item.onPress}>
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

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    safe: { flex: 1, backgroundColor: colors.background },
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
      marginTop: 12,
    },
    menuIcon: {
      width: 42,
      height: 42,
      borderRadius: radius.sm,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 14,
    },
    menuTitle: { ...typography.bodyBold, color: colors.text },
    menuSubtitle: { ...typography.small, color: colors.mutedText, marginTop: 2 },
  });
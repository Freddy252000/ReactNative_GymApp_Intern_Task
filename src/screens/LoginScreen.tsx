import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AppButton from '../components/AppButton';
import { typography, radius } from '../theme/colors';
import { useTheme } from '../theme/ThemeContext';
import { RootStackParamList, ThemeColors } from '../types';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password to continue.');
      return;
    }
    setError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.reset({ index: 0, routes: [{ name: 'MainTabs' }] });
    }, 600);
  };

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <SafeAreaView style={styles.flex}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <Pressable onPress={() => navigation.goBack()} hitSlop={12} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={22} color={colors.white} />
          </Pressable>

          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.subtitle}>Login to continue your fitness journey.</Text>

          <Image source={require('../assets/Design/images.png')} style={styles.heroImage} resizeMode="contain" />

          <View style={styles.field}>
            <Text style={styles.label}>Email address</Text>
            <View style={styles.inputRow}>
              <TextInput
                style={styles.input}
                placeholder="alex@email.com"
                placeholderTextColor={colors.mutedText}
                autoCapitalize="none"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />
              <Ionicons name="mail-outline" size={18} color={colors.mutedText} />
            </View>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputRow}>
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor={colors.mutedText}
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <Pressable onPress={() => setShowPassword((s) => !s)} hitSlop={10}>
                <Ionicons name={showPassword ? 'eye-outline' : 'eye-off-outline'} size={18} color={colors.mutedText} />
              </Pressable>
            </View>
          </View>

          {error ? (
            <View style={styles.errorBox}>
              <Ionicons name="alert-circle" size={16} color={colors.danger} />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          <View style={styles.rowBetween}>
            <Pressable style={styles.rememberRow} onPress={() => setRememberMe((r) => !r)}>
              <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
                {rememberMe && <Ionicons name="checkmark" size={13} color={colors.white} />}
              </View>
              <Text style={styles.rememberText}>Remember me</Text>
            </Pressable>
            <Pressable hitSlop={8}>
              <Text style={styles.forgotText}>Forgot password?</Text>
            </Pressable>
          </View>

          <View style={{ marginTop: 20 }}>
            <AppButton title="Login" icon="arrow-forward" onPress={handleLogin} loading={loading} />
          </View>

          <View style={styles.noteBox}>
            <Ionicons name="information-circle-outline" size={16} color={colors.mutedText} />
            <Text style={styles.noteText}>
              This login can be mock only. Validate empty email/password fields before navigating.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    flex: { flex: 1, backgroundColor: colors.primaryDark },
    container: { padding: 24, flexGrow: 1 },
    backBtn: { width: 32, height: 32, justifyContent: 'center', marginBottom: 12 },
    title: { ...typography.h1, color: colors.white, marginBottom: 6 },
    subtitle: { ...typography.body, color: colors.mutedText, marginBottom: 24 },
    heroImage: {
      width: '100%',
      height: 200,
      marginBottom: 24,
    },
    field: { marginBottom: 16 },
    label: { ...typography.small, color: colors.mutedText, marginBottom: 8 },
    inputRow: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'rgba(255,255,255,0.06)',
      borderRadius: radius.sm,
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.1)',
      paddingHorizontal: 14,
      height: 52,
    },
    input: {
      flex: 1,
      color: colors.white,
      fontSize: 15,
    },
    errorBox: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'rgba(240,68,56,0.1)',
      padding: 10,
      borderRadius: radius.sm,
      marginBottom: 8,
    },
    errorText: { color: colors.danger, marginLeft: 6, fontSize: 13, flex: 1 },
    rowBetween: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 4,
    },
    rememberRow: { flexDirection: 'row', alignItems: 'center' },
    checkbox: {
      width: 18,
      height: 18,
      borderRadius: 5,
      borderWidth: 1.5,
      borderColor: colors.mutedText,
      marginRight: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    checkboxChecked: { backgroundColor: colors.primaryGreen, borderColor: colors.primaryGreen },
    rememberText: { color: colors.mutedText, fontSize: 13 },
    forgotText: { color: colors.primaryGreen, fontSize: 13, fontWeight: '600' },
    noteBox: {
      flexDirection: 'row',
      backgroundColor: 'rgba(255,255,255,0.05)',
      padding: 14,
      borderRadius: radius.sm,
      marginTop: 24,
    },
    noteText: { color: colors.mutedText, fontSize: 12, marginLeft: 8, flex: 1, lineHeight: 18 },
  });

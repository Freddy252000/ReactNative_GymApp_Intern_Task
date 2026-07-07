// src/screens/LoginScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppButton from '../components/AppButton';
import { colors, typography, radius } from '../theme/colors';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Mock login only — no real authentication. We just validate that
  // both fields are non-empty, then simulate a short network delay.
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
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <SafeAreaView style={styles.flex}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <Pressable onPress={() => navigation.goBack()} hitSlop={12} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={22} color={colors.white} />
          </Pressable>

          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.subtitle}>Login to continue your fitness journey.</Text>

          <View style={styles.field}>
            <Text style={styles.label}>Email address</Text>
            <View style={styles.inputRow}>
              <TextInput
                style={styles.input}
                placeholder="alex@email.com"
                placeholderTextColor="#667085"
                autoCapitalize="none"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />
              <Ionicons name="mail-outline" size={18} color="#667085" />
            </View>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputRow}>
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor="#667085"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <Pressable onPress={() => setShowPassword((s) => !s)} hitSlop={10}>
                <Ionicons
                  name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                  size={18}
                  color="#667085"
                />
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
            <Text style={styles.forgotText}>Forgot password?</Text>
          </View>

          <View style={{ marginTop: 20 }}>
            <AppButton title="Login" icon="arrow-forward" onPress={handleLogin} loading={loading} />
          </View>

          <View style={styles.noteBox}>
            <Ionicons name="information-circle-outline" size={16} color="#98A2B3" />
            <Text style={styles.noteText}>
              This login is mock only. Empty email/password fields are validated before navigating.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.primaryDark },
  container: { padding: 24, flexGrow: 1 },
  backBtn: { width: 32, height: 32, justifyContent: 'center', marginBottom: 12 },
  title: { ...typography.h1, color: colors.white, marginBottom: 6 },
  subtitle: { ...typography.body, color: '#98A2B3', marginBottom: 24 },
  field: { marginBottom: 16 },
  label: { ...typography.small, color: '#98A2B3', marginBottom: 8 },
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
    borderColor: '#98A2B3',
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: { backgroundColor: colors.primaryGreen, borderColor: colors.primaryGreen },
  rememberText: { color: '#D0D5DD', fontSize: 13 },
  forgotText: { color: colors.primaryGreen, fontSize: 13, fontWeight: '600' },
  noteBox: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: 14,
    borderRadius: radius.sm,
    marginTop: 24,
  },
  noteText: { color: '#98A2B3', fontSize: 12, marginLeft: 8, flex: 1, lineHeight: 18 },
});

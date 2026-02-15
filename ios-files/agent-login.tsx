import React, { useState, useRef } from 'react';
import {
    View, Text, StyleSheet, Platform, TouchableOpacity,
    ScrollView, TextInput, Keyboard, ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors, shadows } from '@/lib/theme';

const API_URL = __DEV__ ? 'http://localhost:3000/api/mobile' : 'https://pasiflow.com/api/mobile';

export default function AgentLoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const passwordRef = useRef<TextInput>(null);

    const handleAgentLogin = async () => {
        Keyboard.dismiss();
        const trimmedEmail = email.trim().toLowerCase();
        const trimmedPassword = password.trim();

        if (!trimmedEmail || !trimmedPassword) {
            setError('Please fill in all fields');
            if (Platform.OS === 'ios') Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            return;
        }

        if (Platform.OS === 'ios') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        setLoading(true);
        setError('');

        try {
            const response = await fetch(`${API_URL}/auth`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: trimmedEmail, password: trimmedPassword }),
            });
            const data = await response.json();
            if (!data.success) {
                setError(data.message || 'Invalid credentials.');
                if (Platform.OS === 'ios') Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
                return;
            }
            await AsyncStorage.setItem('authToken', data.user.token);
            await AsyncStorage.setItem('user', JSON.stringify(data.user));
            if (Platform.OS === 'ios') Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            router.replace('/agent/dashboard');
        } catch {
            setError('Connection error. Please check your internet.');
            if (Platform.OS === 'ios') Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <LinearGradient colors={['#1a1a2e', '#16213e']} style={s.container}>
            <SafeAreaView style={s.safe}>
                <ScrollView
                    contentContainerStyle={s.scroll}
                    keyboardShouldPersistTaps="handled"
                    keyboardDismissMode="on-drag"
                    automaticallyAdjustKeyboardInsets={true}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Back Button */}
                    <TouchableOpacity
                        onPress={() => router.back()}
                        style={s.backBtn}
                        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                    >
                        <Ionicons name="arrow-back" size={24} color="#FFF" />
                    </TouchableOpacity>

                    {/* Header */}
                    <View style={s.header}>
                        <View style={s.iconCircle}>
                            <Ionicons name="briefcase" size={40} color={colors.accent[500]} />
                        </View>
                        <Text style={s.title}>Agent Portal</Text>
                        <Text style={s.subtitle}>Sign in to manage your clients</Text>
                    </View>

                    {/* Login Card */}
                    <View style={s.card}>
                        {error ? (
                            <View style={s.errorBox}>
                                <Ionicons name="alert-circle" size={16} color={colors.error} />
                                <Text style={s.errorText}>{error}</Text>
                            </View>
                        ) : null}

                        {/* Email */}
                        <Text style={s.label}>Email Address</Text>
                        <View style={s.inputRow}>
                            <Ionicons name="mail-outline" size={18} color="rgba(255,255,255,0.4)" style={s.inputIcon} />
                            <TextInput
                                style={s.input}
                                placeholder="agent@pasiflow.com"
                                placeholderTextColor="rgba(255,255,255,0.3)"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                textContentType="emailAddress"
                                autoComplete="email"
                                autoCapitalize="none"
                                autoCorrect={false}
                                returnKeyType="next"
                                onSubmitEditing={() => passwordRef.current?.focus()}
                                blurOnSubmit={false}
                                editable={!loading}
                            />
                        </View>

                        {/* Password */}
                        <Text style={[s.label, { marginTop: 16 }]}>Password</Text>
                        <View style={s.inputRow}>
                            <Ionicons name="lock-closed-outline" size={18} color="rgba(255,255,255,0.4)" style={s.inputIcon} />
                            <TextInput
                                ref={passwordRef}
                                style={s.input}
                                placeholder="Enter your password"
                                placeholderTextColor="rgba(255,255,255,0.3)"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                                textContentType="password"
                                autoComplete="password"
                                autoCapitalize="none"
                                autoCorrect={false}
                                returnKeyType="go"
                                onSubmitEditing={handleAgentLogin}
                                editable={!loading}
                            />
                            <TouchableOpacity
                                onPress={() => setShowPassword(!showPassword)}
                                hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                            >
                                <Ionicons
                                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                                    size={18}
                                    color="rgba(255,255,255,0.4)"
                                />
                            </TouchableOpacity>
                        </View>

                        {/* Login Button */}
                        <TouchableOpacity
                            onPress={handleAgentLogin}
                            activeOpacity={0.85}
                            disabled={loading}
                            style={{ marginTop: 24 }}
                        >
                            <LinearGradient
                                colors={[colors.accent.gradientStart, colors.accent.gradientEnd]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={s.loginBtn}
                            >
                                {loading ? (
                                    <ActivityIndicator color="#FFF" size="small" />
                                ) : (
                                    <>
                                        <Text style={s.loginBtnText}>Sign In</Text>
                                        <Ionicons name="arrow-forward" size={18} color="#FFF" />
                                    </>
                                )}
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>

                    {/* Info */}
                    <View style={s.infoRow}>
                        <Ionicons name="information-circle-outline" size={16} color="rgba(255,255,255,0.4)" />
                        <Text style={s.infoText}>Contact support if you need agent credentials</Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
}

const s = StyleSheet.create({
    container: {
        flex: 1,
    },
    safe: {
        flex: 1,
    },
    scroll: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 24,
        paddingVertical: 32,
    },
    backBtn: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 10,
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255,255,255,0.08)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    // Header
    header: {
        alignItems: 'center',
        marginBottom: 32,
    },
    iconCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(193,160,94,0.15)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
        borderWidth: 2,
        borderColor: 'rgba(193,160,94,0.3)',
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: '#FFF',
        letterSpacing: -0.5,
        marginBottom: 6,
    },
    subtitle: {
        fontSize: 14,
        fontWeight: '500',
        color: 'rgba(255,255,255,0.5)',
    },
    // Card
    card: {
        backgroundColor: 'rgba(255,255,255,0.06)',
        borderRadius: 24,
        padding: 24,
        borderWidth: 1,
        borderColor: 'rgba(193,160,94,0.2)',
    },
    // Error
    errorBox: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: 'rgba(239,68,68,0.1)',
        borderLeftWidth: 3,
        borderLeftColor: colors.error,
        padding: 12,
        marginBottom: 16,
        borderRadius: 8,
    },
    errorText: {
        color: '#F87171',
        fontSize: 14,
        fontWeight: '500',
        flex: 1,
    },
    // Inputs
    label: {
        fontSize: 13,
        fontWeight: '600',
        color: 'rgba(255,255,255,0.7)',
        marginBottom: 8,
        marginLeft: 2,
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.06)',
        borderRadius: 14,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        height: 52,
        paddingHorizontal: 14,
    },
    inputIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#FFF',
        paddingVertical: 0,
    },
    // Login Button
    loginBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        height: 52,
        borderRadius: 16,
        ...shadows.gold,
    },
    loginBtnText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '700',
    },
    // Info
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 24,
        gap: 6,
    },
    infoText: {
        color: 'rgba(255,255,255,0.4)',
        fontSize: 13,
    },
});

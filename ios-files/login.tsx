import React, { useState, useRef } from 'react';
import {
    View, Text, StyleSheet, Platform, TouchableOpacity, Image,
    ScrollView, TextInput, Keyboard, ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import * as AppleAuthentication from 'expo-apple-authentication';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors, shadows } from '@/lib/theme';

const API_URL = __DEV__ ? 'http://localhost:3000/api/mobile' : 'https://pasiflow.com/api/mobile';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const passwordRef = useRef<TextInput>(null);

    const handleLogin = async () => {
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
            router.replace('/(tabs)');
        } catch {
            setError('Connection error. Please check your internet.');
            if (Platform.OS === 'ios') Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        } finally {
            setLoading(false);
        }
    };

    const handleAppleSignIn = async () => {
        try {
            await AppleAuthentication.signInAsync({
                requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL,
                ],
            });
            if (Platform.OS === 'ios') Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            router.replace('/(tabs)');
        } catch (e: any) {
            if (e.code !== 'ERR_REQUEST_CANCELED') {
                setError('Apple Sign In failed. Please try again.');
            }
        }
    };

    return (
        <LinearGradient colors={[colors.primary[500], colors.primary[700]]} style={s.container}>
            <SafeAreaView style={s.safe}>
                <ScrollView
                    contentContainerStyle={s.scroll}
                    keyboardShouldPersistTaps="handled"
                    keyboardDismissMode="on-drag"
                    automaticallyAdjustKeyboardInsets={true}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Header */}
                    <View style={s.header}>
                        <Image
                            source={require('../../assets/images/logo.png')}
                            style={s.logo}
                        />
                        <Text style={s.title}>Welcome</Text>
                        <Text style={s.subtitle}>US Real Estate Investment Platform</Text>
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
                            <Ionicons name="mail-outline" size={18} color={colors.silver[500]} style={s.inputIcon} />
                            <TextInput
                                style={s.input}
                                placeholder="name@email.com"
                                placeholderTextColor={colors.silver[400]}
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
                            <Ionicons name="lock-closed-outline" size={18} color={colors.silver[500]} style={s.inputIcon} />
                            <TextInput
                                ref={passwordRef}
                                style={s.input}
                                placeholder="Enter your password"
                                placeholderTextColor={colors.silver[400]}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                                textContentType="password"
                                autoComplete="password"
                                autoCapitalize="none"
                                autoCorrect={false}
                                returnKeyType="go"
                                onSubmitEditing={handleLogin}
                                editable={!loading}
                            />
                            <TouchableOpacity
                                onPress={() => setShowPassword(!showPassword)}
                                hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                            >
                                <Ionicons
                                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                                    size={18}
                                    color={colors.silver[500]}
                                />
                            </TouchableOpacity>
                        </View>

                        {/* Login Button */}
                        <TouchableOpacity
                            onPress={handleLogin}
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

                    {/* Apple Sign In */}
                    {Platform.OS === 'ios' && (
                        <View style={s.appleSection}>
                            <View style={s.divider}>
                                <View style={s.divLine} />
                                <Text style={s.divText}>or</Text>
                                <View style={s.divLine} />
                            </View>
                            <AppleAuthentication.AppleAuthenticationButton
                                buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
                                buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.WHITE}
                                cornerRadius={16}
                                style={{ width: '100%', height: 52 }}
                                onPress={handleAppleSignIn}
                            />
                        </View>
                    )}

                    {/* Agent Portal */}
                    <TouchableOpacity
                        onPress={() => router.push('/agent/login')}
                        style={s.agentBtn}
                    >
                        <Ionicons name="briefcase-outline" size={14} color={colors.silver[300]} />
                        <Text style={s.agentBtnText}>Agent Portal</Text>
                    </TouchableOpacity>
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
    // Header
    header: {
        alignItems: 'center',
        marginBottom: 32,
    },
    logo: {
        width: 260,
        height: 85,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    title: {
        fontSize: 30,
        fontWeight: '800',
        color: '#FFF',
        letterSpacing: -0.5,
        marginBottom: 6,
    },
    subtitle: {
        fontSize: 15,
        fontWeight: '500',
        color: colors.silver[300],
    },
    // Card
    card: {
        backgroundColor: '#FFF',
        borderRadius: 24,
        padding: 24,
        ...shadows.float,
    },
    // Error
    errorBox: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: 'rgba(239,68,68,0.08)',
        borderLeftWidth: 3,
        borderLeftColor: colors.error,
        padding: 12,
        marginBottom: 16,
        borderRadius: 8,
    },
    errorText: {
        color: colors.error,
        fontSize: 14,
        fontWeight: '500',
        flex: 1,
    },
    // Inputs
    label: {
        fontSize: 13,
        fontWeight: '600',
        color: colors.text.primary,
        marginBottom: 8,
        marginLeft: 2,
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.background.subtle,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: colors.border.default,
        height: 52,
        paddingHorizontal: 14,
    },
    inputIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: colors.text.primary,
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
    // Apple Section
    appleSection: {
        marginTop: 24,
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 16,
    },
    divLine: {
        flex: 1,
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.15)',
    },
    divText: {
        fontSize: 13,
        color: colors.silver[400],
    },
    // Agent Button
    agentBtn: {
        marginTop: 32,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: 'rgba(255,255,255,0.08)',
        borderRadius: 9999,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    agentBtnText: {
        color: colors.silver[300],
        fontSize: 13,
        fontWeight: '600',
    },
});

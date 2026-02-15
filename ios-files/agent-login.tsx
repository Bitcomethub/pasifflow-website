import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    ScrollView,
    TextInput as RNTextInput,
    Keyboard
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors, spacing, fontSize, fontWeight, borderRadius, shadows } from '@/lib/theme';
import { Button } from '@/components/ui';

const API_URL = __DEV__ ? 'http://localhost:3000/api/mobile' : 'https://pasiflow.com/api/mobile';

export default function AgentLoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);

    const emailRef = useRef<RNTextInput>(null);
    const passwordRef = useRef<RNTextInput>(null);

    const handleAgentLogin = async () => {
        Keyboard.dismiss();

        const trimmedEmail = email.trim().toLowerCase();
        const trimmedPassword = password.trim();

        if (!trimmedEmail || !trimmedPassword) {
            setError('Lütfen tüm alanları doldurun');
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            return;
        }

        if (Platform.OS === 'ios') {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        }

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
                setError(data.message || 'Giriş bilgileri hatalı.');
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
                return;
            }
            await AsyncStorage.setItem('authToken', data.user.token);
            await AsyncStorage.setItem('user', JSON.stringify(data.user));
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            router.replace('/agent/dashboard');
        } catch (err) {
            setError('Bağlantı hatası. İnternet bağlantınızı kontrol edin.');
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        } finally {
            setLoading(false);
        }
    };

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    return (
        <LinearGradient
            colors={['#1a1a2e', '#16213e']}
            style={styles.container}
        >
            <SafeAreaView style={styles.safeArea}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.keyboardView}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
                >
                    <ScrollView
                        contentContainerStyle={styles.scrollContent}
                        keyboardShouldPersistTaps="always"
                        showsVerticalScrollIndicator={false}
                        bounces={false}
                        keyboardDismissMode="none"
                    >
                        <View style={styles.content}>
                            {/* Back Button */}
                            <TouchableOpacity
                                onPress={() => router.back()}
                                style={styles.backButton}
                            >
                                <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
                            </TouchableOpacity>

                            {/* Header */}
                            <View style={styles.header}>
                                <View style={styles.iconContainer}>
                                    <Ionicons name="briefcase" size={40} color={colors.accent[500]} />
                                </View>
                                <Text style={styles.title}>Agent Portal</Text>
                                <Text style={styles.subtitle}>Sign in to manage your clients</Text>
                            </View>

                            {/* Login Card */}
                            <View style={styles.cardContainer}>
                                {error ? (
                                    <View style={styles.errorContainer}>
                                        <Text style={styles.errorText}>{error}</Text>
                                    </View>
                                ) : null}

                                {/* Email Input */}
                                <View style={styles.inputGroup}>
                                    <Text style={styles.inputLabel}>Email Address</Text>
                                    <View style={[
                                        styles.inputContainer,
                                        emailFocused && styles.inputContainerFocused
                                    ]}>
                                        <Ionicons
                                            name="mail-outline"
                                            size={20}
                                            color={emailFocused ? colors.accent[500] : colors.text.tertiary}
                                            style={styles.inputIcon}
                                        />
                                        <RNTextInput
                                            ref={emailRef}
                                            style={styles.input}
                                            placeholder="agent@pasiflow.com"
                                            placeholderTextColor={colors.text.tertiary}
                                            value={email}
                                            onChangeText={setEmail}
                                            keyboardType="email-address"
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                            onFocus={() => setEmailFocused(true)}
                                            onBlur={() => setEmailFocused(false)}
                                            returnKeyType="next"
                                            onSubmitEditing={() => passwordRef.current?.focus()}
                                            blurOnSubmit={false}
                                        />
                                    </View>
                                </View>

                                {/* Password Input */}
                                <View style={styles.inputGroup}>
                                    <Text style={styles.inputLabel}>Password</Text>
                                    <View style={[
                                        styles.inputContainer,
                                        passwordFocused && styles.inputContainerFocused
                                    ]}>
                                        <Ionicons
                                            name="lock-closed-outline"
                                            size={20}
                                            color={passwordFocused ? colors.accent[500] : colors.text.tertiary}
                                            style={styles.inputIcon}
                                        />
                                        <RNTextInput
                                            ref={passwordRef}
                                            style={styles.input}
                                            placeholder="••••••••"
                                            placeholderTextColor={colors.text.tertiary}
                                            value={password}
                                            onChangeText={setPassword}
                                            secureTextEntry={!showPassword}
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                            onFocus={() => setPasswordFocused(true)}
                                            onBlur={() => setPasswordFocused(false)}
                                            returnKeyType="done"
                                            onSubmitEditing={handleAgentLogin}
                                        />
                                        <TouchableOpacity
                                            onPress={() => setShowPassword(!showPassword)}
                                            style={styles.eyeButton}
                                            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                                        >
                                            <Ionicons
                                                name={showPassword ? "eye-off-outline" : "eye-outline"}
                                                size={20}
                                                color={colors.text.tertiary}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <Button
                                    title={loading ? 'Signing In...' : 'Sign In'}
                                    onPress={handleAgentLogin}
                                    loading={loading}
                                    size="lg"
                                    style={styles.loginButton}
                                    textStyle={{ color: colors.text.primary, fontWeight: 'bold' }}
                                />
                            </View>

                            {/* Info */}
                            <View style={styles.infoContainer}>
                                <Ionicons name="information-circle-outline" size={16} color={colors.text.tertiary} />
                                <Text style={styles.infoText}>
                                    Contact support if you need agent credentials
                                </Text>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
    },
    keyboardView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingVertical: 40,
    },
    content: {
        paddingHorizontal: spacing.xl,
        width: '100%',
        maxWidth: 500,
        alignSelf: 'center',
    },
    backButton: {
        position: 'absolute',
        top: -20,
        left: spacing.xl,
        zIndex: 10,
    },
    header: {
        alignItems: 'center',
        marginBottom: spacing.xl,
    },
    iconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(139, 92, 246, 0.15)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: spacing.md,
        borderWidth: 2,
        borderColor: 'rgba(139, 92, 246, 0.3)',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: colors.text.primary,
        marginBottom: spacing.xs,
    },
    subtitle: {
        fontSize: fontSize.base,
        color: colors.text.secondary,
    },
    cardContainer: {
        backgroundColor: colors.background.card,
        borderRadius: borderRadius.xxl,
        padding: spacing.xl,
        borderWidth: 1,
        borderColor: 'rgba(139, 92, 246, 0.2)',
        ...shadows.float,
    },
    errorContainer: {
        backgroundColor: 'rgba(248, 113, 113, 0.1)',
        borderLeftWidth: 4,
        borderLeftColor: colors.error,
        padding: spacing.md,
        marginBottom: spacing.lg,
        borderRadius: borderRadius.sm,
    },
    errorText: {
        color: colors.error,
        fontSize: fontSize.sm,
        fontWeight: fontWeight.medium as any,
    },
    inputGroup: {
        marginBottom: spacing.lg,
    },
    inputLabel: {
        color: colors.text.primary,
        fontSize: fontSize.sm,
        fontWeight: fontWeight.semibold as any,
        marginBottom: spacing.sm,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.background.subtle,
        borderRadius: borderRadius.lg,
        borderWidth: 1.5,
        borderColor: 'transparent',
        paddingHorizontal: spacing.md,
        height: 52,
    },
    inputContainerFocused: {
        backgroundColor: colors.background.card,
        borderColor: colors.accent[500],
        ...shadows.glow,
    },
    inputIcon: {
        marginRight: spacing.sm,
    },
    input: {
        flex: 1,
        color: colors.text.primary,
        fontSize: fontSize.base,
        paddingVertical: 0,
    },
    eyeButton: {
        padding: spacing.xs,
    },
    loginButton: {
        backgroundColor: colors.accent[500],
        marginTop: spacing.md,
        ...shadows.glow,
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: spacing.xl,
        gap: spacing.xs,
    },
    infoText: {
        color: colors.text.tertiary,
        fontSize: fontSize.sm,
    },
});

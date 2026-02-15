import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Image, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
    const logoScale = useRef(new Animated.Value(0.6)).current;
    const logoOpacity = useRef(new Animated.Value(0)).current;
    const textOpacity = useRef(new Animated.Value(0)).current;
    const textTranslateY = useRef(new Animated.Value(20)).current;
    const fadeOut = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        // Play splash animation, then check auth
        Animated.sequence([
            Animated.parallel([
                Animated.timing(logoOpacity, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.timing(logoScale, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true,
                }),
            ]),
            Animated.parallel([
                Animated.timing(textOpacity, {
                    toValue: 1,
                    duration: 600,
                    useNativeDriver: true,
                }),
                Animated.timing(textTranslateY, {
                    toValue: 0,
                    duration: 600,
                    useNativeDriver: true,
                }),
            ]),
            Animated.delay(600),
            Animated.timing(fadeOut, {
                toValue: 0,
                duration: 400,
                useNativeDriver: true,
            }),
        ]).start(async () => {
            // Check for existing auth token (auto-login)
            try {
                const token = await AsyncStorage.getItem('authToken');
                const user = await AsyncStorage.getItem('user');
                if (token && user) {
                    // User is already authenticated — go to dashboard
                    router.replace('/(tabs)');
                } else {
                    // No token — go to login
                    router.replace('/(auth)/login');
                }
            } catch {
                // On any error, go to login
                router.replace('/(auth)/login');
            }
        });
    }, []);

    return (
        <Animated.View style={[styles.container, { opacity: fadeOut }]}>
            <LinearGradient
                colors={['#FFFFFF', '#F5F5F5']}
                style={styles.gradient}
            >
                {/* Decorative glow orbs */}
                <View style={[styles.glowOrb, styles.glowOrb1]} />
                <View style={[styles.glowOrb, styles.glowOrb2]} />

                {/* Logo */}
                <Animated.View
                    style={[
                        styles.logoWrapper,
                        {
                            opacity: logoOpacity,
                            transform: [{ scale: logoScale }],
                        },
                    ]}
                >
                    <Image
                        source={require('../assets/images/logo.png')}
                        style={styles.logo}
                    />
                </Animated.View>

                {/* Tagline */}
                <Animated.View
                    style={{
                        opacity: textOpacity,
                        transform: [{ translateY: textTranslateY }],
                    }}
                >
                    <Text style={styles.tagline}>Gelecegin Yatirimi</Text>
                    <View style={styles.underline} />
                </Animated.View>
            </LinearGradient>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoWrapper: {
        marginBottom: 24,
    },
    logo: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
    tagline: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1F2328',
        textTransform: 'uppercase',
        letterSpacing: 3,
        textAlign: 'center',
    },
    underline: {
        width: 40,
        height: 3,
        backgroundColor: '#C1A05E',
        borderRadius: 2,
        alignSelf: 'center',
        marginTop: 12,
        shadowColor: '#C1A05E',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.6,
        shadowRadius: 8,
    },
    glowOrb: {
        position: 'absolute',
        borderRadius: 999,
        backgroundColor: '#C1A05E',
    },
    glowOrb1: {
        width: 200,
        height: 200,
        top: -50,
        left: -50,
        opacity: 0.08,
    },
    glowOrb2: {
        width: 250,
        height: 250,
        bottom: -80,
        right: -80,
        opacity: 0.1,
    },
});

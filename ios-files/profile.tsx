import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors, shadows } from '@/lib/theme';

export default function ProfileScreen() {
    const [user, setUser] = useState({
        name: 'Investor',
        email: '',
        role: 'client',
    });

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        try {
            const stored = await AsyncStorage.getItem('user');
            if (stored) {
                const parsed = JSON.parse(stored);
                setUser({
                    name: parsed.name || 'Investor',
                    email: parsed.email || '',
                    role: parsed.role || 'client',
                });
            }
        } catch {
            // silent
        }
    };

    const handleLogout = async () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Logout',
                    style: 'destructive',
                    onPress: async () => {
                        // CRITICAL: Clear tokens BEFORE navigating
                        await AsyncStorage.multiRemove(['authToken', 'user']);
                        router.replace('/(auth)/login');
                    },
                },
            ]
        );
    };

    const initials = user.name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase();

    const roleLabel = user.role === 'agent' ? 'Agent' : 'Investor';

    const profileLinks: Record<string, string> = {
        'About': 'https://pasiflow.com/tr/about',
        'Contact': 'https://pasiflow.com/tr/iletisim',
        'Privacy Policy': 'https://pasiflow.com/tr/gizlilik',
        'Terms of Service': 'https://pasiflow.com/tr/kullanim-sartlari',
    };

    const handleProfileLink = (label: string) => {
        const url = profileLinks[label];
        if (url) Linking.openURL(url);
    };

    return (
        <View style={s.container}>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={s.header}>
                    <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
                        <Ionicons name="arrow-back" size={22} color={colors.text.primary} />
                    </TouchableOpacity>
                    <Text style={s.headerTitle}>Profile</Text>
                    <View style={{ width: 40 }} />
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.content}>
                    {/* Avatar Section */}
                    <View style={s.avatarSection}>
                        <View style={s.avatarWrap}>
                            <LinearGradient colors={[colors.accent[500], colors.accent[600]]} style={s.avatarGradient}>
                                <Text style={s.avatarText}>{initials || 'U'}</Text>
                            </LinearGradient>
                        </View>
                        <Text style={s.userName}>{user.name}</Text>
                        <View style={s.roleBadge}>
                            <Ionicons name="shield-checkmark" size={12} color={colors.accent[500]} />
                            <Text style={s.roleText}>{roleLabel}</Text>
                        </View>
                    </View>

                    {/* Info Card */}
                    <View style={s.infoCard}>
                        {[
                            { icon: 'mail-outline' as const, label: 'Email', value: user.email || 'N/A' },
                            { icon: 'person-outline' as const, label: 'Role', value: roleLabel },
                        ].map((item, i) => (
                            <View key={item.label}>
                                {i > 0 && <View style={s.infoDivider} />}
                                <View style={s.infoRow}>
                                    <View style={s.infoIconWrap}>
                                        <Ionicons name={item.icon} size={18} color={colors.accent[500]} />
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Text style={s.infoLabel}>{item.label}</Text>
                                        <Text style={s.infoValue}>{item.value}</Text>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>

                    {/* Menu Sections */}
                    <View style={s.menuSection}>
                        <Text style={s.sectionTitle}>SUPPORT</Text>
                        <View style={s.menuCard}>
                            {[
                                { icon: 'information-circle-outline' as const, label: 'About' },
                                { icon: 'mail-outline' as const, label: 'Contact' },
                            ].map((item, i) => (
                                <View key={item.label}>
                                    {i > 0 && <View style={s.menuDivider} />}
                                    <TouchableOpacity style={s.menuItem} onPress={() => handleProfileLink(item.label)}>
                                        <View style={s.menuIconWrap}>
                                            <Ionicons name={item.icon} size={18} color={colors.accent[500]} />
                                        </View>
                                        <Text style={s.menuLabel}>{item.label}</Text>
                                        <Ionicons name="chevron-forward" size={16} color={colors.silver[400]} />
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>

                        <Text style={s.sectionTitle}>LEGAL</Text>
                        <View style={s.menuCard}>
                            {[
                                { icon: 'shield-checkmark-outline' as const, label: 'Privacy Policy' },
                                { icon: 'document-text-outline' as const, label: 'Terms of Service' },
                            ].map((item, i) => (
                                <View key={item.label}>
                                    {i > 0 && <View style={s.menuDivider} />}
                                    <TouchableOpacity style={s.menuItem} onPress={() => handleProfileLink(item.label)}>
                                        <View style={s.menuIconWrap}>
                                            <Ionicons name={item.icon} size={18} color={colors.accent[500]} />
                                        </View>
                                        <Text style={s.menuLabel}>{item.label}</Text>
                                        <Ionicons name="chevron-forward" size={16} color={colors.silver[400]} />
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Logout */}
                    <TouchableOpacity style={s.logoutBtn} onPress={handleLogout}>
                        <Ionicons name="log-out-outline" size={18} color={colors.error} />
                        <Text style={s.logoutText}>Logout</Text>
                    </TouchableOpacity>

                    {/* Delete Account */}
                    <TouchableOpacity
                        style={s.deleteBtn}
                        onPress={() => {
                            Alert.alert(
                                'Delete Account',
                                'Are you sure? This action cannot be undone.',
                                [
                                    { text: 'Cancel', style: 'cancel' },
                                    {
                                        text: 'Delete',
                                        style: 'destructive',
                                        onPress: async () => {
                                            await AsyncStorage.multiRemove(['authToken', 'user']);
                                            router.replace('/(auth)/login');
                                        },
                                    },
                                ]
                            );
                        }}
                    >
                        <Ionicons name="trash-outline" size={18} color={colors.silver[500]} />
                        <Text style={s.deleteText}>Delete Account</Text>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const s = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background.main },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 12 },
    backBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 20, backgroundColor: '#FFF', borderWidth: 1, borderColor: colors.border.subtle },
    headerTitle: { fontSize: 18, fontWeight: '700', color: colors.text.primary },
    content: { padding: 20, paddingBottom: 60 },

    // Avatar
    avatarSection: { alignItems: 'center', marginBottom: 24 },
    avatarWrap: { marginBottom: 12 },
    avatarGradient: { width: 90, height: 90, borderRadius: 45, alignItems: 'center', justifyContent: 'center', ...shadows.gold },
    avatarText: { fontSize: 32, fontWeight: '800', color: '#FFF' },
    userName: { fontSize: 22, fontWeight: '700', color: colors.text.primary, marginBottom: 6 },
    roleBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: 'rgba(193,160,94,0.1)', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 99 },
    roleText: { fontSize: 12, fontWeight: '600', color: colors.accent[500] },

    // Info Card
    infoCard: { backgroundColor: '#FFF', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: colors.border.subtle, marginBottom: 20 },
    infoRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8 },
    infoIconWrap: { width: 36, height: 36, borderRadius: 10, backgroundColor: 'rgba(193,160,94,0.1)', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
    infoLabel: { fontSize: 11, color: colors.silver[500], marginBottom: 2 },
    infoValue: { fontSize: 15, color: colors.text.primary },
    infoDivider: { height: 1, backgroundColor: colors.border.subtle, marginVertical: 4 },

    // Menu
    menuSection: { marginBottom: 20 },
    sectionTitle: { fontSize: 11, color: colors.silver[500], fontWeight: '700', marginBottom: 8, marginLeft: 4, letterSpacing: 1 },
    menuCard: { backgroundColor: '#FFF', borderRadius: 16, borderWidth: 1, borderColor: colors.border.subtle, overflow: 'hidden', marginBottom: 16 },
    menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 16 },
    menuDivider: { height: 1, backgroundColor: colors.border.subtle },
    menuIconWrap: { width: 32, height: 32, borderRadius: 8, backgroundColor: 'rgba(193,160,94,0.1)', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
    menuLabel: { flex: 1, fontSize: 15, color: colors.text.primary },

    // Buttons
    logoutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 14, backgroundColor: 'rgba(239,68,68,0.06)', borderRadius: 16, marginBottom: 10 },
    logoutText: { fontSize: 15, fontWeight: '600', color: colors.error },
    deleteBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 14, borderRadius: 16, borderWidth: 1, borderColor: colors.border.subtle },
    deleteText: { fontSize: 14, fontWeight: '500', color: colors.silver[500] },
});

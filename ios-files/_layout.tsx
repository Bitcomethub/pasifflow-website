import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { Asset } from 'expo-asset';
import * as SplashScreen from 'expo-splash-screen';
import * as Updates from 'expo-updates';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { colors } from '@/lib/theme';

// Keep splash screen visible while loading fonts
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [fontsLoaded] = useFonts({
        // We'll add custom fonts here later
    });

    // Check for OTA updates silently — download only, apply on next cold start
    useEffect(() => {
        async function checkForUpdates() {
            if (__DEV__) return;
            try {
                const update = await Updates.checkForUpdateAsync();
                if (update.isAvailable) {
                    // Download the update in background — it will apply on next app restart
                    await Updates.fetchUpdateAsync();
                    // DO NOT call Updates.reloadAsync() here!
                    // Reloading mid-session kicks user back to splash/login.
                    // The update will automatically apply on the next cold start.
                }
            } catch (e) {
                console.log('Update check failed:', e);
            }
        }
        checkForUpdates();
    }, []);

    useEffect(() => {
        async function prepare() {
            try {
                // Preload image assets
                await Asset.loadAsync([
                    require('../assets/images/icon.png'),
                ]);
            } catch (e) {
                console.warn(e);
            } finally {
                if (fontsLoaded) {
                    await SplashScreen.hideAsync();
                }
            }
        }

        if (fontsLoaded) {
            prepare();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaProvider>
                <StatusBar style="light" />
                <Stack
                    screenOptions={{
                        headerShown: false,
                        contentStyle: { backgroundColor: '#1F2328' },
                        animation: 'slide_from_right',
                    }}
                >
                    <Stack.Screen name="index" options={{ headerShown: false, animation: 'none' }} />
                    <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                    <Stack.Screen name="agent" options={{ headerShown: false }} />
                </Stack>
            </SafeAreaProvider>
        </GestureHandlerRootView>
    );
}

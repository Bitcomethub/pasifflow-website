import AsyncStorage from '@react-native-async-storage/async-storage';

// For iOS Simulator, localhost works. For Android Emulator, use 10.0.2.2.
// For physical device, use your machine's local IP (e.g., 192.168.1.x:3000).
const DEV_API_URL = 'http://localhost:3000/api/mobile';

// In production, this would be the Vercel URL
const PROD_API_URL = 'https://pasiflow.com/api/mobile';

const API_BASE_URL = __DEV__ ? DEV_API_URL : PROD_API_URL;

// CRITICAL FIX: authFetch must NEVER auto-redirect to login.
// Auto-redirecting from API calls was the root cause of the "kickout" bug.
// Only the splash screen (index.tsx) should handle auth routing.
async function authFetch(url: string): Promise<Response> {
    const token = await AsyncStorage.getItem('authToken');
    if (!token) {
        throw new Error('No auth token');
    }
    const response = await fetch(url, {
        headers: { 'Authorization': `Bearer ${token}` },
    });
    if (response.status === 401) {
        // Token expired or invalid — clear stored tokens
        // but do NOT redirect. Let the caller handle the error gracefully.
        await AsyncStorage.multiRemove(['authToken', 'user']);
        throw new Error('Session expired');
    }
    return response;
}

export const api = {
    getDashboard: async () => {
        try {
            const response = await authFetch(`${API_BASE_URL}/dashboard`);
            if (!response.ok) throw new Error('Network response was not ok');
            return await response.json();
        } catch (error) {
            console.error('API Error (Dashboard):', error);
            throw error;
        }
    },

    getProperty: async (id: string) => {
        try {
            const response = await authFetch(`${API_BASE_URL}/properties`);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            return data.find((p: any) => p.id === id);
        } catch (error) {
            console.error('API Error (Property Detail):', error);
            throw error;
        }
    },

    getProperties: async () => {
        try {
            const response = await authFetch(`${API_BASE_URL}/properties`);
            if (!response.ok) throw new Error('Network response was not ok');
            return await response.json();
        } catch (error) {
            console.error('API Error (Properties):', error);
            throw error;
        }
    },

    getPayments: async () => {
        try {
            const response = await authFetch(`${API_BASE_URL}/payments`);
            if (!response.ok) throw new Error('Network response was not ok');
            return await response.json();
        } catch (error) {
            console.error('API Error (Payments):', error);
            throw error;
        }
    },

    getDocuments: async () => {
        try {
            const response = await authFetch(`${API_BASE_URL}/documents`);
            if (!response.ok) throw new Error('Network response was not ok');
            return await response.json();
        } catch (error) {
            console.error('API Error (Documents):', error);
            throw error;
        }
    },

    getMaintenance: async () => {
        try {
            const response = await authFetch(`${API_BASE_URL}/maintenance`);
            if (!response.ok) throw new Error('Network response was not ok');
            return await response.json();
        } catch (error) {
            console.error('API Error (Maintenance):', error);
            throw error;
        }
    },

    getFinancials: async () => {
        try {
            const response = await authFetch(`${API_BASE_URL}/financials`);
            if (!response.ok) throw new Error('Network response was not ok');
            return await response.json();
        } catch (error) {
            console.error('API Error (Financials):', error);
            throw error;
        }
    },

    getAgentDashboard: async () => {
        try {
            const response = await authFetch(`${API_BASE_URL}/agent/dashboard`);
            if (!response.ok) throw new Error('Network response was not ok');
            return await response.json();
        } catch (error) {
            console.error('API Error (Agent Dashboard):', error);
            throw error;
        }
    }
};

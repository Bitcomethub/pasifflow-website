// API Configuration for Pasiflow Mobile App
// This file handles the Railway backend (news, AI features).
// Main mobile API (auth, dashboard, properties) is in services/api.ts → pasiflow.com/api/mobile

import AsyncStorage from '@react-native-async-storage/async-storage';

// For development: Use your local machine's IP address when testing on physical device
// For production: Uses Railway deployment URL automatically
const DEV_API_URL = 'http://localhost:3001';
const PROD_API_URL = 'https://pasiflow-api-production.up.railway.app';

const IS_PRODUCTION = !__DEV__;

export const API_BASE_URL = IS_PRODUCTION ? PROD_API_URL : DEV_API_URL;

// Helper function for API calls
export async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    try {
        const response = await fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options?.headers,
            },
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        return response.json();
    } catch (error) {
        console.error(`API call failed for ${endpoint}:`, error);
        throw error;
    }
}

// Auth token storage using AsyncStorage (persists across app restarts)
export async function setAuthToken(token: string | null) {
    if (token) {
        await AsyncStorage.setItem('authToken', token);
    } else {
        await AsyncStorage.removeItem('authToken');
    }
}

export async function getAuthToken(): Promise<string | null> {
    return AsyncStorage.getItem('authToken');
}

// Authenticated API call helper
export async function fetchAuthAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const authToken = await getAuthToken();
    if (!authToken) {
        throw new Error('No auth token available');
    }

    return fetchAPI(endpoint, {
        ...options,
        headers: {
            ...options?.headers,
            'Authorization': `Bearer ${authToken}`,
        },
    });
}

// News API Types
export interface NewsItem {
    id: string;
    title: string;
    link: string;
    pubDate: string;
    snippet: string;
    content?: string; // Full article content for in-app reading
    source: string;
    image: string;
}

export interface NewsResponse {
    news: NewsItem[];
    cached: boolean;
    stale?: boolean;
}

// Fetch real estate news
export async function fetchNews(): Promise<NewsItem[]> {
    try {
        const response = await fetchAPI<NewsResponse>('/api/news');
        return response.news;
    } catch (error) {
        console.error('Failed to fetch news:', error);
        return [];
    }
}

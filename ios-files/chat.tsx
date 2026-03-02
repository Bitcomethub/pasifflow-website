import React, { useState, useRef, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/lib/theme';

const API_URL = __DEV__
    ? 'http://localhost:3000/api/chat'
    : 'https://pasiflow.com/api/chat';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

const INITIAL_MESSAGE: Message = {
    id: 'welcome',
    role: 'assistant',
    content:
        'Merhaba! Ben Pasi, Pasiflow\'un akıllı yatırım danışmanı. ABD gayrimenkul yatırımları, ROI hesaplamaları veya piyasa analizi hakkında bana her şeyi sorabilirsin. Nasıl yardımcı olabilirim?',
    timestamp: new Date(),
};

const SUGGESTIONS = [
    'Section 8 nedir?',
    "Detroit'te yatırım",
    '$50K bütçe ile ne alabilirim?',
    'Yıllık getiri hesapla',
];

export default function ChatScreen() {
    const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const flatListRef = useRef<FlatList>(null);

    const sendMessage = useCallback(
        async (text: string) => {
            const trimmed = text.trim();
            if (!trimmed || isLoading) return;

            const userMsg: Message = {
                id: `user-${Date.now()}`,
                role: 'user',
                content: trimmed,
                timestamp: new Date(),
            };

            const updatedMessages = [...messages, userMsg];
            setMessages(updatedMessages);
            setInput('');
            setIsLoading(true);

            try {
                const apiMessages = updatedMessages
                    .filter((m) => m.id !== 'welcome')
                    .map((m) => ({ role: m.role, content: m.content }));

                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ messages: apiMessages }),
                });

                if (!response.ok) throw new Error('Chat API error');

                const data = await response.json();
                const aiMsg: Message = {
                    id: `ai-${Date.now()}`,
                    role: 'assistant',
                    content: data.content || data.message || 'Üzgünüm, bir hata oluştu.',
                    timestamp: new Date(),
                };
                setMessages((prev) => [...prev, aiMsg]);
            } catch {
                setMessages((prev) => [
                    ...prev,
                    {
                        id: `err-${Date.now()}`,
                        role: 'assistant',
                        content: 'Bağlantı hatası. Lütfen tekrar deneyin.',
                        timestamp: new Date(),
                    },
                ]);
            } finally {
                setIsLoading(false);
            }
        },
        [messages, isLoading],
    );

    const renderMessage = ({ item }: { item: Message }) => {
        const isUser = item.role === 'user';
        return (
            <View style={[s.msgRow, isUser ? s.msgRowUser : s.msgRowAi]}>
                {!isUser && (
                    <View style={s.aiAvatar}>
                        <Ionicons name="sparkles" size={14} color="#FFF" />
                    </View>
                )}
                <View
                    style={[
                        s.bubble,
                        isUser ? s.bubbleUser : s.bubbleAi,
                    ]}
                >
                    {!isUser && <View style={s.goldBar} />}
                    <Text style={[s.msgText, isUser ? s.msgTextUser : s.msgTextAi]}>
                        {item.content}
                    </Text>
                </View>
            </View>
        );
    };

    const showSuggestions = messages.length <= 1;

    return (
        <View style={s.container}>
            {/* Header */}
            <LinearGradient
                colors={['#C1A05E', '#D4B876']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={s.header}
            >
                <SafeAreaView edges={['top']} style={s.headerInner}>
                    <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
                        <Ionicons name="arrow-back" size={22} color="#FFF" />
                    </TouchableOpacity>
                    <View style={s.headerCenter}>
                        <View style={s.headerTitleRow}>
                            <Ionicons name="sparkles" size={16} color="#FFF" />
                            <Text style={s.headerTitle}>Pasi AI</Text>
                        </View>
                        <Text style={s.headerSubtitle}>Akıllı Yatırım Danışmanı</Text>
                    </View>
                    <View style={s.onlineDot} />
                </SafeAreaView>
            </LinearGradient>

            {/* Messages */}
            <KeyboardAvoidingView
                style={s.chatArea}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={0}
            >
                <FlatList
                    ref={flatListRef}
                    data={messages}
                    keyExtractor={(item) => item.id}
                    renderItem={renderMessage}
                    contentContainerStyle={s.messagesList}
                    showsVerticalScrollIndicator={false}
                    onContentSizeChange={() =>
                        flatListRef.current?.scrollToEnd({ animated: true })
                    }
                    ListFooterComponent={
                        isLoading ? (
                            <View style={s.typingRow}>
                                <View style={s.aiAvatar}>
                                    <Ionicons name="sparkles" size={14} color="#FFF" />
                                </View>
                                <View style={s.typingBubble}>
                                    <ActivityIndicator size="small" color={colors.accent[500]} />
                                    <Text style={s.typingText}>Pasi yazıyor...</Text>
                                </View>
                            </View>
                        ) : null
                    }
                />

                {/* Suggestions */}
                {showSuggestions && (
                    <View style={s.suggestionsWrap}>
                        {SUGGESTIONS.map((sug) => (
                            <TouchableOpacity
                                key={sug}
                                style={s.suggestionPill}
                                onPress={() => sendMessage(sug)}
                            >
                                <Text style={s.suggestionText}>{sug}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}

                {/* Input */}
                <View style={s.inputBar}>
                    <TextInput
                        style={s.textInput}
                        placeholder="Bir soru sorun..."
                        placeholderTextColor={colors.silver[400]}
                        value={input}
                        onChangeText={setInput}
                        onSubmitEditing={() => sendMessage(input)}
                        returnKeyType="send"
                        multiline
                        maxLength={1000}
                    />
                    <TouchableOpacity
                        style={[s.sendBtn, !input.trim() && s.sendBtnDisabled]}
                        onPress={() => sendMessage(input)}
                        disabled={!input.trim() || isLoading}
                    >
                        <Ionicons
                            name="send"
                            size={18}
                            color={input.trim() ? '#FFF' : colors.silver[400]}
                        />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
}

const s = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFFFFF' },

    // Header
    header: { paddingBottom: 16 },
    headerInner: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 8,
    },
    backBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerCenter: { flex: 1, alignItems: 'center' },
    headerTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    headerTitle: { fontSize: 18, fontWeight: '800', color: '#FFF' },
    headerSubtitle: { fontSize: 12, color: 'rgba(255,255,255,0.8)', marginTop: 2 },
    onlineDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#34D399',
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.5)',
    },

    // Chat area
    chatArea: { flex: 1, backgroundColor: '#FAFAF8' },
    messagesList: { padding: 16, paddingBottom: 8 },

    // Message rows
    msgRow: { flexDirection: 'row', marginBottom: 12, maxWidth: '85%' },
    msgRowUser: { alignSelf: 'flex-end' },
    msgRowAi: { alignSelf: 'flex-start' },

    // Avatar
    aiAvatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#C1A05E',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8,
        marginTop: 4,
    },

    // Bubbles
    bubble: {
        borderRadius: 18,
        paddingVertical: 12,
        paddingHorizontal: 16,
        maxWidth: '100%',
        flexShrink: 1,
    },
    bubbleUser: {
        backgroundColor: '#1F2328',
        borderTopRightRadius: 4,
    },
    bubbleAi: {
        backgroundColor: 'rgba(193,160,94,0.08)',
        borderTopLeftRadius: 4,
        borderWidth: 1,
        borderColor: 'rgba(193,160,94,0.15)',
        flexDirection: 'row',
        overflow: 'hidden',
    },
    goldBar: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: 3,
        backgroundColor: '#C1A05E',
        borderTopLeftRadius: 18,
        borderBottomLeftRadius: 18,
    },
    msgText: { fontSize: 15, lineHeight: 22 },
    msgTextUser: { color: '#FFFFFF' },
    msgTextAi: { color: '#1F2328', paddingLeft: 4 },

    // Typing indicator
    typingRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
    typingBubble: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: 'rgba(193,160,94,0.08)',
        borderRadius: 16,
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: 'rgba(193,160,94,0.15)',
    },
    typingText: { fontSize: 13, color: colors.silver[500] },

    // Suggestions
    suggestionsWrap: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        paddingHorizontal: 16,
        paddingBottom: 12,
    },
    suggestionPill: {
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 20,
        backgroundColor: '#FFF',
        borderWidth: 1.5,
        borderColor: 'rgba(193,160,94,0.3)',
    },
    suggestionText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#C1A05E',
    },

    // Input bar
    inputBar: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingHorizontal: 12,
        paddingVertical: 10,
        backgroundColor: '#FFF',
        borderTopWidth: 1,
        borderTopColor: 'rgba(0,0,0,0.06)',
    },
    textInput: {
        flex: 1,
        minHeight: 42,
        maxHeight: 100,
        backgroundColor: '#F5F5F5',
        borderRadius: 22,
        paddingHorizontal: 18,
        paddingVertical: 10,
        fontSize: 15,
        color: '#1F2328',
        marginRight: 8,
    },
    sendBtn: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: '#C1A05E',
        alignItems: 'center',
        justifyContent: 'center',
    },
    sendBtnDisabled: {
        backgroundColor: '#E8E8E8',
    },
});

import React, { useState, useMemo } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Slider from '@react-native-community/slider';
import { colors } from '@/lib/theme';

// Calculation parameters — identical to website investment-calculator.tsx
const MIN_INVESTMENT = 30_000;
const MAX_INVESTMENT = 5_000_000;
const STEP = 5_000;
const ANNUAL_RETURN = 0.15;
const APPRECIATION_RATE = 0.035;
const RECOVERY_YEARS = 6;

function formatUSD(n: number): string {
    return '$' + n.toLocaleString('en-US');
}

function formatShortUSD(n: number): string {
    if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
    return `$${n}`;
}

export default function CalculatorScreen() {
    const [investment, setInvestment] = useState(50_000);

    const calc = useMemo(() => {
        const monthlyIncome = Math.round((investment * ANNUAL_RETURN) / 12);
        const yearlyIncome = Math.round(investment * ANNUAL_RETURN);
        const totalReturn6Y = yearlyIncome * RECOVERY_YEARS;
        const projectedValue6Y = Math.round(
            investment * Math.pow(1 + APPRECIATION_RATE, RECOVERY_YEARS),
        );
        const totalROI = ((totalReturn6Y + projectedValue6Y - investment) / investment) * 100;
        const appreciation6Y = projectedValue6Y - investment;

        return {
            monthlyIncome,
            yearlyIncome,
            totalReturn6Y,
            projectedValue6Y,
            totalROI,
            appreciation6Y,
        };
    }, [investment]);

    // 6-year projection data — same approach as website
    const yearData = useMemo(() => {
        return [1, 2, 3, 4, 5, 6].map((year) => ({
            year,
            cumulative: calc.yearlyIncome * year,
            portfolioValue: Math.round(
                investment * Math.pow(1 + APPRECIATION_RATE, year),
            ),
        }));
    }, [calc.yearlyIncome, investment]);

    const maxBar = calc.yearlyIncome * 6;

    const handleSliderChange = (value: number) => {
        const rounded = Math.round(value / STEP) * STEP;
        setInvestment(Math.max(MIN_INVESTMENT, Math.min(MAX_INVESTMENT, rounded)));
    };

    return (
        <View style={s.container}>
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
                    {/* Header */}
                    <Text style={s.title}>Yatırım Simülatörü</Text>

                    {/* Detroit badge */}
                    <View style={s.cityBadge}>
                        <Ionicons name="location" size={14} color={colors.accent[500]} />
                        <Text style={s.cityText}>Detroit, Michigan</Text>
                        <View style={s.cityStatBadge}>
                            <Text style={s.cityStatText}>Değer Artışı %15</Text>
                        </View>
                    </View>

                    {/* Slider Card */}
                    <View style={s.sliderCard}>
                        <Text style={s.sliderLabel}>Yatırım Tutarı: {formatUSD(investment)}</Text>
                        <Slider
                            style={s.slider}
                            minimumValue={MIN_INVESTMENT}
                            maximumValue={MAX_INVESTMENT}
                            step={STEP}
                            value={investment}
                            onValueChange={handleSliderChange}
                            minimumTrackTintColor={colors.accent[500]}
                            maximumTrackTintColor={colors.silver[200]}
                            thumbTintColor={colors.accent[500]}
                        />
                        <View style={s.sliderRange}>
                            <Text style={s.rangeText}>{formatShortUSD(MIN_INVESTMENT)}</Text>
                            <Text style={s.rangeText}>{formatShortUSD(MAX_INVESTMENT)}</Text>
                        </View>

                        <View style={s.divider} />

                        <Text style={s.sliderLabel}>Vade: {RECOVERY_YEARS} Yıl</Text>
                        <View style={s.termBar}>
                            <View style={s.termFill} />
                        </View>
                    </View>

                    {/* Results Card — Dark */}
                    <LinearGradient
                        colors={['#1F2328', '#2A2F35']}
                        style={s.resultsCard}
                    >
                        <Text style={s.resultsLabel}>TAHMİNİ TOPLAM GETİRİ</Text>
                        <Text style={s.resultsAmount}>
                            {formatUSD(calc.totalReturn6Y + calc.appreciation6Y)}
                        </Text>
                        <View style={s.roiBadge}>
                            <Text style={s.roiText}>
                                Toplam ROI  %{calc.totalROI.toFixed(1)}
                            </Text>
                        </View>
                        <View style={s.resultsRow}>
                            <View style={s.resultsCol}>
                                <Text style={s.resultsSubLabel}>Değer Artışı</Text>
                                <Text style={s.resultsSubValue}>
                                    +{formatUSD(calc.appreciation6Y)}
                                </Text>
                            </View>
                            <View style={s.resultsCol}>
                                <Text style={s.resultsSubLabel}>Kira Geliri</Text>
                                <Text style={s.resultsSubValue}>
                                    +{formatUSD(calc.totalReturn6Y)}
                                </Text>
                            </View>
                        </View>
                    </LinearGradient>

                    {/* Detailed Analysis */}
                    <View style={s.analysisCard}>
                        <View style={s.analysisHeader}>
                            <Ionicons name="trending-up" size={18} color={colors.accent[500]} />
                            <Text style={s.analysisTitle}>Detaylı Analiz</Text>
                        </View>

                        <Text style={s.analysisSectionTitle}>Aylık & Yıllık Gelir</Text>
                        <View style={s.analysisRow}>
                            <Text style={s.analysisLabel}>Aylık Kira Geliri</Text>
                            <Text style={s.analysisValueGreen}>
                                {formatUSD(calc.monthlyIncome)}
                            </Text>
                        </View>
                        <View style={s.analysisRow}>
                            <Text style={s.analysisLabel}>Yıllık Kira Geliri</Text>
                            <Text style={s.analysisValueGreen}>
                                {formatUSD(calc.yearlyIncome)}
                            </Text>
                        </View>

                        <Text style={s.analysisSectionTitle}>Tahmini Giderler (Yıllık)</Text>
                        <View style={s.analysisRow}>
                            <Text style={s.analysisLabel}>Sigorta</Text>
                            <Text style={s.analysisValueRed}>-$250</Text>
                        </View>
                        <View style={s.analysisRow}>
                            <Text style={s.analysisLabel}>Vergi</Text>
                            <Text style={s.analysisValueRed}>-$600</Text>
                        </View>
                        <View style={s.analysisRow}>
                            <Text style={s.analysisLabel}>Bakım/Onarım</Text>
                            <Text style={s.analysisValueRed}>-$500</Text>
                        </View>

                        <View style={s.divider} />

                        <Text style={s.analysisSectionTitle}>6 Yıllık Projeksiyon</Text>
                        {/* Bar chart */}
                        <View style={s.chartWrap}>
                            {yearData.map((d) => {
                                const pct = maxBar > 0 ? Math.max(8, (d.cumulative / maxBar) * 100) : 8;
                                return (
                                    <View key={d.year} style={s.chartCol}>
                                        <Text style={s.chartValue}>
                                            {formatShortUSD(d.cumulative)}
                                        </Text>
                                        <View style={s.chartBarBg}>
                                            <LinearGradient
                                                colors={
                                                    d.year === 6
                                                        ? ['#C1A05E', '#D4B876']
                                                        : [`rgba(193,160,94,${0.3 + d.year * 0.1})`, `rgba(212,196,160,${0.3 + d.year * 0.1})`]
                                                }
                                                style={[s.chartBar, { height: `${pct}%` }]}
                                            />
                                        </View>
                                        <Text style={s.chartLabel}>{d.year}.Yıl</Text>
                                    </View>
                                );
                            })}
                        </View>

                        <View style={s.analysisRow}>
                            <Text style={s.analysisLabel}>Tahmini Portföy Değeri (6Y)</Text>
                            <Text style={s.analysisValueGold}>
                                {formatUSD(calc.projectedValue6Y)}
                            </Text>
                        </View>
                    </View>

                    {/* Disclaimer */}
                    <View style={s.disclaimer}>
                        <Ionicons name="information-circle-outline" size={14} color={colors.silver[400]} />
                        <Text style={s.disclaimerText}>
                            Bu değerler hedef ve projeksiyondur. Piyasa koşullarına göre değişiklik gösterebilir.
                        </Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const s = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background.main },
    scroll: { padding: 20, paddingBottom: 40 },

    title: {
        fontSize: 28,
        fontWeight: '800',
        color: colors.text.primary,
        marginBottom: 12,
    },

    // City badge
    cityBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: 'rgba(193,160,94,0.08)',
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderWidth: 1.5,
        borderColor: 'rgba(193,160,94,0.25)',
        marginBottom: 20,
        alignSelf: 'flex-start',
    },
    cityText: {
        fontSize: 15,
        fontWeight: '700',
        color: colors.text.primary,
    },
    cityStatBadge: {
        backgroundColor: 'rgba(193,160,94,0.15)',
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 3,
        marginLeft: 4,
    },
    cityStatText: {
        fontSize: 12,
        fontWeight: '700',
        color: colors.accent[500],
    },

    // Slider card
    sliderCard: {
        backgroundColor: '#FFF',
        borderRadius: 16,
        padding: 20,
        borderWidth: 1,
        borderColor: colors.border.subtle,
        marginBottom: 16,
    },
    sliderLabel: {
        fontSize: 15,
        fontWeight: '600',
        color: colors.silver[500],
        marginBottom: 8,
    },
    slider: { width: '100%', height: 40 },
    sliderRange: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    rangeText: { fontSize: 11, color: colors.silver[400] },
    divider: {
        height: 1,
        backgroundColor: colors.border.subtle,
        marginVertical: 16,
    },
    termBar: {
        height: 6,
        backgroundColor: colors.silver[200],
        borderRadius: 3,
        marginTop: 8,
    },
    termFill: {
        height: 6,
        width: '100%',
        backgroundColor: colors.accent[500],
        borderRadius: 3,
    },

    // Results card
    resultsCard: {
        borderRadius: 20,
        padding: 24,
        alignItems: 'center',
        marginBottom: 16,
    },
    resultsLabel: {
        fontSize: 12,
        fontWeight: '700',
        color: 'rgba(255,255,255,0.6)',
        letterSpacing: 1.5,
        marginBottom: 8,
    },
    resultsAmount: {
        fontSize: 36,
        fontWeight: '800',
        color: '#34D399',
        marginBottom: 12,
    },
    roiBadge: {
        backgroundColor: 'rgba(52,211,153,0.15)',
        borderRadius: 10,
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginBottom: 20,
    },
    roiText: {
        fontSize: 15,
        fontWeight: '700',
        color: '#34D399',
    },
    resultsRow: {
        flexDirection: 'row',
        width: '100%',
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.1)',
        paddingTop: 16,
    },
    resultsCol: { flex: 1, alignItems: 'center' },
    resultsSubLabel: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.5)',
        marginBottom: 4,
    },
    resultsSubValue: {
        fontSize: 18,
        fontWeight: '700',
        color: '#FFF',
    },

    // Analysis card
    analysisCard: {
        backgroundColor: '#FFF',
        borderRadius: 16,
        padding: 20,
        borderWidth: 1,
        borderColor: colors.border.subtle,
        marginBottom: 16,
    },
    analysisHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 16,
    },
    analysisTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: colors.text.primary,
    },
    analysisSectionTitle: {
        fontSize: 13,
        fontWeight: '600',
        color: colors.silver[500],
        marginBottom: 10,
        marginTop: 8,
    },
    analysisRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
    },
    analysisLabel: {
        fontSize: 14,
        color: colors.text.primary,
    },
    analysisValueGreen: {
        fontSize: 14,
        fontWeight: '700',
        color: '#34D399',
    },
    analysisValueRed: {
        fontSize: 14,
        fontWeight: '700',
        color: '#EF4444',
    },
    analysisValueGold: {
        fontSize: 14,
        fontWeight: '700',
        color: colors.accent[500],
    },

    // Chart
    chartWrap: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        height: 140,
        gap: 8,
        marginVertical: 16,
    },
    chartCol: {
        flex: 1,
        alignItems: 'center',
        height: '100%',
        justifyContent: 'flex-end',
    },
    chartValue: {
        fontSize: 9,
        fontWeight: '600',
        color: colors.silver[400],
        marginBottom: 4,
    },
    chartBarBg: {
        width: '100%',
        height: '80%',
        justifyContent: 'flex-end',
    },
    chartBar: {
        width: '100%',
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
    },
    chartLabel: {
        fontSize: 10,
        fontWeight: '600',
        color: colors.silver[400],
        marginTop: 4,
    },

    // Disclaimer
    disclaimer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 4,
    },
    disclaimerText: {
        fontSize: 11,
        color: colors.silver[400],
        flex: 1,
    },
});

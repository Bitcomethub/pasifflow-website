"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { motion } from "framer-motion"
import { useTranslations, useLocale } from "next-intl"
import {
    Mail,
    Lock,
    ArrowRight,
    Building2,
    Shield,
    TrendingUp,
    DollarSign,
    Globe,
} from "lucide-react"

export default function LoginPage() {
    const t = useTranslations("login")
    const locale = useLocale()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [rememberMe, setRememberMe] = useState(false)

    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.error || "Giriş başarısız")
            }

            localStorage.setItem("pasiflow_token", data.token)
            localStorage.setItem("pasiflow_user", JSON.stringify(data.user))
            localStorage.setItem("pasiflow_locale", locale)

            if (data.user.role === "AGENT") {
                router.push(`/${locale}/agent/dashboard`)
            } else if (data.user.role === "MANAGER") {
                router.push(`/${locale}/manager`)
            } else if (data.user.role === "ADMIN") {
                router.push(`/admin`)
            } else {
                router.push(`/${locale}/dashboard`)
            }
            router.refresh()

        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Bir hata oluştu"
            setError(message)
        } finally {
            setLoading(false)
        }
    }

    const highlights = [
        { icon: TrendingUp, text: "12-15% Net ROI" },
        { icon: DollarSign, text: "Section 8 Guaranteed" },
        { icon: Globe, text: "100+ Investors" },
    ]

    return (
        <main className="min-h-[100dvh] flex flex-col lg:flex-row">
            {/* Left Panel — Feature showcase (hidden on mobile) */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-[#1F2328] items-center justify-center p-12 overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C1A05E]/10 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#C1A05E]/5 rounded-full blur-[100px]" />
                    <div
                        className="absolute inset-0 opacity-[0.03]"
                        style={{
                            backgroundImage: "radial-gradient(circle at 1px 1px, #C1A05E 1px, transparent 0)",
                            backgroundSize: "32px 32px",
                        }}
                    />
                </div>

                <div className="relative z-10 max-w-md space-y-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 rounded-xl bg-[#C1A05E] flex items-center justify-center">
                                <Building2 className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-2xl font-bold text-white">Pasiflow</span>
                        </div>

                        <h2 className="text-3xl font-bold text-white leading-tight mb-4">
                            {locale === "tr"
                                ? "Yatırımınızı Yönetin, Gelirinizi Takip Edin"
                                : "Manage Your Investment, Track Your Income"
                            }
                        </h2>
                        <p className="text-[#A8B0B8] text-lg leading-relaxed">
                            {locale === "tr"
                                ? "Portföyünüze tek bir panelden erişin. Mülklerinizi, kiralarınızı ve finansal durumunuzu gerçek zamanlı takip edin."
                                : "Access your portfolio from a single dashboard. Track your properties, rents, and financials in real time."
                            }
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-4"
                    >
                        {highlights.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + i * 0.1 }}
                                className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
                            >
                                <div className="w-10 h-10 rounded-xl bg-[#C1A05E]/20 flex items-center justify-center flex-shrink-0">
                                    <item.icon className="w-5 h-5 text-[#C1A05E]" />
                                </div>
                                <span className="text-white font-semibold">{item.text}</span>
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="pt-4 border-t border-white/10"
                    >
                        <p className="text-[#A8B0B8] text-sm italic">
                            {locale === "tr"
                                ? "\"Pasiflow sayesinde Detroit'teki 3 mülkümü tek panelden yönetiyorum.\""
                                : "\"Thanks to Pasiflow, I manage my 3 Detroit properties from a single dashboard.\""
                            }
                        </p>
                        <div className="flex items-center gap-3 mt-3">
                            <div className="w-8 h-8 rounded-full bg-[#C1A05E] flex items-center justify-center text-white text-xs font-bold">
                                MK
                            </div>
                            <div>
                                <p className="text-white text-sm font-semibold">Mustafa K.</p>
                                <p className="text-[#A8B0B8] text-xs">{locale === "tr" ? "Yatırımcı" : "Investor"}</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Right Panel — Login Form */}
            <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 px-4 sm:px-6 py-8 sm:py-12 lg:py-20">
                <div className="w-full max-w-md">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Card className="p-5 sm:p-6 md:p-8 shadow-xl border-border/50 rounded-2xl">
                            <div className="text-center mb-6 sm:mb-8">
                                <div className="lg:hidden w-12 h-12 rounded-xl bg-[#C1A05E] flex items-center justify-center mx-auto mb-4">
                                    <Building2 className="w-6 h-6 text-white" />
                                </div>
                                <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2 tracking-tight">
                                    {t("title")}
                                </h1>
                                <p className="text-sm sm:text-base text-muted-foreground">{t("subtitle")}</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm"
                                        role="alert"
                                    >
                                        {error}
                                    </motion.div>
                                )}
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-sm font-medium">{t("email")}</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" size={18} />
                                        <Input
                                            id="email"
                                            type="email"
                                            inputMode="email"
                                            autoComplete="email"
                                            autoCapitalize="off"
                                            spellCheck={false}
                                            className="h-12 sm:h-11 pl-10 text-base sm:text-sm"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder={t("emailPlaceholder")}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password" className="text-sm font-medium">{t("password")}</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" size={18} />
                                        <Input
                                            id="password"
                                            type="password"
                                            autoComplete="current-password"
                                            className="h-12 sm:h-11 pl-10 text-base sm:text-sm"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder={t("passwordPlaceholder")}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 py-1">
                                    <Checkbox
                                        id="remember"
                                        checked={rememberMe}
                                        onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                                        className="h-5 w-5"
                                    />
                                    <Label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer select-none">
                                        {t("rememberMe")}
                                    </Label>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full min-h-[52px] h-12 text-base font-semibold gap-2 bg-[#1F2328] hover:bg-[#2D353F] transition-all"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            {t("loginButton")}
                                            <ArrowRight size={18} />
                                        </>
                                    )}
                                </Button>
                            </form>

                            <div className="mt-5 sm:mt-6 p-3 bg-muted/50 rounded-lg flex items-start gap-2">
                                <Shield className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    {t("securityNotice")}
                                </p>
                            </div>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </main>
    )
}

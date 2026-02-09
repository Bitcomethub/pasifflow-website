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
    Shield
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

            // Login Success
            localStorage.setItem("pasiflow_token", data.token)
            localStorage.setItem("pasiflow_user", JSON.stringify(data.user))

            // Redirect based on role
            if (data.user.role === "AGENT") {
                router.push(`/${locale}/agent/dashboard`)
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

    return (
        <>
            <main className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-12 md:py-20">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-md mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Card className="p-6 md:p-8 shadow-xl border-border/50">
                                <div className="text-center mb-8">
                                    <Building2 className="w-12 h-12 text-primary mx-auto mb-4" />
                                    <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                                        {t("title")}
                                    </h1>
                                    <p className="text-muted-foreground">{t("subtitle")}</p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-5">
                                    {error && (
                                        <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm">
                                            {error}
                                        </div>
                                    )}
                                    <div className="space-y-2">
                                        <Label htmlFor="email">{t("email")}</Label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                                            <Input
                                                id="email"
                                                type="email"
                                                className="pl-10"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder={t("emailPlaceholder")}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="password">{t("password")}</Label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                                            <Input
                                                id="password"
                                                type="password"
                                                className="pl-10"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                placeholder={t("passwordPlaceholder")}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Checkbox
                                            id="remember"
                                            checked={rememberMe}
                                            onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                                        />
                                        <Label htmlFor="remember" className="text-sm text-muted-foreground">
                                            {t("rememberMe")}
                                        </Label>
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full h-12 text-base gap-2"
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

                                {/* Security Notice */}
                                <div className="mt-6 p-3 bg-muted/50 rounded-lg flex items-start gap-2">
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
        </>
    )
}

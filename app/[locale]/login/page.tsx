"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import {
    Mail,
    Lock,
    ArrowRight,
    Building2
} from "lucide-react"

export default function LoginPage() {
    const t = useTranslations("login")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [rememberMe, setRememberMe] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle login
        console.log({ email, password, rememberMe })
    }

    return (
        <>
            <Header />
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
                                        <div className="flex justify-between">
                                            <Label htmlFor="password">{t("password")}</Label>
                                            <a href="#" className="text-sm text-primary hover:underline">
                                                {t("forgotPassword")}
                                            </a>
                                        </div>
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

                                    <Button type="submit" className="w-full h-12 text-base gap-2">
                                        {t("loginButton")}
                                        <ArrowRight size={18} />
                                    </Button>
                                </form>

                                <div className="relative my-6">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-border" />
                                    </div>
                                    <div className="relative flex justify-center text-xs uppercase">
                                        <span className="bg-card px-2 text-muted-foreground">{t("or")}</span>
                                    </div>
                                </div>

                                <Button
                                    variant="outline"
                                    className="w-full h-12 gap-3"
                                    onClick={() => console.log("Google login")}
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                                        <path
                                            fill="currentColor"
                                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        />
                                        <path
                                            fill="currentColor"
                                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        />
                                        <path
                                            fill="currentColor"
                                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                        />
                                        <path
                                            fill="currentColor"
                                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        />
                                    </svg>
                                    {t("googleLogin")}
                                </Button>

                                <p className="text-center text-sm text-muted-foreground mt-6">
                                    {t("noAccount")}{" "}
                                    <a href="/signup" className="text-primary hover:underline font-medium">
                                        {t("signupLink")}
                                    </a>
                                </p>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}

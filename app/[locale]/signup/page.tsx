"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { motion, AnimatePresence } from "framer-motion"
import { useTranslations } from "next-intl"
import {
    ArrowRight,
    ArrowLeft,
    Building2,
    Calendar,
    DollarSign,
    User,
    Mail,
    Phone,
    Lock,
    CheckCircle2
} from "lucide-react"

type InvestorType = "first_time" | "intermediate" | "experienced" | "seasoned" | null
type Timeline = "active" | "3_months" | "6_months" | "researching" | null
type Budget = "5k_50k" | "50k_100k" | "100k_200k" | "200k_plus" | null

export default function SignupPage() {
    const t = useTranslations("signup")
    const [step, setStep] = useState(1)
    const [investorType, setInvestorType] = useState<InvestorType>(null)
    const [timeline, setTimeline] = useState<Timeline>(null)
    const [budget, setBudget] = useState<Budget>(null)
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        acceptTerms: false
    })

    const totalSteps = 4

    const investorOptions = [
        { value: "first_time", icon: "🏠", labelKey: "investorFirstTime", descKey: "investorFirstTimeDesc" },
        { value: "intermediate", icon: "🏘️", labelKey: "investorIntermediate", descKey: "investorIntermediateDesc" },
        { value: "experienced", icon: "🏢", labelKey: "investorExperienced", descKey: "investorExperiencedDesc" },
        { value: "seasoned", icon: "🌆", labelKey: "investorSeasoned", descKey: "investorSeasonedDesc" },
    ]

    const timelineOptions = [
        { value: "active", icon: "🔥", labelKey: "timelineActive" },
        { value: "3_months", icon: "📅", labelKey: "timeline3Months" },
        { value: "6_months", icon: "📆", labelKey: "timeline6Months" },
        { value: "researching", icon: "🔍", labelKey: "timelineResearching" },
    ]

    const budgetOptions = [
        { value: "5k_50k", labelKey: "budget5k50k" },
        { value: "50k_100k", labelKey: "budget50k100k" },
        { value: "100k_200k", labelKey: "budget100k200k" },
        { value: "200k_plus", labelKey: "budget200kPlus" },
    ]

    const nextStep = () => {
        if (step < totalSteps) setStep(step + 1)
    }

    const prevStep = () => {
        if (step > 1) setStep(step - 1)
    }

    const canProceed = () => {
        switch (step) {
            case 1: return investorType !== null
            case 2: return timeline !== null
            case 3: return budget !== null
            case 4: return formData.firstName && formData.lastName && formData.email && formData.password && formData.acceptTerms
            default: return false
        }
    }

    const handleSubmit = () => {
        // Handle form submission
        console.log({ investorType, timeline, budget, ...formData })
        // Redirect to dashboard or show success
    }

    return (
        <>
            <Header />
            <main className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-12 md:py-20">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-2xl mx-auto">
                        {/* Progress Bar */}
                        <div className="mb-8">
                            <div className="flex justify-between mb-2">
                                {[1, 2, 3, 4].map((s) => (
                                    <div
                                        key={s}
                                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${s <= step
                                                ? "bg-primary text-primary-foreground"
                                                : "bg-muted text-muted-foreground"
                                            }`}
                                    >
                                        {s < step ? <CheckCircle2 size={16} /> : s}
                                    </div>
                                ))}
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-primary"
                                    initial={{ width: "0%" }}
                                    animate={{ width: `${(step / totalSteps) * 100}%` }}
                                    transition={{ duration: 0.3 }}
                                />
                            </div>
                        </div>

                        <Card className="p-6 md:p-8 shadow-xl border-border/50">
                            <AnimatePresence mode="wait">
                                {/* Step 1: Investor Type */}
                                {step === 1 && (
                                    <motion.div
                                        key="step1"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-6"
                                    >
                                        <div className="text-center mb-8">
                                            <Building2 className="w-12 h-12 text-primary mx-auto mb-4" />
                                            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                                                {t("step1Title")}
                                            </h1>
                                            <p className="text-muted-foreground">{t("step1Subtitle")}</p>
                                        </div>

                                        <div className="grid gap-3">
                                            {investorOptions.map((option) => (
                                                <button
                                                    key={option.value}
                                                    onClick={() => setInvestorType(option.value as InvestorType)}
                                                    className={`p-4 rounded-xl border-2 text-left transition-all ${investorType === option.value
                                                            ? "border-primary bg-primary/10"
                                                            : "border-border hover:border-primary/50"
                                                        }`}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-2xl">{option.icon}</span>
                                                        <div>
                                                            <div className="font-semibold">{t(option.labelKey)}</div>
                                                            <div className="text-sm text-muted-foreground">{t(option.descKey)}</div>
                                                        </div>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {/* Step 2: Timeline */}
                                {step === 2 && (
                                    <motion.div
                                        key="step2"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-6"
                                    >
                                        <div className="text-center mb-8">
                                            <Calendar className="w-12 h-12 text-primary mx-auto mb-4" />
                                            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                                                {t("step2Title")}
                                            </h1>
                                            <p className="text-muted-foreground">{t("step2Subtitle")}</p>
                                        </div>

                                        <div className="grid gap-3">
                                            {timelineOptions.map((option) => (
                                                <button
                                                    key={option.value}
                                                    onClick={() => setTimeline(option.value as Timeline)}
                                                    className={`p-4 rounded-xl border-2 text-left transition-all ${timeline === option.value
                                                            ? "border-primary bg-primary/10"
                                                            : "border-border hover:border-primary/50"
                                                        }`}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-2xl">{option.icon}</span>
                                                        <div className="font-semibold">{t(option.labelKey)}</div>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {/* Step 3: Budget */}
                                {step === 3 && (
                                    <motion.div
                                        key="step3"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-6"
                                    >
                                        <div className="text-center mb-8">
                                            <DollarSign className="w-12 h-12 text-primary mx-auto mb-4" />
                                            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                                                {t("step3Title")}
                                            </h1>
                                            <p className="text-muted-foreground">{t("step3Subtitle")}</p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                            {budgetOptions.map((option) => (
                                                <button
                                                    key={option.value}
                                                    onClick={() => setBudget(option.value as Budget)}
                                                    className={`p-4 rounded-xl border-2 text-center transition-all ${budget === option.value
                                                            ? "border-primary bg-primary/10"
                                                            : "border-border hover:border-primary/50"
                                                        }`}
                                                >
                                                    <div className="font-semibold">{t(option.labelKey)}</div>
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {/* Step 4: Registration Form */}
                                {step === 4 && (
                                    <motion.div
                                        key="step4"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-6"
                                    >
                                        <div className="text-center mb-8">
                                            <User className="w-12 h-12 text-primary mx-auto mb-4" />
                                            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                                                {t("step4Title")}
                                            </h1>
                                            <p className="text-muted-foreground">{t("step4Subtitle")}</p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="firstName">{t("firstName")}</Label>
                                                <Input
                                                    id="firstName"
                                                    value={formData.firstName}
                                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                                    placeholder={t("firstNamePlaceholder")}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="lastName">{t("lastName")}</Label>
                                                <Input
                                                    id="lastName"
                                                    value={formData.lastName}
                                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                                    placeholder={t("lastNamePlaceholder")}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="email">{t("email")}</Label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    className="pl-10"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    placeholder={t("emailPlaceholder")}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="phone">{t("phone")}</Label>
                                            <div className="relative">
                                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                                                <Input
                                                    id="phone"
                                                    type="tel"
                                                    className="pl-10"
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                    placeholder={t("phonePlaceholder")}
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
                                                    value={formData.password}
                                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                                    placeholder={t("passwordPlaceholder")}
                                                />
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-2">
                                            <Checkbox
                                                id="terms"
                                                checked={formData.acceptTerms}
                                                onCheckedChange={(checked) => setFormData({ ...formData, acceptTerms: checked as boolean })}
                                            />
                                            <Label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed">
                                                {t("termsLabel")}
                                            </Label>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Navigation Buttons */}
                            <div className="flex justify-between mt-8 pt-6 border-t border-border">
                                <Button
                                    variant="outline"
                                    onClick={prevStep}
                                    disabled={step === 1}
                                    className="gap-2"
                                >
                                    <ArrowLeft size={18} />
                                    {t("back")}
                                </Button>

                                {step < totalSteps ? (
                                    <Button
                                        onClick={nextStep}
                                        disabled={!canProceed()}
                                        className="gap-2"
                                    >
                                        {t("next")}
                                        <ArrowRight size={18} />
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={handleSubmit}
                                        disabled={!canProceed()}
                                        className="gap-2 bg-accent hover:bg-accent/90"
                                    >
                                        {t("createAccount")}
                                        <CheckCircle2 size={18} />
                                    </Button>
                                )}
                            </div>

                            {/* Login Link */}
                            <p className="text-center text-sm text-muted-foreground mt-6">
                                {t("alreadyHaveAccount")}{" "}
                                <a href="/login" className="text-primary hover:underline font-medium">
                                    {t("loginLink")}
                                </a>
                            </p>
                        </Card>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}

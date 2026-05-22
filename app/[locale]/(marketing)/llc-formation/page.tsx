"use client"

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { useState, useRef } from "react"
import {
    ClipboardList,
    CreditCard,
    Link as LinkIcon,
    FileCheck,
    PartyPopper,
    Check,
    X,
    ChevronRight,
    ChevronLeft,
    Shield,
    Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: i * 0.1 },
    }),
}

const countries = [
    "Türkiye", "United States", "Germany", "United Kingdom", "Canada",
    "France", "Netherlands", "Australia", "UAE", "Saudi Arabia",
    "Qatar", "Kuwait", "Azerbaijan", "Kazakhstan", "Russia",
    "China", "Japan", "South Korea", "India", "Brazil",
    "Mexico", "Italy", "Spain", "Sweden", "Norway", "Other",
]

export default function LlcFormationPage() {
    const t = useTranslations("llcFormation")
    const formRef = useRef<HTMLDivElement>(null)
    const [formStep, setFormStep] = useState(0)
    const [submitting, setSubmitting] = useState(false)
    const [success, setSuccess] = useState(false)

    // Form state
    const [form, setForm] = useState({
        llcName: "",
        alternativeName: "",
        entityType: "LLC",
        managementType: "MEMBER",
        fullName: "",
        email: "",
        phone: "",
        country: "Türkiye",
        passportNumber: "",
        mailingAddress: "",
        virtualOffice: true,
        bankAccount: true,
        itinApplication: false,
    })

    // Check URL params for success return from Stripe
    if (typeof window !== "undefined" && !success) {
        const params = new URLSearchParams(window.location.search)
        if (params.get("payment") === "success") {
            // Remove query params and show success
            window.history.replaceState({}, "", window.location.pathname)
            setSuccess(true)
        }
    }

    const scrollToForm = () => {
        formRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    const updateForm = (key: string, value: string | boolean) => {
        setForm((prev) => ({ ...prev, [key]: value }))
    }

    const isStep1Valid = form.llcName.trim().length > 0
    const isStep2Valid =
        form.fullName.trim().length > 0 &&
        form.email.trim().length > 0 &&
        form.phone.trim().length > 0 &&
        form.passportNumber.trim().length > 0 &&
        form.mailingAddress.trim().length > 0

    const totalPrice = 499 + (form.itinApplication ? 350 : 0)

    const handleSubmit = async () => {
        setSubmitting(true)
        try {
            const res = await fetch("/api/llc-requests", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            })
            const data = await res.json()
            if (data.sessionUrl) {
                window.location.href = data.sessionUrl
            } else {
                alert(data.error || "Something went wrong")
            }
        } catch {
            alert("Network error. Please try again.")
        } finally {
            setSubmitting(false)
        }
    }

    const stepIcons = [ClipboardList, CreditCard, LinkIcon, FileCheck, PartyPopper]

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#F8F8F6] to-[#EDE9E0]">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center max-w-md mx-auto p-8"
                >
                    <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                        <Check className="w-10 h-10 text-green-600" />
                    </div>
                    <h1 className="text-3xl font-bold text-[#1F2328] mb-4" style={{ fontFamily: "Playfair Display, serif" }}>
                        {t("formSuccessTitle")}
                    </h1>
                    <p className="text-[#6B7280] text-lg">{t("formSuccessDesc")}</p>
                </motion.div>
            </div>
        )
    }

    return (
        <div className="bg-white">
            {/* ═══════════════ SECTION 1: HERO ═══════════════ */}
            <section className="relative pt-24 pb-14 sm:pt-28 sm:pb-20 bg-gradient-to-b from-[#F8F8F6] via-[#F5F5F5] to-[#EDE9E0] overflow-hidden">
                <div className="container mx-auto px-5 md:px-6 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-3xl mx-auto"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#C1A05E]/10 text-[#C1A05E] text-xs sm:text-sm font-medium mb-5 sm:mb-6">
                            <Shield className="w-4 h-4" />
                            {t("heroSubtitle")}
                        </div>
                        <h1
                            className="text-3xl sm:text-4xl md:text-6xl font-bold text-[#1F2328] mb-5 sm:mb-6 leading-tight tracking-tight"
                            style={{ fontFamily: "Playfair Display, serif" }}
                        >
                            {t("heroTitle")}
                        </h1>
                        <p className="text-base sm:text-lg md:text-xl text-[#6B7280] mb-6 sm:mb-8 max-w-2xl mx-auto">
                            {t("heroDescription")}
                        </p>
                        <Button
                            onClick={scrollToForm}
                            className="w-full sm:w-auto min-h-[52px] bg-[#1F2328] hover:bg-[#2D353F] text-white text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 rounded-xl font-semibold"
                        >
                            {t("heroCta")}
                        </Button>
                    </motion.div>
                </div>
            </section>

            {/* ═══════════════ SECTION 2: $499 VALUE PACKAGE ═══════════════ */}
            <section className="py-14 sm:py-20 bg-white">
                <div className="container mx-auto px-5 md:px-6">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="text-center mb-12"
                    >
                        <motion.h2
                            custom={0}
                            variants={fadeUp}
                            className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#1F2328] mb-4"
                            style={{ fontFamily: "Playfair Display, serif" }}
                        >
                            {t("valueTitle")}
                        </motion.h2>
                        <motion.p custom={1} variants={fadeUp} className="text-[#6B7280] text-lg">
                            {t("valueSubtitle")}
                        </motion.p>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="max-w-3xl mx-auto"
                    >
                        <div className="rounded-2xl border border-[#E5E5E5] overflow-hidden shadow-lg">
                            <div className="h-1.5 bg-gradient-to-r from-[#C1A05E] to-[#B8A074]" />
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-[#F9F9F9]">
                                            <th className="text-left py-4 px-6 text-sm font-semibold text-[#1F2328]">
                                                {t("valueServices.llcFiling").replace("LLC Filing (Wyoming)", "Service")}
                                            </th>
                                            <th className="py-4 px-6 text-sm font-semibold text-[#6B7280] text-center">
                                                {t("valueCompetitorPrice")}
                                            </th>
                                            <th className="py-4 px-6 text-sm font-semibold text-[#C1A05E] text-center">
                                                {t("valuePasiflowPrice")}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#E5E5E5]">
                                        {([
                                            { key: "llcFiling", comp: "$149" },
                                            { key: "sameDayFiling", comp: "$99" },
                                            { key: "ein", comp: "$79" },
                                            { key: "registeredAgent", comp: "$149/yr" },
                                            { key: "operatingAgreement", comp: "$99" },
                                            { key: "bankAccount", comp: "$199" },
                                            { key: "boiFiling", comp: "$79" },
                                            { key: "legalSupport", comp: "$200+" },
                                        ] as const).map((item, i) => (
                                            <motion.tr key={item.key} custom={i + 2} variants={fadeUp} className="hover:bg-[#FAFAFA]">
                                                <td className="py-4 px-6 text-sm text-[#3D4852]">
                                                    {t(`valueServices.${item.key}`)}
                                                </td>
                                                <td className="py-4 px-6 text-center">
                                                    <span className="text-sm text-[#6B7280] line-through">{item.comp}</span>
                                                </td>
                                                <td className="py-4 px-6 text-center">
                                                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#C1A05E] text-white">
                                                        <Check className="w-3.5 h-3.5" />
                                                    </span>
                                                </td>
                                            </motion.tr>
                                        ))}
                                        <tr className="bg-[#F9F9F9] font-bold">
                                            <td className="py-4 px-6 text-sm text-[#1F2328]">
                                                Total
                                            </td>
                                            <td className="py-4 px-6 text-center">
                                                <span className="text-[#6B7280] line-through">$1,053+</span>
                                            </td>
                                            <td className="py-4 px-6 text-center">
                                                <span className="text-2xl font-bold text-[#C1A05E]">$499</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="bg-[#C1A05E]/5 p-4 text-center text-sm text-[#C1A05E] font-medium">
                                {t("valueTotalSavings")}: $554+
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ═══════════════ SECTION 3: COMPARISON TABLE ═══════════════ */}
            <section className="py-14 sm:py-20 bg-[#1F2328]">
                <div className="container mx-auto px-5 md:px-6">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="text-center mb-12"
                    >
                        <motion.h2
                            custom={0}
                            variants={fadeUp}
                            className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-4"
                            style={{ fontFamily: "Playfair Display, serif" }}
                        >
                            {t("comparisonTitle")}
                        </motion.h2>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="max-w-4xl mx-auto overflow-x-auto -mx-5 sm:mx-auto px-5 sm:px-0 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full"
                    >
                        <table className="w-full min-w-[560px]">
                            <thead>
                                <tr>
                                    <th className="py-4 px-4 text-left text-sm text-gray-400" />
                                    <th className="py-4 px-4 text-center">
                                        <span className="text-[#C1A05E] font-bold text-sm border border-[#C1A05E]/30 rounded-lg px-4 py-2 inline-block">
                                            {t("comparisonPasiflow")}
                                        </span>
                                    </th>
                                    <th className="py-4 px-4 text-center text-sm text-gray-400 font-medium">
                                        {t("comparisonTurkishFirms")}
                                    </th>
                                    <th className="py-4 px-4 text-center text-sm text-gray-400 font-medium">
                                        {t("comparisonLegalZoom")}
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                                {([
                                    { key: "price", pasi: "$499", turk: "$1,500+", legal: "$599+" },
                                    { key: "wyomingLLC", pasi: true, turk: false, legal: true },
                                    { key: "sameDayFiling", pasi: true, turk: false, legal: false },
                                    { key: "ein", pasi: true, turk: true, legal: false },
                                    { key: "bankAccount", pasi: true, turk: false, legal: false },
                                    { key: "registeredAgent", pasi: true, turk: false, legal: true },
                                    { key: "turkishSupport", pasi: true, turk: true, legal: false },
                                    { key: "realEstateExpertise", pasi: true, turk: false, legal: false },
                                    { key: "operatingAgreement", pasi: true, turk: false, legal: false },
                                ] as const).map((row, i) => (
                                    <motion.tr key={row.key} custom={i + 1} variants={fadeUp}>
                                        <td className="py-4 px-4 text-sm text-gray-300">
                                            {t(`comparisonFeatures.${row.key}`)}
                                        </td>
                                        {[row.pasi, row.turk, row.legal].map((val, j) => (
                                            <td key={j} className="py-4 px-4 text-center">
                                                {typeof val === "string" ? (
                                                    <span className={j === 0 ? "text-[#C1A05E] font-bold" : "text-gray-400"}>
                                                        {val}
                                                    </span>
                                                ) : val ? (
                                                    <span className={cn(
                                                        "inline-flex items-center justify-center w-6 h-6 rounded-full",
                                                        j === 0 ? "bg-[#C1A05E] text-white" : "bg-gray-600 text-gray-300"
                                                    )}>
                                                        <Check className="w-3.5 h-3.5" />
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-800 text-gray-500">
                                                        <X className="w-3.5 h-3.5" />
                                                    </span>
                                                )}
                                            </td>
                                        ))}
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </motion.div>
                </div>
            </section>

            {/* ═══════════════ SECTION 4: HOW IT WORKS (5 STEPS) ═══════════════ */}
            <section className="py-14 sm:py-20 bg-[#F5F5F5]">
                <div className="container mx-auto px-5 md:px-6">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="text-center mb-16"
                    >
                        <motion.h2
                            custom={0}
                            variants={fadeUp}
                            className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#1F2328] mb-4"
                            style={{ fontFamily: "Playfair Display, serif" }}
                        >
                            {t("stepsTitle")}
                        </motion.h2>
                        <motion.p custom={1} variants={fadeUp} className="text-[#6B7280] text-lg">
                            {t("stepsSubtitle")}
                        </motion.p>
                    </motion.div>

                    <div className="max-w-5xl mx-auto">
                        <div className="grid md:grid-cols-5 gap-4">
                            {[1, 2, 3, 4, 5].map((step, i) => {
                                const Icon = stepIcons[i]
                                return (
                                    <motion.div
                                        key={step}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                        custom={i}
                                        variants={fadeUp}
                                        className="relative text-center"
                                    >
                                        {i < 4 && (
                                            <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-[#C1A05E]/30" />
                                        )}
                                        <div className="relative z-10 w-16 h-16 rounded-2xl bg-white shadow-md flex items-center justify-center mx-auto mb-4">
                                            <Icon className="w-7 h-7 text-[#C1A05E]" />
                                            <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#C1A05E] text-white text-xs font-bold flex items-center justify-center">
                                                {step}
                                            </span>
                                        </div>
                                        <h3 className="font-bold text-[#1F2328] mb-2 text-sm">
                                            {t(`steps.step${step}Title`)}
                                        </h3>
                                        <p className="text-xs text-[#6B7280] leading-relaxed">
                                            {t(`steps.step${step}Desc`)}
                                        </p>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════ SECTION 5: MULTI-STEP FORM ═══════════════ */}
            <section ref={formRef} className="py-14 sm:py-20 bg-white" id="form">
                <div className="container mx-auto px-5 md:px-6">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="text-center mb-12"
                    >
                        <motion.h2
                            custom={0}
                            variants={fadeUp}
                            className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#1F2328] mb-4"
                            style={{ fontFamily: "Playfair Display, serif" }}
                        >
                            {t("formTitle")}
                        </motion.h2>
                        <motion.p custom={1} variants={fadeUp} className="text-[#6B7280] text-lg">
                            {t("formSubtitle")}
                        </motion.p>
                    </motion.div>

                    <div className="max-w-2xl mx-auto">
                        {/* Progress Bar */}
                        <div className="mb-6 sm:mb-8">
                            {/* Compact mobile step label */}
                            <p className="sm:hidden text-xs font-semibold tracking-[0.18em] uppercase text-[#6B7280] mb-2 text-center">
                                {`${formStep + 1} / 4`} · {[t("formStep1"), t("formStep2"), t("formStep3"), t("formStep4")][formStep]}
                            </p>
                            <div className="flex items-center justify-between mb-3">
                                {[t("formStep1"), t("formStep2"), t("formStep3"), t("formStep4")].map((label, i) => (
                                    <div key={i} className="flex items-center gap-2 flex-1 sm:flex-none">
                                        <span
                                            className={cn(
                                                "w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition-all mx-auto sm:mx-0",
                                                formStep >= i
                                                    ? "bg-[#C1A05E] text-white"
                                                    : "bg-[#E5E5E5] text-[#6B7280]"
                                            )}
                                        >
                                            {formStep > i ? <Check className="w-4 h-4" /> : i + 1}
                                        </span>
                                        <span className="hidden sm:inline text-xs font-medium text-[#6B7280]">{label}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="h-2 bg-[#E5E5E5] rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-[#C1A05E] to-[#B8A074] rounded-full transition-all duration-500"
                                    style={{ width: `${((formStep + 1) / 4) * 100}%` }}
                                />
                            </div>
                        </div>

                        {/* Form Card */}
                        <div className="rounded-2xl border border-[#E5E5E5] shadow-lg p-5 sm:p-6 md:p-8">
                            {/* Step 1: LLC Details */}
                            {formStep === 0 && (
                                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                                    <div className="space-y-2">
                                        <Label className="font-medium text-[#1F2328]">{t("formLlcName")} *</Label>
                                        <Input
                                            value={form.llcName}
                                            onChange={(e) => updateForm("llcName", e.target.value)}
                                            placeholder={t("formLlcNamePlaceholder")}
                                            className="h-12 sm:h-11 text-base sm:text-sm border-[#E5E5E5] focus:border-[#C1A05E] focus:ring-[#C1A05E]"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="font-medium text-[#1F2328]">{t("formAlternativeName")}</Label>
                                        <Input
                                            value={form.alternativeName}
                                            onChange={(e) => updateForm("alternativeName", e.target.value)}
                                            className="h-12 sm:h-11 text-base sm:text-sm border-[#E5E5E5] focus:border-[#C1A05E] focus:ring-[#C1A05E]"
                                        />
                                        <p className="text-xs text-[#6B7280]">{t("formAlternativeNameHint")}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="font-medium text-[#1F2328]">{t("formEntityType")}</Label>
                                        <div className="grid grid-cols-3 gap-3">
                                            {[
                                                { value: "LLC", label: t("formEntityLLC") },
                                                { value: "C-CORP", label: t("formEntityCCorp") },
                                                { value: "S-CORP", label: t("formEntitySCorp") },
                                            ].map((opt) => (
                                                <button
                                                    key={opt.value}
                                                    type="button"
                                                    onClick={() => updateForm("entityType", opt.value)}
                                                    className={cn(
                                                        "py-3 px-3 rounded-xl border-2 text-sm font-medium transition-all text-center",
                                                        form.entityType === opt.value
                                                            ? "border-[#C1A05E] bg-[#C1A05E]/10 text-[#C1A05E]"
                                                            : "border-[#E5E5E5] text-[#6B7280] hover:border-[#C1A05E]/50"
                                                    )}
                                                >
                                                    {opt.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="font-medium text-[#1F2328]">{t("formManagementType")}</Label>
                                        <div className="grid grid-cols-2 gap-3">
                                            {[
                                                { value: "MEMBER", label: t("formMemberManaged") },
                                                { value: "MANAGER", label: t("formManagerManaged") },
                                            ].map((opt) => (
                                                <button
                                                    key={opt.value}
                                                    type="button"
                                                    onClick={() => updateForm("managementType", opt.value)}
                                                    className={cn(
                                                        "py-3 px-4 rounded-xl border-2 text-sm font-medium transition-all text-center",
                                                        form.managementType === opt.value
                                                            ? "border-[#C1A05E] bg-[#C1A05E]/10 text-[#C1A05E]"
                                                            : "border-[#E5E5E5] text-[#6B7280] hover:border-[#C1A05E]/50"
                                                    )}
                                                >
                                                    {opt.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Step 2: Personal Info */}
                            {formStep === 1 && (
                                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                                    <div className="space-y-2">
                                        <Label className="font-medium text-[#1F2328]">{t("formFullName")} *</Label>
                                        <Input
                                            value={form.fullName}
                                            onChange={(e) => updateForm("fullName", e.target.value)}
                                            className="h-12 sm:h-11 text-base sm:text-sm border-[#E5E5E5] focus:border-[#C1A05E] focus:ring-[#C1A05E]"
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label className="font-medium text-[#1F2328]">{t("formEmail")} *</Label>
                                            <Input
                                                type="email"
                                                value={form.email}
                                                onChange={(e) => updateForm("email", e.target.value)}
                                                className="h-12 sm:h-11 text-base sm:text-sm border-[#E5E5E5] focus:border-[#C1A05E] focus:ring-[#C1A05E]"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="font-medium text-[#1F2328]">{t("formPhone")} *</Label>
                                            <Input
                                                type="tel"
                                                value={form.phone}
                                                onChange={(e) => updateForm("phone", e.target.value)}
                                                className="h-12 sm:h-11 text-base sm:text-sm border-[#E5E5E5] focus:border-[#C1A05E] focus:ring-[#C1A05E]"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="font-medium text-[#1F2328]">{t("formCountry")}</Label>
                                        <select
                                            value={form.country}
                                            onChange={(e) => updateForm("country", e.target.value)}
                                            className="w-full h-12 sm:h-11 rounded-md border border-[#E5E5E5] bg-white px-3 py-2 text-base sm:text-sm focus:border-[#C1A05E] focus:outline-none focus:ring-1 focus:ring-[#C1A05E]"
                                        >
                                            {countries.map((c) => (
                                                <option key={c} value={c}>{c}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="font-medium text-[#1F2328]">{t("formPassport")} *</Label>
                                        <Input
                                            value={form.passportNumber}
                                            onChange={(e) => updateForm("passportNumber", e.target.value)}
                                            className="h-12 sm:h-11 text-base sm:text-sm border-[#E5E5E5] focus:border-[#C1A05E] focus:ring-[#C1A05E]"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="font-medium text-[#1F2328]">{t("formMailingAddress")} *</Label>
                                        <Input
                                            value={form.mailingAddress}
                                            onChange={(e) => updateForm("mailingAddress", e.target.value)}
                                            className="h-12 sm:h-11 text-base sm:text-sm border-[#E5E5E5] focus:border-[#C1A05E] focus:ring-[#C1A05E]"
                                        />
                                    </div>
                                </motion.div>
                            )}

                            {/* Step 3: Additional Services */}
                            {formStep === 2 && (
                                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                                    {[
                                        { key: "virtualOffice", label: t("formVirtualOffice"), desc: t("formVirtualOfficeDesc"), field: "virtualOffice" as const },
                                        { key: "bankAccount", label: t("formBankAccount"), desc: t("formBankAccountDesc"), field: "bankAccount" as const },
                                        { key: "itinApplication", label: t("formItinApplication"), desc: t("formItinApplicationDesc"), field: "itinApplication" as const },
                                    ].map((svc) => (
                                        <label
                                            key={svc.key}
                                            className={cn(
                                                "flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all",
                                                form[svc.field]
                                                    ? "border-[#C1A05E] bg-[#C1A05E]/5"
                                                    : "border-[#E5E5E5] hover:border-[#C1A05E]/50"
                                            )}
                                        >
                                            <div className="pt-0.5">
                                                <div
                                                    className={cn(
                                                        "w-5 h-5 rounded border-2 flex items-center justify-center transition-all",
                                                        form[svc.field]
                                                            ? "border-[#C1A05E] bg-[#C1A05E]"
                                                            : "border-[#E5E5E5]"
                                                    )}
                                                >
                                                    {form[svc.field] && <Check className="w-3 h-3 text-white" />}
                                                </div>
                                                <input
                                                    type="checkbox"
                                                    checked={form[svc.field]}
                                                    onChange={(e) => updateForm(svc.field, e.target.checked)}
                                                    className="sr-only"
                                                />
                                            </div>
                                            <div>
                                                <p className="font-medium text-[#1F2328]">{svc.label}</p>
                                                <p className="text-sm text-[#6B7280]">{svc.desc}</p>
                                            </div>
                                        </label>
                                    ))}
                                </motion.div>
                            )}

                            {/* Step 4: Payment Summary */}
                            {formStep === 3 && (
                                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                                    <h3 className="text-xl font-bold text-[#1F2328]">{t("formSummaryTitle")}</h3>

                                    <div className="space-y-3 bg-[#F9F9F9] rounded-xl p-5">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-[#3D4852]">{form.llcName || "LLC"}</span>
                                            <span className="font-medium text-[#1F2328]">{form.entityType}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-[#3D4852]">{form.fullName}</span>
                                            <span className="text-[#6B7280]">{form.email}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-[#3D4852]">{form.country}</span>
                                            <span className="text-[#6B7280]">{form.phone}</span>
                                        </div>
                                    </div>

                                    <div className="border-t border-[#E5E5E5] pt-4 space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[#3D4852]">{t("formBasePrice")}</span>
                                            <span className="font-medium">$499</span>
                                        </div>
                                        {form.itinApplication && (
                                            <div className="flex items-center justify-between">
                                                <span className="text-[#3D4852]">{t("formItinPrice")}</span>
                                                <span className="font-medium">$350</span>
                                            </div>
                                        )}
                                        <div className="flex items-center justify-between border-t border-[#E5E5E5] pt-3">
                                            <span className="text-lg font-bold text-[#1F2328]">{t("formTotal")}</span>
                                            <span className="text-2xl font-bold text-[#C1A05E]">${totalPrice}</span>
                                        </div>
                                    </div>

                                    <Button
                                        onClick={handleSubmit}
                                        disabled={submitting}
                                        className="w-full min-h-[56px] bg-[#C1A05E] hover:bg-[#a38d5d] text-white text-base sm:text-lg py-5 sm:py-6 rounded-xl font-semibold"
                                    >
                                        {submitting ? (
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                        ) : (
                                            <>
                                                <Shield className="w-5 h-5 mr-2" />
                                                {t("formPayButton")}
                                            </>
                                        )}
                                    </Button>
                                    <p className="text-center text-xs text-[#6B7280]">
                                        {t("formPayStripe")}
                                    </p>
                                </motion.div>
                            )}

                            {/* Navigation Buttons */}
                            {formStep < 3 && (
                                <div className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 mt-6 sm:mt-8">
                                    {formStep > 0 ? (
                                        <Button
                                            variant="outline"
                                            onClick={() => setFormStep((s) => s - 1)}
                                            className="w-full sm:w-auto min-h-[48px] gap-2 border-[#E5E5E5]"
                                        >
                                            <ChevronLeft className="w-4 h-4" />
                                            {t("formBack")}
                                        </Button>
                                    ) : (
                                        <div className="hidden sm:block" />
                                    )}
                                    <Button
                                        onClick={() => setFormStep((s) => s + 1)}
                                        disabled={
                                            (formStep === 0 && !isStep1Valid) ||
                                            (formStep === 1 && !isStep2Valid)
                                        }
                                        className="w-full sm:w-auto min-h-[52px] gap-2 bg-[#1F2328] hover:bg-[#2D353F] text-white font-semibold"
                                    >
                                        {t("formNext")}
                                        <ChevronRight className="w-4 h-4" />
                                    </Button>
                                </div>
                            )}
                            {formStep === 3 && formStep > 0 && (
                                <div className="mt-4">
                                    <Button
                                        variant="ghost"
                                        onClick={() => setFormStep((s) => s - 1)}
                                        className="gap-2 text-[#6B7280]"
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                        {t("formBack")}
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════ SECTION 6: FAQ ═══════════════ */}
            <section className="py-14 sm:py-20 bg-[#F5F5F5]">
                <div className="container mx-auto px-5 md:px-6">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="text-center mb-12"
                    >
                        <motion.h2
                            custom={0}
                            variants={fadeUp}
                            className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#1F2328] mb-4"
                            style={{ fontFamily: "Playfair Display, serif" }}
                        >
                            {t("faqTitle")}
                        </motion.h2>
                    </motion.div>

                    <div className="max-w-3xl mx-auto space-y-4">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                            <FaqItem key={i} question={t(`faq${i}Q`)} answer={t(`faq${i}A`)} index={i} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

function FaqItem({ question, answer, index }: { question: string; answer: string; index: number }) {
    const [open, setOpen] = useState(false)

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={index}
            variants={fadeUp}
        >
            <button
                onClick={() => setOpen(!open)}
                className="w-full text-left bg-white rounded-xl p-5 border border-[#E5E5E5] hover:border-[#C1A05E]/50 transition-all"
            >
                <div className="flex items-center justify-between gap-4">
                    <span className="font-medium text-[#1F2328]">{question}</span>
                    <ChevronRight
                        className={cn(
                            "w-5 h-5 text-[#C1A05E] transition-transform flex-shrink-0",
                            open && "rotate-90"
                        )}
                    />
                </div>
                {open && (
                    <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-3 text-sm text-[#6B7280] leading-relaxed"
                    >
                        {answer}
                    </motion.p>
                )}
            </button>
        </motion.div>
    )
}

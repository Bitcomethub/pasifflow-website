"use client"

import { useTranslations } from "next-intl"
import { motion, useMotionValue, useSpring, useInView, useTransform } from "framer-motion"
import { Mail, Phone, MapPin, Clock, MessageCircle, Send, Building2, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useEffect, useRef, useState, useCallback } from "react"

/* ─── Animated Counter Component ─── */
function AnimatedCounter({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
    const ref = useRef<HTMLSpanElement>(null)
    const isInView = useInView(ref, { once: true, margin: "-50px" })
    const motionVal = useMotionValue(0)
    const springVal = useSpring(motionVal, { stiffness: 60, damping: 20, mass: 1.2 })
    const [display, setDisplay] = useState("0")

    useEffect(() => {
        if (isInView) motionVal.set(target)
    }, [isInView, target, motionVal])

    useEffect(() => {
        const unsubscribe = springVal.on("change", (v: number) => {
            setDisplay(Math.round(v).toLocaleString())
        })
        return unsubscribe
    }, [springVal])

    return (
        <span ref={ref}>
            {prefix}{display}{suffix}
        </span>
    )
}

/* ─── Floating Particle ─── */
function Particle({ delay, x, y, size }: { delay: number; x: number; y: number; size: number }) {
    return (
        <motion.div
            className="absolute rounded-full bg-[#C1A05E]/20"
            style={{ width: size, height: size, left: `${x}%`, top: `${y}%` }}
            animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.6, 0.2],
                scale: [1, 1.3, 1],
            }}
            transition={{
                duration: 4 + Math.random() * 2,
                delay,
                repeat: Infinity,
                ease: "easeInOut",
            }}
        />
    )
}

/* ─── Dot Grid Background ─── */
function DotGrid() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.035]">
            <svg width="100%" height="100%">
                <defs>
                    <pattern id="dotgrid" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
                        <circle cx="1.5" cy="1.5" r="1.5" fill="#C1A05E" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#dotgrid)" />
            </svg>
        </div>
    )
}

/* ─── Animated Gradient Border Wrapper ─── */
function GradientBorder({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={`relative group ${className}`}>
            <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-[#C1A05E]/60 via-[#C1A05E]/20 to-[#C1A05E]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-[1px]" />
            <div className="relative">{children}</div>
        </div>
    )
}

/* ─── Stagger Container Variants ─── */
const staggerContainer = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
}

const fadeUpItem = {
    hidden: { opacity: 0, y: 32 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
    },
}

const scaleUpItem = {
    hidden: { opacity: 0, scale: 0.92, y: 20 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
    },
}

/* ─── Main Page Component ─── */
export default function ContactPage() {
    const t = useTranslations("contact")
    const tFooter = useTranslations("footer")

    const services = [
        t("service1"),
        t("service2"),
        t("service3"),
        t("service4"),
        t("service5"),
    ]

    const particles = Array.from({ length: 18 }, (_, i) => ({
        id: i,
        delay: i * 0.3,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 3 + Math.random() * 6,
    }))

    return (
        <>
            {/* ═══════════════════════════════════════════════════════════
                HERO SECTION - Dark gradient, animated mesh, particles
               ═══════════════════════════════════════════════════════════ */}
            <section className="relative bg-[#1F2328] pt-32 pb-20 md:pt-36 md:pb-24 overflow-hidden">
                {/* Animated Mesh Gradient Background */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#1F2328] via-[#1a1e23] to-[#0f1215]" />
                    <motion.div
                        className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full"
                        style={{
                            background: "radial-gradient(circle, rgba(193,160,94,0.08) 0%, transparent 70%)",
                        }}
                        animate={{ x: [0, 40, 0], y: [0, 20, 0] }}
                        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                        className="absolute bottom-[-30%] right-[-10%] w-[70%] h-[70%] rounded-full"
                        style={{
                            background: "radial-gradient(circle, rgba(193,160,94,0.06) 0%, transparent 70%)",
                        }}
                        animate={{ x: [0, -30, 0], y: [0, -25, 0] }}
                        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                        className="absolute top-[30%] right-[20%] w-[40%] h-[40%] rounded-full"
                        style={{
                            background: "radial-gradient(circle, rgba(168,176,184,0.04) 0%, transparent 70%)",
                        }}
                        animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    />
                </div>

                {/* Floating Particles */}
                <div className="absolute inset-0 pointer-events-none">
                    {particles.map((p) => (
                        <Particle key={p.id} delay={p.delay} x={p.x} y={p.y} size={p.size} />
                    ))}
                </div>

                {/* Subtle Grid Overlay */}
                <div className="absolute inset-0 opacity-[0.03]">
                    <svg width="100%" height="100%">
                        <defs>
                            <pattern id="herogrid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#C1A05E" strokeWidth="0.5" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#herogrid)" />
                    </svg>
                </div>

                {/* Hero Content */}
                <div className="container relative z-10 mx-auto px-4 md:px-6">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="text-center max-w-3xl mx-auto"
                    >
                        {/* Gold Sparkle Badge */}
                        <motion.div variants={fadeUpItem} className="inline-flex items-center gap-2 mb-6">
                            <span className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C1A05E]/30 bg-[#C1A05E]/10 backdrop-blur-sm">
                                <Sparkles className="h-3.5 w-3.5 text-[#C1A05E]" />
                                <span className="text-[#C1A05E] text-sm font-medium tracking-wide">PASIFLOW</span>
                            </span>
                        </motion.div>

                        {/* Title */}
                        <motion.h1
                            variants={fadeUpItem}
                            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-[1.1] tracking-tight"
                        >
                            {t("pageTitle")}
                        </motion.h1>

                        {/* Decorative Gold Line */}
                        <motion.div variants={fadeUpItem} className="flex justify-center mb-6">
                            <motion.div
                                className="h-[2px] bg-gradient-to-r from-transparent via-[#C1A05E] to-transparent"
                                initial={{ width: 0 }}
                                animate={{ width: 120 }}
                                transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
                            />
                        </motion.div>

                        {/* Subtitle */}
                        <motion.p
                            variants={fadeUpItem}
                            className="text-[#A8B0B8] text-lg md:text-xl leading-relaxed max-w-2xl mx-auto"
                        >
                            {t("pageSubtitle")}
                        </motion.p>
                    </motion.div>
                </div>

                {/* Bottom Fade */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#f8f9fb] to-transparent" />
            </section>

            {/* ═══════════════════════════════════════════════════════════
                MAIN CONTENT - Form + Contact Cards
               ═══════════════════════════════════════════════════════════ */}
            <section className="relative py-16 md:py-20 bg-[#f8f9fb]">
                <DotGrid />
                <div className="container relative z-10 mx-auto px-4 md:px-6">
                    <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 xl:gap-14">

                        {/* ── Left Column: Glassmorphism Contact Form ── */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
                        >
                            <div className="relative">
                                {/* Outer Glow */}
                                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-[#C1A05E]/20 via-transparent to-[#C1A05E]/10 blur-xl opacity-60" />

                                {/* Form Card */}
                                <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-black/[0.04] p-8 md:p-10 border border-white/60">
                                    {/* Animated top accent line */}
                                    <div className="absolute top-0 left-8 right-8 h-[2px] overflow-hidden rounded-full">
                                        <motion.div
                                            className="h-full bg-gradient-to-r from-transparent via-[#C1A05E] to-transparent"
                                            animate={{ x: ["-100%", "100%"] }}
                                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                            style={{ width: "100%" }}
                                        />
                                    </div>

                                    <div className="mb-8">
                                        <h2 className="text-2xl md:text-3xl font-bold text-[#1F2328] mb-2 tracking-tight">
                                            {t("formTitle")}
                                        </h2>
                                        <p className="text-[#A8B0B8]">
                                            {t("formSubtitle")}
                                        </p>
                                    </div>

                                    <form className="space-y-6">
                                        {/* Name Fields */}
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="firstName" className="text-sm font-medium text-[#1F2328]/70">{t("firstName")} *</Label>
                                                <Input
                                                    id="firstName"
                                                    placeholder={t("firstName")}
                                                    className="h-12 bg-[#f8f9fb]/80 border-slate-200/80 rounded-xl focus:border-[#C1A05E] focus:ring-[#C1A05E]/20 transition-all duration-300 placeholder:text-slate-300"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="lastName" className="text-sm font-medium text-[#1F2328]/70">{t("lastName")} *</Label>
                                                <Input
                                                    id="lastName"
                                                    placeholder={t("lastName")}
                                                    className="h-12 bg-[#f8f9fb]/80 border-slate-200/80 rounded-xl focus:border-[#C1A05E] focus:ring-[#C1A05E]/20 transition-all duration-300 placeholder:text-slate-300"
                                                />
                                            </div>
                                        </div>

                                        {/* Contact Fields */}
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="email" className="text-sm font-medium text-[#1F2328]/70">{t("email")} *</Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    placeholder="example@email.com"
                                                    className="h-12 bg-[#f8f9fb]/80 border-slate-200/80 rounded-xl focus:border-[#C1A05E] focus:ring-[#C1A05E]/20 transition-all duration-300 placeholder:text-slate-300"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="phone" className="text-sm font-medium text-[#1F2328]/70">{t("phone")} *</Label>
                                                <Input
                                                    id="phone"
                                                    type="tel"
                                                    placeholder="+1 XXX XXX XXXX"
                                                    className="h-12 bg-[#f8f9fb]/80 border-slate-200/80 rounded-xl focus:border-[#C1A05E] focus:ring-[#C1A05E]/20 transition-all duration-300 placeholder:text-slate-300"
                                                />
                                            </div>
                                        </div>

                                        {/* Investor Profile Radio */}
                                        <div className="space-y-3">
                                            <Label className="text-sm font-medium text-[#1F2328]/70">{t("investorProfile")}</Label>
                                            <RadioGroup defaultValue="new" className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                {[
                                                    { value: "new", label: t("investorNew") },
                                                    { value: "experienced", label: t("investorExperienced") },
                                                    { value: "existing", label: t("investorExisting") },
                                                    { value: "agent", label: t("investorAgent") },
                                                ].map((item) => (
                                                    <motion.div
                                                        key={item.value}
                                                        whileHover={{ scale: 1.01, y: -1 }}
                                                        whileTap={{ scale: 0.99 }}
                                                        className="flex items-center space-x-3 bg-[#f8f9fb]/80 rounded-xl px-4 py-3.5 hover:bg-[#C1A05E]/[0.04] hover:border-[#C1A05E]/30 transition-all duration-300 cursor-pointer border border-slate-200/80"
                                                    >
                                                        <RadioGroupItem value={item.value} id={item.value} />
                                                        <Label htmlFor={item.value} className="cursor-pointer font-normal text-[#1F2328]/60 text-sm">
                                                            {item.label}
                                                        </Label>
                                                    </motion.div>
                                                ))}
                                            </RadioGroup>
                                        </div>

                                        {/* Message */}
                                        <div className="space-y-2">
                                            <Label htmlFor="message" className="text-sm font-medium text-[#1F2328]/70">{t("message")}</Label>
                                            <Textarea
                                                id="message"
                                                placeholder={t("messagePlaceholder")}
                                                className="min-h-[120px] resize-none bg-[#f8f9fb]/80 border-slate-200/80 rounded-xl focus:border-[#C1A05E] focus:ring-[#C1A05E]/20 transition-all duration-300 placeholder:text-slate-300"
                                            />
                                        </div>

                                        {/* Submit Button with Gold Gradient */}
                                        <motion.div
                                            whileHover={{ scale: 1.01 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <Button
                                                type="submit"
                                                size="lg"
                                                className="relative w-full h-14 text-base font-semibold text-white rounded-xl overflow-hidden group bg-gradient-to-r from-[#C1A05E] to-[#d4b876] hover:from-[#b3944f] hover:to-[#C1A05E] shadow-lg shadow-[#C1A05E]/20 transition-all duration-500"
                                            >
                                                {/* Shimmer Effect */}
                                                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out" />
                                                <span className="relative flex items-center justify-center gap-2">
                                                    <Send className="h-4.5 w-4.5" />
                                                    {t("submit")}
                                                    <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                                                </span>
                                            </Button>
                                        </motion.div>

                                        <p className="text-xs text-center text-[#A8B0B8]">
                                            {t("privacyNote")}
                                        </p>
                                    </form>
                                </div>
                            </div>
                        </motion.div>

                        {/* ── Right Column: Contact Cards + Info ── */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                            variants={staggerContainer}
                            className="space-y-5"
                        >
                            {/* ─ Phone Card ─ */}
                            <motion.div variants={scaleUpItem}>
                                <GradientBorder>
                                    <a
                                        href="tel:+13056903146"
                                        className="relative flex items-center gap-5 bg-[#1F2328] rounded-2xl p-5 md:p-6 group overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-[#C1A05E]/0 to-[#C1A05E]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        <motion.div
                                            whileHover={{ rotate: [0, -8, 8, 0] }}
                                            transition={{ duration: 0.5 }}
                                            className="relative w-14 h-14 bg-gradient-to-br from-[#C1A05E] to-[#d4b876] rounded-2xl flex items-center justify-center shadow-lg shadow-[#C1A05E]/20 group-hover:shadow-[#C1A05E]/40 transition-shadow duration-500"
                                        >
                                            <Phone className="h-6 w-6 text-white" />
                                        </motion.div>
                                        <div className="relative">
                                            <p className="text-white/50 text-sm mb-0.5">{t("callNow")}</p>
                                            <p className="text-xl font-bold text-white tracking-tight">+1 (305) 690-3146</p>
                                        </div>
                                        <ArrowRight className="h-5 w-5 text-white/20 ml-auto group-hover:text-[#C1A05E] group-hover:translate-x-1 transition-all duration-300" />
                                    </a>
                                </GradientBorder>
                            </motion.div>

                            {/* ─ Email Card ─ */}
                            <motion.div variants={scaleUpItem}>
                                <GradientBorder>
                                    <a
                                        href="mailto:info@pasiflow.com"
                                        className="relative flex items-center gap-5 bg-[#1F2328] rounded-2xl p-5 md:p-6 group overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-[#C1A05E]/0 to-[#C1A05E]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        <motion.div
                                            whileHover={{ rotate: [0, -8, 8, 0] }}
                                            transition={{ duration: 0.5 }}
                                            className="relative w-14 h-14 bg-white/[0.07] backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/10 group-hover:border-[#C1A05E]/30 transition-colors duration-500"
                                        >
                                            <Mail className="h-6 w-6 text-white" />
                                        </motion.div>
                                        <div className="relative">
                                            <p className="text-white/50 text-sm mb-0.5">{t("email")}</p>
                                            <p className="text-xl font-bold text-white tracking-tight">info@pasiflow.com</p>
                                        </div>
                                        <ArrowRight className="h-5 w-5 text-white/20 ml-auto group-hover:text-[#C1A05E] group-hover:translate-x-1 transition-all duration-300" />
                                    </a>
                                </GradientBorder>
                            </motion.div>

                            {/* ─ WhatsApp Card ─ */}
                            <motion.div variants={scaleUpItem}>
                                <a
                                    href="https://wa.me/13056903146?text=Hello%2C%20I%20would%20like%20to%20learn%20more%20about%20Pasiflow."
                                    target="_blank"
                                    className="relative flex items-center gap-5 bg-gradient-to-r from-[#25D366] to-[#20bd5a] rounded-2xl p-5 md:p-6 group overflow-hidden shadow-lg shadow-[#25D366]/10 hover:shadow-[#25D366]/25 transition-shadow duration-500"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <motion.div
                                        whileHover={{ scale: 1.1 }}
                                        className="relative w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center"
                                    >
                                        <MessageCircle className="h-6 w-6 text-white" />
                                    </motion.div>
                                    <div className="relative">
                                        <p className="text-white/70 text-sm mb-0.5">WhatsApp</p>
                                        <p className="text-xl font-bold text-white tracking-tight">{t("writeNow")}</p>
                                    </div>
                                    <ArrowRight className="h-5 w-5 text-white/40 ml-auto group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                                </a>
                            </motion.div>

                            {/* ─ Appointment Card ─ */}
                            <motion.div variants={scaleUpItem}>
                                <a
                                    href="https://meetings-na2.hubspot.com/erman?uuid=e269fedf-d614-4f0b-91c5-cad583673f89"
                                    target="_blank"
                                    className="relative flex items-center gap-5 bg-gradient-to-r from-[#C1A05E] to-[#d4b876] rounded-2xl p-5 md:p-6 group overflow-hidden shadow-lg shadow-[#C1A05E]/15 hover:shadow-[#C1A05E]/30 transition-shadow duration-500"
                                >
                                    {/* Shimmer */}
                                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out" />
                                    <motion.div
                                        whileHover={{ scale: 1.1 }}
                                        className="relative w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center"
                                    >
                                        <Clock className="h-6 w-6 text-white" />
                                    </motion.div>
                                    <div className="relative">
                                        <p className="text-white/70 text-sm mb-0.5">{t("onlineAppointment")}</p>
                                        <p className="text-xl font-bold text-white tracking-tight">{t("scheduleCall")}</p>
                                    </div>
                                    <ArrowRight className="h-5 w-5 text-white/40 ml-auto group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                                </a>
                            </motion.div>

                            {/* ─ Office Hours - Timeline Design ─ */}
                            <motion.div variants={scaleUpItem}>
                                <GradientBorder>
                                    <div className="bg-white rounded-2xl p-6 md:p-7 border border-slate-100/80 shadow-lg shadow-black/[0.02]">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-9 h-9 rounded-xl bg-[#C1A05E]/10 flex items-center justify-center">
                                                <Clock className="h-4.5 w-4.5 text-[#C1A05E]" />
                                            </div>
                                            <h3 className="font-bold text-lg text-[#1F2328] tracking-tight">{t("officeHours")}</h3>
                                        </div>

                                        {/* Timeline-style hours */}
                                        <div className="relative space-y-0">
                                            {/* Vertical line */}
                                            <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-[#C1A05E] via-[#C1A05E]/40 to-slate-200 rounded-full" />

                                            {/* Monday-Friday */}
                                            <div className="relative flex items-center gap-4 py-3">
                                                <div className="w-4 h-4 rounded-full bg-[#C1A05E] border-[3px] border-white shadow-sm shadow-[#C1A05E]/30 z-10 flex-shrink-0" />
                                                <div className="flex justify-between items-center flex-1">
                                                    <span className="text-sm text-[#1F2328]/60">{t("mondayFriday")}</span>
                                                    <span className="text-sm font-semibold text-[#1F2328] bg-[#C1A05E]/[0.06] px-3 py-1 rounded-lg">09:00 - 18:00 (EST)</span>
                                                </div>
                                            </div>

                                            {/* Saturday */}
                                            <div className="relative flex items-center gap-4 py-3">
                                                <div className="w-4 h-4 rounded-full bg-[#C1A05E]/50 border-[3px] border-white shadow-sm z-10 flex-shrink-0" />
                                                <div className="flex justify-between items-center flex-1">
                                                    <span className="text-sm text-[#1F2328]/60">{t("saturday")}</span>
                                                    <span className="text-sm font-semibold text-[#1F2328] bg-slate-50 px-3 py-1 rounded-lg">10:00 - 14:00 (EST)</span>
                                                </div>
                                            </div>

                                            {/* Sunday */}
                                            <div className="relative flex items-center gap-4 py-3">
                                                <div className="w-4 h-4 rounded-full bg-slate-200 border-[3px] border-white shadow-sm z-10 flex-shrink-0" />
                                                <div className="flex justify-between items-center flex-1">
                                                    <span className="text-sm text-[#1F2328]/60">{t("sunday")}</span>
                                                    <span className="text-sm text-[#A8B0B8] bg-slate-50 px-3 py-1 rounded-lg">{t("closed")}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </GradientBorder>
                            </motion.div>

                            {/* ─ Services - Pill Badges ─ */}
                            <motion.div variants={scaleUpItem}>
                                <GradientBorder>
                                    <div className="bg-white rounded-2xl p-6 md:p-7 border border-slate-100/80 shadow-lg shadow-black/[0.02]">
                                        <h3 className="font-bold text-lg mb-5 flex items-center gap-3 text-[#1F2328] tracking-tight">
                                            <div className="w-9 h-9 rounded-xl bg-[#C1A05E]/10 flex items-center justify-center">
                                                <Building2 className="h-4.5 w-4.5 text-[#C1A05E]" />
                                            </div>
                                            {t("ourServices")}
                                        </h3>
                                        <div className="flex flex-wrap gap-2.5">
                                            {services.map((service, i) => (
                                                <motion.span
                                                    key={i}
                                                    whileHover={{ scale: 1.05, y: -2 }}
                                                    whileTap={{ scale: 0.97 }}
                                                    className="inline-flex items-center gap-1.5 bg-[#f8f9fb] text-[#1F2328]/70 px-4 py-2.5 rounded-full text-sm font-medium border border-slate-100 hover:border-[#C1A05E]/30 hover:bg-[#C1A05E]/[0.04] hover:text-[#1F2328] transition-all duration-300 cursor-default"
                                                >
                                                    <CheckCircle2 className="h-3.5 w-3.5 text-[#C1A05E]" />
                                                    {service}
                                                </motion.span>
                                            ))}
                                        </div>
                                    </div>
                                </GradientBorder>
                            </motion.div>

                            {/* ─ Location ─ */}
                            <motion.div
                                variants={scaleUpItem}
                                className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 backdrop-blur-sm border border-slate-100/60"
                            >
                                <div className="w-10 h-10 rounded-xl bg-[#C1A05E]/10 flex items-center justify-center flex-shrink-0">
                                    <MapPin className="h-5 w-5 text-[#C1A05E]" />
                                </div>
                                <div>
                                    <p className="font-bold text-[#1F2328] tracking-tight">Miami, Florida, USA</p>
                                    <p className="text-[#A8B0B8] text-sm mt-1">{tFooter("istanbulOffice")}</p>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                TRUST STATS SECTION - Animated counters with spring physics
               ═══════════════════════════════════════════════════════════ */}
            <section className="relative py-20 md:py-24 bg-[#1F2328] overflow-hidden">
                {/* Background decorations */}
                <div className="absolute inset-0">
                    <motion.div
                        className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full"
                        style={{
                            background: "radial-gradient(circle, rgba(193,160,94,0.06) 0%, transparent 70%)",
                        }}
                        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    />
                </div>

                {/* Dot pattern overlay */}
                <div className="absolute inset-0 opacity-[0.025]">
                    <svg width="100%" height="100%">
                        <defs>
                            <pattern id="statdots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                                <circle cx="1" cy="1" r="1" fill="#C1A05E" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#statdots)" />
                    </svg>
                </div>

                <div className="container relative z-10 mx-auto px-4 md:px-6">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-80px" }}
                        variants={staggerContainer}
                        className="grid md:grid-cols-3 gap-8 md:gap-6"
                    >
                        {/* Stat 1 - Years */}
                        <motion.div variants={fadeUpItem} className="text-center group">
                            <div className="relative inline-block">
                                <div className="text-5xl md:text-6xl font-bold text-white mb-3 tracking-tight">
                                    <AnimatedCounter target={20} suffix="+" />
                                </div>
                                <motion.div
                                    className="h-[2px] mx-auto bg-white/10 rounded-full"
                                    initial={{ width: 0 }}
                                    whileInView={{ width: 60 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: 0.5 }}
                                />
                            </div>
                            <p className="text-[#A8B0B8] mt-3 text-sm md:text-base">{t("yearsExperience")}</p>
                        </motion.div>

                        {/* Stat 2 - Volume (Gold Accent) */}
                        <motion.div variants={fadeUpItem} className="text-center group relative">
                            {/* Gold Glow Behind */}
                            <div className="absolute inset-0 bg-[#C1A05E]/5 rounded-3xl -m-4 md:-m-6" />
                            <div className="relative">
                                <div className="text-5xl md:text-6xl font-bold text-[#C1A05E] mb-3 tracking-tight">
                                    $<AnimatedCounter target={250} />M+
                                </div>
                                <motion.div
                                    className="h-[2px] mx-auto bg-[#C1A05E]/30 rounded-full"
                                    initial={{ width: 0 }}
                                    whileInView={{ width: 60 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: 0.7 }}
                                />
                                <p className="text-[#A8B0B8] mt-3 text-sm md:text-base">{t("transactionVolume")}</p>
                            </div>
                        </motion.div>

                        {/* Stat 3 - Occupancy */}
                        <motion.div variants={fadeUpItem} className="text-center group">
                            <div className="relative inline-block">
                                <div className="text-5xl md:text-6xl font-bold text-white mb-3 tracking-tight">
                                    <AnimatedCounter target={98} suffix="%+" />
                                </div>
                                <motion.div
                                    className="h-[2px] mx-auto bg-white/10 rounded-full"
                                    initial={{ width: 0 }}
                                    whileInView={{ width: 60 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: 0.9 }}
                                />
                            </div>
                            <p className="text-[#A8B0B8] mt-3 text-sm md:text-base">{t("occupancyRate")}</p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </>
    )
}

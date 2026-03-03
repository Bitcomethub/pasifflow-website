"use client"

import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"

interface LogoProps {
    size?: "sm" | "md" | "lg" | "xl"
    className?: string
    linkTo?: string
    /** For dark backgrounds, use 'dark'. For light backgrounds, use 'light'. */
    theme?: "light" | "dark"
    /** Show the motto/tagline under the logo */
    showMotto?: boolean
}

const sizeStyles = {
    sm: { width: 160, height: 58 },
    md: { width: 210, height: 76 },
    lg: { width: 280, height: 105 }, // increased from 260/95
    xl: { width: 340, height: 125 }, // increased from 320/115
}

export function Logo({
    size = "md",
    className,
    linkTo,
    theme = "light",
    showMotto = false
}: LogoProps) {
    const styles = sizeStyles[size]

    const t = useTranslations("logo")

    const content = (
        <div className={cn("flex flex-col", className)}>
            <div className="flex items-center">
                <Image
                    src="/logo.png"
                    alt="Pasiflow"
                    width={styles.width}
                    height={styles.height}
                    className="object-contain"
                    priority
                />
            </div>
            {showMotto && (
                <span className={cn(
                    "text-[10px] sm:text-xs font-medium tracking-wide uppercase mt-0.5",
                    theme === "dark" ? "text-white/80" : "text-[#A8B0B8]" // Silver
                )}>
                    {t("motto")}
                </span>
            )}
        </div>
    )

    if (linkTo) {
        return (
            <Link href={linkTo} className="flex items-center hover:opacity-90 transition-opacity">
                {content}
            </Link>
        )
    }

    return content
}

// Inline hybrid logo: [P icon] + 'asiflow' text
export function PasiflowText({ className, height = 24 }: { className?: string; height?: number }) {
    return (
        <span className={cn("inline-flex items-center gap-0.5", className)}>
            <Image
                src="/brand/logo-3.png" // Assuming logo-3 is the icon
                alt="P"
                width={height}
                height={height}
                className="inline-block"
            />
            <span className="font-bold text-[#3D4852]" style={{ fontSize: `${height * 0.75}px` }}>
                asiflow
            </span>
        </span>
    )
}

"use client"

import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface LogoProps {
    size?: "sm" | "md" | "lg" | "xl"
    className?: string
    linkTo?: string
    /** For dark backgrounds, use 'dark'. For light backgrounds, use 'light'. */
    theme?: "light" | "dark"
}

const sizeStyles = {
    sm: { width: 120, height: 36 },
    md: { width: 160, height: 48 },
    lg: { width: 200, height: 60 },
    xl: { width: 240, height: 72 },
}

export function Logo({
    size = "md",
    className,
    linkTo,
    theme = "light"
}: LogoProps) {
    const styles = sizeStyles[size]

    // Use transparent logo for dark backgrounds (white text), 
    // growth logo for light backgrounds (dark text with arrow)
    const logoSrc = theme === "dark"
        ? "/logo-transparent.png"  // White logo for dark backgrounds
        : "/logo-growth.png"       // Dark logo for light backgrounds

    const content = (
        <div className={cn("flex items-center", className)}>
            <Image
                src={logoSrc}
                alt="Pasiflow Logo"
                width={styles.width}
                height={styles.height}
                className="object-contain"
                priority
            />
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

// Inline text version for use within paragraphs
export function PasiflowText({ className }: { className?: string }) {
    return (
        <span className={cn("font-bold inline-flex items-center gap-1", className)}>
            <span className="text-primary">PASI</span>
            <span className="text-accent">FLOW</span>
        </span>
    )
}

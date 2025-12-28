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
    sm: { width: 140, height: 42 },
    md: { width: 180, height: 54 },
    lg: { width: 220, height: 66 },
    xl: { width: 260, height: 78 },
}

export function Logo({
    size = "md",
    className,
    linkTo,
    theme = "light"
}: LogoProps) {
    const styles = sizeStyles[size]

    // Use the cropped logo from the app
    const logoSrc = "/pasiflow-logo-cropped.png"

    const content = (
        <div className={cn("flex items-center", className)}>
            <Image
                src={logoSrc}
                alt="Pasiflow Logo"
                width={styles.width}
                height={styles.height}
                className={cn(
                    "object-contain",
                    // For light backgrounds, invert the colors so dark text shows
                    theme === "light" && "invert"
                )}
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

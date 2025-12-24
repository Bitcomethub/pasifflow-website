"use client"

import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface LogoProps {
    size?: "sm" | "md" | "lg" | "xl"
    showIcon?: boolean
    className?: string
    linkTo?: string
    variant?: "full" | "text" | "icon" | "image"
    /** For dark backgrounds, use 'dark'. For light backgrounds, use 'light'. */
    theme?: "light" | "dark"
}

const sizeStyles = {
    sm: {
        icon: "w-6 h-6",
        text: "text-lg",
        image: { width: 120, height: 40 },
    },
    md: {
        icon: "w-8 h-8",
        text: "text-xl",
        image: { width: 160, height: 50 },
    },
    lg: {
        icon: "w-10 h-10",
        text: "text-2xl",
        image: { width: 200, height: 60 },
    },
    xl: {
        icon: "w-12 h-12",
        text: "text-3xl",
        image: { width: 240, height: 72 },
    },
}

export function Logo({
    size = "md",
    showIcon = true,
    className,
    linkTo,
    variant = "image",
    theme = "light"
}: LogoProps) {
    const styles = sizeStyles[size]

    // Use image-based logo by default now
    const content = (
        <div className={cn("flex items-center gap-2", className)}>
            {variant === "image" && (
                <Image
                    src="/logo.png"
                    alt="Pasiflow Logo"
                    width={styles.image.width}
                    height={styles.image.height}
                    className={cn(
                        "object-contain",
                        // Invert colors for light backgrounds (since uploaded logo is for dark bg)
                        theme === "light" && "brightness-0"
                    )}
                    priority
                />
            )}
            {variant === "text" && (
                <span className={cn("font-bold font-heading tracking-tighter", styles.text)}>
                    <span className={theme === "dark" ? "text-white" : "text-primary"}>Pasi</span>
                    <span className="text-accent">flow</span>
                </span>
            )}
            {variant === "full" && (
                <>
                    <Image
                        src="/logo.png"
                        alt="Pasiflow Logo"
                        width={styles.image.width}
                        height={styles.image.height}
                        className={cn(
                            "object-contain",
                            theme === "light" && "brightness-0"
                        )}
                        priority
                    />
                </>
            )}
        </div>
    )

    if (linkTo) {
        return (
            <Link href={linkTo} className="flex items-center gap-2 hover:opacity-90 transition-opacity">
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

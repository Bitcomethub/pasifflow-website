"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"

interface LogoProps {
    size?: "sm" | "md" | "lg" | "xl"
    showIcon?: boolean
    className?: string
    linkTo?: string
    variant?: "full" | "text" | "icon"
}

// Pasiflow arrow icon as inline SVG
function PasiflowIcon({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 180 180"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn("shrink-0", className)}
        >
            <rect className="fill-primary" width="180" height="180" rx="37" />
            <g style={{ transform: "scale(95%)", transformOrigin: "center" }}>
                <path
                    className="fill-primary-foreground"
                    d="M101.141 53H136.632C151.023 53 162.689 64.6662 162.689 79.0573V112.904H148.112V79.0573C148.112 78.7105 148.098 78.3662 148.072 78.0251L112.581 112.898C112.701 112.902 112.821 112.904 112.941 112.904H148.112V126.672H112.941C98.5504 126.672 86.5638 114.891 86.5638 100.5V66.7434H101.141V100.5C101.141 101.15 101.191 101.792 101.289 102.422L137.56 66.7816C137.255 66.7563 136.945 66.7434 136.632 66.7434H101.141V53Z"
                />
                <path
                    className="fill-primary-foreground"
                    d="M65.2926 124.136L14 66.7372H34.6355L64.7495 100.436V66.7372H80.1365V118.47C80.1365 126.278 70.4953 129.958 65.2926 124.136Z"
                />
            </g>
        </svg>
    )
}

const sizeStyles = {
    sm: {
        icon: "w-6 h-6",
        text: "text-lg",
    },
    md: {
        icon: "w-8 h-8",
        text: "text-xl",
    },
    lg: {
        icon: "w-10 h-10",
        text: "text-2xl",
    },
    xl: {
        icon: "w-12 h-12",
        text: "text-3xl",
    },
}

export function Logo({
    size = "md",
    showIcon = true,
    className,
    linkTo,
    variant = "full"
}: LogoProps) {
    const styles = sizeStyles[size]

    const content = (
        <div className={cn("flex items-center gap-2", className)}>
            {(variant === "full" || variant === "icon") && showIcon && (
                <PasiflowIcon className={styles.icon} />
            )}
            {(variant === "full" || variant === "text") && (
                <span className={cn("font-bold font-heading tracking-tighter", styles.text)}>
                    <span className="text-primary">Pasi</span>
                    <span className="text-accent">flow</span>
                </span>
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

// Export icon separately for special uses
export { PasiflowIcon }

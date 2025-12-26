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

// Inline SVG Logo Component - matches the app screenshot logo
function PasiflowLogo({ theme = "dark", className }: { theme?: "light" | "dark", className?: string }) {
    const pasiColor = theme === "dark" ? "#ffffff" : "#0e3a5c"
    const flowColor = "#00d4aa"

    return (
        <svg
            viewBox="0 0 200 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn("h-auto", className)}
        >
            {/* Pasi text */}
            <text
                x="0"
                y="38"
                fontFamily="system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
                fontSize="40"
                fontWeight="700"
                fill={pasiColor}
            >
                Pasi
            </text>

            {/* flow text */}
            <text
                x="82"
                y="38"
                fontFamily="system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
                fontSize="40"
                fontWeight="700"
                fill={flowColor}
            >
                flow
            </text>

            {/* Upward arrow */}
            <path
                d="M188 8 L198 20 L193 20 L193 38 L183 38 L183 20 L178 20 Z"
                fill={flowColor}
            />
        </svg>
    )
}

export function Logo({
    size = "md",
    className,
    linkTo,
    theme = "light"
}: LogoProps) {
    const styles = sizeStyles[size]

    const content = (
        <div
            className={cn("flex items-center", className)}
            style={{ width: styles.width, height: styles.height }}
        >
            <PasiflowLogo theme={theme} className="w-full h-full" />
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

// Export the SVG component for special uses
export { PasiflowLogo }

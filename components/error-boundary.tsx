"use client"

import React from "react"

interface ErrorBoundaryState {
    hasError: boolean
    error: Error | null
}

interface ErrorBoundaryProps {
    children: React.ReactNode
    fallback?: React.ReactNode
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props)
        this.state = { hasError: false, error: null }
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error }
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error("ErrorBoundary caught:", error, errorInfo)
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback || (
                <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
                    <div className="w-16 h-16 bg-[#C1A05E]/10 rounded-full flex items-center justify-center mb-4">
                        <span className="text-2xl">!</span>
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 mb-2">Bir hata oluştu</h2>
                    <p className="text-slate-500 mb-6 text-center max-w-md">
                        Sayfa yüklenirken beklenmeyen bir hata oluştu. Lütfen sayfayı yenileyin.
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-3 bg-[#1F2328] text-white rounded-xl font-semibold hover:bg-slate-800 transition-colors"
                    >
                        Sayfayı Yenile
                    </button>
                </div>
            )
        }
        return this.props.children
    }
}

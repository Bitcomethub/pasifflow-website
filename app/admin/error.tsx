"use client"

export default function AdminError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] p-8">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6">
                <span className="text-3xl font-bold text-red-500">!</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Admin Panel Error</h2>
            <p className="text-slate-500 mb-8 text-center max-w-md">
                An unexpected error occurred while loading the admin panel.
            </p>
            <button
                onClick={reset}
                className="px-8 py-3 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-colors"
            >
                Try Again
            </button>
        </div>
    )
}

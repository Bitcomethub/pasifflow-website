"use client"

export default function AgentError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] p-8">
            <div className="w-20 h-20 bg-[#C1A05E]/10 rounded-full flex items-center justify-center mb-6">
                <span className="text-3xl font-bold text-[#C1A05E]">!</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Agent Panel Hatası</h2>
            <p className="text-slate-500 mb-8 text-center max-w-md">
                Agent paneli yüklenirken bir hata oluştu. Lütfen tekrar deneyin.
            </p>
            <button
                onClick={reset}
                className="px-8 py-3 bg-[#C1A05E] text-white rounded-xl font-semibold hover:bg-[#a38d5d] transition-colors"
            >
                Tekrar Dene
            </button>
        </div>
    )
}

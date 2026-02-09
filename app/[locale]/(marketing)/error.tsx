"use client"

export default function MarketingError({
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
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Bir Hata Oluştu</h2>
            <p className="text-slate-500 mb-8 text-center max-w-md">
                Sayfa yüklenirken beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.
            </p>
            <button
                onClick={reset}
                className="px-8 py-3 bg-[#1F2328] text-white rounded-xl font-semibold hover:bg-slate-800 transition-colors"
            >
                Tekrar Dene
            </button>
        </div>
    )
}

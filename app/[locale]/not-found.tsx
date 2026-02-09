import Link from "next/link"

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-slate-50">
            <div className="text-center max-w-md">
                <div className="text-8xl font-bold text-[#C1A05E] mb-4">404</div>
                <h1 className="text-2xl font-bold text-slate-900 mb-3">Sayfa Bulunamadı</h1>
                <p className="text-slate-500 mb-8">
                    Aradığınız sayfa mevcut değil veya taşınmış olabilir.
                </p>
                <Link
                    href="/"
                    className="inline-flex px-8 py-3 bg-[#1F2328] text-white rounded-xl font-semibold hover:bg-slate-800 transition-colors"
                >
                    Ana Sayfaya Dön
                </Link>
            </div>
        </div>
    )
}

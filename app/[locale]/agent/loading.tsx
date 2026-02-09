export default function AgentLoading() {
    return (
        <div className="p-10 space-y-6 animate-pulse">
            {/* Header skeleton */}
            <div className="space-y-2">
                <div className="h-8 w-56 bg-slate-200 rounded-lg" />
                <div className="h-4 w-80 bg-slate-100 rounded-lg" />
            </div>

            {/* Stats grid skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-white rounded-2xl p-6 border border-slate-100">
                        <div className="h-4 w-24 bg-slate-100 rounded mb-3" />
                        <div className="h-8 w-32 bg-slate-200 rounded" />
                    </div>
                ))}
            </div>

            {/* Table skeleton */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100">
                <div className="h-6 w-40 bg-slate-200 rounded mb-4" />
                <div className="space-y-3">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="h-12 bg-slate-50 rounded-lg" />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default function DashboardLoading() {
    return (
        <div className="space-y-6 animate-pulse">
            {/* Header skeleton */}
            <div className="space-y-2">
                <div className="h-8 w-64 bg-slate-200 rounded-lg" />
                <div className="h-4 w-96 bg-slate-100 rounded-lg" />
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

            {/* Content skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-100 h-80" />
                <div className="bg-white rounded-2xl p-6 border border-slate-100 h-80" />
            </div>
        </div>
    )
}

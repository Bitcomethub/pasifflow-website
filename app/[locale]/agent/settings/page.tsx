export default function SettingsPage() {
    return (
        <div className="p-10 space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-slate-900">Ayarlar</h1>
                <p className="text-slate-500 mt-2">Profil ve bildirim ayarlarınızı güncelleyin.</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-100 p-10 text-center">
                <p className="text-slate-400">Ayarlar yükleniyor...</p>
            </div>
        </div>
    )
}

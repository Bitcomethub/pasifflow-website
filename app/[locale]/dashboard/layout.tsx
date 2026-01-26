"use client"

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Home, FileText, Settings, LogOut, LayoutDashboard, Building } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const handleLogout = () => {
    // Clear auth data
    localStorage.removeItem("pasiflow_token");
    localStorage.removeItem("pasiflow_user");

    // Redirect to login (localized)
    const locale = window.location.pathname.split('/')[1] || 'tr';
    router.push(`/${locale}/login`);
    router.refresh();
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-slate-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-slate-800 border-r border-gray-200 dark:border-slate-700 hidden md:flex flex-col">
        <div className="p-6 border-b border-gray-200 dark:border-slate-700">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary">
              Pasiflow
            </span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-lg transition-colors"
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-medium">Panel</span>
          </Link>

          <Link
            href="/dashboard/properties"
            className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-lg transition-colors"
          >
            <Building className="w-5 h-5" />
            <span className="font-medium">Mülklerim</span>
          </Link>

          <Link
            href="/dashboard/documents"
            className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-lg transition-colors"
          >
            <FileText className="w-5 h-5" />
            <span className="font-medium">Dosyalar</span>
          </Link>

          <Link
            href="/dashboard/settings"
            className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-lg transition-colors"
          >
            <Settings className="w-5 h-5" />
            <span className="font-medium">Ayarlar</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-slate-700">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700/50 rounded-lg transition-colors text-left"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Çıkış Yap</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Mobile Header */}
        <div className="md:hidden bg-white dark:bg-slate-800 p-4 border-b border-gray-200 dark:border-slate-700 flex items-center justify-between">
          <span className="text-xl font-bold text-primary">
            Pasiflow
          </span>
          <button className="p-2">
            {/* Mobile menu trigger would go here */}
            <span className="sr-only">Menu</span>
          </button>
        </div>

        <div className="p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

import { Inter, Playfair_Display } from "next/font/google";
import { AdminSidebar } from "@/components/admin/sidebar";
import { AuthGuard } from "@/components/auth-guard";
import "../globals.css";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

const playfair = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-playfair",
    display: "swap",
});

export const dynamic = 'force-dynamic';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
                <AuthGuard allowedRoles={["ADMIN"]}>
                    <div className="h-full relative">
                        <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900">
                            <AdminSidebar />
                        </div>
                        <main className="md:pl-72 pb-10">
                            {children}
                        </main>
                    </div>
                </AuthGuard>
            </body>
        </html>
    );
}

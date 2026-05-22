import { Inter, Playfair_Display } from "next/font/google";
import { AuthGuard } from "@/components/auth-guard";
import { AdminShell } from "@/components/admin/admin-shell";
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
                    <AdminShell>{children}</AdminShell>
                </AuthGuard>
            </body>
        </html>
    );
}

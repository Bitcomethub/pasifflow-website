import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

// All users are admin-provided via environment variables
const getUsers = () => [
    {
        email: process.env.DEMO_AGENT_EMAIL || "",
        passwordHash: process.env.DEMO_AGENT_PASSWORD_HASH || "",
        userData: { id: 'agent-001', name: 'Pasiflow Agent', role: 'agent' }
    },
    {
        email: process.env.DEMO_INVESTOR_EMAIL || "",
        passwordHash: process.env.DEMO_INVESTOR_PASSWORD_HASH || "",
        userData: { id: 'investor-001', name: 'Demo Investor', role: 'client' }
    },
    // Legacy demo users
    {
        email: process.env.DEMO_USER_EMAIL || "",
        passwordHash: process.env.DEMO_USER_PASSWORD_HASH || "",
        userData: { id: 'erman-adanir-001', name: 'Erman Adanır', role: 'client' }
    },
    {
        email: process.env.DEMO_CLIENT_EMAIL || "",
        passwordHash: process.env.DEMO_CLIENT_PASSWORD_HASH || "",
        userData: { id: 'demo-client-002', name: 'Demo Client', role: 'client' }
    }
].filter(u => u.email && u.passwordHash);

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json(
                { success: false, message: 'E-posta ve şifre gereklidir.' },
                { status: 400 }
            );
        }

        if (!JWT_SECRET) {
            console.error('JWT_SECRET not configured');
            return NextResponse.json(
                { success: false, message: 'Sunucu yapılandırma hatası.' },
                { status: 500 }
            );
        }

        // Find matching user from env-provided credentials
        const users = getUsers();
        const match = users.find(u => u.email.toLowerCase() === email.toLowerCase());

        if (match) {
            const isValidPassword = await bcrypt.compare(password, match.passwordHash);

            if (isValidPassword) {
                const token = jwt.sign(
                    { userId: match.userData.id, email: match.email, role: match.userData.role },
                    JWT_SECRET,
                    { expiresIn: '7d' }
                );

                return NextResponse.json({
                    success: true,
                    user: {
                        id: match.userData.id,
                        name: match.userData.name,
                        email: match.email,
                        role: match.userData.role,
                        token: token
                    }
                });
            }
        }

        // Invalid Credentials
        return NextResponse.json(
            { success: false, message: 'Geçersiz e-posta veya şifre.' },
            { status: 401 }
        );

    } catch (error) {
        console.error('Auth error:', error);
        return NextResponse.json(
            { success: false, message: 'Sunucu hatası.' },
            { status: 500 }
        );
    }
}

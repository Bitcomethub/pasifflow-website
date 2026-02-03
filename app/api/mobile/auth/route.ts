import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

// Demo users from environment variables
const getDemoUsers = () => [
    {
        email: process.env.DEMO_USER_EMAIL || "",
        passwordHash: process.env.DEMO_USER_PASSWORD_HASH || "",
        userData: { id: 'erman-adanir-001', name: 'Erman Adanır', role: 'client' }
    },
    {
        email: process.env.DEMO_CLIENT_EMAIL || "",
        passwordHash: process.env.DEMO_CLIENT_PASSWORD_HASH || "",
        userData: { id: 'demo-client-002', name: 'Demo Client', role: 'client' }
    },
    {
        email: process.env.DEMO_AGENT_EMAIL || "",
        passwordHash: process.env.DEMO_AGENT_PASSWORD_HASH || "",
        userData: { id: 'demo-agent-003', name: 'Pasiflow Agent', role: 'agent' }
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

        // 1. Check demo users from environment variables
        const demoUsers = getDemoUsers();
        const demoMatch = demoUsers.find(u => u.email === email);

        // 2. Real Database Check (Prisma)
        let user = await prisma.user.findUnique({
            where: { email }
        });

        // 3. Handle demo user authentication
        if (demoMatch) {
            const isValidPassword = await bcrypt.compare(password, demoMatch.passwordHash);

            if (isValidPassword) {
                // Auto-create demo user in DB if not exists
                if (!user) {
                    user = await prisma.user.create({
                        data: {
                            email: demoMatch.email,
                            passwordHash: demoMatch.passwordHash,
                            fullName: demoMatch.userData.name,
                            role: demoMatch.userData.role === 'agent' ? 'AGENT' : 'USER',
                            isVerified: true
                        }
                    });
                }

                const role = user.role === 'ADMIN' || user.role === 'AGENT' ? 'agent' : 'client';
                const token = jwt.sign(
                    { userId: user.id, email: user.email, role },
                    JWT_SECRET,
                    { expiresIn: '7d' }
                );

                return NextResponse.json({
                    success: true,
                    user: {
                        id: user.id,
                        name: user.fullName,
                        email: user.email,
                        role: role,
                        token: token
                    }
                });
            }
        }

        // 4. Regular User Auth with bcrypt
        if (user && user.passwordHash) {
            const isValidPassword = await bcrypt.compare(password, user.passwordHash);

            if (isValidPassword) {
                const role = user.role === 'ADMIN' || user.role === 'AGENT' ? 'agent' : 'client';
                const token = jwt.sign(
                    { userId: user.id, email: user.email, role },
                    JWT_SECRET,
                    { expiresIn: '7d' }
                );

                return NextResponse.json({
                    success: true,
                    user: {
                        id: user.id,
                        name: user.fullName || email,
                        email: user.email,
                        role: role,
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

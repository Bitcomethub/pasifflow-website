import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getUsers } from '@/lib/users';

const JWT_SECRET = process.env.JWT_SECRET;

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

        const users = getUsers();
        const match = users.find(u => u.email.toLowerCase() === email.toLowerCase());

        if (match) {
            const isValidPassword = await bcrypt.compare(password, match.passwordHash);

            if (isValidPassword) {
                const token = jwt.sign(
                    { userId: match.id, email: match.email, role: match.role },
                    JWT_SECRET,
                    { expiresIn: '7d' }
                );

                return NextResponse.json({
                    success: true,
                    user: {
                        id: match.id,
                        name: match.fullName,
                        email: match.email,
                        role: match.role === "AGENT" ? "agent" : "client",
                        token: token
                    }
                });
            }
        }

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

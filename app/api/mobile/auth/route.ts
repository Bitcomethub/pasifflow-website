import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Ensure this matches web project structure

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        // 1. Static Demo Users (Matchers Web App Logic for immediate Demo availability)
        const DEMO_USERS = [
            {
                email: 'erman@pasiflow.com',
                password: 'Pasiflow2026!',
                user: { id: 'erman-adanir-001', name: 'Erman Adanır', role: 'client', token: 'mock_token_client' }
            },
            {
                email: 'demo@pasiflow.com',
                password: 'Demo123!',
                user: { id: 'demo-client-002', name: 'Demo Client', role: 'client', token: 'mock_token_client_demo' }
            },
            {
                email: 'agent@pasiflow.com',
                password: 'Agent123!',
                user: { id: 'demo-agent-003', name: 'Pasiflow Agent', role: 'agent', token: 'mock_token_agent_demo' }
            }
        ];

        const demoMatch = DEMO_USERS.find(u => u.email === email && u.password === password);

        // 2. Real Database Check (Prisma)
        let user = await prisma.user.findUnique({
            where: { email }
        });

        // 3. Auto-Create/Update Demo Users from Static List if missing or auth matches
        if (demoMatch) {
            if (!user) {
                // Create if missing
                user = await prisma.user.create({
                    data: {
                        email: demoMatch.email,
                        passwordHash: demoMatch.password,
                        fullName: demoMatch.user.name,
                        role: demoMatch.user.role === 'agent' ? 'AGENT' : 'USER', // Normalize role
                        isVerified: true
                    }
                });
            } else if (user.passwordHash !== demoMatch.password) {
                // Update password if different (ensure demo access works)
                user = await prisma.user.update({
                    where: { id: user.id },
                    data: { passwordHash: demoMatch.password }
                });
            }

            // Return success for demo user
            const role = user.role === 'ADMIN' || user.role === 'AGENT' ? 'agent' : 'client';
            return NextResponse.json({
                success: true,
                user: {
                    id: user.id,
                    name: user.fullName,
                    email: user.email,
                    role: role,
                    token: `jwt-demo-${user.id}`
                }
            });
        }

        // 4. Regular User Auth
        if (user && user.passwordHash === password) {
            const role = user.role === 'ADMIN' || user.role === 'AGENT' ? 'agent' : 'client';
            return NextResponse.json({
                success: true,
                user: {
                    id: user.id,
                    name: user.fullName || email,
                    email: user.email,
                    role: role,
                    token: `jwt-real-${user.id}`
                }
            });
        }

        // Invalid Credentials
        return NextResponse.json(
            { success: false, message: 'Geçersiz e-posta veya şifre.' },
            { status: 401 }
        );

    } catch (error) {
        return NextResponse.json(
            { success: false, message: 'Sunucu hatası.' },
            { status: 500 }
        );
    }
}

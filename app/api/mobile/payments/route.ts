import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyToken, extractBearerToken } from '@/lib/auth';

export async function GET(request: Request) {
    try {
        // JWT Authentication
        const token = extractBearerToken(request);
        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        const payload = verifyToken(token);
        if (!payload) {
            return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: { email: payload.email },
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Fetch all payments for user's properties
        // We need to find all properties first, then their payments
        // Or cleaner: Find payments where property.llc.ownerId = user.id
        const payments = await prisma.payment.findMany({
            where: {
                property: {
                    llc: {
                        ownerId: user.id
                    }
                }
            },
            include: {
                property: true
            },
            orderBy: {
                date: 'desc'
            }
        });

        const transformedPayments = payments.map(p => ({
            id: p.id,
            property: p.property.address,
            amount: p.amount,
            date: p.date.toISOString(),
            status: p.status.toLowerCase(), // 'paid', 'late', 'pending'
            tenant: p.property.tenantName,
            period: p.period
        }));

        return NextResponse.json(transformedPayments);

    } catch (error) {
        console.error('Payments API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

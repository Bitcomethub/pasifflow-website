import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
    try {
        const user = await prisma.user.findUnique({
            where: { email: 'erman@pasiflow.com' },
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

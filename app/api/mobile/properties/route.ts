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

        // Fetch properties grouped by LLC, including relations
        const llcs = await prisma.lLC.findMany({
            where: { ownerId: user.id },
            include: {
                properties: {
                    include: {
                        payments: {
                            orderBy: { date: 'desc' },
                            take: 1
                        }
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }
                }
            }
        });

        // Transform for Mobile App (Flattened list with LLC info)
        const properties = [];

        for (const llc of llcs) {
            for (const prop of llc.properties) {
                properties.push({
                    id: prop.id,
                    title: prop.address, // Mobile app expects 'title' often
                    address: prop.address,
                    city: prop.city,
                    state: prop.state,
                    zipCode: prop.zipCode,
                    location: `${prop.city}, ${prop.state} ${prop.zipCode}`,
                    status: prop.status.toLowerCase(), // 'occupied', 'vacant'
                    purchasePrice: prop.purchasePrice,
                    currentValue: prop.currentValue,
                    monthlyRent: prop.monthlyRent,
                    tenantName: prop.tenantName,
                    image: prop.imageUrl,
                    llcName: llc.name,
                    nextPaymentDate: prop.paymentDay ? `${prop.paymentDay} days left` : 'N/A', // Simple logic for now
                    section8: true, // Mocked for now, add to schema later if needed
                    occupancyRate: 100
                });
            }
        }

        return NextResponse.json(properties);

    } catch (error) {
        console.error('Properties API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

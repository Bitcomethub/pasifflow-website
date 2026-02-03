import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
    try {
        // Mock Auth
        const user = await prisma.user.findUnique({
            where: { email: 'erman@pasiflow.com' },
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

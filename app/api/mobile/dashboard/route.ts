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

        const email = payload.email;

        let user = await prisma.user.findUnique({
            where: { email },
            include: {
                llcs: {
                    include: {
                        properties: true
                    }
                }
            }
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Calculate Totals
        let totalProperties = 0;
        let totalValue = 0;
        let totalMonthlyRent = 0;
        let totalYield = 0;

        user.llcs.forEach(llc => {
            llc.properties.forEach(property => {
                totalProperties++;
                totalValue += property.currentValue || property.purchasePrice;
                totalMonthlyRent += property.monthlyRent;
            });
        });

        if (totalValue > 0) {
            totalYield = ((totalMonthlyRent * 12) / totalValue) * 100;
        }

        const data = {
            totalProperties,
            totalValue,
            totalMonthlyRent,
            totalYield: parseFloat(totalYield.toFixed(2)),
            currency: 'USD',
            userName: user.fullName,
            llcCount: user.llcs.length
        };

        return NextResponse.json(data);

    } catch (error) {
        console.error('Dashboard API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        // In a real app, we would get the userId from the session/token.
        // For this demo, we'll fetch the main demo user "Erman Adanır".
        const user = await prisma.user.findUnique({
            where: { email: 'erman@pasiflow.com' },
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
        let totalYield = 0; // Simple average yield

        user.llcs.forEach(llc => {
            llc.properties.forEach(property => {
                totalProperties++;
                totalValue += property.currentValue || property.purchasePrice;
                totalMonthlyRent += property.monthlyRent;
            });
        });

        // Calculate Average Yield (Annual Rent / Total Value)
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

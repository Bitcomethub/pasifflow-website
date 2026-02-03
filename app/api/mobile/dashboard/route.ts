import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const email = searchParams.get('email') || 'demo@pasiflow.com';

        // Fetch user based on the query param (or default/token in future)
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

        // AUTO-SEED: If demo user has no LLCs, create mock data for display
        if (user.llcs.length === 0 && email === 'demo@pasiflow.com') {
            await prisma.lLC.create({
                data: {
                    name: 'Pasiflow Demo LLC',
                    ownerId: user.id,
                    properties: {
                        create: [
                            {
                                address: '12152 Stout St',
                                city: 'Detroit',
                                state: 'MI',
                                zipCode: '48228',
                                purchasePrice: 85900,
                                currentValue: 92000,
                                monthlyRent: 1160,
                                status: 'Occupied',
                                purchaseDate: new Date('2024-01-15')
                            },
                            {
                                address: '9977 Evergreen Ave',
                                city: 'Detroit',
                                state: 'MI',
                                zipCode: '48228',
                                purchasePrice: 89900,
                                currentValue: 95000,
                                monthlyRent: 1350,
                                status: 'Occupied',
                                purchaseDate: new Date('2024-03-10')
                            }
                        ]
                    }
                }
            });

            // Re-fetch user with new data
            const updatedUser = await prisma.user.findUnique({
                where: { email },
                include: {
                    llcs: {
                        include: {
                            properties: true
                        }
                    }
                }
            });

            if (updatedUser) {
                user = updatedUser;
            }
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

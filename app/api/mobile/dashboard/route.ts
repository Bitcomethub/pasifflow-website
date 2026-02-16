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

        // Auto-seed demo investor data if user has no LLCs
        const demoInvestorEmails = ['demo@pasiflow.com', 'investor@pasiflow.com'];
        if (user.llcs.length === 0 && demoInvestorEmails.includes(email)) {
            await prisma.lLC.create({
                data: {
                    name: 'Pasiflow Investments LLC',
                    formationState: 'Wyoming',
                    ein: '88-1234567',
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
                                status: 'OCCUPIED',
                                tenantName: 'Section 8 Tenant',
                                leaseEnd: new Date('2026-06-30'),
                                paymentDay: 1,
                            },
                            {
                                address: '9977 Evergreen Ave',
                                city: 'Detroit',
                                state: 'MI',
                                zipCode: '48228',
                                purchasePrice: 89900,
                                currentValue: 95000,
                                monthlyRent: 1100,
                                status: 'OCCUPIED',
                                tenantName: 'Section 8 Tenant',
                                leaseEnd: new Date('2026-08-31'),
                                paymentDay: 5,
                            },
                        ]
                    }
                }
            });

            // Re-fetch user with new data
            user = await prisma.user.findUnique({
                where: { email },
                include: {
                    llcs: {
                        include: {
                            properties: true
                        }
                    }
                }
            }) as typeof user;
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

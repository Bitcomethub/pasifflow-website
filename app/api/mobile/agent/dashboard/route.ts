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

        // 1. Find User
        const user = await prisma.user.findUnique({
            where: { email: payload.email },
            include: { agentProfile: true }
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // 2. Auto-Seed for Demo Agent if profile doesn't exist
        let agentProfile = user.agentProfile;

        if (!agentProfile && payload.email === 'agent@pasiflow.com') {
            const newProfile = await prisma.agentProfile.create({
                data: {
                    userId: user.id,
                    level: 'GROWTH',
                    sales: {
                        create: [
                            { propertyAddress: '12152 Stout St, Detroit', salePrice: 85900, commission: 1500, clientName: 'Ahmet Yılmaz', status: 'COMPLETED', saleDate: new Date('2025-11-15') },
                            { propertyAddress: '9977 Evergreen Ave, Detroit', salePrice: 89900, commission: 1750, clientName: 'Mehmet Demir', status: 'COMPLETED', saleDate: new Date('2025-12-20') },
                            { propertyAddress: '12345 Kentucky St, Detroit', salePrice: 89000, commission: 1750, clientName: 'Ayşe Kaya', status: 'COMPLETED', saleDate: new Date('2025-12-23') },
                        ]
                    }
                },
                include: { sales: true }
            });
            agentProfile = newProfile;
        }

        // If still no profile (e.g. regular user trying to access agent dash), return empty/partial
        if (!agentProfile) {
            return NextResponse.json({
                name: user.fullName,
                totalSales: 0,
                activeProperties: 0,
                totalReferralEarned: 0,
                hotDeals: []
            });
        }

        // 3. Calculate Stats from Real DB Data
        // Re-fetch with relations to be sure
        const fullProfile = await prisma.agentProfile.findUnique({
            where: { id: agentProfile.id },
            include: { sales: true, commissions: true }
        });

        if (!fullProfile) return NextResponse.json({ error: 'Profile error' }, { status: 500 });

        const totalSalesCount = fullProfile.sales.filter(s => s.status === 'COMPLETED').length;

        // Calculate total earned from sales + extra commissions
        const salesCommissions = fullProfile.sales.reduce((sum, sale) => sum + sale.commission, 0);
        const extraCommissions = fullProfile.commissions.reduce((sum, comm) => sum + comm.amount, 0);
        const totalReferralEarned = salesCommissions + extraCommissions;

        const activeProperties = fullProfile.sales.length; // Simplified logic for demo

        const agentData = {
            name: user.fullName,
            totalSales: totalSalesCount,
            activeProperties: activeProperties,
            totalReferralEarned: totalReferralEarned,
            // Hot Deals can still be static or fetched from Property table with 'isHot' flag
            hotDeals: [
                {
                    id: 'hot-1',
                    title: '🏠 12152 Stout St - Back on Market',
                    address: '12152 Stout St, Detroit, MI 48228',
                    price: 85900,
                    monthlyRent: 1160,
                    roi: 16.2,
                    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format&fit=crop&q=80',
                    status: 'hot',
                    tag: 'Section 8 Onaylı',
                    section8: true,
                    mls: '20251049787',
                },
                // Add more as needed...
            ]
        };

        return NextResponse.json(agentData);
    } catch (error) {
        console.error('Agent Dashboard API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

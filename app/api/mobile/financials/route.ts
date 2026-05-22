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
            include: {
                llcs: {
                    include: {
                        properties: {
                            include: {
                                ledgers: {
                                    orderBy: {
                                        postedDate: 'desc'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Flatten ledgers
        const allTransactions = user.llcs.flatMap(llc =>
            llc.properties.flatMap(property =>
                property.ledgers.map(item => ({
                    id: item.id,
                    type: item.type, // INCOME, EXPENSE
                    category: item.category, // Rent, Repair, etc.
                    amount: item.amount,
                    description: item.description,
                    date: item.postedDate,
                    propertyAddress: property.address,
                    propertyId: property.id,
                    llcName: llc.name
                }))
            )
        );

        // Calculate Totals
        const totalIncome = allTransactions
            .filter(t => t.type === 'INCOME')
            .reduce((sum, t) => sum + t.amount, 0);

        const totalExpense = allTransactions
            .filter(t => t.type === 'EXPENSE')
            .reduce((sum, t) => sum + t.amount, 0); // Amount is already negative in DB? Let's assume absolute or signed.
        // In seed we used negative for expenses. Let's stick to that convention or fix it in UI.
        // Seed: amount: -185.50. So strict sum works.

        const netOperatingIncome = totalIncome + totalExpense; // Adding negative expense

        // Sort by date
        allTransactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        // Build a 12-month income/expense series from the actual ledgers
        const MONTH_LABELS_TR = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'];
        const now = new Date();
        const monthBuckets = new Map<string, { month: string; revenue: number; expenses: number }>();
        for (let i = 11; i >= 0; i--) {
            const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - i, 1));
            const key = `${d.getUTCFullYear()}-${d.getUTCMonth()}`;
            monthBuckets.set(key, { month: MONTH_LABELS_TR[d.getUTCMonth()], revenue: 0, expenses: 0 });
        }
        for (const t of allTransactions) {
            const td = new Date(t.date);
            const key = `${td.getUTCFullYear()}-${td.getUTCMonth()}`;
            const bucket = monthBuckets.get(key);
            if (!bucket) continue;
            if (t.type === 'INCOME') bucket.revenue += t.amount;
            else bucket.expenses += Math.abs(t.amount);
        }
        const monthlyData = Array.from(monthBuckets.values()).map((b) => ({
            month: b.month,
            revenue: Math.round(b.revenue),
            expenses: Math.round(b.expenses),
        }));

        return NextResponse.json({
            summary: {
                totalIncome,
                totalExpense: Math.abs(totalExpense), // Send absolute value for UI display
                netOperatingIncome
            },
            transactions: allTransactions,
            monthlyData
        });
    } catch (error) {
        console.error('Failed to fetch financial ledger:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

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

        // Build monthly aggregation for chart
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const turkishMonths = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'];
        const monthlyMap = new Map<string, { income: number; expense: number }>();
        months.forEach(m => monthlyMap.set(m, { income: 0, expense: 0 }));

        allTransactions.forEach(t => {
            const date = new Date(t.date);
            const monthKey = months[date.getMonth()];
            const entry = monthlyMap.get(monthKey);
            if (entry) {
                if (t.type === 'INCOME') {
                    entry.income += t.amount;
                } else {
                    entry.expense += Math.abs(t.amount);
                }
            }
        });

        const monthlyData = months.map((m, i) => ({
            month: m,
            monthTr: turkishMonths[i],
            income: Math.round(monthlyMap.get(m)!.income),
            expense: Math.round(monthlyMap.get(m)!.expense),
        }));

        return NextResponse.json({
            summary: {
                totalIncome,
                totalExpense: Math.abs(totalExpense), // Send absolute value for UI display
                netOperatingIncome
            },
            monthlyData,
            transactions: allTransactions
        });
    } catch (error) {
        console.error('Failed to fetch financial ledger:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

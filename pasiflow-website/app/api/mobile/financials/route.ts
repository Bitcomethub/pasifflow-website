import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const user = await prisma.user.findFirst({
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

        return NextResponse.json({
            summary: {
                totalIncome,
                totalExpense: Math.abs(totalExpense), // Send absolute value for UI display
                netOperatingIncome
            },
            transactions: allTransactions
        });
    } catch (error) {
        console.error('Failed to fetch financial ledger:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

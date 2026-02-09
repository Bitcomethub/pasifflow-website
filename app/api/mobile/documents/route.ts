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

        // Fetch all documents linked to User, or their LLCs, or their Properties
        const documents = await prisma.document.findMany({
            where: {
                OR: [
                    { userId: user.id },
                    { llc: { ownerId: user.id } },
                    { property: { llc: { ownerId: user.id } } }
                ]
            },
            include: {
                llc: { select: { name: true } },
                property: { select: { address: true } }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        // Group by type for the app
        const groupedDocs = documents.reduce((acc: Record<string, Array<{ id: string; name: string; date: string; size: string; url: string; type: string }>>, doc) => {
            const category = doc.type === 'Tax' ? 'Vergi Dokümanları' : 'Kira Kontratları & Diğer';

            if (!acc[category]) {
                acc[category] = [];
            }

            // Create a smart name if title is generic
            let displayName = doc.title;
            if (doc.property) displayName = `${doc.property.address} - ${doc.type}`;
            else if (doc.llc) displayName = `${doc.llc.name} - ${doc.type}`;

            acc[category].push({
                id: doc.id,
                name: displayName,
                date: doc.createdAt.toISOString().split('T')[0], // YYYY-MM-DD
                size: doc.size || '1.2 MB',
                url: doc.url,
                type: doc.type
            });
            return acc;
        }, {});

        // Transform to array format expected by app
        const responseData = Object.keys(groupedDocs).map(title => ({
            title,
            items: groupedDocs[title]
        }));

        return NextResponse.json(responseData);

    } catch (error) {
        console.error('Documents API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
    try {
        // In a real app, get userId from session/token
        // For now, we fetch the first user (Erman)
        const user = await prisma.user.findFirst({
            include: {
                llcs: {
                    include: {
                        properties: {
                            include: {
                                maintenanceRequests: {
                                    include: {
                                        vendor: true
                                    },
                                    orderBy: {
                                        reportedAt: 'desc'
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

        // Flatten the structure: We want a list of all maintenance requests across all properties
        const allRequests = user.llcs.flatMap(llc =>
            llc.properties.flatMap(property =>
                property.maintenanceRequests.map(req => ({
                    id: req.id,
                    title: req.title,
                    description: req.description,
                    status: req.status, // PENDING, IN_PROGRESS, COMPLETED
                    priority: req.priority, // NORMAL, EMERGENCY
                    reportedAt: req.reportedAt,
                    scheduledAt: req.scheduledAt,
                    completedAt: req.completedAt,
                    estimatedCost: req.estimatedCost,
                    finalCost: req.finalCost,
                    propertyAddress: property.address,
                    vendor: req.vendor ? {
                        name: req.vendor.name,
                        category: req.vendor.category,
                        rating: req.vendor.rating,
                        phone: req.vendor.phone
                    } : null
                }))
            )
        );

        // Sort by date descending
        allRequests.sort((a, b) => new Date(b.reportedAt).getTime() - new Date(a.reportedAt).getTime());

        return NextResponse.json(allRequests);
    } catch (error) {
        console.error('Failed to fetch maintenance requests:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

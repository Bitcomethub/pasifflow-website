import { db } from "@/lib/db"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"

export const dynamic = 'force-dynamic'

export default async function MaintenancePage() {
    const requests = await db.maintenanceRequest.findMany({
        include: {
            property: true,
            vendor: true
        },
        orderBy: {
            reportedAt: 'desc'
        }
    })

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'PENDING': return 'bg-yellow-100 text-yellow-700'
            case 'IN_PROGRESS': return 'bg-blue-100 text-blue-700'
            case 'COMPLETED': return 'bg-[#B8A074]/10 text-[#B8A074]'
            case 'CANCELLED': return 'bg-red-100 text-red-700'
            default: return 'bg-gray-100 text-gray-700'
        }
    }

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-[#3D4852]">Maintenance Requests</h1>
                <Button className="bg-[#B8A074] hover:bg-[#B8A074]/90 text-white">
                    Export Report
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {requests.map((request) => (
                    <Card key={request.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {request.title}
                            </CardTitle>
                            <Badge className={getStatusColor(request.status)}>
                                {request.status}
                            </Badge>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-600 mb-4">{request.description}</p>

                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-sm font-medium">{request.vendor?.name || 'Unassigned'}</span>
                            </div>

                            <div className="flex items-center text-sm text-gray-500">
                                <span className="mr-2">📍</span>
                                {request.property?.address || 'N/A'}
                            </div>

                            <div className="mt-4 text-xs text-gray-400">
                                Reported: {format(new Date(request.reportedAt), 'PPP')}
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="outline" size="sm">View Details</Button>
                            <Button size="sm" className="bg-[#B8A074] hover:bg-[#B8A074]/90 text-white">
                                Update Status
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {requests.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                    No maintenance requests found.
                </div>
            )}
        </div>
    )
}

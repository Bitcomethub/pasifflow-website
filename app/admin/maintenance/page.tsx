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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { format } from "date-fns"

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
            default: return 'bg-gray-100 text-gray-700'
        }
    }

    return (
        <div className="p-8 space-y-8">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Maintenance Board</h2>
                <Button>Create Request</Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {requests.map((request) => (
                    <Card key={request.id}>
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <Badge className={getStatusColor(request.status)}>
                                    {request.status.replace('_', ' ')}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                    {format(new Date(request.reportedAt), 'MMM d')}
                                </span>
                            </div>
                            <CardTitle className="text-lg mt-2">{request.title}</CardTitle>
                            <CardDescription>{request.property.address}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-600 line-clamp-2">
                                {request.description}
                            </p>

                            {request.vendor && (
                                <div className="mt-4 flex items-center p-2 bg-gray-50 rounded-md">
                                    <Avatar className="h-8 w-8 mr-2">
                                        <AvatarFallback>V</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="text-xs font-medium">{request.vendor.name}</p>
                                        <p className="text-[10px] text-muted-foreground">{request.vendor.category}</p>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                        <CardFooter className="flex justify-between border-t p-4 bg-gray-50/50">
                            <Button variant="outline" size="sm">Details</Button>
                            {request.status === 'PENDING' && (
                                <Button size="sm">Assign Vendor</Button>
                            )}
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}

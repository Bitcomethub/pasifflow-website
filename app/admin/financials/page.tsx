import { db } from "@/lib/db"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Plus } from "lucide-react"
import { format } from "date-fns"

export default async function FinancialsPage() {
    const transactions = await db.ledger.findMany({
        include: {
            property: true
        },
        orderBy: {
            postedDate: 'desc'
        },
        take: 50
    }).catch((e) => {
        console.error("Failed to fetch transactions:", e)
        return []
    })

    return (
        <div className="p-4 sm:p-6 md:p-8 space-y-6 md:space-y-8">
            <div className="flex items-center justify-between gap-3 flex-wrap">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Ledger</h2>
                <Button size="sm" className="md:size-default">
                    <Plus className="mr-2 h-4 w-4" /> Add Transaction
                </Button>
            </div>

            <div className="border rounded-lg overflow-x-auto">
                <Table className="min-w-[640px]">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Property</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {transactions.map((tx) => (
                            <TableRow key={tx.id}>
                                <TableCell>{format(new Date(tx.postedDate), 'MMM d, yyyy')}</TableCell>
                                <TableCell className="font-medium">{tx.property.address}</TableCell>
                                <TableCell>{tx.description}</TableCell>
                                <TableCell>
                                    <span className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                                        {tx.category}
                                    </span>
                                </TableCell>
                                <TableCell className={`text-right font-medium ${tx.type === 'INCOME' ? 'text-[#B8A074]' : 'text-red-600'}`}>
                                    {tx.type === 'INCOME' ? '+' : '-'}${tx.amount.toLocaleString()}
                                </TableCell>
                            </TableRow>
                        ))}
                        {transactions.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                                    No transactions recorded.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

'use server'

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function addLedgerEntry(formData: FormData) {
    const type = formData.get("type") as string
    const category = formData.get("category") as string
    const amount = parseFloat(formData.get("amount") as string)
    const description = formData.get("description") as string
    const propertyId = formData.get("propertyId") as string

    // Validate (skipping for speed)

    try {
        await db.ledger.create({
            data: {
                type, // INCOME or EXPENSE
                category,
                amount, // Absolute value
                description,
                postedDate: new Date(),
                propertyId
            }
        })

        // Also update Payment model if it's rent? Maybe later.

        revalidatePath("/admin/financials")
        return { success: true }

    } catch (error) {
        return { error: "Failed to add transaction" }
    }
}

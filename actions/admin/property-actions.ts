'use server'

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function createProperty(formData: FormData) {
    const address = formData.get("address") as string
    const city = formData.get("city") as string
    const state = formData.get("state") as string
    const zipCode = formData.get("zipCode") as string
    const purchasePrice = parseFloat(formData.get("purchasePrice") as string)
    const monthlyRent = parseFloat(formData.get("monthlyRent") as string)

    // Hardcode owner for now (mock user or admin)
    const status = "OCCUPIED"

    // In real app we would get session here

    try {
        // Create a mock LLC if needed or pick first one
        const firstLLC = await db.lLC.findFirst()

        if (!firstLLC) throw new Error("No LLC found to attach property to")

        await db.property.create({
            data: {
                address,
                city,
                state,
                zipCode,
                purchasePrice,
                monthlyRent,
                status,
                llcId: firstLLC.id,
                imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=80"
            }
        })

        revalidatePath("/admin/properties")
        return { success: true }
    } catch (error) {
        console.error(error)
        return { error: "Failed to create property" }
    }
}

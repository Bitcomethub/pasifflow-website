'use server'

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function updateRequestStatus(requestId: string, status: string) {
    try {
        await db.maintenanceRequest.update({
            where: { id: requestId },
            data: { status }
        })
        revalidatePath("/admin/maintenance")
        return { success: true }
    } catch (error) {
        return { error: "Failed to update status" }
    }
}

export async function assignVendor(requestId: string, vendorId: string) {
    try {
        await db.maintenanceRequest.update({
            where: { id: requestId },
            data: { vendorId }
        })
        revalidatePath("/admin/maintenance")
        return { success: true }
    } catch (error) {
        return { error: "Failed to assign vendor" }
    }
}

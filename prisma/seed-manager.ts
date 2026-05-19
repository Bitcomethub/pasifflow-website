import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
    console.log("Seeding Detroit Manager (Justin)...")

    const passwordHash = await bcrypt.hash("Detroit2025!", 12)

    const justin = await prisma.user.upsert({
        where: { email: "justin@pasiflow.com" },
        update: {
            passwordHash,
            role: "MANAGER",
            fullName: "Justin Carter",
            isVerified: true,
        },
        create: {
            email: "justin@pasiflow.com",
            fullName: "Justin Carter",
            passwordHash,
            role: "MANAGER",
            isVerified: true,
            phone: "+1 (313) 555-0142",
        },
    })

    console.log(`Manager ready: ${justin.fullName} <${justin.email}> [${justin.role}]`)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })

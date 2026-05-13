import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const ERMAN_EMAIL = 'erman@pasiflow.com'
const LLC_NAME = 'Pasiflow Properties LLC'
const LLC_STATE = 'WY'

// NOTE: schema.prisma'daki LLC modelinde `status` alanı yok, bu yüzden
// kullanıcının istediği `status: "ACTIVE"` atlandı. Eklemek istenirse
// schema'ya `status String @default("ACTIVE")` eklenip db push gerekir.

// Pasiflow founded Nov 2025 — all purchase dates fall on/after that.
const PROPERTIES = [
    { address: '10468 Nottingham St', city: 'Detroit', state: 'MI', zipCode: '48224', purchasePrice: 130000, monthlyRent: 1500, status: 'OCCUPIED', tenantName: 'Section 8 Kiracı', paymentDay: 15, purchaseDate: new Date('2025-11-15'), imageUrl: '/properties/nottingham-hd.jpg' },
    { address: '12152 Stout St', city: 'Detroit', state: 'MI', zipCode: '48228', purchasePrice: 85900, monthlyRent: 1160, status: 'OCCUPIED', tenantName: 'Section 8 Kiracı', paymentDay: 15, purchaseDate: new Date('2025-12-01'), imageUrl: '/properties/stout-hd.jpg' },
    { address: '12290 Griggs St', city: 'Detroit', state: 'MI', zipCode: '48204', purchasePrice: 89900, monthlyRent: 1100, status: 'OCCUPIED', tenantName: 'Section 8 Kiracı', paymentDay: 15, purchaseDate: new Date('2025-12-20'), imageUrl: '/properties/griggs-hd.jpg' },
    { address: '15717 Freeland St', city: 'Detroit', state: 'MI', zipCode: '48227', purchasePrice: 87900, monthlyRent: 1165, status: 'OCCUPIED', tenantName: 'Section 8 Kiracı', paymentDay: 15, purchaseDate: new Date('2026-01-10'), imageUrl: '/properties/freeland-hd.jpg' },
    { address: '9977 Evergreen Ave', city: 'Detroit', state: 'MI', zipCode: '48228', purchasePrice: 88900, monthlyRent: 1354, status: 'OCCUPIED', tenantName: 'Section 8 Kiracı', paymentDay: 15, purchaseDate: new Date('2026-01-25'), imageUrl: '/properties/evergreen-hd.jpg' },
    { address: '12345 Kentucky St', city: 'Detroit', state: 'MI', zipCode: '48204', purchasePrice: 89000, monthlyRent: 1224, status: 'OCCUPIED', tenantName: 'Section 8 Kiracı', paymentDay: 15, purchaseDate: new Date('2026-02-15'), imageUrl: '/properties/kentucky-hd.jpg' },
    { address: '8934 Hartwell St', city: 'Detroit', state: 'MI', zipCode: '48228', purchasePrice: 92000, monthlyRent: 1275, status: 'OCCUPIED', tenantName: 'Section 8 Kiracı', paymentDay: 15, purchaseDate: new Date('2026-03-01'), imageUrl: '/properties/nottingham-hd.jpg' },
    { address: '14523 Appoline St', city: 'Detroit', state: 'MI', zipCode: '48227', purchasePrice: 86500, monthlyRent: 1190, status: 'OCCUPIED', tenantName: 'Section 8 Kiracı', paymentDay: 15, purchaseDate: new Date('2026-03-20'), imageUrl: '/properties/stout-hd.jpg' },
    { address: '11234 Fenkell Ave', city: 'Detroit', state: 'MI', zipCode: '48238', purchasePrice: 94000, monthlyRent: 1320, status: 'OCCUPIED', tenantName: 'Section 8 Kiracı', paymentDay: 15, purchaseDate: new Date('2026-04-10'), imageUrl: '/properties/griggs-hd.jpg' },
    { address: '7821 Burt Rd', city: 'Detroit', state: 'MI', zipCode: '48219', purchasePrice: 91000, monthlyRent: 1285, status: 'OCCUPIED', tenantName: 'Section 8 Kiracı', paymentDay: 15, purchaseDate: new Date('2026-04-25'), imageUrl: '/properties/evergreen-hd.jpg' },
]

async function main() {
    console.log(`Seeding ${PROPERTIES.length} demo properties for ${ERMAN_EMAIL}...`)

    const erman = await prisma.user.findUnique({ where: { email: ERMAN_EMAIL } })
    if (!erman) throw new Error(`User not found: ${ERMAN_EMAIL}. Run main seed first.`)

    let llc = await prisma.lLC.findFirst({
        where: { name: LLC_NAME, ownerId: erman.id },
    })
    if (!llc) {
        llc = await prisma.lLC.create({
            data: { name: LLC_NAME, formationState: LLC_STATE, ownerId: erman.id },
        })
        console.log(`+ LLC created: ${llc.name} [${llc.id}]`)
    } else {
        console.log(`= LLC exists:  ${llc.name} [${llc.id}]`)
    }

    let created = 0, updated = 0
    for (const p of PROPERTIES) {
        const existing = await prisma.property.findFirst({
            where: { address: p.address, city: p.city, state: p.state, llcId: llc.id },
        })
        if (existing) {
            await prisma.property.update({
                where: { id: existing.id },
                data: { purchaseDate: p.purchaseDate, purchasePrice: p.purchasePrice, monthlyRent: p.monthlyRent, status: p.status, tenantName: p.tenantName, paymentDay: p.paymentDay, imageUrl: p.imageUrl, zipCode: p.zipCode },
            })
            updated++
            console.log(`~ updated: ${p.address} (purchaseDate=${p.purchaseDate.toISOString().slice(0, 10)})`)
            continue
        }
        await prisma.property.create({ data: { ...p, llcId: llc.id } })
        created++
        console.log(`+ created: ${p.address} ($${p.purchasePrice.toLocaleString()}, $${p.monthlyRent}/mo)`)
    }

    console.log(`\nProperties — Created: ${created}, Updated: ${updated}, Total: ${created + updated}`)

    // -----------------------------------------------------------------
    // Payments + Ledger seed: one rent row per (15th-of-month, property)
    // starting on the first payment-day on or after purchaseDate.
    // -----------------------------------------------------------------
    const TR_MONTHS = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık']
    const periodLabel = (d: Date) => `${TR_MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`

    const getRentDates = (purchaseDate: Date, paymentDay: number, today: Date): Date[] => {
        const dates: Date[] = []
        let year = purchaseDate.getUTCFullYear()
        let month = purchaseDate.getUTCMonth()
        const day = purchaseDate.getUTCDate()
        if (day > paymentDay) {
            month++
            if (month > 11) { month = 0; year++ }
        }
        for (let guard = 0; guard < 240; guard++) {
            const d = new Date(Date.UTC(year, month, paymentDay))
            if (d.getTime() > today.getTime()) break
            dates.push(d)
            month++
            if (month > 11) { month = 0; year++ }
        }
        return dates
    }

    const today = new Date()
    const allProps = await prisma.property.findMany({ where: { llcId: llc.id } })
    let payCreated = 0, paySkipped = 0, ledCreated = 0, ledSkipped = 0

    for (const prop of allProps) {
        if (!prop.purchaseDate || !prop.paymentDay) continue
        const dates = getRentDates(prop.purchaseDate, prop.paymentDay, today)
        for (const date of dates) {
            const period = periodLabel(date)

            const existingPay = await prisma.payment.findFirst({
                where: { propertyId: prop.id, date, status: 'PAID' },
            })
            if (existingPay) {
                paySkipped++
            } else {
                await prisma.payment.create({
                    data: {
                        propertyId: prop.id,
                        amount: prop.monthlyRent,
                        date,
                        period,
                        status: 'PAID',
                        description: 'Aylık kira ödemesi (Section 8)',
                    },
                })
                payCreated++
            }

            const existingLed = await prisma.ledger.findFirst({
                where: { propertyId: prop.id, postedDate: date, type: 'INCOME', category: 'Rent' },
            })
            if (existingLed) {
                ledSkipped++
            } else {
                await prisma.ledger.create({
                    data: {
                        propertyId: prop.id,
                        type: 'INCOME',
                        category: 'Rent',
                        amount: prop.monthlyRent,
                        description: `Kira geliri — ${period}`,
                        postedDate: date,
                    },
                })
                ledCreated++
            }
        }
    }
    console.log(`Payments  — Created: ${payCreated}, Skipped: ${paySkipped}`)
    console.log(`Ledgers   — Created: ${ledCreated}, Skipped: ${ledSkipped}`)
}

main()
    .then(async () => { await prisma.$disconnect() })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const ERMAN_EMAIL = 'erman@pasiflow.com'
const LLC_NAME = 'Pasiflow Properties LLC'
const LLC_STATE = 'WY'

// NOTE: schema.prisma'daki LLC modelinde `status` alanı yok, bu yüzden
// kullanıcının istediği `status: "ACTIVE"` atlandı. Eklemek istenirse
// schema'ya `status String @default("ACTIVE")` eklenip db push gerekir.

const PROPERTIES = [
    { address: '10468 Nottingham St', city: 'Detroit', state: 'MI', zipCode: '48224', purchasePrice: 130000, monthlyRent: 1500, status: 'OCCUPIED', tenantName: 'Section 8 Kiracı', paymentDay: 15, purchaseDate: new Date('2024-03-15'), imageUrl: '/properties/nottingham-hd.jpg' },
    { address: '12152 Stout St', city: 'Detroit', state: 'MI', zipCode: '48228', purchasePrice: 85900, monthlyRent: 1160, status: 'OCCUPIED', tenantName: 'Section 8 Kiracı', paymentDay: 15, purchaseDate: new Date('2024-05-20'), imageUrl: '/properties/stout-hd.jpg' },
    { address: '12290 Griggs St', city: 'Detroit', state: 'MI', zipCode: '48204', purchasePrice: 89900, monthlyRent: 1100, status: 'OCCUPIED', tenantName: 'Section 8 Kiracı', paymentDay: 15, purchaseDate: new Date('2024-06-10'), imageUrl: '/properties/griggs-hd.jpg' },
    { address: '15717 Freeland St', city: 'Detroit', state: 'MI', zipCode: '48227', purchasePrice: 87900, monthlyRent: 1165, status: 'OCCUPIED', tenantName: 'Section 8 Kiracı', paymentDay: 15, purchaseDate: new Date('2024-07-01'), imageUrl: '/properties/freeland-hd.jpg' },
    { address: '9977 Evergreen Ave', city: 'Detroit', state: 'MI', zipCode: '48228', purchasePrice: 88900, monthlyRent: 1354, status: 'OCCUPIED', tenantName: 'Section 8 Kiracı', paymentDay: 15, purchaseDate: new Date('2024-08-15'), imageUrl: '/properties/evergreen-hd.jpg' },
    { address: '12345 Kentucky St', city: 'Detroit', state: 'MI', zipCode: '48204', purchasePrice: 89000, monthlyRent: 1224, status: 'OCCUPIED', tenantName: 'Section 8 Kiracı', paymentDay: 15, purchaseDate: new Date('2024-09-01'), imageUrl: '/properties/kentucky-hd.jpg' },
    { address: '8934 Hartwell St', city: 'Detroit', state: 'MI', zipCode: '48228', purchasePrice: 92000, monthlyRent: 1275, status: 'OCCUPIED', tenantName: 'Section 8 Kiracı', paymentDay: 15, purchaseDate: new Date('2024-10-10'), imageUrl: '/properties/nottingham-hd.jpg' },
    { address: '14523 Appoline St', city: 'Detroit', state: 'MI', zipCode: '48227', purchasePrice: 86500, monthlyRent: 1190, status: 'OCCUPIED', tenantName: 'Section 8 Kiracı', paymentDay: 15, purchaseDate: new Date('2024-11-05'), imageUrl: '/properties/stout-hd.jpg' },
    { address: '11234 Fenkell Ave', city: 'Detroit', state: 'MI', zipCode: '48238', purchasePrice: 94000, monthlyRent: 1320, status: 'OCCUPIED', tenantName: 'Section 8 Kiracı', paymentDay: 15, purchaseDate: new Date('2024-12-20'), imageUrl: '/properties/griggs-hd.jpg' },
    { address: '7821 Burt Rd', city: 'Detroit', state: 'MI', zipCode: '48219', purchasePrice: 91000, monthlyRent: 1285, status: 'OCCUPIED', tenantName: 'Section 8 Kiracı', paymentDay: 15, purchaseDate: new Date('2025-01-15'), imageUrl: '/properties/evergreen-hd.jpg' },
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

    let created = 0, skipped = 0
    for (const p of PROPERTIES) {
        const existing = await prisma.property.findFirst({
            where: { address: p.address, city: p.city, state: p.state, llcId: llc.id },
        })
        if (existing) {
            skipped++
            console.log(`= skip:    ${p.address}`)
            continue
        }
        await prisma.property.create({ data: { ...p, llcId: llc.id } })
        created++
        console.log(`+ created: ${p.address} ($${p.purchasePrice.toLocaleString()}, $${p.monthlyRent}/mo)`)
    }

    console.log(`\nDone. Created: ${created}, Skipped: ${skipped}, Total in DB for this LLC: ${created + skipped}`)
}

main()
    .then(async () => { await prisma.$disconnect() })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })

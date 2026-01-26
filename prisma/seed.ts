import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Starting seed...')

    // 1. Create Main User (Erman Adanır)
    const user = await prisma.user.upsert({
        where: { email: 'erman@pasiflow.com' },
        update: {},
        create: {
            email: 'erman@pasiflow.com',
            fullName: 'Erman Adanır',
            passwordHash: 'hashed_password_placeholder', // In real app, hash this
            role: 'ADMIN',
            isVerified: true,
            phone: '+1 (305) 555-0123'
        },
    })

    // 1b. Create Client User for Presentation
    const demoUser = await prisma.user.upsert({
        where: { email: 'erman@pasiflow.com' },
        update: {},
        create: {
            email: 'erman@pasiflow.com',
            fullName: 'Erman Adanır',
            passwordHash: 'Pasiflow2026!', // This will be handled by auth service validation
            role: 'USER',
            isVerified: true,
            phone: '+1 (555) 000-0000'
        },
    })

    console.log(`👤 Created User: ${user.fullName} & ${demoUser.fullName}`)

    // 2. Create LLCs
    const llc1 = await prisma.lLC.create({
        data: {
            name: 'Adanir Holdings LLC',
            formationState: 'Wyoming',
            ein: '82-1234567',
            ownerId: user.id,
        }
    })

    const llc2 = await prisma.lLC.create({
        data: {
            name: 'Miami Prime Assets LLC',
            formationState: 'Florida',
            ein: '45-7654321',
            ownerId: user.id,
        }
    })

    console.log(`🏢 Created LLCs: ${llc1.name}, ${llc2.name}`)

    // 3. Create Properties
    // Property 1 for LLC 1
    const prop1 = await prisma.property.create({
        data: {
            address: '12152 Stout Street',
            city: 'Detroit',
            state: 'MI',
            zipCode: '48228',
            purchasePrice: 85900,
            currentValue: 92000,
            monthlyRent: 1160,
            status: 'OCCUPIED',
            tenantName: 'Sarah Johnson',
            leaseEnd: new Date('2026-06-30'),
            paymentDay: 1,
            imageUrl: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&auto=format&fit=crop&q=80',
            llcId: llc1.id,
        }
    })

    // Property 2 for LLC 2
    const prop2 = await prisma.property.create({
        data: {
            address: '12290 Griggs Street',
            city: 'Detroit',
            state: 'MI',
            zipCode: '48204',
            purchasePrice: 89900,
            currentValue: 95000,
            monthlyRent: 1100,
            status: 'OCCUPIED',
            tenantName: 'Michael Smith',
            leaseEnd: new Date('2026-08-15'),
            paymentDay: 5,
            imageUrl: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800&auto=format&fit=crop&q=80',
            llcId: llc2.id,
        }
    })

    // Property 3 for LLC 1
    const prop3 = await prisma.property.create({
        data: {
            address: '15717 Freeland Street',
            city: 'Detroit',
            state: 'MI',
            zipCode: '48227',
            purchasePrice: 87900,
            currentValue: 88500,
            monthlyRent: 1165,
            status: 'OCCUPIED',
            tenantName: 'Emily Davis',
            leaseEnd: new Date('2026-11-01'),
            paymentDay: 3,
            imageUrl: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&auto=format&fit=crop&q=80',
            llcId: llc1.id,
        }
    })

    console.log(`🏠 Created Properties: ${prop1.address}, ${prop2.address}, ${prop3.address}`)

    // 4. Create Payments
    // Recent payments for Prop 1
    await prisma.payment.createMany({
        data: [
            {
                amount: 1160,
                date: new Date('2025-12-01'),
                period: 'December 2025',
                status: 'PAID',
                propertyId: prop1.id
            },
            {
                amount: 1160,
                date: new Date('2026-01-01'),
                period: 'January 2026',
                status: 'PAID',
                propertyId: prop1.id
            },
            {
                amount: 1160,
                date: new Date('2026-02-01'),
                period: 'February 2026',
                status: 'PENDING',
                propertyId: prop1.id
            }
        ]
    })

    // Payments for Prop 2
    await prisma.payment.createMany({
        data: [
            {
                amount: 1100,
                date: new Date('2025-12-05'),
                period: 'December 2025',
                status: 'PAID',
                propertyId: prop2.id
            },
            {
                amount: 1100,
                date: new Date('2026-01-05'),
                period: 'January 2026',
                status: 'LATE', // Example issue
                propertyId: prop2.id
            }
        ]
    })

    console.log('💰 Created Rent History')

    // 5. Create Documents
    await prisma.document.create({
        data: {
            title: 'Operating Agreement',
            type: 'Legal',
            url: 'https://example.com/docs/oa.pdf',
            size: '1.2 MB',
            llcId: llc1.id,
        }
    })

    await prisma.document.create({
        data: {
            title: 'Lease Agreement - Stout St',
            type: 'Contract',
            url: 'https://example.com/docs/lease_stout.pdf',
            size: '2.4 MB',
            propertyId: prop1.id,
        }
    })

    await prisma.document.create({
        data: {
            title: 'Property Tax 2025',
            type: 'Tax',
            url: 'https://example.com/docs/tax_2025.pdf',
            size: '0.8 MB',
            propertyId: prop1.id,
        }
    })

    console.log('📄 Created Documents')
    // 6. PHASE 2: Create Vendors (Latchel Style)
    const vendor1 = await prisma.vendor.create({
        data: {
            name: 'Detroit Plumbing Pros',
            category: 'Plumbing',
            rating: 4.8,
            phone: '313-555-0199',
            email: 'service@detroitplumbing.com'
        }
    })

    const vendor2 = await prisma.vendor.create({
        data: {
            name: 'Motor City HVAC',
            category: 'HVAC',
            rating: 4.9,
            phone: '313-555-0200',
            email: 'dispatch@motorcityhvac.com'
        }
    })

    console.log('👷 Created Vendors')

    // 7. Create Maintenance Requests (Latchel Style)
    await prisma.maintenanceRequest.create({
        data: {
            title: 'Leaking Kitchen Sink',
            description: 'Tenant reports water leaking under the sink cabinet. Wood looks damp.',
            status: 'COMPLETED',
            priority: 'NORMAL',
            reportedAt: new Date('2025-12-10T09:00:00Z'),
            scheduledAt: new Date('2025-12-11T14:00:00Z'),
            completedAt: new Date('2025-12-11T16:30:00Z'),
            estimatedCost: 150.00,
            finalCost: 185.50,
            propertyId: prop1.id,
            vendorId: vendor1.id,
        }
    })

    await prisma.maintenanceRequest.create({
        data: {
            title: 'Furnace Not Heating',
            description: 'House temperature dropped to 50F. Emergency service needed.',
            status: 'IN_PROGRESS',
            priority: 'EMERGENCY',
            reportedAt: new Date('2026-01-20T18:00:00Z'),
            scheduledAt: new Date('2026-01-20T20:00:00Z'), // Same day
            estimatedCost: 800.00,
            propertyId: prop1.id, // Same property having bad luck
            vendorId: vendor2.id,
        }
    })

    console.log('🔧 Created Maintenance Requests')

    // 8. Create Ledgers (Rentvine Style)
    // Prop 1 Ledger
    await prisma.ledger.createMany({
        data: [
            {
                type: 'INCOME',
                category: 'Rent',
                amount: 1160.00,
                description: 'Rent Payment - December',
                postedDate: new Date('2025-12-01'),
                propertyId: prop1.id
            },
            {
                type: 'EXPENSE',
                category: 'Repair',
                amount: -185.50,
                description: 'Inv #1024 - Kitchen Sink Repair',
                postedDate: new Date('2025-12-12'), // Paid right after job
                propertyId: prop1.id
            },
            {
                type: 'EXPENSE',
                category: 'Management Fee',
                amount: -116.00, // 10%
                description: 'Management Fee - December',
                postedDate: new Date('2025-12-01'),
                propertyId: prop1.id
            },
            {
                type: 'INCOME',
                category: 'Rent',
                amount: 1160.00,
                description: 'Rent Payment - January',
                postedDate: new Date('2026-01-01'),
                propertyId: prop1.id
            }
        ]
    })

    console.log('📊 Created Financial Ledgers')

    // 9. Create Active Lease (Rentvine Style)
    await prisma.lease.create({
        data: {
            startDate: new Date('2025-07-01'),
            endDate: new Date('2026-06-30'),
            rentAmount: 1160,
            securityDeposit: 1160,
            status: 'ACTIVE',
            tenantName: 'Sarah Johnson',
            tenantEmail: 'sarah.j@example.com',
            tenantPhone: '313-555-9988',
            propertyId: prop1.id,
        }
    })

    console.log('📜 Created Leases')

    console.log('✅ Seed finished successfully')
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

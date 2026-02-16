import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    console.log('Starting seed...')

    // Hash passwords for seed users
    const adminHash = await bcrypt.hash('Pasiflow2026!', 12)
    const investorHash = await bcrypt.hash('PasiInvestor2025!', 12)
    const agentHash = await bcrypt.hash('PasiAgent2025!', 12)
    const demoHash = await bcrypt.hash('Pasiflow2025!', 12)

    // 1. Create Admin (CTO)
    const admin = await prisma.user.upsert({
        where: { email: 'erman@pasiflow.com' },
        update: { passwordHash: adminHash, role: 'ADMIN' },
        create: {
            email: 'erman@pasiflow.com',
            fullName: 'Erman Adanır',
            passwordHash: adminHash,
            role: 'ADMIN',
            isVerified: true,
            phone: '+1 (305) 555-0123'
        },
    })

    // 2. Create Demo Investor
    const investor = await prisma.user.upsert({
        where: { email: 'investor@pasiflow.com' },
        update: { passwordHash: investorHash, role: 'USER' },
        create: {
            email: 'investor@pasiflow.com',
            fullName: 'Demo Investor',
            passwordHash: investorHash,
            role: 'USER',
            isVerified: true,
            phone: '+1 (555) 000-0001'
        },
    })

    // 3. Create Demo Agent
    const agent = await prisma.user.upsert({
        where: { email: 'agent@pasiflow.com' },
        update: { passwordHash: agentHash, role: 'AGENT' },
        create: {
            email: 'agent@pasiflow.com',
            fullName: 'Pasiflow Agent',
            passwordHash: agentHash,
            role: 'AGENT',
            isVerified: true,
            phone: '+1 (555) 000-0002'
        },
    })

    // 4. Create Apple Review Demo User
    const demo = await prisma.user.upsert({
        where: { email: 'demo@pasiflow.com' },
        update: { passwordHash: demoHash, role: 'USER' },
        create: {
            email: 'demo@pasiflow.com',
            fullName: 'Demo User',
            passwordHash: demoHash,
            role: 'USER',
            isVerified: true,
            phone: '+1 (555) 000-0099'
        },
    })

    console.log(`Created Users: ${admin.fullName} (ADMIN), ${investor.fullName} (USER), ${agent.fullName} (AGENT), ${demo.fullName} (DEMO)`)

    // 4. Create LLCs (owned by investor for demo)
    const llc1 = await prisma.lLC.create({
        data: {
            name: 'Adanir Holdings LLC',
            formationState: 'Wyoming',
            ein: '82-1234567',
            ownerId: investor.id,
        }
    })

    const llc2 = await prisma.lLC.create({
        data: {
            name: 'Miami Prime Assets LLC',
            formationState: 'Florida',
            ein: '45-7654321',
            ownerId: investor.id,
        }
    })

    console.log(`Created LLCs: ${llc1.name}, ${llc2.name}`)

    // 5. Create Properties
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

    console.log(`Created Properties: ${prop1.address}, ${prop2.address}, ${prop3.address}`)

    // 6. Create Payments
    await prisma.payment.createMany({
        data: [
            { amount: 1160, date: new Date('2025-12-01'), period: 'December 2025', status: 'PAID', propertyId: prop1.id },
            { amount: 1160, date: new Date('2026-01-01'), period: 'January 2026', status: 'PAID', propertyId: prop1.id },
            { amount: 1160, date: new Date('2026-02-01'), period: 'February 2026', status: 'PENDING', propertyId: prop1.id },
            { amount: 1100, date: new Date('2025-12-05'), period: 'December 2025', status: 'PAID', propertyId: prop2.id },
            { amount: 1100, date: new Date('2026-01-05'), period: 'January 2026', status: 'LATE', propertyId: prop2.id },
        ]
    })

    console.log('Created Rent History')

    // 7. Create Documents
    await prisma.document.createMany({
        data: [
            { title: 'Operating Agreement', type: 'Legal', url: 'https://example.com/docs/oa.pdf', size: '1.2 MB', llcId: llc1.id },
            { title: 'Lease Agreement - Stout St', type: 'Contract', url: 'https://example.com/docs/lease_stout.pdf', size: '2.4 MB', propertyId: prop1.id },
            { title: 'Property Tax 2025', type: 'Tax', url: 'https://example.com/docs/tax_2025.pdf', size: '0.8 MB', propertyId: prop1.id },
        ]
    })

    console.log('Created Documents')

    // 8. Create Vendors
    const vendor1 = await prisma.vendor.create({
        data: { name: 'Detroit Plumbing Pros', category: 'Plumbing', rating: 4.8, phone: '313-555-0199', email: 'service@detroitplumbing.com' }
    })

    const vendor2 = await prisma.vendor.create({
        data: { name: 'Motor City HVAC', category: 'HVAC', rating: 4.9, phone: '313-555-0200', email: 'dispatch@motorcityhvac.com' }
    })

    console.log('Created Vendors')

    // 9. Create Maintenance Requests
    await prisma.maintenanceRequest.create({
        data: {
            title: 'Leaking Kitchen Sink',
            description: 'Tenant reports water leaking under the sink cabinet.',
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
            scheduledAt: new Date('2026-01-20T20:00:00Z'),
            estimatedCost: 800.00,
            propertyId: prop1.id,
            vendorId: vendor2.id,
        }
    })

    console.log('Created Maintenance Requests')

    // 10. Create Ledgers
    await prisma.ledger.createMany({
        data: [
            { type: 'INCOME', category: 'Rent', amount: 1160.00, description: 'Rent Payment - December', postedDate: new Date('2025-12-01'), propertyId: prop1.id },
            { type: 'EXPENSE', category: 'Repair', amount: -185.50, description: 'Kitchen Sink Repair', postedDate: new Date('2025-12-12'), propertyId: prop1.id },
            { type: 'EXPENSE', category: 'Management Fee', amount: -116.00, description: 'Management Fee - December', postedDate: new Date('2025-12-01'), propertyId: prop1.id },
            { type: 'INCOME', category: 'Rent', amount: 1160.00, description: 'Rent Payment - January', postedDate: new Date('2026-01-01'), propertyId: prop1.id },
        ]
    })

    console.log('Created Financial Ledgers')

    // 11. Create Active Lease
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

    console.log('Created Leases')

    // 12. Create Agent Profile for the agent user
    await prisma.agentProfile.create({
        data: {
            userId: agent.id,
            level: 'ELITE',
        }
    })

    console.log('Created Agent Profile')
    console.log('Seed finished successfully')
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

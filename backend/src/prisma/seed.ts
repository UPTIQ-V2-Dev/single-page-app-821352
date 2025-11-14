import { PrismaClient, Role } from '../generated/prisma/index.js';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting database seeding...');

    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 12);
    const admin = await prisma.user.upsert({
        where: { email: 'admin@example.com' },
        update: {},
        create: {
            email: 'admin@example.com',
            name: 'Admin',
            password: adminPassword,
            role: Role.ADMIN,
            isEmailVerified: true
        }
    });

    console.log('✅ Created admin user:', admin.email);

    // Create sample contact submissions
    const contactSubmissions = [
        {
            name: 'John Doe',
            email: 'john@example.com',
            subject: 'Inquiry about services',
            message: 'Hello, I would like to learn more about your services. Could you please provide more information?'
        },
        {
            name: 'Jane Smith',
            email: 'jane@example.com',
            subject: 'Partnership opportunity',
            message: 'Hi, I represent a company that might be interested in partnering with you. Let\'s discuss potential collaboration opportunities.'
        }
    ];

    for (const contact of contactSubmissions) {
        const contactSubmission = await prisma.contactSubmission.upsert({
            where: { id: contactSubmissions.indexOf(contact) + 1 },
            update: {},
            create: contact
        });
        console.log('✅ Created contact submission:', contactSubmission.name);
    }

    // Create sample newsletter subscribers
    const newsletterSubscribers = [
        { email: 'subscriber1@example.com' },
        { email: 'subscriber2@example.com' },
        { email: 'subscriber3@example.com' }
    ];

    for (const subscriber of newsletterSubscribers) {
        const newsletterSub = await prisma.newsletter.upsert({
            where: { email: subscriber.email },
            update: {},
            create: subscriber
        });
        console.log('✅ Created newsletter subscription:', newsletterSub.email);
    }
}

main()
    .catch(e => {
        console.error('❌ Error during seeding:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

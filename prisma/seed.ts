import { config } from 'dotenv'
import { join } from 'path'
import { PrismaClient } from '@prisma/client'

// Load .env file
config({ path: join(__dirname, '..', '.env') })

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set')
}

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding...')

  // Clear existing persons
  await prisma.person.deleteMany()

  // Create sample persons
  const persons = [
    { name: 'John Doe', phoneNumber: '0412345678', email: 'john@example.com' },
    { name: 'Jane Smith', phoneNumber: '0423456789', email: 'jane@example.com' },
    { name: 'Alice Johnson', phoneNumber: '0434567890', email: 'alice@example.com' },
    { name: 'Bob Williams', phoneNumber: '0445678901', email: 'bob@example.com' },
    { name: 'Charlie Brown', phoneNumber: '0456789012', email: 'charlie@example.com' },
    { name: 'Emily Davis', phoneNumber: '0467890123', email: 'emily@example.com' },
    { name: 'Frank Miller', phoneNumber: '0478901234', email: 'frank@example.com' },
    { name: 'Grace Lee', phoneNumber: '0489012345', email: 'grace@example.com' },
    { name: 'Henry Moore', phoneNumber: '0490123456', email: 'henry@example.com' },
    { name: 'Isabella Young', phoneNumber: '0401234567', email: 'isabella@example.com' },
  ]

  for (const person of persons) {
    await prisma.person.create({
      data: person,
    })
  }

  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

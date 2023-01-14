const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()

let companies = [
  {
    name: 'Amazon',
    session_id: '1',
    email: 'amazon@gmail.com',
    password: 'password_1'
  },
  {
    name: 'Nike',
    session_id: '2',
    email: 'nike@gmail.com',
    password: 'password_2'
  },
  {
    name: 'Google',
    session_id: '3',
    email: 'google@gmail.com',
    password: 'password_3'
  },
  {
    name: 'Cigna',
    session_id: '4',
    email: 'cigna@gmail.com',
    password: 'password_4'
  },
  {
    name: 'Chubb',
    session_id: '5',
    email: 'chubb@gmail.com',
    password: 'password_5'
  }
];

async function main() {
  console.log('Start seeding...');

  for (let i = 0; i < companies.length; i++) {
    const company = await prisma.Company.create({
      data: companies[i]
    })
    console.log(`Created user with id: ${company.id}`)
  }

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
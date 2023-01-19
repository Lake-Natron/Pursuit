const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

let companies = [
  {
    company_name: 'Amazon',
    email: 'amazon@gmail.com',
    password: 'password_1',
    role: 'company'
  },
  {
    company_name: 'Nike',
    email: 'nike@gmail.com',
    password: 'password_2',
    role: 'company'
  },
  {
    company_name: 'Google',
    email: 'google@gmail.com',
    password: 'password_3',
    role: 'company'
  },
  {
    company_name: 'Cigna',
    email: 'cigna@gmail.com',
    password: 'password_4',
    role: 'company'
  },
  {
    company_name: 'Chubb',
    email: 'chubb@gmail.com',
    password: 'password_5',
    role: 'company'
  }
];

async function main() {
  console.log('Start seeding...');

  for (let i = 0; i < companies.length; i++) {
    const company = await prisma.User.create({
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
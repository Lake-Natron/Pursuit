const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()

let seekers = [
  {
    first_name: 'Callie',
    last_name: 'Stoscup',
    session_id: '1',
    email: 'calliestoscup@gmail.com',
    password: 'password_1'
  },
  {
    first_name: 'John',
    last_name: 'Doe',
    session_id: '2',
    email: 'johndoe@gmail.com',
    password: 'password_2'
  },
  {
    first_name: 'Jane',
    last_name: 'Doe',
    session_id: '3',
    email: 'janedoe@gmail.com',
    password: 'password_3'
  },
  {
    first_name: 'Oprah',
    last_name: 'Winfrey',
    session_id: '4',
    email: 'oprahwinfrey@gmail.com',
    password: 'password_4'
  },
  {
    first_name: 'Brad',
    last_name: 'Pitt',
    session_id: '5',
    email: 'bradpitt@gmail.com',
    password: 'password_5'
  }
];

async function main() {
  console.log('Start seeding...');

  for (let i = 0; i < seekers.length; i++) {
    const seeker = await prisma.Seeker.create({
      data: seekers[i]
    })
    console.log(`Created user with id: ${seeker.id}`)
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